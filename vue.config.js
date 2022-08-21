const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    productionSourceMap:false,
    pwa: {
        importWorkboxFrom: 'local',
        assetsVersion: "0.2",
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            skipWaiting: true,
            clientsClaim: true,
            navigateFallback: '/index.js.html',
            exclude: [/\.(?:map)$/],
        },
    },
    devServer: {
        port: 8080,
        proxy: {
            "/api": {
                target: 'https://sm.ms',
                changeOrigin: true,
                secure: false,
                headers: {
                    Referer: 'https://sm.ms'
                }
            },
        }
    }


})
