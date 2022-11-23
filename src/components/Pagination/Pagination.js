import { Pagination } from 'antd'
import './Pagination.css'

const PaginationElement = ({ current, pageChange, totalPages }) => (
  <Pagination current={current} size="small" defaultCurrent total={totalPages * 10} onChange={pageChange} />
)

export default PaginationElement
