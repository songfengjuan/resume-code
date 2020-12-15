// 发布订阅 发布与订阅 无关联
let e ={
  _obj:{},
  _callback:[],
  on(callback){
    this._callback.push(callback)

  },
  emit(key,value){
    this._obj[key] = value;
    this._callback.forEach(fn=>{
      fn(this._obj);
    })
  }
}
// 订阅
e.on(function(obj) {
  console.log('获取一个')
})
e.on(function(obj) {
  if(Object.keys(obj).length === 2){
    console.log('获取两个')
    console.log(obj);
  }
  

})

// 发布
e.emit('age',10);
e.emit('name','songsong')