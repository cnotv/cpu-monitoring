import { useEffect, useState } from 'react';

import './Dashboard.css';
import Card from '../components/Card';
import Chart from '../components/Chart';
import Logs from '../components/Logs';
import { getCpuStats, initCpuStats } from '../utilities/Api';

import { cpuCheckInterval,cpuThresholdValue } from '../utilities/Cpu';

function Dashboard() {
  const [cpuStats, setCpuStats] = useState<CpuStats>(initCpuStats);

  /**
   * Calculate all the required values, based on the single request
   */
  const updateDashboard = async (): Promise<void> => {
    setCpuStats(await getCpuStats(initCpuStats.logs))
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
        <div className="dashboard__counter">{cpuStats.current}</div>
      </section>

      <section className="dashboard__grid">
        <Card>
          <Chart
            data={cpuStats.logs.cpu}
            threshold={cpuThresholdValue}
          ></Chart>
        </Card>

        <Card
          type="error"
          isActive={cpuStats.isHeavy}
          note="Note: A CPU is considered under high average load when it has exceeded 1 for 2 minutes or more"
        >
          <Logs
            title="Heavy Loads: "
            logs={cpuStats.logs.heavy}
          ></Logs>
        </Card>

        <Card
          type="correct"
          isActive={cpuStats.isRecovered}
          note="Note: A CPU is considered recovered from high average load when it drops below 1 for 2 minutes or more."
        >
          <Logs
            title="Recovered: "
            logs={cpuStats.logs.recovered}
          ></Logs>
        </Card>
      </section>
    </main>
  )
}

export default Dashboard;
