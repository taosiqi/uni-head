module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:process.env.VUE_APP_BASE_API,
                changeOrigin:true,
                ws: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}