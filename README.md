# webpack-learn
webpack5.x+ 学习

## 打包说明：

打包时将复制public目录到dist目录下

   开发dev
      编译less文件， PostCSS给css添加前缀， 抽离css，
       使用babel将js转成es5
       devtool: 'inline-source-map',
       devServer
   线上build
        编译less文件，PostCSS给css添加前缀，抽离css，压缩css
        使用babel将js转成es5，压缩js，并抽离公共模块js
   

## [漫谈 webpack](https://zhuanlan.zhihu.com/p/511770560)
module、chunk 和 bundle 其实就是同一份代码在不同转换场景取的三个名称。我们编写的是 module，webpack 处理时是 chunk，最终生成供浏览器允许的是 bundle。