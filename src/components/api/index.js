export default class MoviesApiService {
  constructor() {
    if (localStorage.guestSessionId) {
      this.guestSessionId = localStorage.guestSessionId
    } else {
      this.getGuestSessionId().then((res) => localStorage.setItem('guestSessionId', res.guest_session_id))
    }
  }

  _baseUrl = 'https://api.themoviedb.org/3/'
  _apiKey = '9e6db05c9e88c5afa69666860fbb151e'
  baseImgUrl = 'https://image.tmdb.org/t/p/original'

  getGuestSessionId = async () => {
    try {
      if (!window.navigator.onLine) throw new Error('You are Offline')
      const res = await fetch(`${this._baseUrl}authentication/guest_session/new?api_key=${this._apiKey}`)
      const body = await res.json()
      return body
    } catch (error) {
      throw new Error(error.message)
    }
  }

  sendRateMovie = async (movie_id, value) => {
    try {
      if (!window.navigator.onLine) throw new Error('You are Offline')
      const res = await fetch(
        `${this._baseUrl}movie/${movie_id}/rating?api_key=${this._apiKey}&guest_session_id=${this.guestSessionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({ value }),
        }
      )
      const body = await res.json()
      return body
    } catch (error) {
      throw new Error(error.message)
    }
  }

  getRatedMovies = async (page = 1) => {
    try {
      if (!window.navigator.onLine) throw new Error('You are Offline')
      const res = await fetch(
        `${this._baseUrl}guest_session/${this.guestSessionId}/rated/movies?api_key=${this._apiKey}&${page}`
      )
      const body = await res.json()
      return body
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
      const body = await res.json()
      return await body
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
