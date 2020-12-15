

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