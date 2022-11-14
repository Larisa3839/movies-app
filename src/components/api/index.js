export default class MoviesApiService {
  constructor() {
    this.guestSessionId = this.getGuestSessionId()
  }

  _baseUrl = 'https://api.themoviedb.org/3/'
  _apiKey = '9e6db05c9e88c5afa69666860fbb151e'
  baseImgUrl = 'https://image.tmdb.org/t/p/original'

  createGuestSessionId = async () => {
    try {
      if (!window.navigator.onLine) throw new Error('You are Offline')
      const res = await fetch(`${this._baseUrl}authentication/guest_session/new?api_key=${this._apiKey}`)
      const body = await res.json()
      localStorage.setItem('guestSessionId', body.guest_session_id)
      return body.guest_session_id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  getGuestSessionId = async () => {
    if (localStorage.guestSessionId) return localStorage.guestSessionId
    return await this.createGuestSessionId()
  }

  sendRateMovie = async (movie_id, value) => {
    try {
      if (!window.navigator.onLine) throw new Error('You are Offline')
      const res = await fetch(
        `${this._baseUrl}movie/${movie_id}/rating?api_key=${this._apiKey}&guest_session_id=${await this
          .guestSessionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({ value }),
        }
      )
      return await res.json()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  getRatedMovies = async (page = 1) => {
    try {
      if (!window.navigator.onLine) throw new Error('You are Offline')
      const res = await fetch(
        `${this._baseUrl}guest_session/${await this.guestSessionId}/rated/movies?api_key=${this._apiKey}&${page}`
      )
      return await res.json()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  getRatingById = async (id) => {
    try {
      const movieList = await this.getRatedMovies()
      const rating = movieList.results.find((movie) => movie.id === id)
      return rating ? rating.rating : 0
    } catch (error) {
      throw new Error(error.message)
    }
  }

  getGenreMovieList = async () => {
    try {
      if (!window.navigator.onLine) throw new Error('You are Offline')
      const res = await fetch(`${this._baseUrl}genre/movie/list?api_key=${this._apiKey}`)
      const body = await res.json()
      return body.genres
    } catch (error) {
      throw new Error(error.message)
    }
  }

  SearchMoviesApi = async (query, page = 1) => {
    try {
      if (!window.navigator.onLine) throw new Error('You are Offline')
      const res = await fetch(`${this._baseUrl}search/movie?api_key=${this._apiKey}&query=${query}&page=${page}`)
      if (!res.ok) throw new Error(`Could not fetch ${this._baseUrl} ${res.status}`)
      return await res.json()
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
