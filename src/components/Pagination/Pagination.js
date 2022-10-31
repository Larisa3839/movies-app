import { Pagination } from 'antd'
import './Pagination.css'

const PaginationElement = ({ pageChange }) => (
  <>
    <Pagination size="small" total={50} onChange={pageChange} />
  </>
)

export default PaginationElement
