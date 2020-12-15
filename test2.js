 var getCommonNumber= function(str){
    const len = str.length;
    const list = [];
    let startNum = str.charAt(0);
    let obj = {
      key:startNum,
      value:0
    };
    for(let i=0;i<len;i++ ){
      if(obj.key===str.charAt(i)){
        obj.value = obj.value+1;
      }else{
        const newObj = {
          key:obj.key,
          value:obj.value
        }
        list.push(newObj);
        obj = {
          key:str.charAt(i),
          value:1
        };
      }
      if(i===len-1){
        list.push(obj);
      }
    }
    let newList = [];
    for(let i=0;i<list.length;i++){
      if(list[i].value>1){
        newList.push(list[i]);
      }
    }
    console.log('newList',newList)
    return newList;
 }
