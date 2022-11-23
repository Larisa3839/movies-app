export default class MoviesApiService {
  constructor() {
    this.guestSessionId = this.createGuestSessionId()
  }

  _baseUrl = 'https://api.themoviedb.org/3/'
  _apiKey = '9e6db05c9e88c5afa69666860fbb151e'

  getData = async (url) => {
    try {
      if (!window.navigator.onLine) throw new Error('You are Offline')
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Could not fetch ${this._baseUrl} ${res.status}`)
      return await res.json()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  postData = async (url, value) => {
    try {
      if (!window.navigator.onLine) throw new Error('You are Offline')
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value }),
      })
      if (!res.ok) throw new Error(`Could not fetch ${url} ${res.status}`)
      return await res.json()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  createGuestSessionId = async () => {
    const url = `${this._baseUrl}authentication/guest_session/new?api_key=${this._apiKey}`
    const body = await this.getData(url)
    return body.guest_session_id
  }

  getGuestSessionId = async () => {
    return await this.guestSessionId
  }

  setGuestSessionId = (id) => {
    this.guestSessionId = id
  }

  sendRateMovie = async (movie_id, value) => {
    const url = `${this._baseUrl}movie/${movie_id}/rating?api_key=${this._apiKey}&guest_session_id=${await this
      .guestSessionId}`
    return await this.postData(url, value)
  }

  getRatedMovies = async (page = 1) => {
    const url = `${this._baseUrl}guest_session/${await this.guestSessionId}/rated/movies?api_key=${
      this._apiKey
    }&${page}`
    return await this.getData(url)
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
    const url = `${this._baseUrl}genre/movie/list?api_key=${this._apiKey}`
    const body = await this.getData(url)
    return body.genres
  }

  SearchMoviesApi = async (query, page = 1) => {
    const url = `${this._baseUrl}search/movie?api_key=${this._apiKey}&query=${query}&page=${page}`
    return await this.getData(url)
  }
}
