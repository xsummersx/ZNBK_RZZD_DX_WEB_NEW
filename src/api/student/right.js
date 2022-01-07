/*
 * @Author: your name
 * @Date: 2022-01-05 16:18:07
 * @LastEditTime: 2022-01-05 16:35:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\api\student\right.js
 */
import request from '@/utils/request';

// 界面头部
// 学生端
// 学习特点
export function GetStuStudyFeature_V3(data){
    return request({
        url:"/api/StuRZZD/GetStuStudyFeature_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 做题特点
export function GetStuExerciseTrait_V3(data){
    return request({
        url:"/api/StuRZZD/GetStuExerciseTrait_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 学生历次作答统计
export function GetStuPublishedPaperDaily_V3(data){
    return request({
        url:"/api/StuRZZD/GetStuPublishedPaperDaily_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}