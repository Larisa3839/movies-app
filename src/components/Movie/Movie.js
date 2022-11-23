/* eslint-disable indent */
import './Movie.css'
import { Rate, Typography, Col, Row } from 'antd'
import intlFormat from 'date-fns/intlFormat'
import { Component } from 'react'

import GenreContext from '../../context/GenreContext/GenreContext'
import MoviesApiServiceContext from '../../context/MoviesApiContext/MoviesApiServiceContext'
import Poster from '../Poster'

const { Title, Text, Paragraph } = Typography
const _maxLenhth = 150

const cutText = (text, length) => {
  if (text.length <= length) return text
  const subString = text.substring(0, length + 1)
  return subString.substring(0, subString.lastIndexOf(' ')) + '...'
}

export default class Movie extends Component {
  componentDidMount() {
    this.getRating(this.props.id)
    return () => this.setState({ loading: false })
  }

  state = {
    rating: null,
  }

  moviesApiService = this.context

  getColor = (value) => {
    if (value >= 0 && value < 3) return '#E90000'
    if (value >= 3 && value < 5) return '#E97E00'
    if (value >= 5 && value < 7) return '#E9D100'
    if (value >= 7) return '#66E900'
    return ''
  }

  getGenres = (genres) => {
    const { genre_ids } = this.props
    return genres.map((item) => {
      if (genre_ids.some((id) => id === item.id)) return item.name
    })
  }

  sendRate = (rate, id) => {
    this.moviesApiService.sendRateMovie(id, rate)
    this.setState({ rating: rate })
  }

  getRating = (id) => {
    this.moviesApiService.getRatingById(id).then((res) => this.setState({ rating: res }))
  }

  render() {
    const { id, poster_path, title, release_date, overview, vote_average } = this.props
    const date = release_date
      ? intlFormat(
          new Date(release_date),
          {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          },
          {
            locale: 'en-US',
          }
        )
      : null
    return (
      <div className="movies-list__item">
        <Poster posterPath={poster_path} />
        <div className="item-info">
          <Row wrap={false} align="top">
            <Col flex="auto">
              <Title className="item-info__title">{title}</Title>
            </Col>
            <Col flex="30px">
              <span style={{ borderColor: this.getColor(vote_average) }} className="vote-average">
                {vote_average.toFixed(1)}
              </span>
            </Col>
          </Row>
          <Text type="secondary" className="item-info__data">
            {date}
          </Text>
          <GenreContext.Consumer>
            {(genres) => {
              const genreButton = this.getGenres(genres).map((item) => {
                if (item)
                  return (
                    <button key={item} type="button">
                      {item}
                    </button>
                  )
              })
              return <div className="item-info__buttons">{genreButton}</div>
            }}
          </GenreContext.Consumer>
          <Paragraph className="item-info__description">{cutText(overview, _maxLenhth)}</Paragraph>
          <Rate count={10} value={this.state.rating} onChange={(rate) => this.sendRate(rate, id)} />
        </div>
      </div>
    )
  }
}

Movie.contextType = MoviesApiServiceContext
