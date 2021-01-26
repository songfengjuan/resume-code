function flattenDeep(list){
    if(Array.isArray(list)){
      return  list.reduce((a,b)=>[...a,...flattenDeep(b)],[])
        // {
        //     console.log('a',a);
        //     return flattenDeep([...a,...flattenDeep(b)]);
        // })
    }else{
        return [list]
    }

}
var list = [[1],[[2],[3,[4]],[5]]];
flattenDeep(list);