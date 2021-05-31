import './Card.css'

interface CardProps {
  children: JSX.Element;
  isActive?: boolean;
  type?: 'error' | 'correct';
  note?: string;
}

function Card({ children, isActive, type, note }: CardProps) {
  const typeClassMap = {
    'error': ' card--error',
    'correct': ' card--correct'
  }
  const typeClass = type ? typeClassMap[type] : '';
  const activeClass = isActive ? ' card--active' : '';

  return (
    <div className={'card' + typeClass + activeClass}>
      {children}
      {note &&
        <div className="card__note">
          <p>{note}</p>
        </div>
      }
    </div >
  );
}

export default Card