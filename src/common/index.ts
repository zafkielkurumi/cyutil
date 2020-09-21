import { TFnAsync, TFn } from '../type';

export function wrapAsync<T>(fn: TFnAsync<T>) {
  return async (...args: unknown[]): Promise<[T, Error]> => {
    try {
      return [await fn.apply(this, args), null];
    } catch (error) {
      return [null, error];
    }
  };
}


export function debounce<TReturn>(fn: TFn<TReturn>, thorttleTime = 2000): (...args: unknown[]) => TReturn {
  let preTime = new Date();
  return (...args: unknown[]) => {
    const nowTime = new Date();
    if (nowTime.getTime() - preTime.getTime() >= thorttleTime) {
      preTime = nowTime;
      return fn.apply(this, args);
    }
  };
}

/**
 *
 * @param date
 * @param fmt yyyy-MM-dd hh:mm:ss
 */
export const formatDate: TFn<string, [Date | number | string, string?]> = (
  date,
  fmt = 'yyyy-MM-dd hh:mm',
) => {
  if (!date) {
    return '';
  }
  if (!(date instanceof Date)) {
    try {
      date = new Date(date);
    } catch (error) {
      return '';
    }
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length),
    );
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  function padLeftZero(str: string) {
    return `00${str}`.substr(str.length);
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = `${o[k]}`;
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str),
      );
    }
  }
  return fmt;
};
