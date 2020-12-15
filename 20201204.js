/**
 * 回本子串 暴力解法  1、求出所有的子串，2、判断每一个子串是否是回文字符串
 * @param  str 
 */
var isCircleStr = (str) => {
  // 判断是否是回文字符串
  // 采用双指针
  let min = 0; max = str.length - 1;
  let isCircle = true;
  while (max > min && isCircle) {
    if (str.charAt(min) === str.charAt(max)) {
      max--;
      min++;
    } else {
      isCircle = false;
    }
  }
  return isCircle;
}
const countSubstrings = function (arr) {
  const resultArr = []
  // 开始截取位置
  for (let i = 0; i < arr.length; i++) {
    // 截取长度
    for (let j = 1; j < arr.length - i + 1; j++) {
      const temp = arr.substring(i, i + j)
      if (temp) {
        resultArr.push(temp)
      }
    }
  }
  let count = 0;
  resultArr.forEach(item => {
    if (isCircleStr(item)) {
      count++;
    }
  })
  return count;
};
/**
 * 中心拓展法 枚举每一个可能的回文中心，然后用两个指针分别向左右两边拓展，当两个指针指向元素相同的时候就拓展，否则就停止
 * @param {} arr 
 */
const countSubstrings2 = function (arr) {
  let len = arr.length;
  let count = 0;
  for (let i = 0; i < 2 * len - 1; i++) {
    let l = i / 2, r = i / 2 + i % 2;
    while (l >= 0 && r < len && arr.charAt(l) === arr.charAt(r)) {
      count++;
      l--;
      r++;
    }
  }
  return count;
};