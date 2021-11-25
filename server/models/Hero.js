const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    //数据库会把图片上传到一个地址，然后数据库保存图片地址
    avatar: { type: String },
    //有时候一个英雄不止一个分类，可能是刺客和法师同时具备，写成数组形式一个英雄关联多个分类
    categories: [{ type:mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    title:{type:String},
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String}
    }],
    //顺风出装
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    //逆风出装
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description:{type:String}
    }]
})

module.exports = mongoose.model('Hero', schema)