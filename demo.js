function getIshuiStr(str){
    if(typeof str !== 'string' ) return false;
    if(str.length==1) return true;
    let len = str.length;
    let left = 0, right = len-1;
    let notHui = false;
    while((left<right)&&!notHui){
        if(str.charAt[left]!==str.charAt[right]){
            return false;
        }else{
            left++;
            right--;
        }
    }
    return !notHui;
}