import request from '@/utils/request';

// 教育局端和校领导端 界面左侧接口 
// 教育局端
// 累计作答试卷
export function GetGradeLeaderPaperNum(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradeLeaderPaperNum_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 认知平均分
export function GetGradeCognitiveIndex(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradeCognitiveIndex_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 高考预估成绩
export function GetGradeLeaderPredictedScore(data){
    return request({
        url:"/api/GradeLeaderRZZD/GetGradeLeaderPredictedScore_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}
