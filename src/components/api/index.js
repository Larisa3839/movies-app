const SearchMoviesApi = async (query = 'return', page = 1) => {
  try {
    const _baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=9e6db05c9e88c5afa69666860fbb151e&language=en-US&query=${query}&page=${page}&include_adult=false`

    if (!window.navigator.onLine) {
      throw new Error('You are Offline')
    }
    const res = await fetch(_baseUrl)
    if (!res.ok) throw new Error(`Could not fetch ${_baseUrl} ${res.status}`)
    const body = await res.json()
    return await body
  } catch (error) {
    return error
  }
}

export default SearchMoviesApi
