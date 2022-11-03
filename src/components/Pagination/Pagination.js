import { Pagination } from 'antd'
import './Pagination.css'

const PaginationElement = ({ pageChange, totalPages }) => (
  <Pagination size="small" defaultCurrent total={totalPages * 10} onChange={pageChange} />
)

export default PaginationElement
