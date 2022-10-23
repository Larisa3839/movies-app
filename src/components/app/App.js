import './App.css'
import MoviesList from '../MoviesList'
import SeacrhPanel from '../SearchPanel'
import PaginationElement from '../Pagination'

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="menu">
          <span className="active">Search</span>
          <span>Rated</span>
        </div>
        <SeacrhPanel />
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
