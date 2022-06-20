const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pwa: {
        name: 'My App',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        assetsVersion: "0.1",
        // configure the workbox plugin
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            // swSrc: './src/registerServiceWorker.js',
            // ...other Workbox options...
        }
    }

})
