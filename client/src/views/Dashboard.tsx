import { useEffect, useState } from 'react';

import './Dashboard.css';
import Card from '../components/Card';
import Chart from '../components/Chart';
import Logs from '../components/Logs';
import { getCpu } from '../utilities/Api';

import { cpuLogSize, cpuCheckInterval, getNewLogs } from '../utilities/Cpu';

let logs: ChartValues[] = [];

function Dashboard() {
  const threshold = 1;
  
  const [current, setCurrent] = useState(0);
  const [cpuData, setCpuData] = useState<ChartValues[]>([]);
  const [heavyLog, setHeavyLog] = useState<ChartValues[]>([]);
  const [recoveredLog, setRecoveredLog] = useState<ChartValues[]>([]);
  const [isHeavy, setIsHeavy] = useState<boolean>(false);
  const [isRecovered, setIsRecovered] = useState<boolean>(false);

  const updateDashboard = async (): Promise<void> => {
    await getCpu().then(
      value => {
        const input = { value, time: new Date().toLocaleString() };
        const newLogs = getNewLogs(logs, input, cpuLogSize);
        logs = newLogs;
        setCurrent(value);
        setCpuData(newLogs);
        setHeavyLog(newLogs);
        setRecoveredLog(newLogs);
        setIsHeavy(true);
        setIsRecovered(true);
      }
    );
  }

  useEffect(() => {
    const startCheck = setInterval(updateDashboard, cpuCheckInterval * 500);
    updateDashboard()

    return () => {
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
            data={cpuData}
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
            logs={heavyLog}
          ></Logs>
        </Card>

        <Card
          type="correct"
          isActive={isRecovered}
          note="Note: A CPU is considered recovered from high average load when it drops below 1 for 2 minutes or more."
        >
          <Logs
            title="Recovered: "
            logs={recoveredLog}
          ></Logs>
        </Card>
      </section>
    </main>
  )
}

export default Dashboard
