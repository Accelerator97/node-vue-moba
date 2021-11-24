module.exports = app => {
    const express = require('express')
    //子路由，最后会挂到admin/api/rest/:resource后面
    //mergeParams表示子路由继承父路由的参数,即在子路由里获取前端传递过来的参数:resource
    const router = express.Router({
        mergeParams:true
    })
    router.post('/', async (req, res) => {
        //用req.Model的create方法创建数据，数据来源是客户端提交过来的数据
        //req.body要想使用，必须在根目录的index.js加上中间件express.json
        const model = await req.Model.create(req.body)
        //把model发送回客户端，通知客户端创建完成
        res.send(model)
    })
    router.put('/:id', async (req, res) => {
        //根据id更新id名称
        const items = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(items)
    })
    router.get('/', async (req, res) => {
        let queryOptions = {};
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent';
        }
        //返回10条数据给前端
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    app.use('/admin/api/rest/:resource',async(req,res,next)=>{
        //把前端传递过来的资源名称转为模型名称，在请求对象上挂载一个model
        //再调用next方法进行路由拼接
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    } ,router)

    const multer = require('multer')
    //__dirname表示绝对路径，表示当前文件所在的文件夹 上传到哪个文件夹
    const upload = multer({dest:__dirname + '/../../uploads'})
    //upload.single接受单个文件上传
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{ 
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}