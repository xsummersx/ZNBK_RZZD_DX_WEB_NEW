/*
 * @Author: 吴涛
 * @Date: 2021-12-22 20:20:33
 * @LastEditTime: 2021-12-23 09:03:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 右边部分
 */
import request from "@/utils/request";

//获取地图资源数据
export function getMapJson(data) {
  return request({
    url: "/api/DirectorRZZD/GetMapResourcesOutput",
    method: "GET",
    params: { ...data },
  });
}
