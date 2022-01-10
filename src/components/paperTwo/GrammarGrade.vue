<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-10 11:20:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，语法认知
-->
<template>
	<div class="right-small-box">
		<div class="box-title clearfix">
			<span class="float-l title">语法认知对比分析</span>
			<span class="float-r check-icon" @click="toDiagnosis"
				><i></i>薄弱语法诊断</span
			>
		</div>
		<div id="grammerCharts" v-show="isShow"></div>
		<NoDataVGL v-if="!isShow" type="gra" />
	</div>
</template>

<script>
import { GetGradeGrammerCompare } from "@/api/paperTwo/question";
export default {
	created() {
		this.init();
	},
	data() {
		return {
			gramOption: {
				tooltip: {
					trigger: "axis",
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: "line",
						lineStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									// {
									// 	offset: 0,
									// 	color: "rgba(126,199,255,0.5)", // 0% 处的颜色
									// },
									// {
									// 	offset: 0.5,
									// 	color: "rgba(126,199,255,1)",
									// },
									{
										offset: 1,
										color: "rgba(126,199,255,0.7)", // 100% 处的颜色
									},
								],
								global: true,
							},
						},
					},
					formatter: (params) => {
						// console.log(params);
						return `${params[0].axisValue}<br/>${params[0].marker} ${params[0].seriesName}：<span style="font-weight: bold">${params[0].value}</span>%`;
					},
				},
				grid: {
					left: "2%",
					right: "80",
					bottom: "10",
					top: "16%",
					containLabel: true,
				},
				xAxis: {
					type: "category",
					axisLine: {
						lineStyle: {
							color: "rgba(224,231,255,0.3)",
							width: "1",
						},
					},
					axisTick: { show: false },
					axisLabel: {
						color: "#ffffff",
					},
				},

				yAxis: [
					{
						type: "value",
						name: "答对率(%)",
						nameTextStyle: {
							color: "#a2afcc",
							fontSize: 12,
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: "rgba(128,151,177,0.3)",
								type: "dotted",
							},
						},
						splitNumber: 4,
						interval: 25,
						max: 100,
						position: "left",
						axisLine: {
							show: true,
							lineStyle: {
								color: "#e0e7ff",
								opacity: "0.3",
							},
						},
						axisLabel: {
							show: true,
							formatter: "{value}", //右侧Y轴文字显示
							color: "#a2afcc",
						},
					},
				],
				series: [
					{
						name: "答对率",
						cursor: "default",
						type: "line",
						barWidth: "16px",
						showAllSymbol: true,
						symbolSize: 0,
						itemStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: "#009cff",
									},
									{
										offset: 1,
										color: "#009cff",
									},
								],
							},
						},
						areaStyle: {
							//区域填充样式
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: "rgba(3,163,233,.8)",
									},
									{
										offset: 1,
										color: "rgba(25,163,223, 0)",
									},
								],
							},
							shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
							shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
						},
					},
				],
			},
			// 接口返回数据
			info: {
				// GradeGrammerAvgScoreRate: 0.6985816,
				// ClassGrammerScoreRateList: [
				// 	{
				// 		CourseClassID: "2D30765C-D5BD-40C6-861E-F843910DE80E",
				// 		CourseClassName: "初三(1)班",
				// 		ClassGrammerScoreRate: 0.6985816,
				// 	},
				// 	{
				// 		CourseClassID: "D9FA6DD3-753F-426D-A226-4D7DAF04589B",
				// 		CourseClassName: "初三(3)班",
				// 		ClassGrammerScoreRate: 0.2985816,
				// 	},
				// 	{
				// 		CourseClassID: "90EC6CF6-945C-4710-AFB8-96BC6CC0A549",
				// 		CourseClassName: "初三(4)班",
				// 		ClassGrammerScoreRate: 0.9985816,
				// 	},
				// 	{
				// 		CourseClassID: "53157C04-499D-4A8C-8A7A-DCBCCAA231CD",
				// 		CourseClassName: "初三(2)班",
				// 		ClassGrammerScoreRate: 0.0985816,
				// 	},
				// 	{
				// 		CourseClassID: "36503EB2-79B9-4185-B147-CDEAF092EF9B",
				// 		CourseClassName: "初三(5)班",
				// 		ClassGrammerScoreRate: 0.5985816,
				// 	},
				// 	{
				// 		CourseClassID: "F8A16F15-DE8F-47F6-8777-5C8DE89E4D46",
				// 		CourseClassName: "初三(6)班",
				// 		ClassGrammerScoreRate: 0.6985816,
				// 	},
				// ],
			},
			// 最低答对率
			minData: [],
			isShow: true,
		};
	},
	components: {
		NoDataVGL: () => import("../common/NoDataVGL.vue"),
	},
	computed: {
		avgRate: function () {
			return (this.info.GradeGrammerAvgScoreRate * 100).toFixed(2);
		},
		xdata: function () {
			return this.info.ClassGrammerScoreRateList.map(
				(item) => item.CourseClassName
			);
			// return [
			// 	"高中一班",
			// 	"高中二班",
			// 	"高中三班",
			// 	"高中四班",
			// 	"高中五班",
			// 	"高中一班",
			// ];
		},
		ydata: function () {
			return this.info.ClassGrammerScoreRateList.map((item) =>
				(item.ClassGrammerScoreRate * 100).toFixed(2)
			);
			// return [40, 40, 30, 90, 30, 80, 40, 40, 30];
		},
	},
	methods: {
		init() {
			let params = {
				...this.$store.state,
			};
			delete params.UserInfo;
			GetGradeGrammerCompare(params)
				.then((res) => {
					this.info = res.Data;
					if (res.Data.ClassGrammerScoreRateList.length == 0) {
						this.isShow = false;
					} else {
						this.isShow = true;
						this.minData = res.Data.MinClassList.map((item) => {
							return {
								xAxis: item.CourseClassName,
								yAxis: (item.ClassGrammerScoreRate * 100).toFixed(2),
							};
						});
						this.drawLine();
					}
				})
				.catch(() => {
					this.isShow = false;
				});
		},
		drawLine() {
			var grammerCharts = this.$echarts.init(
				document.getElementById("grammerCharts"),
				null,
				{
					renderer: "svg",
				}
			);
			grammerCharts.setOption(this.gramOption);
			grammerCharts.setOption({
				dataZoom: [
					{
						type: "inside",
						show: false,
						xAxisIndex: [0],
						start: 0,
						end: (5 / this.xdata.length) * 100,
					},
				],
				xAxis: {
					data: this.xdata,
				},
				series: [
					{
						name: "平均答对率",
						markLine: {
							silent: "true",
							symbol: "none",
							label: {
								show: true,
								position: "end",
								fontSize: 12,
								color: "#00ffdd",
								formatter: "{a|平均答对率}{b|" + this.avgRate + "%}",
								rich: {
									a: {
										color: "#00ffdd",
										fontSize: 12,
										fontFamily: "MicrosoftYaHei",
										opacity: 1,
										padding: [5, 0, 20, -40],
									},
									b: {
										fontSize: 14,
										color: "#00ffdd",
										padding: [-15, 0, 0, 0],
									},
								},
							},
							lineStyle: {
								type: "dashed",
							},
							data: [
								{
									yAxis: this.avgRate,
									lineStyle: {
										color: "#00ccff",
									},
									label: {
										color: "#00ccff",
									},
								},
							],
						},
						markPoint: {
							symbol:
								"image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE2RjFEQjc2NTgwMTExRUM5RTFCRTIzRDAyOUYzNTYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE2RjFEQjc3NTgwMTExRUM5RTFCRTIzRDAyOUYzNTYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTZGMURCNzQ1ODAxMTFFQzlFMUJFMjNEMDI5RjM1NjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTZGMURCNzU1ODAxMTFFQzlFMUJFMjNEMDI5RjM1NjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz49eoCiAAAAs0lEQVR42mL8UtPMAAWhQJwDxMZQ/hkgngrEq0EcJiBmBOLZQLwKiO2AmBuK7aFiIDlGFiARD8QpDLgBSO4YyMRcJMG7QOwIxXeRxLNACrWQBLqA+AAUdyGJ64AUvkYSsIS6mRHKhoHXIIVbkQQSgPgSFCcgiW9hglrxDdkaKIYBkFw3SOF9IM7D42uQ3H0mKGcuEFcA8X8kBf+hYiA5BhYkiU4gvg51CsgzpUC8CSYJEGAAT/cjWt241fUAAAAASUVORK5CYII=",
							symbolSize: [10, 10],
							symbolOffset: [0, -10], //偏移位置
							cursor: "default",
							itemStyle: {
								color: "red",
							},
							emphasis: {
								label: {
									show: false,
									color: "transparent",
								},
							},
							label: {
								show: false,
							},
							data: this.minData,
						},
						data: this.ydata,
					},
				],
			});
		},
		// 跳转薄弱诊断
		toDiagnosis() {
			let url = this.$router.resolve({
				path: "/DiagReport",
				query: {
					token: this.$store.state.token,
					userType: "grade",
					reportType: "gra",
					stageNo: this.$store.state.StageNo,
					schoolID: this.$store.state.SchoolID,
					globalGrade: this.$store.state.GlobalGrade,
				},
			});
			window.open(url.href, "_blank");
		},
	},
};
</script>

<style lang="scss" scoped>
#grammerCharts {
	width: 580px;
	height: 220px;
}
</style>
