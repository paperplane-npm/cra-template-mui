import { Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/** 首页 */
export default function HomePage(): RC {
  const navigate = useNavigate()

  return (
    <div>
      <p>我是首页</p>

      <div>
        <Stack spacing={1}>
          <Button onClick={() => void navigate('/check/check-zustand')} variant="contained">
            点我去 zustand 测试页
          </Button>

          <Button onClick={() => void navigate('/check/check-emotion')} variant="contained">
            点我去 emotion 测试页
          </Button>

          <Button onClick={() => void navigate('/check/check-sass')} variant="contained">
            点我去 sass 测试页
          </Button>

          <Button onClick={() => void navigate('/check/check-less')} variant="contained">
            点我去 less 测试页
          </Button>

          <Button onClick={() => void navigate('/check/check-twcss')} variant="contained">
            点我去 tailwindcss 测试页
          </Button>

          <Button onClick={() => void navigate('/check/check-toast')} variant="contained">
            点我去 toast 测试页
          </Button>

          <Button onClick={() => void navigate('/check/check-request')} variant="contained">
            点我去 request 测试页
          </Button>
        </Stack>
      </div>
    </div>
  )
}
