function fangDou(func, immediate, wait) {
    let timer = null;
    function fn(...param) {
        if (immediate && !timer) {
            func.apply(this, ...param);
        }
        if (timer) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, ...param);
            }, wait);
        }
    }
    return fn;
}