import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ChartProps {
  data: ChartValues[];
  threshold: number;
}

function Chart({ data, threshold }: ChartProps) {
  return (
    <div>
      <h3>Last 30 minutes</h3>
      <ResponsiveContainer width="99%" height={300}>
        <LineChart
          width={700}
          height={300}
          data={data}
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
  )
}

export default Chart;
