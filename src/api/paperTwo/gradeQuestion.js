/*
 * @Author: 柳欢
 * @Date: 2021-12-21 10:13:52
 * @LastEditTime: 2021-12-23 17:05:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\api\gradeTeacher\right.js
 */
import request from '@/utils/request';

// 界面右侧接口
// 年级端
// 获取年级做题特点
export function GetGradeExerciseTrait_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradeExerciseTrait_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 年级学习特点对比分析
export function GetGradeStudyFeatureDetail_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradeStudyFeatureDetail_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 教师端
// 获取班级做题特点
export function GetClassExerciseTrait_V3(data){
    return request({
        url:"/api/TeacherRZZD/GetClassExerciseTrait_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取班级学习特点
export function GetClassStudyFeature_V3(data){
    return request({
        url:"/api/TeacherRZZD/GetClassStudyFeature_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}