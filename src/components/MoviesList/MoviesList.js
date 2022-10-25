import React, { Component } from 'react'
import { Col, Row } from 'antd'

import Movie from '../Movie/Movie'
import Spiner from '../Spiner'
import ErrorComponent from '../ErrorComponent/ErrorComponent'
import SearchMoviesApi from '../api'
import './MoviesList.css'

export default class MoviesList extends Component {
  constructor() {
    console.log('conconstructor()')
    super()
    setInterval(this.getMovies(), 5000)
  }

  _imgPath = 'https://image.tmdb.org/t/p/original'

  state = {
    movies: [],
    loading: true,
    isError: false,
  }

  onError = () => {
    this.setState({ isError: true, loading: false })
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
    SearchMoviesApi()
      .then((res) => {
        this.setState(() => {
          const arrMovies = res.results.map(({ id, poster_path, title, release_date, overview }) => {
            return this.createMovie(id, poster_path, title, release_date, overview)
          })
          return { movies: arrMovies, loading: false }
        })
      })
      .catch(this.onError)
  }

  render() {
    const { movies, loading, isError } = this.state
    const hasData = !(loading || isError)
    const errorMessage = isError ? <ErrorComponent /> : null
    const spiner = loading ? <Spiner /> : null

    if (hasData) {
      const elements = movies.map((item) => (
        <Col key={item.id} className="gutter-row" span={12}>
          <Movie {...item} />
        </Col>
      ))

      return <Row gutter={[36, 36]}>{elements}</Row>
    }

    return errorMessage || spiner
  }
}
