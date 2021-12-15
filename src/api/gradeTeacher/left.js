import request from '@/utils/request';

// 界面左侧接口
// 教师端
// 累计作答试卷
export function GetClassPaperNum(data){
    return request({
        url:"/api/TeacherRZZD/GetClassPaperNum_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 认知平均分
export function GetClassCognitiveIndex(data){
    return request({
        url:"/api/TeacherRZZD/GetClassCognitiveIndex_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 高考预估成绩
export function GetClassPredictedScore(data){
    return request({
        url:"/api/TeacherRZZD/GetClassPredictedScore_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 年级组长端
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