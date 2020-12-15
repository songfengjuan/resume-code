// 1、promise 是一个类


// 2、promise 内部会提供两个方法 
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
function resolvePromise(promise2, x, resolve, reject) {
  // 此方法为了兼容所有的promise
  // 判断是否为引用同一个对象
  if (promise2 === x) {
    return reject(new TypeError('自我引用'));
  }
  // 判断x是对象或者函数，说明有可能是一个promise
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      if (typeof x === 'function') {
        let then = x.then;
        then.call(x, (y) => {
          resolve(y);
        }, (r) => {
          reject(r);
        });
      } else {
        resolve(x);
      }

    } catch (e) {
      reject(e)
    }

  } else {
    resolve(x);
  }

}
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.successData = undefined;
    this.errorData = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    let resolve = (successData) => {
      if (this.status === PENDING) {
        this.successData = successData;
        this.status = RESOLVED;
        // 异步时
        this.resolvedCallbacks.map(fn => fn());
      }
    }
    let rejected = (errorData) => {
      if (this.status === PENDING) {
        this.errorData = errorData;
        this.status = REJECTED;
        // 异步时
        this.rejectedCallbacks.map(fn => fn());
      }
    }
    try {
      executor(resolve, rejected);
    } catch (e) {
      rejected(e);
    }

  }
  // then 回调
  then(onfulfilled, onrejected) {
    // 为了链式调用，就创建一个新的promise
    let promise2 = new Promise((resolve, reject) => {
      // 成功回调
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            const x = onfulfilled(this.successData);
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }

        }, 0)

      }
      // 失败回调
      if (this.status === REJECTED) {

        setTimeout(() => {
          try {
            const x = onrejected(this.errorData);
            resolvePromise(promise2, x, resolve, reject)

          } catch (e) {
            reject(e)
          }

        }, 0)
        // primise 一定存在异步 即是发布订阅，模式
        if (this.status === PENDING) {
          this.resolvedCallbacks.push(() => {
            setTimeout(() => {
              try {
                const x = onfulfilled(this.successData);
                resolvePromise(promise2, x, resolve, reject)

              } catch (e) {
                reject(e)
              }



            })
            this.rejectedCallbacks.push(() => {
              setTimeout(() => {
                try {
                  const x = onrejected(this.errorData);
                  resolvePromise(promise2, x, resolve, reject)

                } catch (e) {
                  reject(e)
                }


              })
            }

    });

        }
      }
      let promise = new Promise((resolve, rejected) => {
        console.log('2222')
        setTimeout(() => {
          resolve('1111');
        }, 1000)
      })
      promise.then((successData) => {
        console.log('successData', successData)
      }, (errorData) => {
        console.log('errorData', errorData)
      })