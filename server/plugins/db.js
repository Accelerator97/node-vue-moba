module.exports = app => {
    const mongoose = require('mongoose')

    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
        usrNewUrlParser:true
    })
      
    //把models的全部模型引用一次
    // require('require-all')(__dirname + '/../models');
}