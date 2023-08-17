# FE-WEB-REACT-MUI

React（使用 cra 创建）、MUI（原 Material UI）。

UI 库使用 @mui/material；
引入了 `@mui/icons-material` 图标库、`@mui/lab` 复杂组件库、`@mui/x-date-pickers` 时间日期选择器。

cra 配置使用 `react-app-rewired`、`customize-cra`；
也可以换用 `craco`，但是配置会更为繁琐。

使用 emotion 来用做 CSS-In-JS 库，预处理使用 `sass`（注意不是 `node-sass`）。

使用到的工具：
路由：`react-router-dom`、`@loadable/component`；
请求：`axios`；
状态管理：`zustand`、`swr`；
时间日期：`date-fns`；
工具函数：`ahooks`、`lodash`。

