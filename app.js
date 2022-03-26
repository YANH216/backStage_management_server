const express = require('express');

const mongoose = require('mongoose');

const port = 5000

const app = express()

app.use(express.static('public'))

// 解析x-www-form-urlencoded 类型数据
app.use(express.urlencoded({ extended: false }))

// 解析json类型数据
app.use(express.json())


// 封装res.send  简化代码 
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    // status默认值为1, 表示是失败情况
    // err的值，可能是一个错误的对象，可能是一个错误的描述字符串
    res.send({
      status,
      msg: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 配置解析token的中间件
const expressJwt = require('express-jwt')
const { jwtSecretKey } = require('./config/tokenConf')

app.use(expressJwt({
  secret: jwtSecretKey,
  algorithms: ['HS256']
}).unless({ path: [/^\/login/] }))

// 导入用户路由模块
const userRouter = require('./routers/user')
app.use(userRouter)

// 导入分类路由模块
const categoryRouter = require('./routers/category')
app.use(categoryRouter)

// 导入产品路由模块
const productRouter = require('./routers/product')
app.use(productRouter)

// 导入角色路由模块
const roleRouter = require('./routers/role')
app.use(roleRouter)


// 错误级别中间件
const Joi = require('joi')
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof Joi.ValidationError)
    return res.cc(err)
  // 身份认证
  if (err.name === 'UnauthorizedError')
    return res.cc('身份认证失败')
  // 未知错误
  res.cc(err)
})


mongoose.connect('mongodb://localhost/server_db2').then(() => {
  console.log('链接数据库成功！')
  app.listen(port, () => {
    console.log(`server running at 127.0.0.1:${port}`)
  })
}).catch(err => {
  console.log('链接数据库失败', err)
})