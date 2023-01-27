export const CreatePromiseCheck = (data) => {
    return new Promise((resolve) => {
        const times = {
            inte: -1,
            fail: -1,
        };
        times.inte = setInterval(() => {
            if (data.check()) {
                if (data.onReady) {
                    data.onReady();
                }
                if (times.fail > -1) {
                    clearTimeout(times.fail);
                }
                clearInterval(times.inte);
                resolve(true);
            }
        }, data.checkInterval);
        if (data.failTimeOut) {
            times.fail = setTimeout(() => {
                clearInterval(times.inte);
                if (data.onFail) {
                    data.onFail();
                }
                resolve(false);
            }, data.failTimeOut);
        }
    });
};
