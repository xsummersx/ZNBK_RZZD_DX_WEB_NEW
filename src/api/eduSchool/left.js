import request from '@/utils/request';

// 教育局端和校领导端 界面左侧接口 
// 校领导端
// 累计作答试卷
export function GetSchoolPaperNum(data){
    return request({
        url:"/api/SchoolMasterRZZD/GetSchoolPaperNum_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 认知平均分
export function GetSchoolCongnitiveIndex(data){
    return request({
        url:"/api/SchoolMasterRZZD/GetSchoolCongnitiveIndex_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 高考预估成绩
export function GetSchoolPredicted(data){
    return request({
        url:"/api/SchoolMasterRZZD/GetSchoolPredicted_V3",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 教育局端
// 累计作答试卷
export function GetAreaPaperNum(data){
    return request({
        url:"/api/DirectorRZZD/GetAreaPaperNum",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 认知平均分
export function GetAreaCognitiveIndex(data){
    return request({
        url:"/api/DirectorRZZD/GetAreaCognitiveIndex",
        method:"GET",
        params:{
            ...data
        }
    })
}

// 高考预估成绩
export function GetAreaPredictedScore(data){
    return request({
        url:"/api/DirectorRZZD/GetAreaPredictedScore",
        method:"GET",
        params:{
            ...data
        }
    })
}