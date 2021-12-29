/*
 * @Author: your name
 * @Date: 2021-12-27 15:46:12
 * @LastEditTime: 2021-12-27 19:29:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\api\diolog\historyDiolog.js
 */
import request from '@/utils/request';

// 弹窗
// 教师端
// 获取年级历次已发布试卷
export function GetGradeReleasedPaperList_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradeReleasedPaperList_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
export function GetExportGradePapersQTypeScore_V3(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetExportGradePapersQTypeScore_V3",
        method:"POST",
        params:{
            ...data
        }
    })
}