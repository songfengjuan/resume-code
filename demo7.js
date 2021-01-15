function getFloorObjList(list) {
    let newList = [];
    list.forEach(item=>{
        const newItem = getFloorObj({},item);
        newList.push(newItem);
    })
    console.log('newList',newList)
}
function getFloorObj(newObj,obj) {
    for(let key in obj){
        if(typeof obj[key] === 'object'){
            getFloorObj(newObj,obj[key]);
        }else{
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
var arr = [
    {
        a: 'jiang',
        habby: {
            b: 'zong',
            eat: {
                meat: 'xxx',
                drink: 'water'
            }
        },
        c: 'yu'
    },
    { a: 'jiang', c: 'yu' },
    { a: 'jiang', c: 'yu' }
];
getFloorObjList(arr);