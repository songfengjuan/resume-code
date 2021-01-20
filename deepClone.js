// 实现一个深度拷贝
function  deepClone(obj) {
    let result;
    // 判断是否是简单数据类型
    if( typeof obj == 'object' ){
        // 复杂数据类型
        result = obj.constructor == Array ? []:{};
        for(let i in result){
            result[i] = typeof obj[i] == 'object'?deepClone(obj[i]):obj[i]; 
        }
    }else{
        result = obj;
    }
    return result;
}
