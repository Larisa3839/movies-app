import React, { Component } from 'react'
import { Col, Row, Alert } from 'antd'

import Movie from '../Movie/Movie'
import Spiner from '../Spiner'
import ErrorComponent from '../ErrorComponent/ErrorComponent'
import './MoviesList.css'

export default class MoviesList extends Component {
  render() {
    const { dataMovies, loading, isError, messageError } = this.props
    const hasData = !(loading || isError)
    const errorMessage = isError ? <ErrorComponent message={messageError} /> : null
    const infoMessage = dataMovies.length === 0 ? <Alert message="No data on request" type="info" /> : null
    const spiner = loading ? <Spiner /> : null

    if (hasData && dataMovies.length !== 0) {
      const elements = dataMovies.map((item) => (
        <Col key={item.id} className="gutter-row" span={12}>
          <Movie {...item} />
        </Col>
      ))
      return <Row gutter={[36, 36]}>{elements}</Row>
    }

    return errorMessage || spiner || infoMessage
  }
}
