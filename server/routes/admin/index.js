module.exports = app => {
    const express = require('express')
    //子路由，最后会挂到admin/api后面
    const router = express.Router()

    app.use('/admin/api',router)
}