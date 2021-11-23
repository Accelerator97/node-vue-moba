const express = require("express")

const app = express()

//把跨域模块cors引入
app.use(require('cors')())
app.use(express.json())

//引用进来是一个函数需要执行，向这个函数传入app作为参数
require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3000,()=>{
    console.log('开启3000端口')
})