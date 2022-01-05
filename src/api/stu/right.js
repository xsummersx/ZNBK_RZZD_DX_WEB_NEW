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
