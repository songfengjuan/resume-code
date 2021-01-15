// 无重复字符的最长子串
function lengthOfLongestSubstring(str){
    if(typeof str !== 'string') return false;
    let substr = '';
    let maxLength = 0;
    for(let i=0;i<str.length;i++){
        const index = substr.indexOf(str[i]);
        if(index>-1){
            substr = substr.substring(index+1);
        }
        substr += str[i];
        if(substr.length>maxLength){
            maxLength = substr.length;
        }
    }
    return maxLength;
}