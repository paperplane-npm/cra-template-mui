import { Button } from '@mui/material'
import { enqueueSnackbar, useSnackbar } from 'notistack'

export default function CheckToast(): RC {
  const { enqueueSnackbar: hooksShowToast } = useSnackbar()

  return (
    <div>
      <p>toast 测试页</p>
      <p>在 mui 中这个组件叫 Snackbar，而在其他组件库中一般叫做 message 或 toast</p>
      <p>mui 没有提供直接唤起的 API，必须用组件形式。因此我们使用 notistack 这个库来解决</p>

      <Button onClick={() => void hooksShowToast('你好！')}>
        点我唤起 Snackbar （Hooks 方式唤起）
      </Button>
      <Button onClick={() => void enqueueSnackbar('你好！', { variant: 'success' })}>
        点我唤起 Snackbar （API 方式唤起）
      </Button>
    </div>
  )
}
