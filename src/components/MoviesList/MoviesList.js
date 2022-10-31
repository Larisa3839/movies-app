import React, { Component } from 'react'
import { Col, Row } from 'antd'

import Movie from '../Movie/Movie'
import Spiner from '../Spiner'
import ErrorComponent from '../ErrorComponent/ErrorComponent'
import SearchMoviesApi from '../api'
import './MoviesList.css'

export default class MoviesList extends Component {
  componentDidMount() {
    this.getMovies(this.props.query)
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query || this.props.page !== prevProps.page) {
      this.setState({ loading: true })
      this.getMovies(this.props.query, this.props.page)
    }
  }

  _imgPath = 'https://image.tmdb.org/t/p/original'

  state = {
    movies: [],
    loading: true,
    isError: false,
    messageError: '',
  }

  onError = (err) => {
    console.log(err.message)
    this.setState({ isError: true, loading: false, messageError: err.message })
  }

  createMovie = (id, poster_path, title, release_date, overview, vote_average) => {
    return {
      id,
      poster_path: `${this._imgPath}${poster_path}`,
      title,
      release_date,
      overview,
      vote_average,
    }
  }

  getMovies = (query, page) => {
    SearchMoviesApi(query, page)
      .then((res) => {
        this.setState(() => {
          const arrMovies = res.results.map(({ id, poster_path, title, release_date, overview, vote_average }) => {
            return this.createMovie(id, poster_path, title, release_date, overview, vote_average)
          })
          return { movies: arrMovies, loading: false, isError: false }
        })
      })
      .catch((error) => this.onError(error))
  }

  render() {
    const { movies, loading, isError } = this.state
    const hasData = !(loading || isError)
    const errorMessage = isError ? <ErrorComponent message={this.state.messageError} /> : null
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
