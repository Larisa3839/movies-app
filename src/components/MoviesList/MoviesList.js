//import React, { Component } from 'react'
import Movie from '../Movie/Movie'
import './MoviesList.css'

const MoviesList = () => {
  return (
    <ul className="movies-list">
      <li>
        <Movie />
      </li>
      <li>
        <Movie />
      </li>
      <li>
        <Movie />
      </li>
      <li>
        <Movie />
      </li>
      <li>
        <Movie />
      </li>
      <li>
        <Movie />
      </li>
    </ul>
  )
}

export default MoviesList
