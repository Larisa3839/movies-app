import './App.css'
import { Input } from 'antd'
import { Component } from 'react'
import debounce from 'lodash.debounce'

import MoviesList from '../MoviesList'
import PaginationElement from '../Pagination'
import NavMenu from '../NavMenu'

export default class App extends Component {
  state = {
    value: 'return',
    page: 1,
    total_pages: null,
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  pageChange = (page) => {
    this.setState({ page })
  }

  getTotalPages = (total_pages) => {
    this.setState({ total_pages })
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="menu">
            <NavMenu />
          </div>
          <Input placeholder="Type to search..." onChange={debounce(this.handleChange, 300)} />
        </header>
        <section className="main">
          <MoviesList query={this.state.value} page={this.state.page} getTotalPages={this.getTotalPages} />
        </section>
        <footer className="footer">
          <PaginationElement pageChange={this.pageChange} totalPages={this.state.total_pages} />
        </footer>
      </div>
    )
  }
}
