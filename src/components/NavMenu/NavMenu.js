import './NavMenu.css'
import { Tabs } from 'antd'

const NavMenu = ({ changeNavPage }) => {
  const items = [
    { label: 'Search', key: 'Search' },
    { label: 'Rated', key: 'Rated' },
  ]
  return <Tabs defaultActiveKey="1" items={items} onChange={changeNavPage} />
}

export default NavMenu
