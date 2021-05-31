import './Logs.css'

interface LogsProps {
  title: string;
  logs: string[];
  note?: string;
}

function Logs({ title, logs, note }: LogsProps) {
  return (
    <div>
      <h3>{ title }<span>{logs.length}</span></h3>

      <ol>
        {logs.map((val, i) =>
          <li key={i}>{val}</li>
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