import { IDateFormat } from "./interface";

/** 返回指定类型的对象的键名数组 */
export function keysOf<T>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * 转换传入的时间为指定的格式
 * @param timestamp 时间戳(支持字符串和数字)
 * @param pattern 时间格式，如: yyyy-MM-dd hh:mm:ss
 * @returns
 */
export function formatTime(
  timestamp: number | string = 1585734546,
  pattern = "yyyy-MM-dd hh:mm:ss"
): string {
  console.log(timestamp);

  let dateObj;
  if (typeof timestamp === "number") {
    dateObj = new Date(timestamp);
  } else if (typeof timestamp === "string") {
    if (!isNaN(Number(timestamp))) {
      dateObj = new Date(Number(timestamp));
    } else {
      const timeString = timestamp.replace(/-/g, "/");
      dateObj = new Date(Date.parse(timeString));
    }
  } else {
    return "请传入时间戳或者时间字符串";
  }
  return dateFormat(dateObj, pattern);
}

/**
 * 把时间对象转换成指定的格式
 * @param date 时间对象
 * @param pattern 时间格式，如: yyyy-MM-dd
 * @returns
 */
function dateFormat(date: Date, pattern: string) {
  if (date instanceof Date) {
    const o: IDateFormat = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(pattern)) {
      pattern = pattern.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (const k in o) {
      if (new RegExp("(" + k + ")").test(pattern)) {
        const replaceStr =
          RegExp.$1.length === 1
            ? String(o[k])
            : `00${o[k]}`.substr(String(o[k]).length);
        pattern = pattern.replace(RegExp.$1, replaceStr);
      }
    }
    return pattern;
  } else {
    return date;
  }
}

export function formatNo(no: number): string {
  let result = `${no}`;
  if (no > 0 && no < 10) {
    result = `0${no}`;
  }
  return result;
}

/**
 * 把秒数转换为分钟数
 * @param secondCount 秒数(0-3600)
 * @returns
 */
export const transformSecondToMinute = (secondCount: number): string => {
  if (secondCount > 0 && secondCount < 3600) {
    const minutePartCount = Math.floor(secondCount / 60);
    const secondPartCount = Math.floor(secondCount % 60);
    let minuteStr = String(minutePartCount);
    let secondStr = String(secondPartCount);
    if (minutePartCount < 10) {
      minuteStr = `0${minutePartCount}`;
    }
    if (secondPartCount < 10) {
      secondStr = `0${secondPartCount}`;
    }
    return `${minuteStr}:${secondStr}`;
  }
  return "00:00";
};

/**
 * 格式化月份
 * @param month 月份
 * @returns
 */
export const formatMonth = (month: number): string => {
  if (month < 10) {
    return `0${month}`;
  }
  return `${month}`;
};

/**
 * 格式化时间字符串为时间，时间单位为秒
 * @param timeString 时间字符串，格式为： mm:ss:ss, 如： 00:01:404
 * @returns
 */
export const formatTimeToNumber = (timeString: string) => {
  let time = 0;
  if (timeString) {
    const splitArr = timeString.split(":").map((item) => Number(item));
    return splitArr[0] * 60 + splitArr[1];
  }
  return time;
};

/**
 * 格式化时间为文字：如10分钟前
 * @param {*} time 时间字符串或者时间戳
 * @param {*} isTimeStamp 是否为时间戳格式
 */
export const formatDateToText = (
  time: string | number,
  isTimeStamp = false
) => {
  let timeString = "";
  if (time) {
    let intervalTime = 0;
    if (!isTimeStamp) {
      intervalTime = Math.floor(
        (Date.now() - Date.parse(time as string)) / 1000
      );
    } else {
      intervalTime = Math.floor(Date.now() / 1000) - (time as number);
    }
    if (intervalTime < 60) {
      timeString = "1分钟前";
    } else if (intervalTime >= 60 && intervalTime < 3600) {
      timeString = Math.floor(intervalTime / 60) + "分钟前";
    } else if (intervalTime >= 3600 && intervalTime < 3600 * 24) {
      timeString = Math.floor(intervalTime / 3600) + "小时前";
    } else if (intervalTime >= 3600 * 24 && intervalTime < 3600 * 24 * 7) {
      timeString = Math.floor(intervalTime / (3600 * 24)) + "天前";
    } else if (intervalTime >= 3600 * 24 * 7 && intervalTime < 3600 * 24 * 30) {
      timeString = Math.floor(intervalTime / (3600 * 24 * 7)) + "周前";
    } else if (
      intervalTime >= 3600 * 24 * 30 &&
      intervalTime < 3600 * 24 * 365
    ) {
      timeString = Math.floor(intervalTime / (3600 * 24 * 30)) + "个月前";
    } else if (intervalTime >= 3600 * 24 * 365) {
      timeString = Math.floor(intervalTime / (3600 * 24 * 365)) + "年前";
    }
  } else {
    timeString = "缺少时间参数";
  }
  return timeString;
};

/**
 * 格式化数字为
 * @param num
 */
export const formatNumberToText = (num: number | string): string | number => {
  if (isNaN(Number(num))) {
    return num;
  }

  if (Number(num) > 10000) {
    return Math.ceil(Number(num) / 10000) + "万";
  }
  return Number(num);
};

/**
 * 获取当前的操作系统
 * @returns {string}
 */
export const getCurrentOS = () => {
  const ua = navigator.userAgent;
  const isWindows = /windows/i.test(ua);
  const isMac = /macintosh/i.test(ua);
  const isLinux = /linux/i.test(ua);
  const isAndroid = /android/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isMobile = /mobile/i.test(ua);
  const isTablet = /tablet/i.test(ua);
  const isPhone = isMobile && !isTablet;
  const isTouch = isIOS || isAndroid;
  const isPC = !isMobile;
  return {
    isWindows,
    isMac,
    isLinux,
    isAndroid,
    isIOS,
    isMobile,
    isTablet,
    isPhone,
    isTouch,
    isPC,
  };
};
