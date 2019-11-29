const koa = require('koa')
const fs = require('fs')
const mount = require('koa-mount') //处理路由
const static = require('koa-static') //处理静态文件
const cors = require('koa-cors')// 处理跨域

const app = new koa()

app.use(static(__dirname + '/source/'))
app.use(cors());

app.use(
  mount('/get2step', async ctx => {
    ctx.body = 0
  })
)


app.use(
  mount('/login', async ctx => {

    let login = {
      "id": "Fea6BACF-7737-CE7b-9eBd-ec323B7ac232",
      "name": "Thomas Taylor",
      "username": "admin",
      "password": "",
      "avatar": "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",
      "status": 1,
      "telephone": "",
      "lastLoginIp": "27.154.74.117",
      "lastLoginTime": 1534837621348,
      "creatorId": "admin",
      "createTime": 1497160610259,
      "deleted": 0,
      "roleId": "admin",
      "lang": "zh-CN",
      "token": "4291d7da9005377ec9aec4a71ea837f"
    }



    ctx.body = login
  })
)


app.use(
  mount('/dowload', async ctx => {
    ctx.body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
  })
)




app.listen(3000)
