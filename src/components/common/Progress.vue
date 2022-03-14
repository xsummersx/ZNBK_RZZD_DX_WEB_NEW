<template>
	<!-- 答对率百分比 -->
	<!-- 1-4日需求变更，要求词汇和语法认知进度条去掉个数，只保留答对率 -->
	<div class="mainBottom" v-if="isVoca">
		<span class="bottomTitle">常考词汇答对率</span>
		<div id="voca1"></div>
		<span class="bottomTitle">次常考词汇答对率</span>
		<div id="voca2"></div>
		<span class="bottomTitle">不常考词汇答对率</span>
		<div id="voca3"></div>
	</div>
	<div class="mainBottom" v-else>
		<span class="bottomTitle">常考语法答对率</span>
		<div id="gra1"></div>
		<span class="bottomTitle">次常考语法答对率</span>
		<div id="gra2"></div>
		<span class="bottomTitle">不常考语法答对率</span>
		<div id="gra3"></div>
	</div>
</template>

<script>
export default {
	props: {
		isVoca: {
			type: Boolean,
			default: true,
		},
		FirstScoreRate: {
			type: Number,
			default: 0,
		},
		SecondScoreRate: {
			type: Number,
			default: 0,
		},
		ThirdScoreRate: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			option: {
				yAxis: {
					type: "category",
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						show: false,
					},
				},
				xAxis: {
					show: false,
					max: 102,
				},
				grid: {
					top: "8",
					right: "25%",
					left: "0%",
					bottom: "8", //图表尺寸大小
				},
				animationDuration: 2000,
			},
		};
	},
	mounted() {
		this.draw1();
		this.draw2();
		this.draw3();
	},
	computed: {
		percent1: function () {
			return (this.FirstScoreRate * 100).toFixed(2);
		},
		percent2: function () {
			return (this.SecondScoreRate * 100).toFixed(2);
		},
		percent3: function () {
			return (this.ThirdScoreRate * 100).toFixed(2);
		},
		// data1: function () {
		// 	return 66666;
		// },
		// data2: function () {
		// 	return 55555;
		// },
		// data3: function () {
		// 	return 44444;
		// },
	},
	methods: {
		draw1() {
			let chart;
			if (this.isVoca) {
				chart = this.$echarts.init(document.getElementById("voca1"), null, {
					renderer: "svg",
				});
			} else {
				chart = this.$echarts.init(document.getElementById("gra1"), null, {
					renderer: "svg",
				});
			}
			chart.setOption(this.option);
			chart.setOption({
				series: [
					{
						type: "bar",
						barWidth: 20,
						z: 1,
						label: {
							show: true,
							position: "right",
							// padding: [-8, -80, 0, 0],
							formatter: () => {
								return `{a|${this.percent1}}{b|%}`;
							},
							rich: {
								a: {
									fontFamily: "Oswald",
									fontSize: 24,
								},
								b: {
									fontFamily: "Oswald",
									fontSize: 18,
									verticalAlign: "bottom",
								},
							},
							color: "rgba(0, 198, 255,1)",
						},
						itemStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 1,
								y2: 0,
								colorStops: [
									{
										offset: 0,
										color: "rgba(225, 225, 225, 0)",
									},
									{
										offset: 0.6,
										color: "rgba(96, 169, 247,0.6)",
									},
									{
										offset: 0.97,
										color: "rgba(36, 189, 255,1)",
									},
									{
										offset: 1,
										color: "rgba(153, 202, 255,1)",
									},
								],
							},
							borderRadius: [0, 30, 30, 0], //圆角大小
						},
						data: [this.percent1],
					},
					{
						name: "背景",
						type: "bar",
						barWidth: 20,
						z: 0,
						barGap: "-100%",
						data: [+this.percent1 + 1],
						itemStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 1,
								y2: 0,
								colorStops: [
									{
										offset: 0,
										color: "rgba(225, 225, 225, 0)",
									},
									{
										offset: 0.96,
										color: "rgba(80,162,250,0)",
									},
									{
										offset: 1,
										color: "rgba(80,162,250,0.6)",
									},
								],
							},
							borderRadius: 10,
						},
					},
				],
			});
		},
		draw2() {
			let chart;
			if (this.isVoca) {
				chart = this.$echarts.init(document.getElementById("voca2"), null, {
					renderer: "svg",
				});
			} else {
				chart = this.$echarts.init(document.getElementById("gra2"), null, {
					renderer: "svg",
				});
			}
			chart.setOption(this.option);
			chart.setOption({
				series: [
					{
						type: "bar",
						barWidth: 20,
						z: 1,
						label: {
							show: true,
							position: "right",
							formatter: () => {
								return `{a|${this.percent2}}{b|%}`;
							},
							rich: {
								a: {
									fontFamily: "Oswald",
									fontSize: 24,
								},
								b: {
									fontFamily: "Oswald",
									fontSize: 18,
									verticalAlign: "bottom",
								},
							},
							color: "rgba(247, 190, 55, 1)",
						},
						itemStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 1,
								y2: 0,
								colorStops: [
									{
										offset: 0,
										color: "rgba(225, 225, 225, 0)",
									},
									{
										offset: 0.6,
										color: "rgba(247, 108, 6,0.5)",
									},
									{
										offset: 0.97,
										color: "rgba(247, 108, 6,1)",
									},
									{
										offset: 1,
										color: "rgba(247, 190, 55,1)",
									},
								],
							},
							borderRadius: [0, 30, 30, 0], //圆角大小
						},
						data: [this.percent2],
					},
					{
						name: "背景",
						type: "bar",
						barWidth: 20,
						z: 0,
						barGap: "-100%",
						data: [+this.percent2 + 1],
						itemStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 1,
								y2: 0,
								colorStops: [
									{
										offset: 0,
										color: "rgba(225, 225, 225, 0)",
									},
									{
										offset: 0.97,
										color: "rgba(221,116,35,0)",
									},
									{
										offset: 1,
										color: "rgba(221,116,35,0.8)",
									},
								],
							},
							borderRadius: 10,
						},
					},
				],
			});
		},
		draw3() {
			let chart;
			if (this.isVoca) {
				let vocaDom = document.getElementById("voca3");
				chart = this.$echarts.init(vocaDom, null, {
					renderer: "svg",
				});
				// chart = this.$echarts.init(vocaDom);
			} else {
				let graDom = document.getElementById("gra3");
				chart = this.$echarts.init(graDom, null, {
					renderer: "svg",
				});
				// chart = this.$echarts.init(graDom);
			}
			chart.setOption(this.option);
			chart.setOption({
				series: [
					{
						type: "bar",
						barWidth: 20,
						z: 1,
						label: {
							show: true,
							position: "right",
							formatter: () => {
								return `{a|${this.percent3}}{b|%}`;
							},
							rich: {
								a: {
									fontFamily: "Oswald",
									fontSize: 24,
								},
								b: {
									fontFamily: "Oswald",
									fontSize: 18,
									verticalAlign: "bottom",
								},
							},
							color: "rgba(87, 231, 158,1)",
						},
						itemStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 1,
								y2: 0,
								colorStops: [
									{
										offset: 0,
										color: "rgba(225, 225, 225, 0)",
									},
									{
										offset: 0.6,
										color: "rgba(113,233,157,0.5)",
									},
									{
										offset: 0.97,
										color: "rgba(18, 255, 135,1)",
									},
									{
										offset: 1,
										color: "rgba(142, 250, 195,1)",
									},
								],
							},
							borderRadius: [0, 30, 30, 0], //圆角大小
						},
						data: [this.percent3],
					},
					{
						name: "背景",
						type: "bar",
						barWidth: 20,
						z: 0,
						barGap: "-100%",
						data: [+this.percent3 + 1],
						itemStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 1,
								y2: 0,
								colorStops: [
									{
										offset: 0,
										color: "rgba(225, 225, 225, 0)",
									},
									{
										offset: 0.96,
										color: "rgba(113,233,157,0)",
									},
									{
										offset: 1,
										color: "rgba(113,233,157,0.8)",
									},
								],
							},
							borderRadius: 10,
						},
					},
				],
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.mainBottom {
	display: flex;
	display: -webkit-flex;
	width: 100%;
	margin: 22px 0 0 0;
	flex-direction: column;
	.bottomTitle {
		font-size: 14px;
		color: #a9f2fe;
	}
}
.rightContent {
	font-size: 14px;
	.number {
		font-family: Oswald;
		font-size: 24px;
	}
}

#voca1 {
	width: 360px;
	height: 30px;
}
#voca2 {
	width: 360px;
	height: 30px;
}
#voca3 {
	width: 360px;
	height: 30px;
}
#gra1 {
	width: 360px;
	height: 30px;
}
#gra2 {
	width: 360px;
	height: 30px;
}
#gra3 {
	width: 360px;
	height: 30px;
}
</style>
