<template>
	<!-- 圆环图 -->
	<div class="left" :style="isMR ? 'margin-right:-32px' : ''">
		<div class="circleWhite"></div>
		<div id="ring" style="width: 100%; height: 100%"></div>
		<div class="text">
			<span
				><span class="number">{{ avgIndex }}</span
				>分</span
			>
			<br />
			<span>总分:{{ FullIndex }}分</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		FullIndex: {
			type: Number,
			default: 10000,
		},
		avgIndex: {
			type: Number,
			default: 5000,
		},
		isMR: {
			type: Boolean,
			default: true,
		},
	},
	mounted() {
		this.chart();
	},
	methods: {
		chart() {
			let chartDom = document.getElementById("ring");
			let myChart = this.$echarts.init(chartDom, null, {
				renderer: "svg",
			});
			let option;
			option = {
				polar: {
					radius: ["74%", "88%"],
					center: ["50%", "50%"],
				},
				angleAxis: {
					max: 100,
					startAngle: 210,
					show: false,
				},
				radiusAxis: {
					type: "category",
					show: false,
					axisLabel: {
						show: false,
					},
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
				},
				series: [
					{
						name: "",
						type: "bar",
						roundCap: true,
						barWidth: 95,
						z: 10,
						itemStyle: {
							color: {
								type: "linear",
								x: 0,
								x2: 0,
								y: 0,
								y2: 0.5,
								colorStops: [
									{
										offset: 0.5,
										color: "#ffd572",
									},
									{
										offset: 1,
										color: "#ff8a01",
									},
								],
							},
							shadowColor: "rgba(0, 0, 0, 0.2)", //设置折线阴影
							shadowBlur: 8,
							shadowOffsetY: -3,
							shadowOffsetX: -3,
						},
						data: [(100 * 2) / 3],
						coordinateSystem: "polar",
					},
					{
						type: "pie",
						name: "内层细圆环",
						radius: ["84%", "78%"],
						emphasis: {
							scale: false,
						},
						clockwise: true,
						itemStyle: {
							color: {
								type: "linear",
								x: 0,
								x2: 0,
								y: 0,
								y2: 1,
								colorStops: [
									{
										offset: 1,
										color: "#7f8c8d",
									},
								],
							},
						},
						label: {
							show: false,
						},
						data: [100],
					},
				],
			};
			myChart.setOption(option);
		},
	},
};
</script>

<style lang="scss" scoped>
.left {
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 140px;
	height: 140px;
	// margin-right: -32px;
	position: relative;
	.number {
		font-size: 32px;
		font-family: Oswald;
	}
	.text {
		width: 100%;
		position: absolute;
		margin-top: -10px;
		text-align: center;
	}
}
.circleWhite {
	left: 115px;
	top: 95px;
	width: 7px;
	height: 6px;
	background-color: #f5f7fb;
	border-radius: 100%;
	position: absolute;
	z-index: 111;
}
</style>
