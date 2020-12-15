function a() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(100);
            resolve(100);
        }, 1000)
    })

}
// * 生成器 返回的是迭代器
function* read() {
    let a1

}