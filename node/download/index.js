const koa = require('koa')
const fs = require('fs')
const mount = require('koa-mount') //处理路由
const static = require('koa-static') //处理静态文件

const app = new koa()

app.use(static(__dirname + '/source/'))

app.use(
  mount('/', async ctx => {
    ctx.body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
  })
)

app.listen(3000)
