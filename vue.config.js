module.exports = {
    devServer: {
        // 进行反向代理
        proxy: {
            // 此代理的接口是关于我的页面的
            '/api2': {
                target: 'http://localhost:3000',
                changeOrigin: true //是否要改变代理
            },

            '/api': {
                target: 'http://localhost:8082',
                changeOrigin: true //是否要改变代理
            },
        },
        // public: '192.168.43.208:8081',
    },

    //分模式修改，若为生产模式，则指定基础路径的根目录为'/'，否则为'/spider/'
    // publicPath:process.env.NODE_ENV==='production'?'/':'/spider/'   
    // 两个模式都为同一个
    // publicPath:'/spider/'


    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
    }
}