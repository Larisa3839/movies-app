import './App.css'
import { Input } from 'antd'
import { React, Component } from 'react'
import debounce from 'lodash.debounce'

import MoviesList from '../MoviesList'
import PaginationElement from '../Pagination'
import NavMenu from '../NavMenu'
import MoviesApiService from '../api'

export const Genres = React.createContext('test')

export default class App extends Component {
  componentDidMount() {
    this.moviesApiService = new MoviesApiService()
    this.getMovies(this.state.value)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value || this.state.page !== prevState.page) {
      this.setState({ loading: true })
      this.getMovies(this.state.value, this.state.page)
    }

    if (this.state.isRated !== prevState.isRated && this.state.isRated) {
      this.moviesApiService
        .getRatedMovies()
        .then((res) => {
          this.setState(() => {
            const arrMovies = res.map(({ id, poster_path, title, release_date, overview, vote_average }) => {
              return this.createMovie(id, poster_path, title, release_date, overview, vote_average)
            })
            return { ratedMovies: arrMovies, loading: false, isError: false }
          })
        })
        .catch((error) => this.setState({ isError: true, loading: false, messageError: error.message }))
    }
  }

  state = {
    movies: [],
    ratedMovies: [],
    isRated: false,
    loading: true,
    isError: false,
    messageError: '',
    value: 'return',
    page: 1,
    total_pages: null,
  }

  getMovies = (query, page) => {
    this.moviesApiService
      .SearchMoviesApi(query, page)
      .then((res) => {
        this.setState(() => {
          const arrMovies = res.results.map(
            ({ id, poster_path, title, release_date, overview, vote_average, rating }) => {
              return this.createMovie(id, poster_path, title, release_date, overview, vote_average, rating)
            }
          )
          return { movies: arrMovies, loading: false, isError: false }
        })
        this.setState({ total_pages: res.total_pages })
      })
      .catch((error) => this.setState({ isError: true, loading: false, messageError: error.message }))
  }

  createMovie = (id, poster_path, title, release_date, overview, vote_average, rating = 0) => {
    return {
      id,
      poster_path: `${this.moviesApiService.baseImgUrl}${poster_path}`,
      title,
      release_date,
      overview,
      vote_average,
      rating,
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  pageChange = (page) => {
    this.setState({ page })
  }

  changeNavPage = (name) => {
    this.setState({ isRated: name === 'Rated' ? true : false })
  }

  render() {
    const { movies, ratedMovies, isError, isRated, loading, messageError } = this.state
    const input = !isRated ? (
      <Input placeholder="Type to search..." onChange={debounce(this.handleChange, 300)} />
    ) : null
    return (
      <div className="App">
        <header className="header">
          <div className="menu">
            <NavMenu changeNavPage={this.changeNavPage} />
          </div>
          {input}
        </header>
        <section className="main">
          <MoviesList
            dataMovies={isRated ? ratedMovies : movies}
            isError={isError}
            loading={loading}
            messageError={messageError}
          />
        </section>
        <footer className="footer">
          <PaginationElement pageChange={this.pageChange} totalPages={this.state.total_pages} />
        </footer>
      </div>
    )
  }
}
