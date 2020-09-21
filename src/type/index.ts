/**
 * 函数类型
 * const fn: TFn<string, [string]> = (a) => {return a};
 */
export interface TFn<TReturn, UParams extends unknown[] = []> {
  (...args: UParams): TReturn;
}


/**
 * 异步函数类型
 *
 */
export interface TFnAsync<TReturn, UParams extends unknown[] = []> {
  (...args: UParams): Promise<TReturn>;
}
