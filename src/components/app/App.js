import './App.css'
import { Input } from 'antd'
import React, { Component } from 'react'
import debounce from 'lodash.debounce'

import MoviesList from '../MoviesList'
import PaginationElement from '../Pagination'
import NavMenu from '../NavMenu'
import MoviesApiService from '../../api/movieApiService'
import GenreContext from '../../context/GenreContext/GenreContext'
import MoviesApiServiceContext from '../../context/MoviesApiContext/MoviesApiServiceContext'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      movies: [],
      ratedMovies: [],
      isRated: false,
      loading: true,
      isError: false,
      messageError: '',
      searchValue: '',
      page: 1,
      total_pages: null,
      genres: [],
    }

    this.moviesApiService = new MoviesApiService()
  }
  componentDidMount() {
    if (localStorage.guestSessionId) this.moviesApiService.setGuestSessionId(localStorage.guestSessionId)
    else this.moviesApiService.getGuestSessionId().then((res) => localStorage.setItem('guestSessionId', res))

    this.getMovies(this.state.searchValue)
    this.moviesApiService.getGenreMovieList().then((res) => this.setState({ genres: res }))
  }

  componentDidUpdate(prevProps, prevState) {
    this.pageСhangeСheck(prevState.page)
    this.searchValueСhangeСheck(prevState.searchValue)
    this.tabСhangeСheck(prevState.isRated)
  }

  pageСhangeСheck = (prevPage) => {
    if (this.state.page !== prevPage) {
      if (this.state.isRated) {
        this.setState({ loading: true })
        this.getRatedMovies()
      } else {
        this.setState({ loading: true })
        this.getMovies(this.state.searchValue)
      }
    }
  }

  searchValueСhangeСheck = (prevSearchValue) => {
    if (this.state.searchValue !== prevSearchValue) {
      this.setState({ page: 1 })
      this.setState({ loading: true })
      this.getMovies(this.state.searchValue, this.state.page)
    }
  }

  tabСhangeСheck = (prevTab) => {
    if (this.state.isRated !== prevTab) {
      if (this.state.isRated) {
        this.setState({ page: 1 })
        this.setState({ loading: true })
        this.getRatedMovies()
      } else {
        this.setState({ loading: true })
        this.getMovies(this.state.searchValue)
      }
    }
  }

  getMovies = (query) => {
    if (!query || !query.trim()) return this.setState({ movies: [], loading: false, isError: false, total_pages: 1 })
    this.moviesApiService
      .SearchMoviesApi(query, this.state.page)
      .then((res) => {
        this.setState(() => {
          const arrMovies = res.results.map(
            ({ id, poster_path, title, release_date, overview, vote_average, genre_ids }) => {
              return { id, poster_path, title, release_date, overview, vote_average, genre_ids }
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
              return { id, poster_path, title, release_date, overview, vote_average, genre_ids }
            }
          )
          return { ratedMovies: arrMovies, loading: false, isError: false }
        })
        this.setState({ total_pages: res.total_pages })
      })
      .catch((error) => this.setState({ isError: true, loading: false, messageError: error.message }))
  }

  handleChangeInput = (e) => {
    this.setState({ searchValue: e.target.value })
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
      <Input placeholder="Type to search..." onChange={debounce(this.handleChangeInput, 300)} />
    ) : null
    return (
      <MoviesApiServiceContext.Provider value={this.moviesApiService}>
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
              <PaginationElement
                current={this.state.page}
                pageChange={this.pageChange}
                totalPages={this.state.total_pages}
              />
            </footer>
          </div>
        </GenreContext.Provider>
      </MoviesApiServiceContext.Provider>
    )
  }
}
