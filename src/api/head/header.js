/*
 * @Author: your name
 * @Date: 2021-12-23 11:38:19
 * @LastEditTime: 2021-12-23 17:26:32
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
        url:"api/RZZD/getUserInfo",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 知识点域
export function GetClassKnowledgeSpectrum(data){
    return request({
        url:"api/RZZD/GetClassKnowledgeSpectrum",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取头部班级信息
export function GetClassHeadDetailInfo(data){
    return request({
        url:"api/RZZD/GetClassHeadDetailInfo",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 获取教师端初始化认知评估文案内容
export function GetClassInitResultString(data){
    return request({
        url:"api/RZZD/GetClassInitResultString",
        method:"GET",
        params:{
            ...data
        }
    })
}
// 年级组长
// 获取头部班级信息
export function GetGradeLeaderDetailInfo(data){
    return request({
        url:"api/RZZD/GetGradeLeaderDetailInfo",
        method:"GET",
        params:{
            ...data
        }
    })
}