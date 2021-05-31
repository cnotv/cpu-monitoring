import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: ChartValues[];
  threshold: number;
}

function Chart({ data, threshold }: ChartProps) {
  return (
    <div>
      <h3>Last 30 minutes</h3>
      <ResponsiveContainer width="99%" height={300}>
        <AreaChart
          width={700}
          height={300}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey='time'
            label={{
              value: 'Time',
              position: 'insideBottomRight',
              offset: '-5'
            }}
          />
          <YAxis
            dataKey='value'
            label={{
              value: 'High Load',
              angle: -90,
              position: 'insideLeft',
              offset: '0'
            }} />
          <Tooltip />
          <ReferenceLine y={threshold} stroke="red" />
          <Area
            type="monotone"
            dataKey="value"
            stroke="white"
            fill="green"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart;
