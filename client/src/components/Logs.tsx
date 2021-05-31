import './Logs.css'

interface LogsProps {
  title: string;
  logs: ChartValues[];
  note?: string;
}

function Logs({ title, logs, note }: LogsProps) {
  return (
    <div>
      <h3>{title}<span>{logs.length}</span></h3>

      <div className="logs__entries">
        {logs.map((log, i) =>
          <p key={i}>{log.time} - {log.value}</p>
        )}
      </div>

      {note &&
        <div className="logs__note">
          <p>{note}</p>
        </div>
      }
    </div>
  )
}

export default Logs;