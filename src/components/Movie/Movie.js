/* eslint-disable indent */
import './Movie.css'
import { Rate, Typography, Image, Col, Row } from 'antd'
import intlFormat from 'date-fns/intlFormat'

const { Title, Text, Paragraph } = Typography
const _maxLenhth = 150

String.prototype.cutText = function (length) {
  if (this.length <= length) return this
  const subString = this.substring(0, length + 1)
  return subString.substring(0, subString.lastIndexOf(' ')) + '...'
}

const Movie = ({ poster_path, title, release_date, overview, vote_average }) => {
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
      <Image className="item-image" src={poster_path} />
      <div className="item-info">
        <Row wrap={false} align="top">
          <Col flex="auto">
            <Title className="item-info__title">{title}</Title>
          </Col>
          <Col flex="30px">
            <span className="vote-average">{vote_average}</span>
          </Col>
        </Row>

        <Text type="secondary" className="item-info__data">
          {date}
        </Text>
        <div className="item-info__buttons">
          <button type="button">Action</button>
          <button type="button">Drama</button>
        </div>
        <Paragraph className="item-info__description">{overview.cutText(_maxLenhth)}</Paragraph>
        <Rate count={10} allowHalf defaultValue={vote_average} />
      </div>
    </div>
  )
}

export default Movie
