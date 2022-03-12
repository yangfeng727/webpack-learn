module.exports = {
    presets: [
        [
            '@babel/preset-env', {
                "useBuiltIns": "usage",
                // "debug": true,
                "corejs":"3.21.1"
            }
        ]
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime', {
                "corejs": 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
            }
        ]
    ]
}