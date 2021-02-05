/**
 * js new运算法执行过程及模拟实现
 * 1、创建一个新对象obj
 * 2、把obj的proto指向构造函数的prototype对象，实现继承
 * 3、将步骤1新创建的对象obj作为this的上下文
 * 4、返回创建的对象obj（如果该函数没有返回对象，则返回this）
 * 
 *
1、创建一个新的空的对象
2、将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
3、执行构造函数中的代码（为这个新对象添加属性）
4、如果这个函数有返回值，则返回；否则，就会默认返回新对象

 */
function _new() {
    const context = Array.prototype.shift.call(arguments);
    const obj = Object.create(context.prototype);
    const result = context.apply(obj, arguments);
    return result instanceof Object ? result : obj;
}