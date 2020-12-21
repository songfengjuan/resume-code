function swap(arr,left,right){
    const rightVal = arr[right];
    arr[right] = arr[left];
    arr[left] = rightVal;
}
function quickSort(arr,left,right){
    if(left<right){
        const index = part(arr,left,right);
        quickSort(arr,left,index-1);
        quickSort(arr,index+1,right);
    }
}
function part(arr,left,right){
    let more = right;
    while(left<more){
        if(arr[left]<=arr[right]){
            left++
        }else if(arr[left]>arr[right]){
            swap(arr,--more,left);
        }
    }
    swap(arr,more,right);
}
function sort(arr){
    if(!Array.isArray(arr)) return false;
    quickSort(arr,0,arr.length-1);
    return arr;
}