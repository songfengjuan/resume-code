

const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED"

class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.resolvedCallback = [];
        this.rejectedCallback = [];
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

        }
        try{
            executor(resolve,rejected);
        }catch(e){
            resolve(e)
        }
    }
    then(onfulfilled,onrejected){
        if(this.state===RESOLVED){

        }
        if(this.state===REJECTED){

        }
        if(this.state===PENDING){
            
        }

    }
}