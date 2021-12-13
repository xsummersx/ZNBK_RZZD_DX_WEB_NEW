import request from '@/utils/request';

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

// 词汇认知
export function GetClassVocabulary(data){
    return request({
        url:"/api/TeacherRZZD/GetClassVocabulary_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}