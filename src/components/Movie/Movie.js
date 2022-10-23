import './Movie.css'
import intlFormat from 'date-fns/intlFormat'

const Movie = ({ poster_path, title, release_date, overview }) => {
  const date = intlFormat(
    new Date(release_date),
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
    {
      locale: 'en-US',
    }
  )
  return (
    <div className="movies-list__item">
      <img className="item-image" src={poster_path} />
      <div className="item-info">
        <h2 className="item-info__title">{title}</h2>
        <h3 className="item-info__data">{date}</h3>
        <div className="item-info__buttons">
          <button type="button">Action</button>
          <button type="button">Drama</button>
        </div>
        <p className="item-info__description">{overview}</p>
      </div>
    </div>
  )
}

export default Movie
