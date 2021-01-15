async function fn2(){
    console.log('fn2fn2fn2')
}
async function fn1(){
    console.log('11111')
    await fn2()
    console.log('22222')
    await fn2()
    console.log('33333')
}
new Promise((resolve)=>{
    console.log('resolve-1111')
    resolve();
    console.log('resolve-2222')
}).then(()=>{
    console.log('resolve-3333')
})
fn1();
