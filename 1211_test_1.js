

const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED"

class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.resolvedCallbacks = [];
        this.rejectedCallbacks = [];
        this.successData = null;
        this.errorData = null;
        let resolve = (successData) => {
            if (this.status === PENDING) {
                this.successData = successData;
                this.status = RESOLVED;
                // 异步时
                this.resolvedCallbacks.map(fn => fn());
            }
        }
        let rejected = (errorData) => {
            if (this.state === PENDING) {
                this.errorData = errorData;
                this.status = REJECTED;
                // 异步时
                this.rejectedCallbacks.map(fn => fn());
            }
        }
        try {
            executor(resolve, rejected);
        } catch (e) {
            resolve(e)
        }
    }
    then(onfulfilled, onrejected) {
        // 同步立即执行，异步时，将回调事件存到相应的队列里，在状态发生改变时，执行对应的回调
        if (this.state === RESOLVED) {
            onfulfilled(this.successData);
        }
        if (this.state === REJECTED) {
            onrejected(this.errorData);
        }
        // 异步时 
        if (this.state === PENDING) {
            this.resolvedCallbacks.push(() => {
                onfulfilled(this.successData);
            })
            this.rejectedCallbacks.push(() => {
                onrejected(this.errorData);
            })

        }

    }
}
// 发布订阅


let e = {
    // 保存传值
    _obj: {},
    //    将所有订阅存储
    _callbacks: [],
    on(fn) {
        this._callbacks.push(fn);
    },
    emit(key, val) {
        this._obj[key] = val;
        // 在发布时执行回调 
        this._callbacks.forEach(fn => {
            fn(this._obj);
        })
    }
}
// 订阅
e.on(function (obj) {
    console.log('获取1个')
})
e.on(function (obj) {
    if (Object.keys(obj).length === 2) {
        console.log('获取2个')
    }

})
e.emit('age', 10);
e.emit('name', 'songsong')