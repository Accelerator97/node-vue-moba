module.exports = app => {
    const router = require('express').Router()

    //通过mogoose引用模型
    const mongoose = require('mongoose')
    mongoose.model.Category = require('../../models/Category')
    mongoose.model.Article = require('../../models/Article')
    let Category = mongoose.model.Category,
        Article = mongoose.model.Article 

    //不是正式接口，而是通过JS把数据录入到后台，导入新闻
    router.get('/news/init', async (req, res) => {
        //lean()表示取纯粹的JS对象或者数组
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.find().where({ parent: parent }).lean()
        const newsTitles = [
            "嫦娥个性表情票选结果公布",
            "互动小任务第13期-嫦娥个性表情票选开启",
            "大神在线解答，金蝉超全攻略！",
            "2021创意互动周即将开启！源·梦新皮肤即将揭晓！",
            "狄某有话说 |镜：挂机但不止挂机 输也要争分夺秒",
            "嫦娥源·梦皮肤语音台词票选结果公布",
            "狄某有话说 | 人形“防御塔”姜子牙，只防下了队友的胜利",
            "孙尚香异界灵契新皮肤上线，快手三大主题活动精彩不断！",
            "孙尚香-异界灵契优化沟通【老亚瑟的答疑时间】",
            "嫦娥源·梦皮肤台词语音投票活动开启公告",
            "虎牙雷霆杯新玩法上线！看主播，KPL选手同台竞技",
            "斗鱼暖冬福利庆典，限时领取专属头像框",
            "狄某有话说 | 武则天：稳重才更符合女帝的姿态",
            "各路大神带你闯关峡谷",
            "后续皮肤优化计划公布【老亚瑟的答疑时间】",
            "嫦娥个性表情票选结果公布",
            "互动小任务第13期-嫦娥个性表情票选开启",
            "大神在线解答，金蝉超全攻略！",
            "2021创意互动周即将开启！源·梦新皮肤即将揭晓！",
            "狄某有话说 |镜：挂机但不止挂机 输也要争分夺秒",
            "嫦娥源·梦皮肤语音台词票选结果公布",
            "新英雄金蝉斗鱼独家攻略",
            "狄某有话说 | 人形“防御塔”姜子牙，只防下了队友的胜利",
            "孙尚香异界灵契新皮肤上线，快手三大主题活动精彩不断！",
            "孙尚香-异界灵契优化沟通【老亚瑟的答疑时间】",
            "11月27日体验服不停机更新公告",
            "11月26日登录异常恢复说明",
            "11月26日登录异常说明",
            "11月26日全服不停机更新公告",
            "11月25日心愿单系统维护说明",
            "11月25日全服不停机更新公告",
            "11月24日净化游戏环境声明及处罚公告",
            "11月24日外挂专项打击公告",
            "11月24日“演员”惩罚名单",
            "11月24日游戏内违规签名、攻略信息处罚公告",
            "11月24日挂车行为专项违规处罚公告",
            "11月23日体验服停机更新公告",
            "后续皮肤优化计划公布",
            "11月23日英雄平衡性调整丨铠、妲己增强，高渐离优化",
            "11月19日体验服停机更新公告"]
        const newsList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })
        await Article.deleteMany({})
        await Article.insertMany(newsList)
        res.send(newsList)

    })

    //前端web的新闻接口，http://localhost:3000/web/api/news/list可以看到接口的数据
    router.get('/news/list',async(req,res)=>{
        //设置顶级分类
        const parent = await Category.findOne({
            name:"新闻分类"
        })
        const cats = await Category.aggregate([
            //过滤数据
            {$match:{parent:parent._id}},
            //关联查询
            {$lookup:{
                from:'articles',
                localField:'_id',
                foreignField:'categories',
                as:'newsList'
            }},
            //每个newsList只要5条数据
            {
                $addFields:{
                    'newsList':{$slice:['$newsList',5]}
                }
            }
        ])
        //热门
        const subCats = cats.map(v=>v._id)
        cats.unshift({
            name:'热门',
            newsList:await Article.find().where({
                categories:{$in:subCats}
            }).populate('categories').limit(5).lean()
        })

        cats.map(cat=>{
            cat.newsList.map(news=>{
                news.categoryName = cat.name === '热门' ?news.categories[0].name :cat.name
            })
            return cat
        })
        res.send(cats)
    })

    app.use('/web/api', router)
}
