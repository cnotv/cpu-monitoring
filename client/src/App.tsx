import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

import './App.css';

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

  return (
    <main className="dashboard">
      <section className="dashboard__current">
        <h1>CPUs Heavy Loads</h1>
        <div className="dashboard__counter">{ current }</div>
      </section>

      <section className="dashboard__grid">
        <div className="dashboard__chart dashboard__card">
          <h3>Last 30 minutes</h3>
          <ResponsiveContainer width="99%" height={300}>
            <LineChart
              width={700}
              height={300}
              data={loadData}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='time' label={{ value: 'Time', position: 'insideBottomRight', offset: '-5' }} />
              <YAxis dataKey='value' label={{ value: 'High Load', angle: -90, position: 'insideLeft', offset: '10' }} />
              <Tooltip />
              <ReferenceLine y={threshold} stroke="red" />
              <Line type='monotone' dataKey='value' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard__card dashboard__card--heavy">
          <h3>Heavy Loads: <span>{heavyLog.length}</span></h3>
          
          <ol>
            {heavyLog.map((val, i) =>
              <li key={i}>{ val }</li>
            )}
          </ol>

          <div className="dashboard__card__note">
            <p>Note: A CPU is considered under high average load when it has exceeded 1 for 2 minutes or more</p>
          </div>
        </div>

        <div className="dashboard__card dashboard__card--recovered dashboard__card--current">
          <h3>Recovered: <span>{recoveredLog.length}</span></h3>
          
          <ol>
            {recoveredLog.map((val, i) =>
              <li key={i}>{ val }</li>
            )}
          </ol>

          <div className="dashboard__card__note">
            <p>Note: A CPU is considered recovered from high average load when it drops below 1 for 2 minutes or more.</p>
          </div>
        </div>
      </section>

    </main>
  );
}

export default App;
