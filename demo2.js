// js实现一个带并发限制的异步调度器Scheduler,保证同时运行的任务最多有两个 完善下面代码Scheduelr类

class Scheduler {
    constructor(){
        super();
        this.stack=[];
        this.runStack = [];

    }
    add (promise) {
      // ...
      this.stack.push(promise);
      
    }
    start() {
        this.runStack = [this.stack[0],this.stack[1]];
        while(this.stack.length){

        }


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
  
  