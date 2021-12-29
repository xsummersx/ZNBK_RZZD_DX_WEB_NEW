/*
 * @Author: your name
 * @Date: 2021-12-28 10:59:57
 * @LastEditTime: 2021-12-29 10:03:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\api\diolog\stuReportDiolog.js
 */
import request from '@/utils/request';

// 弹窗
// 年级端
// 获取年级试卷的学生成绩单
export function GetGradePaperScoreReport_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradePaperScoreReport_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取年级试卷的学生成绩单
export function GetExportGradePaperScoreReport_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetExportGradePaperScoreReport_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取年级试卷题型对比分析
export function GetGradePaperQTypeReport_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradePaperQTypeReport_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取年级试卷的学生成绩单
export function GetExportGradePaperQTypeReport_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetExportGradePaperQTypeReport_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取班级试卷题型对比分析
export function GetClassPaperQTypeReport_V3(data){
    return request({
        url:"/api/TeacherRZZD/GetClassPaperQTypeReport_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取班级试卷题型对比分析
export function GetClassPaperScoreReport_V3(data){
    return request({
        url:"/api/TeacherRZZD/GetClassPaperScoreReport_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取班级试卷的学生成绩单
export function GetExportClassPaperQTypeReport_V3(data){
    return request({
        url:"/api/TeacherRZZD/GetExportClassPaperQTypeReport_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取年级试卷的学生成绩单
export function GetExportClassPaperScoreReport_V3(data){
    return request({
        url:"/api/TeacherRZZD/GetExportClassPaperScoreReport_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 导出年级试卷各班级成绩对比分析
export function GetExportGradePaperQtypeClassCompareList_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetExportGradePaperQtypeClassCompareList_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取年级试卷各班级成绩对比分析
export function GetGradePaperQtypeClassCompareList_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradePaperQtypeClassCompareList_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}