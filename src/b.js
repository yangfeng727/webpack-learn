class Animal{
    constructor(name){
        this.name = name
    }
    sayName(){
        alert('我的名字是:'+ this.name)
    }
}

var cat = new Animal('小猫')
cat.sayName()