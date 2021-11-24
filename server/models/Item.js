const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    //数据库会把图片上传到一个地址，然后数据库保存图片地址
    icon:{type:String}
})

module.exports = mongoose.model('Item',schema)