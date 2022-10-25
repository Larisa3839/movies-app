import './App.css'
import { Input } from 'antd'

import MoviesList from '../MoviesList'
import PaginationElement from '../Pagination'
import NavMenu from '../NavMenu'

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="menu">
          <NavMenu />
        </div>
        <Input placeholder="Type to search..." />
      </header>
      <section className="main">
        <MoviesList />
      </section>
      <footer className="footer">
        <PaginationElement />
      </footer>
    </div>
  )
}

export default App
