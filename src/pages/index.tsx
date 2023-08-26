import { Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

/** 首页 */
export default function HomePage(): RC {
  return (
    <div>
      <p>我是首页</p>

      <div>
        <Stack spacing={1}>
          <Link to="/check-zustand">
            <Button variant="contained">点我去 zustand 测试页</Button>
          </Link>

          <Link to="/check-emotion">
            <Button variant="contained">点我去 emotion 测试页</Button>
          </Link>

          <Link to="/check-sass">
            <Button variant="contained">点我去 sass 测试页</Button>
          </Link>

          <Link to="/check-toast">
            <Button variant="contained">点我去 toast 测试页</Button>
          </Link>

          <Link to="/check-request">
            <Button variant="contained">点我去 request 测试页</Button>
          </Link>
        </Stack>
      </div>
    </div>
  )
}
