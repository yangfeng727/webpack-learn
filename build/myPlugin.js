// 自定义插件
function myPlugin(param) {
    this.param = param
}

myPlugin.prototype.apply = function (compiler) {
    console.log(this.param, '参数')
    // compiler.plugin('compilation', function(compilation) {
    //
    // });
}
module.exports = myPlugin