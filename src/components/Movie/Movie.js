import './Movie.css'
import { Rate } from 'antd'
import intlFormat from 'date-fns/intlFormat'

const _macSize = 200

String.prototype.cutText = function (n, text) {
  if (this.length <= n) return this
  const subString = this.substring(0, n - 1)
  return (text ? subString.substring(0, subString.lastIndexOf(' ')) : subString) + '...'
}

const Movie = ({ poster_path, title, release_date, overview, vote_average }) => {
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
        <p className="item-info__description">{overview.cutText(_macSize)}</p>
        <Rate count={8} allowHalf defaultValue={vote_average} />
      </div>
    </div>
  )
}

export default Movie
