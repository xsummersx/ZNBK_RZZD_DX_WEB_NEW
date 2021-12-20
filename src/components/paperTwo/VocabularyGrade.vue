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
			<span class="float-r check-icon"><i></i>薄弱词汇诊断</span>
		</div>
		<div id="vocabCharts"></div>
	</div>
</template>

<script>
export default {
	created() {
		// function()
		//   .then((res) => {
		//     this.info = res.Data;
		//   })
		//   .catch((err) => {
		//     console.log(err);
		//   });
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
							width: "2",
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
							textStyle: {
								color: "#666666",
							},
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
							textStyle: {
								color: "#666",
							},
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
						ClassMasterCount: 1668,
						VocabularyScoreRate: 0.9359223,
					},
				],
			},
		};
	},
	mounted() {
		this.drawLine();
	},
	computed: {
		avgScore: function () {
			return this.info.MasteredCount;
		},
		avgRate: function () {
			return (this.info.VocabularyScoreRate * 100).toFixed(2);
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
    countMax: function () {
      return 6600;
    }
	},
	methods: {
		drawLine() {
			var vocabCharts = this.$echarts.init(
				document.getElementById("vocabCharts")
			);
			vocabCharts.setOption(this.vocabOption);
			vocabCharts.setOption({
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
										opacity: 1,
										padding: [5, 0, 20, -70],
									},
									b: {
										fontSize: 14,
										color: "#00ccff",
										padding: [-15, 0, 0, 0],
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
										color: "#00ffdd",
									},
									label: {
										color: "#00ffdd",
									},
								},
							],
						},
					},
				],
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
