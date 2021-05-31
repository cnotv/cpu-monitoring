import './Logs.css'

interface LogsProps {
  title: string;
  logs: ChartValues[];
  note?: string;
}

function Logs({ title, logs, note }: LogsProps) {
  return (
    <div>
      <h3>{ title }<span>{logs.length}</span></h3>

      <ol>
        {logs.map((log, i) =>
          <li key={i}>{log.value}</li>
        )}
      </ol>

      {note &&
        <div className="logs__note">
          <p>{note}</p>
        </div>
      }
    </div>
  )
}

export default Logs;