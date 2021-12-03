module.exports = app => {
    const router = require('express').Router()

    //通过mogoose引用模型
    const mongoose = require('mongoose')
    mongoose.model.Category = require('../../models/Category')
    mongoose.model.Article = require('../../models/Article')
    mongoose.model.Hero = require('../../models/Hero')
    mongoose.model.Item = require('../../models/Item')
    mongoose.model.Strategy = require('../../models/Strategy')
    mongoose.model.Ad = require('../../models/Ad')
    let Category = mongoose.model.Category,
        Article = mongoose.model.Article,
        Hero = mongoose.model.Hero,
        Item = mongoose.model.Item,
        Strategy = mongoose.model.Strategy,
        Ad = mongoose.model.Ad

    //前端web的新闻接口，http://localhost:3000/web/api/news/list可以看到接口的数据
    router.get('/news/list', async (req, res) => {
        //设置顶级分类
        const parent = await Category.findOne({
            name: "新闻分类"
        })

        //aggregate 聚合查询
        const cats = await Category.aggregate([
            //过滤数据
            { $match: { parent: parent._id } },
            //关联查询
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            //每个newsList只要5条数据
            {
                $addFields: {
                    'newsList': { $slice: ['$newsList', 5] }
                }
            }
        ])
        //热门
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate('categories').limit(5).lean()
        })

        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
            })
            return cat
        })
        res.send(cats)
    })

    //英雄列表接口
    router.get('/heroes/list', async (req, res) => {
        //设置顶级分类
        const parent = await Category.findOne({
            name: "英雄分类"
        })

        const cats = await Category.aggregate([
            //过滤数据
            { $match: { parent: parent._id } },
            //关联查询
            {
                $lookup: {
                    from: 'heroes',
                    localField: '_id', //本地字段
                    foreignField: 'categories',//外界字段
                    as: 'heroesList'
                }
            },
        ])
        //热门
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            heroesList: await Hero.find().where({
                categories: { $in: subCats }
            }).limit(10).lean()
        })

        res.send(cats)
    })

    //新闻、文章（图文攻略）详情接口
    router.get('/artilces/:id', async (req, res) => {
        const data = await Article.findById(req.params.id).lean()
        data.related = await Article.find().where({
            categories: { $in: data.categories },
            title: { $ne: data.title }
        }).limit(2)
        res.send(data)
    })

    //英雄详情接口
    router.get('/heroes/:id', async (req, res) => {
        //populate关联查询，把categories相关的数据都返回给前端
        const data = await Hero.findById(req.params.id).populate('categories items1 items2 partners.hero').lean()
        res.send(data)
    })

    //视频列表接口
    router.get('/strategy/list', async (req, res) => {
        // 设置顶级分类
        const parent = await Category.findOne({
            name: "视频分类"
        })
        const cats = await Category.aggregate([
            // 过滤数据
            { $match: { parent: parent._id } },
            //关联查询
            {
                $lookup: {
                    from: 'strategies', //模型的第三个参数，默认为模型名的小写复数形式，也可以自己指定
                    localField: '_id', //本地字段
                    foreignField: 'categories',//外界字段
                    as: 'videoList'
                }
            },
            //每个videoList只要5条数据
            {
                $addFields: {
                    'videoList': { $slice: ['$videoList', 4] }
                }
            }
        ])
        // let cats = await Strategy.find().populate('cate')
        res.send(cats)
    })

    router.get('/ads/list', async (req, res) => {
        const data = await Ad.find()
        res.send(data)
    })

    // 热门视频接口
    router.get('/strategy/hotvideos', async (req, res) => {

        const data_1 = await Strategy.find().collation({ "locale": "zh", numericOrdering: true }).sort({ play_volume: -1 }).skip(30).limit(10)
        const data_2 = await Strategy.find().collation({ "locale": "zh", numericOrdering: true }).sort({ play_volume: -1 }).skip(20).limit(10)
        const data_3 = await Strategy.find().collation({ "locale": "zh", numericOrdering: true }).sort({ play_volume: -1 }).skip(10).limit(10)
        const data = [[...data_1], [...data_2], [...data_3]]
        const _data = ['日', '周', '月'].map((item, i) => {
            return {
                name: item,
                data: data[i]
            }
        })
        res.send(_data)
    })

    //英雄攻略-targetHeroList 接口
    router.get('/strategy/targetheroes', async (req, res) => {
        const data = []
        const heroes = await Hero.find({ name: { $in: ['后羿', '孙悟空', '铠', '孙尚香', '梦奇', '赵云'] } })
        heroes.forEach(hero => {
            if (hero.name === '后羿') data[0] = hero
            if (hero.name === '孙悟空') data[1] = hero
            if (hero.name === '铠') data[2] = hero
            if (hero.name === '孙尚香') data[3] = hero
            if (hero.name === '梦奇') data[4] = hero
            if (hero.name === '赵云') data[5] = hero
        })
        res.send(data)
    })


    // 英雄攻略接口 针对单个英雄获取攻略
    router.get('/strategy/hero_strategies/:id', async (req, res) => {
        const hero = await Hero.findById(req.params.id).populate('categories').lean()

        const videos = await Strategy.find({
            hero: { $elemMatch: { $eq: hero._id } },
            play_volume: { $exists: true }
        }).limit(2) 

        const graphics = await Strategy.find({
            hero: { $elemMatch: { $eq: hero._id } },
            play_volume: undefined
        }).limit(2)

        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        hero.appearance_rank = num1
        hero.win_rate_rank = num2
        hero.videos = videos
        hero.graphics = graphics

        res.send(hero)
    })

    router.get('/race/information', async (req, res) => {
          
        if (req.query.id && req.query.pageNum) {

            const skipNum = 10 * (req.query.pageNum)
            const data = await Article.find().skip(skipNum).limit(10)
            res.send(data)
      
          } else {
      
            const parent = await Category.findOne({ name: "赛事中心" })
            const cetes = await Category.aggregate([
              { $match: { parent: parent._id } },
              {
                $lookup: {
                  from: "articles",
                  localField: "_id",
                  foreignField: "categories",
                  as: "information_list"
                }
              },
              {
                $addFields: {
                  information_list: { $slice: ['$information_list', 10] }
                }
              }
            ])
      
            res.send(cetes)
      
          }
    
        })
    
     

    app.use('/web/api', router)
}
