/*
 * @Author: 柳欢
 * @Date: 2021-12-21 10:13:52
 * @LastEditTime: 2021-12-23 17:04:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\api\gradeTeacher\right.js
 */
import request from '@/utils/request';

// 界面右侧接口
// 教师端
// 教师端重点关注学生
export function GetClassSpecialFocusStudents_V3(data){
    return request({
        url:"/api/TeacherRZZD/GetClassSpecialFocusStudents_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 班级下学生认知成绩单
export function GetClassScoreReport_V3(data){
    return request({
        url:"/api/TeacherRZZD/GetClassScoreReport_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 班级历次作答统计
export function GetPublishedPaperDaily_V3(data){
    return request({
        url:"/api/TeacherRZZD/GetPublishedPaperDaily_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 年级组长端
// 重点关注班级
export function GetGradeSpecialFocusClass_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradeSpecialFocusClass_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 班级认知情况对比分析
export function GetGradeClassCongnitiveTrastAnalysis_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradeClassCongnitiveTrastAnalysis_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 年级历次作答统计
export function GetGradePublishedPaperDaily_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradePublishedPaperDaily_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}