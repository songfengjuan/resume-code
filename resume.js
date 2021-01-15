console.log(1)
setTimeout(() => {
    console.log(2);
    Promise.resolve().then(data=>{
        console.log(3);
    });
}, 0);
new Promise((resolve)=>{
    resolve();
    console.log(4);

}).then(()=>{
    console.log(5);
    setTimeout(() => {
        console.log(6)
    }, 0);
}).then(()=>{
    console.log(7)
})
console.log(8)





var nickName = 'lilei'
function Person(name){
    this.nickName = name;
    this.sayHi = function(){
        console.log(this.nickName);
        setTimeout(() => {
            console.log(this.nickName);
            
        }, 0);
    }
}
var Male = {
    nickName:'xiaofang',
    sayHi:()=>{
        console.log(this.nickName);
    }
}

var person = new Person.bind(Male,'xiaohong')
person.sayHi()