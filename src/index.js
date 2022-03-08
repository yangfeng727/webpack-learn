import './css/index.css'
import './css/main.less'
import * as bjs from './b.js'
import * as $utils from './utils/common.js'
console.log('加载index.js文件', $utils.sayHello())

let myArr = [1,2,3]
let item = myArr.find(item=>item === 2)
console.log('find方法',item)


function test() {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({data:'返回值111'})
        },100)
    })
}

var myTest = async function () {
    let {data} = await test()
    console.log('promise返回值',data)
    const arr = [1,2,3,4].map(item => item * item)
    const hasNumber = (num) => [4, 5, 6, 7, 8].includes(num)
    console.log(arr)
    console.log( hasNumber(2))
}
myTest()