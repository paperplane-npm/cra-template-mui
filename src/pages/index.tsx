import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

/** 首页 */
export default function HomePage(): RC {
  return (
    <div>
      我是首页
      <Link to="/user">
        <Button variant="contained">点我去用户页</Button>
      </Link>
    </div>
  )
}
