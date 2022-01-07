import request from "@/utils/request";

// 界面右侧接口
// 学生个人端
// 学生个人语法认知
export function GetStuGrammer(data) {
	return request({
		url: "/api/StuRZZD/GetStuGrammer_V3",
		method: "GET",
		params: data,
	});
}
// 学生个人语言能力
export function GetStuLanguage(data) {
	return request({
		url: "/api/StuRZZD/GetStuLanguage_V3",
		method: "GET",
		params: data,
	});
}
// 学生个人词汇认知
export function GetStuVocabulary(data) {
	return request({
		url: "/api/StuRZZD/GetStuVocabulary_V3",
		method: "GET",
		params: data,
	});
}
