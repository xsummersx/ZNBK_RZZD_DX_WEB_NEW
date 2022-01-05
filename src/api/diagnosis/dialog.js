import request from "@/utils/request";

// 薄弱诊断
// 教师端
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
// 词汇弹窗
export function GetGradeVocabDetailInfo(data) {
	return request({
		url: "/api/GradeLeaderRZZD/GetGradeVocabDetailInfo_V3",
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

// 学生个人端
// 词汇弹窗
export function GetStuDetailVocabulary(data) {
	return request({
		url: "/api/GradeLeaderRZZD/GetStuDetailVocabulary_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}
// 语法弹窗
export function GetStuGrammerZsdMapApplication(data) {
	return request({
		url: "/api/StuRZZD/GetStuGrammerZsdMapApplication_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}
