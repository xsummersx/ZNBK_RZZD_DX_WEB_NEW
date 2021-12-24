<template>
	<div class="lanDialogPage">
		<div class="main">
			<div id="myChart"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		list: Array,
	},
	data() {
		return {
			option: {
				tooltip: {
					trigger: "axis",
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
						shadowStyle: {
							color: "rgba(193,196,202,0.1)",
						},
					},
					formatter: (params) => {
						if (params.length > 0) {
							// return `${params[0].axisValue}<br/>${params[0].marker} ${params[0].seriesName}：<span style="font-weight: bold">${params[0].value}</span>分
							// <br/>${params[1].marker} ${params[1].seriesName}：<span style="font-weight: bold">${params[1].value}</span>分<br/>
							// ${params[2].marker} ${params[2].seriesName}：<span style="font-weight: bold">${params[2].value}</span>分<br/>
							// ${params[3].marker} ${params[3].seriesName}：<span style="font-weight: bold">${params[3].value}</span>分<br/>`;
							let t = this.getFormatter(params);
							return `${params[0].axisValue}<br/>${t}`;
						} else {
							return "";
						}
					},
				},
				legend: {
					data: [
						{
							name: "听力",
							textStyle: {
								color: "#fff",
							},
						},
						{
							name: "阅读",
							textStyle: {
								color: "#fff",
							},
						},
						{
							name: "口语",
							textStyle: {
								color: "#fff",
							},
						},
						{
							name: "写作",
							textStyle: {
								color: "#fff",
							},
						},
					],
				},
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
								color: "#37eed6", // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#009880", // 100% 处的颜色
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
								color: "#ffbb39", // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#cf5c00", // 100% 处的颜色
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
								color: "#61e400", // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#389500", // 100% 处的颜色
							},
						],
						global: false,
					},
				],
				grid: {
					left: "2%",
					right: "50",
					bottom: "10",
					top: "50",
					containLabel: true,
				},
				xAxis: {
					name: "班级",
					type: "category",
					//   data: ["高三(1)班", "高三(2)班", "高三(3)班", "高三(4)班", "高三(5)班"],
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
						name: "分值(分)",
						nameTextStyle: {
							color: "#a2afcc",
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: "rgba(128,151,177,0.3)",
								type: "dotted",
							},
						},
						axisTick: {
							show: false,
						},
						splitNumber: 4,
						position: "left",
						interval: 25,
						max: 100,
						axisLine: {
							show: true,
							lineStyle: {
								color: "rgba(224,231,255,0.3)",
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
						name: "听力",
						type: "bar",
						barWidth: "16px",
						itemStyle: {
							borderRadius: [2, 2, 0, 0],
						},
					},
					{
						name: "阅读",
						type: "bar",
						barWidth: "16px",
						itemStyle: {
							borderRadius: [2, 2, 0, 0],
						},
					},
					{
						name: "口语",
						type: "bar",
						barWidth: "16px",
						itemStyle: {
							borderRadius: [2, 2, 0, 0],
						},
					},
					{
						name: "写作",
						type: "bar",
						barWidth: "16px",
						itemStyle: {
							borderRadius: [2, 2, 0, 0],
						},
					},
				],
			},
		};
	},
	computed: {
		xdata: function () {
			return this.list.map((item) => item.CourseClassName);
			// return ["高三(1)班", "高三(2)班", "高三(3)班", "高三(4)班", "高三(5)班"];
		},
		TLData: function () {
			return this.list.map((item) => item.TLScore);
			// return [40, 70, 100, 80, 60, 90];
		},
		YDData: function () {
			return this.list.map((item) => item.YDScore);
			// return [22, 33, 11, 82, 90, 10];
		},
		KYData: function () {
			return this.list.map((item) => item.KYScore);
			// return [48, 20, 100, 30, 20, 10];
		},
		XZData: function () {
			return this.list.map((item) => item.XZScore);
			// return [90, 90, 10, 10, 40, 100];
		},
	},
	mounted() {
		this.drawLine();
	},
	methods: {
		drawLine() {
			var myChart = this.$echarts.init(document.getElementById("myChart"));
			myChart.setOption(this.option);
			myChart.setOption({
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
						name: "听力",
						data: this.TLData,
					},
					{
						name: "阅读",
						data: this.YDData,
					},
					{
						name: "口语",
						data: this.KYData,
					},
					{
						name: "写作",
						data: this.XZData,
					},
				],
			});
		},
		getFormatter(arr) {
			let temp = arr.map((item) => {
				return `${item.marker} ${item.seriesName}：<span style="font-weight: bold">${item.value}</span>分<br/>`;
			});
			let content = "";
			for (let k in temp) {
				content += temp[k];
			}
			return content;
		},
	},
};
</script>

<style lang="scss" scoped>
.lanDialogPage {
	width: 1000px;
	height: 558px;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	.main {
		width: 960px;
		height: 518px;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		background-color: rgba($color: #000033, $alpha: 0.2);
		border-radius: 4px;
	}
}
#myChart {
	width: 900px;
	height: 500px;
}
</style>
