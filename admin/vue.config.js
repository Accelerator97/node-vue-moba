const Components = require('unplugin-vue-components/webpack')

const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
    configureWebpack: {
        plugins: [
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ]
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/admin' : '/',
    outputDir: __dirname + '/../server/admin'
}