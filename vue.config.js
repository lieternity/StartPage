const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pwa: {
        importWorkboxFrom: 'local',
        assetsVersion: "0.1",
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            skipWaiting: true,
            clientsClaim: true,
            navigateFallback: '/index.html',
            exclude: [/\.(?:map)$/],
        },
    },


})
