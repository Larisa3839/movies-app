import './App.css'
import { Input } from 'antd'
import React, { Component } from 'react'
import debounce from 'lodash.debounce'

import MoviesList from '../MoviesList'
import PaginationElement from '../Pagination'
import NavMenu from '../NavMenu'
import MoviesApiService from '../api'
import GenreContext from '../GenreContext'

export default class App extends Component {
  componentDidMount() {
    this.moviesApiService = new MoviesApiService()
    this.getMovies(this.state.value)
    this.moviesApiService.getGenreMovieList().then((res) => this.setState({ genres: res }))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      if (this.state.isRated) {
        this.setState({ loading: true })
        this.getRatedMovies()
      } else {
        this.setState({ loading: true })
        this.getMovies(this.state.value)
      }
    }
    if (this.state.value !== prevState.value) {
      this.setState({ page: 1 })
      this.setState({ loading: true })
      this.getMovies(this.state.value, this.state.page)
    }

    if (this.state.isRated !== prevState.isRated) {
      if (this.state.isRated) {
        this.setState({ page: 1 })
        this.setState({ loading: true })
        this.getRatedMovies()
      } else {
        this.setState({ loading: true })
        this.getMovies(this.state.value)
      }
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
    genres: [],
  }

  getMovies = (query) => {
    this.moviesApiService
      .SearchMoviesApi(query, this.state.page)
      .then((res) => {
        this.setState(() => {
          const arrMovies = res.results.map(
            ({ id, poster_path, title, release_date, overview, vote_average, genre_ids }) => {
              return this.createMovie(id, poster_path, title, release_date, overview, vote_average, genre_ids)
            }
          )
          return { movies: arrMovies, loading: false, isError: false }
        })
        this.setState({ total_pages: res.total_pages })
      })
      .catch((error) => this.setState({ isError: true, loading: false, messageError: error.message }))
  }

  getRatedMovies = () => {
    this.moviesApiService
      .getRatedMovies()
      .then((res) => {
        this.setState(() => {
          const arrMovies = res.results.map(
            ({ id, poster_path, title, release_date, overview, vote_average, genre_ids }) => {
              return this.createMovie(id, poster_path, title, release_date, overview, vote_average, genre_ids)
            }
          )
          return { ratedMovies: arrMovies, loading: false, isError: false }
        })
        this.setState({ total_pages: res.total_pages })
      })
      .catch((error) => this.setState({ isError: true, loading: false, messageError: error.message }))
  }

  createMovie = (id, poster_path, title, release_date, overview, vote_average, genre_ids) => {
    return {
      id,
      poster_path: `${this.moviesApiService.baseImgUrl}${poster_path}`,
      title,
      release_date,
      overview,
      vote_average,
      genre_ids,
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
      <GenreContext.Provider value={this.state.genres}>
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
      </GenreContext.Provider>
    )
  }
}
