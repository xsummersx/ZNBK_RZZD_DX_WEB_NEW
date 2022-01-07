import request from "@/utils/request";

// 界面左侧接口
// 学生个人端
// 累计作答
export function GetStuPaperNum(data) {
	return request({
		url: "/api/StuRZZD/GetStuPaperNum_V3",
		method: "GET",
		params: data,
	});
}
// 认知平均分
export function GetStuCognitiveIndex(data) {
	return request({
		url: "/api/StuRZZD/GetStuCognitiveIndex_V3",
		method: "GET",
		params: data,
	});
}
// 高考预估成绩
export function GetStuPredictedScore(data) {
	return request({
		url: "/api/StuRZZD/GetStuPredictedScore_V3",
		method: "GET",
		params: data,
	});
}
