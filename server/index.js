const express = require("express")

const app = express()

app.set('secret','asdad1dasdafjlkj8')
//把跨域模块cors引入
app.use(require('cors')())
app.use(express.json())
//托管静态文件，可以让uploads里面的内容通过/uploads来访问
app.use('/uploads',express.static(__dirname + '/uploads'))

//引用进来是一个函数需要执行，向这个函数传入app作为参数
require('./routes/admin')(app)
require('./routes/web')(app)
require('./plugins/db')(app)


app.listen(3000,()=>{
    console.log('开启3000端口')
})