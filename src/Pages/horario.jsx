import '../Styles/horario.css'

export default function Horario() {
  return (
    <div className="horario-container">
      <h2>Horario de Clases</h2>
      <iframe
        src="https://calendar.google.com/calendar/embed?wkst=1&ctz=America%2FGuayaquil&title=Horario%20PiaYoga&src=YmE2MjNiZmFjMDE1ZDdlZmZmMjNmZDczZDk4ZDNjMWQyYmE3ZjhmZGEwZDMzNzYxNTdjZThkMDk3YzQwNGRjNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y180NWNmNmRkZTRmOTJhODZhYjczMzIzNjk2Y2ZlMGYyYjU4Mzg0ZjhjODAwZGU3NTcwYzRiYmZiNGQ2M2Q1YTQxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23f4511e&color=%23ad1457"
        style={{ border: 0 }}
        frameBorder="0"
        scrolling="no"
        title="Horario PiaYoga"
      />

      <a
        href="https://calendar.google.com/calendar/u/0?cid=TU_ID%40group.calendar.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-calendar"
      >
        Añadir a mi Google Calendar
      </a>
    </div>
  )
}
