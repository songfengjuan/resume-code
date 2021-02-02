// js实现一个带并发限制的异步调度器Scheduler,保证同时运行的任务最多有两个 完善下面代码Scheduelr类

class Scheduler {
    constructor(){
        this.stack=[];
        this.runStack = [];
        this.maxCount = 2;
        this.tempRunIndex =0;

    }
    // promise是一
    add =(promise)=> {
      this.stack.push(promise);
    }
    start= () => {
       for(let i=0; i<this.maxCount;i++){
         this.runTask();
       }
    }
    runTask = ()=>{
      if(!this.stack||!this.stack.length||this.tempRunIndex>=this.maxCount){
        return;
      }
      this.tempRunIndex++;

      this.stack.shift()().then(()=>{
        this.tempRunIndex--;
        this.runTask();
      })
    }
  }
  const timeout = (time) => new Promise(reslove => { setTimeout(reslove, time)})
  const scheduler = new Scheduler()
  const addTask = (time,order) => {
    scheduler.add(()=>timeout(time).then(()=>console.log(order)))
  }
  addTask(1000,1)
  addTask(500,2)
  addTask(300,3)
  addTask(400,4)
  scheduler.start()
  
  