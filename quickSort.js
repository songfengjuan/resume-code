// 非原地，空间复杂高
function quickSort(arr){
    if(arr.length<=1) return arr;
    let pivotIndex = Math.floor(arr.length/2);
    let left = [];
    let right = [];
    let pivotNum = quickSort.splice(pivotIndex,1)[0];
    for(let i=0;i<arr.length;i++){
        if(arr[i]<=pivotNum){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivotNum],quickSort(right));
}
// 交换数组两个值
function swap(array, left, right) {
    let rightValue = array[right]
    array[right] = array[left]
    array[left] = rightValue
}
function findKthLargest(arr,k){
    k = arr.length-k;
    let left=0;
    let right = arr.length-1;
    while(left<right){
        let index = part(arr,left,right);
        // k值在左侧
        if(index>k){
            right = index-1;
            // k值在右侧
        }else if(index<k){
            left = index+1;
        }else{
            break;
        }
    }
    return arr[k];
}
function part(arr,left,right){
    let more = right;
    while(left<more){
        if(arr[left]<arr[right]){
            ++left;
        }else if(arr[left]>arr[right]){
            swap(arr,--more,left);
        }else{
            left++;
        }
    }
    swap(arr,right,more)
    return more;
}
function sort(arr){
    if(!Array.isArray(arr)) return;
    quickSort(arr,0,arr.length-1);
    return arr;
}
function quickSort(arr,left,right){
    while(left<right){
        let index = part(arr,left,right);
        quickSort(arr,left,index)
        quickSort(arr,index,right)
    }
}