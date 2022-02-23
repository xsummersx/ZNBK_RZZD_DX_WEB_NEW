/*
 * @Author: 吴涛
 * @Date: 2021-12-22 20:20:33
 * @LastEditTime: 2022-02-23 10:05:43
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
//认知成绩分布==年级组长
export function GetAreaGrade(data) {
  return request({
    url: "/api/GradeLeaderRZZD/GetGradeIndexDistribute_V3",
    method: "GET",
    params: { ...data },
  });
}
//认知成绩分布==教师
export function GetAreaTeacher(data) {
  return request({
    url: "/api/TeacherRZZD/GetClassIndexDistribute_V3",
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
//认知成绩走势图==校长
export function GetTrendSchool(data) {
  return request({
    url: "/api/SchoolMasterRZZD/GetGradeTrajectoryChart",
    method: "GET",
    params: { ...data },
  });
}
//认知成绩走势图==校长
export function GetTrendGrade(data) {
  return request({
    url: "/api/GradeLeaderRZZD/GetGradeTrajectoryChart",
    method: "GET",
    params: { ...data },
  });
}
//认知成绩走势图==教师
export function GetTrendTeacher(data) {
  return request({
    url: "/api/TeacherRZZD/GetClassCognitiveTrajectoryChart",
    method: "GET",
    params: { ...data },
  });
}
//认知成绩走势图==学生个人
export function GetTrendStudent(data) {
  return request({
    url: "/api/StuRZZD/GetStuCognitiveTrajectoryChart",
    method: "GET",
    params: { ...data },
  });
}

//认知情况对比图==校长
export function GetAnaChart(data) {
  return request({
    url: "/api/SchoolMasterRZZD/GetSchoolClassAnalysis_V3",
    method: "GET",
    params: { ...data },
  });
}
//认知情况对比表格==校长
export function GetAnaTable(data) {
  return request({
    url: "/api/SchoolMasterRZZD/GetGradeCognitiveLevel_V3",
    method: "GET",
    params: { ...data },
  });
}
//认知情况对比表格==校长
export function ExportExcel(data) {
  return request({
    url: "/api/SchoolMasterRZZD/GetExportSchoolCognitiveLevel_V3",
    method: "GET",
    params: { ...data },
  });
}
//学校认知情况弹窗列表
export function AllSchoolInfo(data) {
  return request({
    url: "/api/DirectorRZZD/GetDirectorCognitiveLevel_V3",
    method: "GET",
    params: { ...data },
  });
}
//学校认知情况导出
export function ExportSchool(data) {
  return request({
    url: "/api/DirectorRZZD/GetExportDirectorCognitiveLevel_V3",
    method: "GET",
    params: { ...data },
  });
}
