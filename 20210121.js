
/*
几个朋友一起玩一个游戏, 围成一圈, 开始数数（数数时数字都是挨着的，
第一个人数1，之后的人数2）, 数到某个数字的人自动淘汰。
汰的人后面再从1开始数，重复上面的游戏，直到就剩下一个人，请问剩下了谁？
var names = ["John", "Jack", "Camila", "Ingrid", "Carl"];
var endName = passGame(names, 8); // 数到 8 的人淘汰
console.log("最终留下:" + endName); // 'john'
*/
function passGame(list,num){
    if(!Array.isArray(list)|| typeof num !=='number') return false;
    while(list.length>1){
        for(let i =0;i<num;i++){
            list.push(list.shift());
        }
        list.pop();
    }
    const res = list.pop();
    console.log('res',res);
    return res;
}

/**
    组合函数，compose
    从右向左执行
const greeting = (name) => `hello ${name}`;
const toUpper = (str) => str.toUpperCase();
const fn = compose([toUpper, greeting]);
console.log(fn("yideng"));
 */
function flow(funcs){
    const len = funcs.length;
    let index = len;
    while(index--){
        if(typeof funcs[index] !== 'function' ){
            throw new TypeError('expected a function');
        }
    }
    return function(...args){
        let index = 0;
        let result = len?funcs[index].apply(this,args):args[0]
        while(++index<len){
            result  = funcs[index].call(this,result);
        }
        return result;

    }
}
 function compose(funcs){
    console.log('funcs',funcs);
    return flow(funcs.reverse());
}
