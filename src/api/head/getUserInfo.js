/*
 * @Author: your name
 * @Date: 2021-11-29 10:39:34
 * @LastEditTime: 2021-11-29 10:57:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\api\head\getUserInfo.js
 */
import "../../utils/request.js";
export function getUserInfo(params) {
  console.log(params);
  return this.axios.get("http://172.16.41.237:12070/api/Common/GetBaseUserInfo?&Token=4cb29746-49e6-4424-a229-32236d4b0bd1&UserID=J112602");
}
