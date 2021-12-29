/*
 * @Author: your name
 * @Date: 2021-12-27 08:49:54
 * @LastEditTime: 2021-12-28 16:14:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\api\diolog\questionDiolog.js
 */
import request from '@/utils/request';

// 弹窗
// 教师端
// 获取班级某题型学生的得分率对比分析
export function GetClassSingleTypeRate_V3(data){
    return request({
        url:"/api/TeacherRZZD/GetClassSingleTypeRate_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取班级下学生做题特点对比分析
export function GetClassQtypeRateRank_V3(data){
    return request({
        url:"/api/TeacherRZZD/GetClassQtypeRateRank_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
export function GetExportClassQtypeRateRank_V3(data){
    return request({
        url:"/api/TeacherRZZD/GetExportClassQtypeRateRank_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 年级组长端
// 获取班级某题型学生的得分率对比分析
export function GetGradeSingleTypeRate_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradeSingleTypeRate_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取年级做题特点的各班级对比分析
export function GetGradeQtypeRateRank_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradeQtypeRateRank_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
export function GetExportGradeQtypeRateRank_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetExportGradeQtypeRateRank_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}