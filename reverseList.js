// 翻转单向链表
function reverseList(head){
    if(!head||!head.next) return head;
    let pre = null;
    let current = head;
    let next;
    while(current) {
        next = current.next;
        current.next = pre;
        pre = current;
        current = next;
    }
    return pre;
}
// 树的最大深度
var maxDepth = function(root) {
    if (!root) return 0 
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
// 斐波那契数列
function fib(n){
    let list = new Array(n+1).fill(null);
    list[0] = 0;
    list[1] = 1;
    for(let i=2;i<=n;i++){
        list[i] =  list[i-1]+list[i-2];
    }
    return list[n];
}
// 获取最长递增字序列
function getMaxList(list){
   if(!Array.isArray(list)) return false;
   if(list.length<1) return false;
   const len = list.length;
   let storeList = new Array(len).fill(1);
   for(let i=1;i<len;i++){
    for(let j=0;j<i;j++){
        if(list[i]>list[j]){
            storeList[i] = Math.max(storeList[i],storeList[j]+1)
        }
    }
   }
   console.log(storeList);
   let res=1;
   for(let i=0;i<len;i++){
       res = Math.max(res,storeList[i])
   }
   return res;
}

// question1 
function question1(str){
    var reg = /[^\d+]/g;
    // return str.replace(reg,'');
    let res='';
    var regNum = /\d+/;
    for(let i=0;i<str.length;i++){
        const curVal =  str.charAt(i);
        let trancformVal;
        if(regNum.test(curVal)){
            trancformVal = Number(curVal)*2;
        }else{
            trancformVal = `[${curVal}]`;
        }
        res += trancformVal.toString();
    }
    return res;

}

// question2 
function closure(){
    let count = 0;
    return function getNum(){
        count +=1;
        console.log('count',count)
        return count;
    }
}
var getCount = closure();
getCount();
getCount();
getCount();

// question3 move 0

function moveZeros(list){
    if(!Array.isArray(list)) return false;
    if(list.length<=1) return list;
    let moveLen = 0;
    let curIndex = 0;
    while(moveLen+curIndex<list.length){
        if(list[curIndex]===0){
            moveLen++;
            list.splice(curIndex,1);
            list.push(0);
        }else{
            curIndex++;
        }
   
    }
    return list;
}

// ques4
/*
已知document.write('<a href="'+filterA(a)+'" onclick=" '+filterB(B) +' " >'+filterC(C)+'</a>')
请实现filterA、filterB、filterC确保不存在安全漏洞
*/
function filterA(){
    
}
function filterC(val){
    if(!val) return '';
    return val.replace(/\<script\>/gim, "&lt;script&gt;").replace(/\<\/script\>/gim, "&lt;/script&gt;").replace(/\</gim, "&ギ").replace(/\>/gim, "@ギ&"); 
}