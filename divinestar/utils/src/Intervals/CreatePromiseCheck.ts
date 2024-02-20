import { SafeInterval } from "./SafeInterval.js";

export const CreatePromiseCheck = (data: {
 check: () => boolean;
 onReady?: () => any;
 checkInterval: number;
 failTimeOut?: number;
 onFail?: () => any;
}): Promise<boolean> => {
 return new Promise((resolve) => {
  const times = {
   inte: -1,
   fail: -1,
  };
  const inte = new SafeInterval()
   .setInterval(data.checkInterval)
   .setOnRun(() => {
    if (data.check()) {
     if (data.onReady) {
      data.onReady();
     }
     if (times.fail > -1) {
      clearTimeout(times.fail);
     }
     inte.stop();
     resolve(true);
    }
   });
  inte.start();
  if (data.failTimeOut) {
   times.fail = setTimeout(() => {
    inte.stop();
    if (data.onFail) {
     data.onFail();
    }
    resolve(false);
   }, data.failTimeOut) as any;
  }
 });
};
