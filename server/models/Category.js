const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    //type表示数据类型，ref表示关联到哪个模型
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
})

module.exports = mongoose.model('Category',schema)