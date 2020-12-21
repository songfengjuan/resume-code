// 防抖

/*
* 防抖：是将多次高频操作优化为只在最后一次执行，
* 通常的使用场景是，用户输入，只在输入完整后做最后一次校验
*/
function debounce(fn, wait, immediate) {
    let time = null;
    return function () {
        let context = this;
        let args = arguments;
        if (immediate && !time) {
            fn.apply(context, args);
        }
        if (time) { clearTimeout(time) };
        time = setTimeout(() => {
            fn.apply(context, args);
        }, wait)
    }
}
// 节流
/**
 * 每隔一段时间执行一次，就是降低频率，将高频率事件降低为低频率事件；
 *  通常使用的场景为，滚动条事件、或者resize事件，通常是100ms～500ms执行一次啊
 */
function throttle(fn, wait, immediate) {
    let time = null;
    let callNow = immediate;
    return function () {
        let args = arguments;
        let context = this;
        if (callNow) {
            fn.apply(context, args)
            callNow = false
        }
        if (!time) {
            time = setTimeout(() => {
                fn.apply(context, args)
                timer = null;
            }, wait)
        }

    }

}




function debounce(fn, wait, immediate) {
    let timer = null;
    return function () {
        let args = arguments;
        const context = this;
        if (immediate && !timer) {
            fn.apply(context, args);
        }
        if (timer) { clearTimeout(timer) }
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait)
    }
}


function throttle(fn, wait, immediate) {
    let callNow = immediate;
    let timer = null;
    return function () {
        let args = arguments;
        let context = this;
        if (callNow) {
            fn.apply(context, args);
            callNow = false;
        }
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            })
        }
    }

}







