/**
 * 双向指针
 * 贪心算法
 * @param {*} S 
 */
var partitionLabels = function(S) {
    const len = S.length,codeArr = new Array(26);
    let start = 0, end=0,positionArr = [];
    const codePointA = 'a'.codePointAt(0);
    // 遍历获取每个字母的end节点
    for(let i=0; i<len;i++){
        codeArr[S.codePointAt(i)-codePointA] = i;
    }
    // 根据上面获取字母end节点，截取字符串
    for(let i=0;i<len;i++){
        end = Math.max(codeArr[S.codePointAt(i)-codePointA],end);
        if(i===end){
            positionArr.push(end-start+1);
            start = end+1;
        }
    }
    return positionArr;
}
/**
 * 视频拼接
 * @param {*} clips  Array
 * @param {*} T number
 */
var videoStitching = function(clips, T) {
    clips.sort((a,b)=>a[0]-b[0]);
    const dp = new Array(T + 1).fill(101);
    dp[0] = 0;

    for(let i=0;i<clips.length;i++){
        const [ start,end ] = clips[i];
        for (let j = start + 1; j <= end; j++) { // 计算当前片段上每个点的dp[j]
            dp[j] = Math.min(dp[j], dp[start] + 1);
          }
    }
    if(dp[T] === 101) return -1;
    return dp[T];
};