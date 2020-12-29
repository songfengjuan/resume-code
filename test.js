// umu==>m google->l
function getFirstUnique(str){
    if(typeof str !== 'string') return false;
    if(str.length === 1) return str;
    let obj = {};
    let list = [];
    for(let i=0; i<str.length; i++){
        const char = str.charAt(i);
        if(obj[char]){
            obj[char] =  obj[char]+1;
            // const index = list.indexOf(char);
            // list.splice(index,1);
        }else{
            obj[char] = 1;
            list.push(char);
        }
    }
    if(list.length){
        return list[0]
    }else{
        return false;
    }
   
}