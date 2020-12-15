

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
        if (this.state === RESOLVED) {
            onfulfilled(this.successData);
        }
        if (this.state === REJECTED) {
            onrejected(this.errorData);
        }
        if (this.state === PENDING) {


        }

    }
}