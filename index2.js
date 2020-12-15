
 /**
  * 箭头函数不能new
  */
function A(){
    console.log(1)
}
function Func(){
    A = function(){
        console.log(2)
    }
    return this;
}
Func.A = A;
Func.prototype={
    A:()=>{
        console.log(3)
    }
}
A() // 1
Func.A() // 1
Func().A(); //2
new Func.A(); // 1
new Func().A(); // 3
new new Func().A();  //报错



var x = 2;
var y = {
    x:3,
    // 闭包
    // 立即执行函数 this为 window
    z:(function(x){
        // 注意this指向 为window
        this.x *= x;
         // 传入参数处理 被里面的函数使用
        x+=2;
        return function(n){
            this.x *= n;
            x+=3;
            console.log(x)
        }
    })(x)
}
var m = y.z;
// 运行时this为 window
m(4);
// 运行时this为 y
y.z(5);
console.log(x,y.x)
// 答案 7、10、16 15


var x= 0,y=1;
function fn(){
    x+=2;
    fn=function(y){
        console.log(y+(--x));
    }
    console.log(x,y);
}
fn(3);
fn(4);
console.log(x,y);
/**
 * vue 2.0 defineProperty 
 * 1、对原始数据克隆
 * 2、需要分别给对象中而定的每一个属性设置监听
 */
/**
 * vue 3.0  proxy
 * 1、对原始数据克隆
 * 2、需要分别给对象中而定的每一个属性设置监听
 */
let obj = {};
obj = new Proxy(obj,{
    get(target,prop){
        console.log('A')
    },
    set(target,prop,value){
        console.log('B')
        target[prop] = value;
    }
})
/*
MVC 和 MVVM的区别

MVVM vue 把视图更改，数据更改给实现了
MVC react 需要自己setState

*/

/*
跨域问题
1、浏览器本身的特点
    ajax
    http 默认端口号 80
    https 默认端口号 443
    ftp 默认端口号 21
同源：协议、域名、端口号
WEB服务器、图片服务器、音视频服务器、数据服务器
script标签不存在跨域文图
1、初始阶段 JSONP跨域解决，动态创建 script
    缺点：
        GET请求
        不安全
        有缓存
        大小限制
        需要浏览器支持

<script src="http://api.qq.com/list"?callback=func>
function func(data){

}
</script>

2、iframe实现跨域

3、CORS跨域资源共享





*/