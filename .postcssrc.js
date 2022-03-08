module.exports = {
    plugins: [
        [
            'postcss-preset-env', // postcss-preset-env包含autoprefixer，因此可以不用安装autoprefixer了
            {
                // 其他选项
            },
        ],
    ],
};