import './Movie.css'

const Movie = () => {
  return (
    <div className="movies-list__item">
      <img className="item-image" src="https://lumiere-a.akamaihd.net/v1/images/p_blackwidow_21043_v2_6d1b73b8.jpeg" />
      <div className="item-info">
        <h2 className="item-info__title">The way back</h2>
        <h3 className="item-info__data">March 5, 2020 </h3>
        <div className="item-info__buttons">
          <button type="button">Action</button>
          <button type="button">Drama</button>
        </div>
        <p className="item-info__description">
          A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
          attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
        </p>
      </div>
    </div>
  )
}

export default Movie
