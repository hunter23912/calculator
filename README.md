# 自实现计算器

## 几个组件

- 5 种操作
  - add_digit
  - delete digit
  - choose operator
  - clear
  - evaluate
- 3 种状态
  - current-operand
  - last-operand
  - operator

## 前端页面部署方式

```shell
pnpm run build
```

- 在`build`下就是所有前端内容。
- 将对应的`html`,`css`,`js`放到`django`项目下的`static`的`css`和`js`下。
- 添加一个`view`路由即可。
