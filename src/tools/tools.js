function rafThrottle(fn) {
    let lock = false;
    return function (that, ...args) {
        if (lock) return;
        lock = true;
        window.requestAnimationFrame(() => {
            fn.apply(that, args);
            lock = false;
        });
    };
}
function debounce(fn, delay) {
    let timer = null;
    return function (that, ...args) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(that, args);
        }, delay);
    };
}

function cannotzoom() {


    const keyCodeMap = {
        // 91: true, // command
        61: true,
        107: true, // 数字键盘 +
        109: true, // 数字键盘 -
        173: true, // 火狐 - 号
        187: true, // +
        189: true, // -
    };
    // 覆盖ctrl||command + ‘+’/‘-’
    document.onkeydown = function (event) {
        const e = event || window.event;
        const ctrlKey = e.ctrlKey || e.metaKey;
        if (ctrlKey && keyCodeMap[e.keyCode]) {
            e.preventDefault();
        } else if (e.detail) { // Firefox
            event.returnValue = false;
        }
    };
    // 覆盖鼠标滑动
    document.body.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            if (e.deltaY < 0) {
                e.preventDefault();
                return false;
            }
            if (e.deltaY > 0) {
                e.preventDefault();
                return false;
            }
        }
    }, { passive: false });
}


function isPhone() {
    //获取浏览器navigator对象的userAgent属性（浏览器用于HTTP请求的用户代理头的值）
    var info = navigator.userAgent;
    //通过正则表达式的test方法判断是否包含“Mobile”字符串
    var isPhone = /mobile/i.test(info);
    //如果包含“Mobile”（是手机设备）则返回true
    return isPhone;
}
export {
    rafThrottle,
    debounce,
    cannotzoom,
    isPhone
}

