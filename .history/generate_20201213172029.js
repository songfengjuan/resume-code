function a() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(100);
            resolve(100);
        }, 1000)
    })

}
function* read() {
    let a1

}