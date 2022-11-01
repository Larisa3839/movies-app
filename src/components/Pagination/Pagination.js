import { Pagination } from 'antd'
import './Pagination.css'

const PaginationElement = ({ pageChange, totalPages }) => (
  <>
    <Pagination size="small" total={totalPages} onChange={pageChange} />
  </>
)

export default PaginationElement
