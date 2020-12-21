// 交换数组两个值
function swap(array, left, right) {
    let rightValue = array[right]
    array[right] = array[left]
    array[left] = rightValue
}
// 冒泡
function bubbling(arr) {
    for (let j = 0; j < arr.length; j++) {
        for (let i = 0; i < arr.length - 1 - j; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1)
            }
        }
    }
}
// 判断是否为数组
function checkArray(array) {
    return Array.isArray(array)
}

function sort(array) {
    if (!checkArray(array)) return false;
    quickSort(array, 0, array.length - 1);
    return array;
}
function quickSort(array, left, right) {
    if (left < right) {
        swap(array, left, right)
        // 随机取值，然后和末尾交换，这样做比固定取一个位置的复杂度略低
        let indexs = part(array, parseInt(Math.random() * (right - left + 1)) + left, right);
        quickSort(array, left, indexs[0]);
        quickSort(array, indexs[1] + 1, right);
    }
}
function part(array, left, right) {
    let less = left - 1;
    let more = right;
    while (left < more) {
        if (array[left] < array[right]) {
            // 当前值比基准值小，`less` 和 `left` 都加一
            ++less;
            ++left;
        } else if (array[left] > array[right]) {
            // 当前值比基准值大，将当前值和右边的值交换
            // 并且不改变 `left`，因为当前换过来的值还没有判断过大小
            swap(array, --more, left);
        } else {
            // 和基准值相同，只移动下标
            left++;
        }
    }
    // 将基准值和比基准值大的第一个值交换位置
    // 这样数组就变成 `[比基准值小, 基准值, 比基准值大]`
    swap(array, right, more);
    return [less, more];
}

function setColors(arr) {
    let left = -1, i = 0, right = arr.length;
    while (i < right) {
        if (arr[i] == 0) {
            swap(arr, i++, ++left);
        } else if (arr[i] == 1) {
            i++;
        } else {
            swap(arr, i, --right);
        }
    }
    return arr;
}

function part(arr, left, right) {
    let less = left - 1;
    let more = right;
    while (left < right) {
        // 比基准值小，只移动下标
        if(arr[left]<arr[right]){
            ++less;
            ++left;
        // 比基准值大，交换位置
        }else if(arr[left]<arr[right]){
            swap(arr,--more,left)
        // 与基准值相等，只移动下标
        }else{
            ++left;
        }

    }
     // 将基准值和比基准值大的第一个值交换位置
    // 这样数组就变成 `[比基准值小, 基准值, 比基准值大]`
    swap(arr,more,right);
    return [less,more];
}


// 获取二叉树的最大深度  一旦没有找到节点就返回0 每弹出一次递归函数就会加一 
function maxDepth(root){
    if(!root) return 0;
    return Math.max(maxDepth(root.left),maxDepth(root.right))+1
}
// 斐波那契数列
// 当n比较大的时候，递归会导致栈溢出，或者时间比较长
function fib(n){
    let list =  new Array(n+1).fill(null);
    list[0] = 0;
    list[1] = 1;
    for(let i=2;i<=n;i++){
        list[i] = list[i-1]+list[i-2];
    }
    return list[n];
}



