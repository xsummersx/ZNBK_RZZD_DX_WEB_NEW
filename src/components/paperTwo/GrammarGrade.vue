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
			<span class="float-r check-icon"><i></i>薄弱语法诊断</span>
		</div>
		<div id="grammerCharts"></div>
	</div>
</template>

<script>
import { GetGradeGrammerCompare } from "@/api/paperTwo/question";
export default {
	created() {
		// GetGradeGrammerCompare()
		//   .then((res) => {
		//     this.info = res.Data;
		//   })
		//   .catch((err) => {
		//     console.log(err);
		//   });
	},
	data() {
		return {
			gramOption: {
				tooltip: {
					trigger: "axis",
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						lineStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: "rgba(126,199,255,0)", // 0% 处的颜色
									},
									{
										offset: 0.5,
										color: "rgba(126,199,255,1)", // 100% 处的颜色
									},
									{
										offset: 1,
										color: "rgba(126,199,255,0)", // 100% 处的颜色
									},
								],
								global: false, // 缺省为 false
							},
						},
					},
				},
				grid: {
					left: "2%",
					right: "50",
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
						textStyle: {
							color: "#ffffff",
						},
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
							textStyle: {
								color: "#a2afcc",
							},
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
							normal: {
								//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
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
					},
				],
			},
			// 接口返回数据
			info: {
				GradeGrammerAvgScoreRate: 0.6985816,
				ClassGrammerScoreRateList: [
					{
						CourseClassID: "2D30765C-D5BD-40C6-861E-F843910DE80E",
						CourseClassName: "初三(1)班",
						ClassGrammerScoreRate: 0.6985816,
					},
					{
						CourseClassID: "D9FA6DD3-753F-426D-A226-4D7DAF04589B",
						CourseClassName: "初三(3)班",
						ClassGrammerScoreRate: 0.2985816,
					},
					{
						CourseClassID: "90EC6CF6-945C-4710-AFB8-96BC6CC0A549",
						CourseClassName: "初三(4)班",
						ClassGrammerScoreRate: 0.9985816,
					},
					{
						CourseClassID: "53157C04-499D-4A8C-8A7A-DCBCCAA231CD",
						CourseClassName: "初三(2)班",
						ClassGrammerScoreRate: 0.0985816,
					},
					{
						CourseClassID: "36503EB2-79B9-4185-B147-CDEAF092EF9B",
						CourseClassName: "初三(5)班",
						ClassGrammerScoreRate: 0.5985816,
					},
					{
						CourseClassID: "F8A16F15-DE8F-47F6-8777-5C8DE89E4D46",
						CourseClassName: "初三(6)班",
						ClassGrammerScoreRate: 0.6985816,
					},
				],
			},
		};
	},

	mounted() {
		this.drawLine();
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
			GetGradeGrammerCompare()
				.then((res) => {
					this.info = res.Data;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		drawLine() {
			var grammerCharts = this.$echarts.init(
				document.getElementById("grammerCharts")
			);
			grammerCharts.setOption(this.gramOption);
			grammerCharts.setOption({
				// dataZoom: [
				//   {
				//     type: "inside",
				//     // show: true,
				//     // height: 15,
				//     xAxisIndex: [0],
				//     // start: 0,
				//     // end: (5 / barData.length) * 100,
				//     zoomOnMouseWheel: false,
				//   },
				// ],
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
										padding: [5, 0, 20, -70],
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
						data: this.ydata,
					},
				],
			});
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
