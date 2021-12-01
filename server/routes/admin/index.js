module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    //子路由，最后会挂到admin/api/rest/:resource后面
    //mergeParams表示子路由继承父路由的参数,即在子路由里获取前端传递过来的参数:resource
    const router = express.Router({
        mergeParams:true
    })

    //1.创建资源
    router.post('/', async (req, res) => {
        //用req.Model的create方法创建数据，数据来源是客户端提交过来的数据
        //req.body要想使用，必须在根目录的index.js加上中间件express.json
        const model = await req.Model.create(req.body)
        //把model发送回客户端，通知客户端创建完成
        res.send(model)
    })

    //2.更新资源
    router.put('/:id', async (req, res) => {
        //根据id更新id名称
        const items = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(items)
    })

    //3.获取资源列表
    router.get('/',async (req, res) => {
        let queryOptions = {};
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent';
        }
        //返回100条数据给前端
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    //4.获取资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
     
    //登录校验中间件
    const authMiddleWare = require('../../middleware/auth.js')

    //获取模型中间件
    const resourceMiddleWare = require('../../middleware/resource')
   

    //5.删除资源
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
   
    //通用CRUD模型，有两个中间件，先判断用户的token，然后判断resource对应的模型
    app.use('/admin/api/rest/:resource',authMiddleWare(),resourceMiddleWare(),router)
    
    //6.上传文件
    const multer = require('multer')
    //__dirname表示绝对路径，表示当前文件所在的文件夹 上传到哪个文件夹
    const upload = multer({dest:__dirname + '/../../uploads'})
    //upload.single接受单个文件上传
    app.post('/admin/api/upload',authMiddleWare(),upload.single('file'),async(req,res)=>{ 
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    
    //7.登录
    app.post('/admin/api/login',async(req,res)=>{
        const {username,password} = req.body
        //1.根据用户名查找用户，查找username的时候把password也取出来
        const user = await AdminUser.findOne({username}).select('+password')
        assert(user,422,'用户不存在') //不存在抛出422状态码和错误信息，最后由错误处理函数来处理
         //2.校验密码
        const isValid =  require('bcryptjs').compareSync(password,user.password)
        assert(isValid,422,'密码错误')
        //3.返回token 要安装jsonwebtoken,根据用户的id生成一个token
        //在index.js设置全局变量secret
        const token = jwt.sign({id:user._id},app.get('secret'))
        res.send({token})
    })

    //错误处理函数
    app.use(async(err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}