import { useEffect, useState } from 'react';

import './Dashboard.css';
import Card from '../components/Card';
import Chart from '../components/Chart';
import Logs from '../components/Logs';
import { getCpu } from '../utilities/Api';

import { cpuLogSize, cpuCheckInterval, getNewLogs, cpuThreshold } from '../utilities/Cpu';

// Initialize log
let logs: ChartValues[] = Array(cpuLogSize).fill({});
let heavy: ChartValues[] = [];
let recovered: ChartValues[] = [];

function Dashboard() {
  const threshold = 1;

  const [current, setCurrent] = useState(0);
  const [isHeavy, setIsHeavy] = useState<boolean>(false);
  const [isRecovered, setIsRecovered] = useState<boolean>(false);

  /**
   * Calculate all the required values, based on the single request
   */
  const updateDashboard = async (): Promise<void> => {
    await getCpu().then(
      value => {
        setCurrent(value);
        const newLog = { value, time: new Date().toLocaleString() };
        logs = getNewLogs(logs, newLog, cpuLogSize);

        const higher = value > threshold;
        const latest = logs.slice(0, cpuThreshold);

        if (higher) {
          setIsRecovered(false);
          const isHeavyActive = latest.every(log => log.value > threshold);
          if (isHeavyActive) {
            heavy = [...heavy, newLog]
            setIsHeavy(true);
          }
        } else {
          setIsHeavy(false);
          const isRecoveredActive = latest.every(log => log.value < threshold);
          setIsHeavy(false);
          // Set it recovered, only if it has been an heavy load
          if (isRecoveredActive && heavy.length) {
            recovered = [...recovered, newLog]
            setIsRecovered(true);
          }
        }
      }
    );
  }

  useEffect(() => {
    const startCheck = setInterval(updateDashboard, cpuCheckInterval * 1000);
    updateDashboard()

    return () => {
      // Remove timeout on destroy, to prevent memory leaks
      clearTimeout(startCheck)
    }
  }, [])

  return (
    <main className="dashboard">
      <section className="dashboard__current">
        <h1>CPUs Heavy Loads</h1>
        <div className="dashboard__counter">{current}</div>
      </section>

      <section className="dashboard__grid">
        <Card>
          <Chart
            data={logs}
            threshold={threshold}
          ></Chart>
        </Card>

        <Card
          type="error"
          isActive={isHeavy}
          note="Note: A CPU is considered under high average load when it has exceeded 1 for 2 minutes or more"
        >
          <Logs
            title="Heavy Loads: "
            logs={heavy}
          ></Logs>
        </Card>

        <Card
          type="correct"
          isActive={isRecovered}
          note="Note: A CPU is considered recovered from high average load when it drops below 1 for 2 minutes or more."
        >
          <Logs
            title="Recovered: "
            logs={recovered}
          ></Logs>
        </Card>
      </section>
    </main>
  )
}

export default Dashboard
