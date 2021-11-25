const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{type:String},
    //type表示数据类型，ref表示关联到哪个模型
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    body:{type:String}
})

module.exports = mongoose.model('Article',schema)