const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
function resolvePromise(promise2,x,resolve,rejeced){
    //  引用同一个对象
    if(x===promise2) {
        reject(new TypeError('循环引用'))
    }
    let called = false;
    if((typeof x === 'object'&&x!=null)||typeof x==='function'){
        try{
            let then = x.then;
            if(typeof then === 'function'){
                then.call(x,y=>{
                    if(called) return;
                    called = true;
                    resolvePromise(promise2,y,resolve,rejeced);
                },r=>{
                    if(called) return;
                    called = true
                    reject(r)
                })
            }else{
                resolve(x);
            }

        }catch(e){
            if (called) return
            called = true;
            rejeced(e);
        }

    }else{
        resolve(x);
    }
}
class Promise {
    constructor(executer) {
        this.status = PENDING;
        this.successData = null;
        this.rejectedData = null;
        this.successCallback = [];
        this.rejectedCallback = [];
        let resolve = (successData) => {
            if (successData instanceof Promise) {
                successData.then(resolve, reject);
            }
            if (this.status === PENDING) {
                this.successData = successData;
                this.status = RESOLVED;
                // 异步时
                this.successCallback.map(fn => fn());
            }
        }
        let reject = (rejectedData) => {
            if (this.status === PENDING) {
                this.rejectedData = rejectedData;
                this.status = REJECTED;
                this.rejectedCallback.map(fn => fn());
            }
        }
        try {
            executer(resolve, reject);
        } catch (e) {
            reject(e);
        }

    }
    then(onFulFilled, onRejected) {
        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : e => {
            throw e;
        }
        let promise2 = new Promise((resolve, reject) => {
            // 成功回调
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onfulfilled(this.successData);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }

                }, 0)
            }
        })

        if (this.status === REJECTED) {
            setTimeout(() => {
                try {
                    const x = onRejected(this.rejectedData);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }

            }, 0)

        }
        // 异步时
        if (this.status === PENDING) {
            this.successCallback.push(
                () => {
                    try {
                        const x = onfulfilled(this.successData);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }

                })
            this.rejectedCallbacks.push(
                () => {
                    try {
                        const x = onRejected(this.rejectedData);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                })
        }

    }

}