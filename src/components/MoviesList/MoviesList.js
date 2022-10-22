import React, { Component } from 'react'

import Movie from '../Movie/Movie'
import SearchMoviesApi from '../api'
import './MoviesList.css'

export default class MoviesList extends Component {
  constructor() {
    super()
    this.getMovies()
  }

  _imgPath = 'https://image.tmdb.org/t/p/original'

  state = {
    movies: [],
  }

  createMovie = (id, poster_path, title, release_date, overview) => {
    return {
      id,
      poster_path: `${this._imgPath}${poster_path}`,
      title,
      release_date,
      overview,
    }
  }

  getMovies = () => {
    SearchMoviesApi().then((res) => {
      this.setState(({ movies }) => {
        let arrMovies = [...movies]
        arrMovies = res.results.map(({ id, poster_path, title, release_date, overview }) => {
          return this.createMovie(id, poster_path, title, release_date, overview)
        })
        return { movies: arrMovies }
      })
    })
  }

  render() {
    const { movies } = this.state
    const elements = movies.map((item) => {
      return (
        <li key={item.id}>
          <Movie {...item} />
        </li>
      )
    })
    return <ul className="movies-list">{elements}</ul>
  }
}
