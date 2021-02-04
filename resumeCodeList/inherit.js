/**
 * 继承的n种方式
 * 
 * 前3种其实都是通过改变this指向的形式实现
 */

//1、 对象冒充
function Parent(username) {
    this.username = username;
    this.hello = function () {
        console.log(this.username);
    }
}
function Child(username, passward) {
    // 通过以下三步将parent的属性和方法追加到Child中，从而实现继承
    // first: this.method是作为一个临时属性，并指向Parent所指向的对象
    // seconed: 执行this.method方法，即指向Parent所指向的对象函数；
    // third：毁掉this.method属性，此时已经拥有了Parent的所有属性和方法
    this.method = Parent;
    this.method(username);
    delete this.method;
    this.passward = passward;
    this.world = function () {
        console.log(this.passward);
    }
}
const parent = new Parent('zhangsan');
const child = new Child('lisi', 'sss');
parent.hello()
child.hello();
child.world();

// 2、通过call实现继承
function Child(username, passward) {
    Parent.call(this, username);
    this.passward = passward;
    this.world = function () {
        console.log(this.passward);
    }
}
// 3、通过apply实现
function Child(username, passward) {
    Parent.apply(this, new Array(username));
    this.passward = passward;
    this.world = function () {
        console.log(this.passward);
    }
}
// 4、通过原型链实现。即子类通过Prototype将所有在父类中通过prototype追加的属性和方法都追加都Child,从而实现继承
function Person() {
}
Person.prototype.hello = "hello";
Person.prototype.sayHello = function () {
    alert(this.hello);
}
function Child() { };
// 将Parent中所有通过prototype追加的属性和方法都追加到Child
Child.prototype = new Person();
Child.prototype.world = 'world';
Child.prototype.sayWorld = function () {
    console.log(this.world);
}
const child = new Child();
console.log('child', child);
//5、 混合继承
function Parent(hello) {
    this.hello = hello;
}
Parent.prototype.sayHello = function () {
    alert(this.hello);
}
function Child(hello, world) {
    Parent.call(this, hello);//将父类的属性继承过来
    this.world = world;//新增一些属性
    console.log('this',this);
}
Child.prototype = new Parent();//将父类的方法继承过来


Child.prototype.sayWorld = function () {//新增一些方法
    alert(this.world);
}
const child = new Child();
console.log('child', child);

