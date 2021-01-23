Array.prototype.fakeMap = function(fn,context){
    let arr = this;
    let result = [];
    for(let i = 0;i<arr.length;i++){
        let res = fn.call(context,arr[i],i,arr);
        result.push(res);
    }
    return result;
}