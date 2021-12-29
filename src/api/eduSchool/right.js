/*
 * @Author: 吴涛
 * @Date: 2021-12-22 20:20:33
 * @LastEditTime: 2021-12-28 16:13:15
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

//学校认知对比分析
export function GetAreaSchoolTrastAnalysis(data) {
  return request({
    url: "/api/DirectorRZZD/GetAreaSchoolTrastAnalysis",
    method: "GET",
    params: { ...data },
  });
}
//认知成绩分布==教育局
export function GetArea(data) {
  return request({
    url: "/api/DirectorRZZD/GetAreaIndexDistribute_v3",
    method: "GET",
    params: { ...data },
  });
}
//认知成绩分布==校领导
export function GetAreaSchool(data) {
  return request({
    url: "/api/SchoolMasterRZZD/GetSchoolIndexDistribute_V3",
    method: "GET",
    params: { ...data },
  });
}

//认知成绩走势图==教育局
export function GetTrend(data) {
  return request({
    url: "/api/DirectorRZZD/GetDirectorGradeTrajectoryChart",
    method: "GET",
    params: { ...data },
  });
}
//认知成绩走势图==教育局
export function GetTrendSchool(data) {
  return request({
    url: "/api/SchoolMasterRZZD/GetGradeTrajectoryChart",
    method: "GET",
    params: { ...data },
  });
}
