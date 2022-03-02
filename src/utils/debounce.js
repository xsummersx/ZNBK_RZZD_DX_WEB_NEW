/*
 * @Author: your name
 * @Date: 2022-01-26 09:53:14
 * @LastEditTime: 2022-03-02 13:51:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\utils\debounce.js
 */
export const useDebounce = (func, delay) => {
  let timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(func, delay);
  };
};
