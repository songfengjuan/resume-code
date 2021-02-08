// 洗牌算法
function getMess(arr) {
    var n = arr.length;
    var newArr = [];
    while(n) {
        // 随机获取一个数组下标
        var i = Math.floor(Math.random()*n--);
        // 把该随机下标对应的值push到新数组里面，原数组删除该值
        newArr.push(arr.splice(i, 1)[0]);
    }
    return newArr;
 }
 function shuffle(arr){//时间复杂度O(n)
    arr = arr.concat();
    let temp = null;
    let r = Math.random()*arr.length|0;
    for(let i=0;i<arr.length;i++){
        temp = arr[i];
        arr[i] = arr[r];
        arr[r] = temp;
    }
    return arr;
}