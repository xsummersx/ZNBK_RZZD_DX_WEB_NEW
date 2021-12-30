<template>
	<div class="mainBottom" v-if="isVoca">
		<span class="bottomTitle">常考词汇答对率{{ percent1 }}%</span>
		<div id="voca1"></div>
		<span class="bottomTitle">次常考词汇答对率{{ percent2 }}%</span>
		<div id="voca2"></div>
		<span class="bottomTitle">不常考词汇答对率{{ percent3 }}%</span>
		<div id="voca3"></div>
	</div>
	<div class="mainBottom" v-else>
		<span class="bottomTitle">常考语法答对率{{ percent1 }}%</span>
		<div id="gra1"></div>
		<span class="bottomTitle">次常考语法答对率{{ percent2 }}%</span>
		<div id="gra2"></div>
		<span class="bottomTitle">不常考语法答对率{{ percent3 }}%</span>
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
					max: 100,
				},
				grid: {
					top: "8",
					right: "24%",
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
			return 80;
		},
		percent2: function () {
			return 30;
		},
		percent3: function () {
			return 55;
		},
		data1: function () {
			return 66666;
		},
		data2: function () {
			return 55555;
		},
		data3: function () {
			return 44444;
		},
	},
	methods: {
		draw1() {
			let chart;
			if (this.isVoca) {
				chart = this.$echarts.init(document.getElementById("voca1"));
			} else {
				chart = this.$echarts.init(document.getElementById("gra1"));
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
								return `{a|${this.data1}}{b|个}`;
							},
							rich: {
								a: {
									fontFamily: "Oswald",
									fontSize: 24,
								},
								b: {
									fontSize: 14,
								},
							},
							color: "rgba(80,162,250,1)",
						},
						itemStyle: {
							normal: {
								color: {
									type: "linear",
									x: 1,
									x2: 0,
									y: 0,
									y2: 1,
									colorStops: [
										{
											offset: 1,
											color: "rgba(225, 225, 225, 0)",
										},
										{
											offset: 0.4,
											color: "rgba(80,162,250,0.5)",
										},
										{
											offset: 0,
											color: "rgba(80,162,250,1)",
										},
									],
								},
								borderRadius: [0, 30, 30, 0], //圆角大小
							},
						},
						data: [this.percent1],
					},
				],
			});
		},
		draw2() {
			let chart;
			if (this.isVoca) {
				chart = this.$echarts.init(document.getElementById("voca2"));
			} else {
				chart = this.$echarts.init(document.getElementById("gra2"));
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
								return `{a|${this.data2}}{b|个}`;
							},
							rich: {
								a: {
									fontFamily: "Oswald",
									fontSize: 24,
								},
								b: {
									fontSize: 14,
								},
							},
							color: "rgba(221,116,35, 1)",
							fontSize: 24,
						},
						itemStyle: {
							normal: {
								color: {
									type: "linear",
									x: 1,
									x2: 0,
									y: 0,
									y2: 1,
									colorStops: [
										{
											offset: 1,
											color: "rgba(225, 225, 225, 0)",
										},
										{
											offset: 0.4,
											color: "rgba(221,116,35,0.5)",
										},
										{
											offset: 0,
											color: "rgba(221,116,35,1)",
										},
									],
								},
								borderRadius: [0, 30, 30, 0], //圆角大小
							},
						},
						data: [this.percent2],
					},
				],
			});
		},
		draw3() {
			let chart;
			if (this.isVoca) {
				chart = this.$echarts.init(document.getElementById("voca3"));
			} else {
				chart = this.$echarts.init(document.getElementById("gra3"));
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
								return `{a|${this.data3}}{b|个}`;
							},
							rich: {
								a: {
									fontFamily: "Oswald",
									fontSize: 24,
								},
								b: {
									fontSize: 14,
								},
							},
							color: "rgba(113,233,157,1)",
							fontSize: 24,
						},
						itemStyle: {
							normal: {
								color: {
									type: "linear",
									x: 1,
									x2: 0,
									y: 0,
									y2: 1,
									colorStops: [
										{
											offset: 1,
											color: "rgba(225, 225, 225, 0)",
										},
										{
											offset: 0.4,
											color: "rgba(113,233,157,0.5)",
										},
										{
											offset: 0,
											color: "rgba(113,233,157,1)",
										},
									],
								},
								borderRadius: [0, 30, 30, 0], //圆角大小
							},
						},
						data: [this.percent3],
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
