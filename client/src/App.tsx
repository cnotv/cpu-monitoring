import './App.css';
import Card from './components/Card';
import Chart from './components/Chart';
import Logs from './components/Logs';

function App() {
  const current = 1;
  const loadData = [
    {
      time: 1,
      value: 1
    },
    {
      time: 2,
      value: 2
    },
    {
      time: 3,
      value: 1
    },
    {
      time: 4,
      value: 3
    }
  ];

  const heavyLog = [
    '31.05.2021 - 3pm',
    '31.05.2021 - 3pm',
    '31.05.2021 - 3pm',
  ]

  const recoveredLog = [
    '31.05.2021 - 3pm',
    '31.05.2021 - 3pm',
    '31.05.2021 - 3pm',
    '31.05.2021 - 3pm',
  ]

  const threshold = 1;
  const isHeavy = false;
  const isRecovered = true;

  return (
    <main className="dashboard">
      <section className="dashboard__current">
        <h1>CPUs Heavy Loads</h1>
        <div className="dashboard__counter">{current}</div>
      </section>

      <section className="dashboard__grid">
        <Card>
          <Chart
            loadData={loadData}
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
  );
}

export default App;
