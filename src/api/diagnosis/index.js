import request from "@/utils/request";

// 薄弱诊断
// 教师端
// 词汇首页
export function GetClassRecommendVoca(data) {
	return request({
		url: "/api/TeacherRZZD/GetClassRecommendVoca_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}
// 词汇弹窗
export function GetClassVocabDetailInfo(data) {
	return request({
		url: "/api/TeacherRZZD/GetClassVocabDetailInfo_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}
// 语法首页
export function GetClassWeakGrammerDiagnosis(data) {
	return request({
		url: "/api/TeacherRZZD/GetClassWeakGrammerDiagnosis_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}
// 语法弹窗
export function GetGrammerZsdMapApplication(data) {
	return request({
		url: "/api/TeacherRZZD/GetGrammerZsdMapApplication_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}

// 年级组长端
// 词汇首页
// ❎
export function GetClassRecommen2dVoca(data) {
	return request({
		url: "/api/GradeLeaderRZZD/GetClassRecommendVoca_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}
// 词汇弹窗
// ❎
export function GetClassVocabDet2ailInfo(data) {
	return request({
		url: "/api/GradeLeaderRZZD/GetClassVocabDetailInfo_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}
// 语法首页
export function GetGradeWeakGrammerDiagnosis(data) {
	return request({
		url: "/api/GradeLeaderRZZD/GetGradeWeakGrammerDiagnosis_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}
// 语法弹窗
export function GetGradeGrammerZsdMapApplication(data) {
	return request({
		url: "/api/GradeLeaderRZZD/GetGradeGrammerZsdMapApplication_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}
