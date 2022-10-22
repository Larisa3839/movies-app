const SearchMoviesApi = async () => {
  const _baseUrl =
    'https://api.themoviedb.org/3/search/movie?api_key=9e6db05c9e88c5afa69666860fbb151e&language=en-US&query=return&page=1&include_adult=false'

  const res = await fetch(_baseUrl)
  const body = await res.json()
  return await body
}

export default SearchMoviesApi
