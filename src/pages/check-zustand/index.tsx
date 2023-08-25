import { Button } from '@mui/material'

import { useUserStore } from '@/services/user'

/** 用户页面 */
export default function CheckZustand(): RC {
  const userStore = useUserStore()

  const signInHandler = () => {
    userStore.signIn({ id: 'user1', name: 'Test User' })
  }

  return (
    <div>
      我是 zustand 测试页（能正常登录、后退用户名不消失，表示 zustand 正常工作）
      <Button onClick={signInHandler} variant="contained">
        点我登录
      </Button>
    </div>
  )
}
