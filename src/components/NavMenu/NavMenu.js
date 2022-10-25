import './NavMenu.css'
import { Menu } from 'antd'

const NavMenu = () => {
  const items = [
    { label: 'Search', key: 'Search' },
    { label: 'Rated', key: 'Rated' },
  ]
  return <Menu items={items} mode="horizontal" />
}

export default NavMenu
