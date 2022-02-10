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
// 词汇导出报告
export function GetExportClassVocabPlans(data) {
	return request({
		url: "/api/TeacherRZZD/GetExportClassVocabPlans",
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
// 语法导出报告
export function GetExportClassWeakGrammerDiagnosis(data) {
	return request({
		url: "/api/TeacherRZZD/GetExportClassWeakGrammerDiagnosis_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}

// 年级组长端
// 词汇首页
export function GetGradeRecommendVoca(data) {
	return request({
		url: "/api/GradeLeaderRZZD/GetGradeRecommendVoca_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}
// 词汇导出报告
export function GetExportGradeVocabPlans(data) {
	return request({
		url: "/api/GradeLeaderRZZD/GetExportGradeVocabPlans",
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
// 语法导出报告
export function GetExportGradeWeakGrammerDiagnosis(data) {
	return request({
		url: "/api/TeacherRZZD/GetExportGradeWeakGrammerDiagnosis_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}


// 获取知识点课件
export function GetZSDCourseware(data) {
	return request({
		url: "/api/RZZD/GetZSDCourseware",
		method: "GET",
		params: {
			...data,
		},
	});
}

// 学生个人端
// 词汇首页
export function GetStuVocabInfoList(data) {
	return request({
		url: "/api/StuRZZD/GetStuVocabInfoList_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}
// 词汇导出报告
export function GetExportStuVocabPlans(data) {
	return request({
		url: "/api/StuRZZD/GetExportStuVocabPlans",
		method: "GET",
		params: {
			...data,
		},
	});
}

// 语法首页
export function GetStuWeakGrammerDiagnosis(data) {
	return request({
		url: "/api/StuRZZD/GetStuWeakGrammerDiagnosis_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}
// 语法导出报告
export function GetExportStuWeakGrammerDiagnosis(data) {
	return request({
		url: "/api/StuRZZD/GetExportStuWeakGrammerDiagnosis_V3",
		method: "GET",
		params: {
			...data,
		},
	});
}