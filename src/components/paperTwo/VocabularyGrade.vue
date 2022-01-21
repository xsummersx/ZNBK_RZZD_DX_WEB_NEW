<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-10 11:20:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，词汇
-->
<template>
	<div class="right-small-box">
		<div class="box-title clearfix">
			<span class="float-l title">词汇认知对比分析</span>
			<span class="float-r check-icon" @click="toDiagnosis"
				><i></i>薄弱词汇诊断</span
			>
		</div>
		<div id="vocabCharts" v-show="isShow"></div>
		<NoDataVGL v-if="!isShow" type="voca" />
	</div>
</template>

<script>
import { GetGradeVocabulary } from "@/api/paperTwo/question";
export default {
	created() {
		this.init();
	},
	data() {
		return {
			vocabOption: {
				tooltip: {
					trigger: "axis",
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
					},
					formatter: (params) => {
						// console.log(params);
						return `${params[0].axisValue}<br/>${params[0].marker} ${params[0].seriesName}：<span style="font-weight: bold">${params[0].value}</span>个
            <br/>${params[1].marker} ${params[1].seriesName}：<span style="font-weight: bold">${params[1].value}</span>%<br/>`;
					},
				},
				grid: {
					left: "2%",
					right: "100",
					bottom: "10",
					top: "16%",
					containLabel: true,
				},
				xAxis: {
					type: "category",
					axisLine: {
						lineStyle: {
							color: "rgba(224,231,255,0.3)",
							width: "2",
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
						axisLine: {
							show: false,
							lineStyle: {
								color: "#cdd5e2",
							},
						},
						splitLine: {
							show: false,
						},
						// 修改最大数值 toto
						max: 800,
						axisLabel: {
							show: false,
							color: "#666666",
						},
					},
					{
						type: "value",
						name: "",
						nameTextStyle: {
							color: "#666666",
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
						position: "right",
						axisLine: {
							lineStyle: {
								color: "#cdd5e2",
							},
						},
						axisLabel: {
							show: false,
							formatter: "{value} %", //右侧Y轴文字显示
							color: "#666",
						},
					},
				],
				color: [
					{
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#00f0ff", // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#0036ff", // 100% 处的颜色
							},
						],
						global: false,
					},
					{
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#009880", // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#37eed6", // 100% 处的颜色
							},
						],
						global: false,
					},
				],
			},
			// 接口返回数据
			info: {
				MasteredCount: 3416,
				VocabularyScoreRate: 0.6772271,
				ClassList: [
					{
						CourseClassID: "FD4A1310-57EB-40FB-BC20-B8120FFDDA5D",
						CourseClassName: "初三(1)班",
						ClassMasterCount: 3467,
						VocabularyScoreRate: 0.63934046,
					},
					{
						CourseClassID: "BFF54539-01AF-4759-823A-0EBB5C1415DE",
						CourseClassName: "初三(2)班",
						ClassMasterCount: 4191,
						VocabularyScoreRate: 0.734067142,
					},
					{
						CourseClassID: "499B60B2-D4E8-4135-BE7D-F9DF32403A5B",
						CourseClassName: "初三(3)班",
						ClassMasterCount: 3668,
						VocabularyScoreRate: 0.6359223,
					},
					{
						CourseClassID: "499B60B2-D4E8-4135-BE7D-F9DF32403A5",
						CourseClassName: "初三(4)班",
						ClassMasterCount: 6600,
						VocabularyScoreRate: 0.23592,
					},
					{
						CourseClassID: "499B60B2-D4E8-4135-BE7D-F9DF32403A",
						CourseClassName: "初三(5)班",
						ClassMasterCount: 5668,
						VocabularyScoreRate: 0.2359223,
					},
					{
						CourseClassID: "499B60B2-D4E8-4135-BE7D-F9DF32403A",
						CourseClassName: "初三(6)班",
						ClassMasterCount: 1668,
						VocabularyScoreRate: 0.3359223,
					},
				],
			},
			// 词汇量最低
			minCountData: [],
			// 答对率最低
			minRateData: [],
			isShow: true,
		};
	},
	components: {
		NoDataVGL: () => import("../common/NoDataVGL.vue"),
	},
	computed: {
		avgScore: function () {
			return this.info.MasteredCount;
			// return 5000;
		},
		avgRate: function () {
			return (this.info.VocabularyScoreRate * 100).toFixed(2);
			// return 36;
		},
		xdata: function () {
			return this.info.ClassList.map((item) => item.CourseClassName);
			// return [
			//   "高中一班",
			//   "高中二班",
			//   "高中三班",
			//   "高中四班",
			//   "高中五班",
			//   "高中六班",
			//   "高中七班",
			//   "高中八班",
			// ];
		},
		// 平均掌握量
		ydata1: function () {
			return this.info.ClassList.map((item) => item.ClassMasterCount);
			// return [200, 430, 340, 130, 600, 400, 40, 300, 533];
		},
		// 平均答对率
		ydata2: function () {
			return this.info.ClassList.map((item) =>
				(item.VocabularyScoreRate * 100).toFixed(2)
			);
			// return [44, 55, 11, 22, 88, 44, 66, 77, 55];
		},
		// 词汇总量
		countMax: function () {
			return this.info.VocabularyTotalCount;
			// return 10000;
		},
		distance: function () {
			if (this.countMax === 0) {
				this.alertVoca();
				return 0 - this.avgRate;
			} else {
				return (this.avgScore / this.countMax) * 100 - this.avgRate;
			}
		},
		firstPaddingA: function () {
			if (-14 < this.distance && this.distance < 0) {
				return [0, 0, -25, -20];
			} else {
				return [0, 0, 20, -20];
			}
		},
		firstPaddingB: function () {
			if (-14 < this.distance && this.distance < 0) {
				return [0, 0, -25, 0];
			} else {
				return [-20, 0, 0, 0];
			}
		},
		secondPaddingA: function () {
			if (0 <= this.distance && this.distance < 14) {
				return [0, 0, -25, -20];
			} else {
				return [0, 0, 20, -20];
			}
		},
		secondPaddingB: function () {
			if (0 <= this.distance && this.distance < 14) {
				return [0, 0, -25, 0];
			} else {
				return [-20, 0, 0, 0];
			}
		},
	},
	methods: {
		drawLine() {
			let vocabCharts = this.$echarts.init(
				document.getElementById("vocabCharts"),
				null,
				{
					renderer: "svg",
				}
			);
			vocabCharts.setOption(this.vocabOption);
			vocabCharts.setOption({
				dataZoom: [
					{
						type: "inside",
						show: false,
						xAxisIndex: [0],
						start: 0,
						end: (3 / this.xdata.length) * 100,
					},
				],
				xAxis: {
					data: this.xdata,
				},
				yAxis: [
					{
						max: this.countMax,
					},
					{
						max: 100,
					},
				],
				series: [
					{
						name: "平均掌握量",
						type: "bar",
						barWidth: "16px",
						itemStyle: {
							borderRadius: [2, 2, 0, 0],
						},
						data: this.ydata1,
						markLine: {
							silent: "true",
							symbol: "none",
							label: {
								show: true,
								position: "end",
								fontSize: 12,
								color: "#00ccff",
								formatter: "{a|平均掌握量}{b|" + this.avgScore + "个}",
								rich: {
									a: {
										color: "#69dffd",
										fontSize: 12,
										fontFamily: "MicrosoftYaHei",
										// height: "20px",
										// width: "20px",
										// backgroundColor: "rgba(39,46,56,0.5)",
										opacity: 1,
										padding: this.firstPaddingA,
									},
									b: {
										fontSize: 14,
										color: "#00ccff",
										padding: this.firstPaddingB,
									},
								},
							},
							lineStyle: {
								type: "dashed",
							},
							data: [
								{
									yAxis: this.avgScore,
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
							data: this.minCountData,
						},
					},
					{
						name: "平均答对率",
						type: "bar",
						barWidth: "16px",
						yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
						itemStyle: {
							borderRadius: [2, 2, 0, 0],
						},
						data: this.ydata2,
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
										padding: this.secondPaddingA,
									},
									b: {
										fontSize: 14,
										color: "#00ffdd",
										padding: this.secondPaddingB,
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
										color: "#00ffdd",
									},
									label: {
										color: "#00ffdd",
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
							data: this.minRateData,
						},
					},
				],
			});
		},
		init() {
			let params = {
				...this.$store.state,
			};
			delete params.UserInfo;
			GetGradeVocabulary(params)
				.then((res) => {
					this.info = res.Data;
					if (res.Data.ClassList.length == 0) {
						this.isShow = false;
					} else {
						this.isShow = true;
						this.minCountData = res.Data.MinCountList.map((item) => {
							return {
								xAxis: item.CourseClassName,
								yAxis: item.ClassMasterCount,
							};
						});
						this.minRateData = res.Data.MinRateList.map((item) => {
							return {
								xAxis: item.CourseClassName,
								yAxis: (item.VocabularyScoreRate * 100).toFixed(2),
							};
						});
						this.drawLine();
					}
				})
				.catch(() => {
					this.isShow = false;
				});
		},
		// 跳转薄弱诊断
		toDiagnosis() {
			let url = this.$router.resolve({
				path: "/DiagReport",
				query: {
					token: this.$store.state.token,
					userType: "grade",
					reportType: "voca",
					stageNo: this.$store.state.StageNo,
					schoolID: this.$store.state.SchoolID,
					globalGrade: this.$store.state.GlobalGrade,
				},
			});
			window.open(url.href, "_blank");
		},
		alertVoca() {
			this.$message({
				type: "warning",
				message: "词汇认知对比分析：总词汇量为0，接口错误！",
				duration: 2500,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.right-small-box {
	margin-right: 30px;
}
#vocabCharts {
	width: 580px;
	height: 220px;
}
</style>
