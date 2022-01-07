/*
 * @Author: your name
 * @Date: 2021-12-23 11:38:19
 * @LastEditTime: 2022-01-05 16:43:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\api\head\header.JS
 */
import request from '@/utils/request';

// 界面头部
// 教师端
// 获取用户信息
export function getUserInfo(data){
    return request({
        url:"/api/RZZD/getUserInfo",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取学生头部班级信息
export function GetStuHeadDetailInfo(data){
    return request({
        url:"/api/RZZD/GetStuHeadDetailInfo",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取学生端初始化认知评估文案内容
export function GetStuInitResultString(data){
    return request({
        url:"/api/RZZD/GetStuInitResultString",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取教师头部班级信息
export function GetClassHeadDetailInfo(data){
    return request({
        url:"/api/RZZD/GetClassHeadDetailInfo",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取年级组长头部班级信息
export function GetGradeLeaderDetailInfo(data){
    return request({
        url:"/api/RZZD/GetGradeLeaderDetailInfo",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取校长头部班级信息
export function GetSchoolHeadDetailInfo(data){
    return request({
        url:"/api/RZZD/GetSchoolHeadDetailInfo",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 获取教育局头部班级信息
export function GetDirectorHeadDetailInfo(data){
    return request({
        url:"/api/RZZD/GetDirectorHeadDetailInfo",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 知识点域
export function GetClassKnowledgeSpectrum(data){
    return request({
        url:"/api/RZZD/GetClassKnowledgeSpectrum",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取教师端初始化认知评估文案内容
export function GetClassInitResultString(data){
    return request({
        url:"/api/RZZD/GetClassInitResultString",
        method:"GET",
        params:{
            ...data
        }
    })
}


// 获取教师端初始化认知评估文案内容
export function GetCountyInitResultString(data){
    return request({
        url:"/api/RZZD/GetCountyInitResultString",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取教师端初始化认知评估文案内容
export function GetSchoolInitResultString(data){
    return request({
        url:"/api/RZZD/GetSchoolInitResultString",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 退出系统
export function ExitTheSystem(data){
    return request({
        url:"/api/RZZD/ExitTheSystem",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 用户信息
export function GetSubSystemInfo(data){
    return request({
        url:"/api/RZZD/GetSubSystemInfo",
        method:"GET",
        params:{
            ...data
        }
    })
}