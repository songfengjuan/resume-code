function swap(list,left,right){
    const rightVal = list[right];
    list[right] = list[left];
    list[left] = rightVal;
}
function sort(list){
    if(!Array.isArray(list)) return;
    if(list.length<=1) return list;
    let len = list.length-1;
    const index = quickSort(list,0,len);

    // let left = quickSort(list,0,index-1);
    // let right = quickSort(list,index+1,len);



}
function quickSort(list,left,right){
    let more = right;
    if(left<=more){
        if(list[left]<=list[more]){
            left++;
        }else{
            more--;
            swap(list,left,more)
        }
    }
    swap(list,more,right);
    return more;
}