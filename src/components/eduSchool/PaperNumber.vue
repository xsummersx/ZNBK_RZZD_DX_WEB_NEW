<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:22:09
 * @LastEditTime: 2021-11-30 14:24:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》累计试卷作答份数，图0，图1
-->
<template>
	<div
		class="back"
		:class="$route.name === 'schoolRZZD' ? 'height-leader' : 'none'"
	>
		<span class="title">累计作答试卷</span>
		<div class="paper" v-if="$route.name === 'educationRZZD'">
			<div id="eduChart" style="width: 122px; height: 122px"></div>
			<div class="text">
				<span><span class="number">950</span>份</span>
				<br />
				<span class="nextNumber">平均试卷量</span>
			</div>
		</div>
		<div class="main" v-if="$route.name === 'schoolRZZD'">
			<div class="left">
				<span><span class="number">1560</span>份</span>
				<span class="textColor">总量</span>
			</div>
			<div class="right">
				<span class="quantity">2326<span class="char">份</span></span>
				<span class="textColor">全区平均量</span>
			</div>
		</div>
		<div class="bottom" v-if="$route.name === 'educationRZZD'">
			<!-- 全区排行榜 -->
			<div class="bottomItem">
				<span class="bottomTitle icon1"
					>全区排行榜<span class="top2">TOP2</span></span
				>
				<div class="content">
					<span title="嘉兴市实验中学">· 嘉兴市实验中学</span>
					<span title="南湖实验中学">· 南湖实验中学</span>
				</div>
			</div>
			<!-- 重点关注 -->
			<div class="bottomItem">
				<span class="bottomTitle icon2"
					>全区重点关注<span class="top2">TOP2</span></span
				>
				<div class="content">
					<span title="海盐中学">· 海盐中学</span>
					<span title="浙师大附属嘉善实验中学">· 浙师大附属嘉善实验中学</span>
				</div>
			</div>
		</div>
		<div class="bottom-leader" v-if="$route.name === 'schoolRZZD'">
			<!-- 本校区排名 -->
			<div class="bottomItem">
				<span class="bottomTitle">本校区排名</span>
				<div class="content">
					<span class="rank">第二名</span>
				</div>
			</div>
			<!-- 全区第一名学校 -->
			<div class="bottomItem">
				<span class="bottomTitle">全区第一名学校</span>
				<div class="content">
					<span class="schoolName" title="浙师大附属嘉善实验中学"
						>浙师大附属嘉善实验中学</span
					>
					<span class="schoolScore numberColor">140分</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import { GetGradeLeaderPaperNum } from "@/api/eduSchool/left.js";

export default {
	data() {
		return {
			// 8:教育局
			// 7:校领导
			userType: 8,
			// 接口返回数据
			info: {},
		};
	},
	mounted() {
		this.chart();
	},
	methods: {
		// init() {
		//   let data;
		//   GetGradeLeaderPaperNum(data).then((res) => {
		//     this.info = res.Data;
		//   });
		// },
		chart() {
			let chartDom = document.getElementById("eduChart");
			let myChart = this.$echarts.init(chartDom);
			let option;
			option = {
				polar: {
					radius: ["80%", "86%"],
					center: ["50%", "50%"],
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
								color: "#005811",
							},
							{
								offset: 0.6,
								color: "#00ff12",
							},
							{
								offset: 1,
								color: "#00ff12",
							},
						],
					},
				],
				angleAxis: {
					max: 100,
					// startAngle: 210,
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
						z: 10,
						data: [25],
						coordinateSystem: "polar",
					},
					{
						type: "pie",
						name: "1",
						roundCap: true,
						radius: ["80%", "85%"],
						hoverAnimation: false,
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
										color: "#005811",
									},
								],
							},
						},
						label: {
							show: false,
						},
						data: [75],
					},
				],
			};
			myChart.setOption(option);
		},
	},
};
</script>

<style lang="scss" scoped>
.numberColor {
	color: #a2afcc;
}
.textColor {
	color: #fff;
	opacity: 0.8;
}
.back {
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	height: 298px;
	width: 400px;
	background: url(~@/assets/img/eduSchool/累计作答试卷_bg.png) center center
		no-repeat;
	background-size: 100% 100%;
	align-items: center;
}
.height-leader {
	height: 278px;
}
.title {
	margin-top: 6px;
	font-family: YouSheBiaoTiHei;
	font-size: 24px;
}
.paper {
	width: 132px;
	height: 132px;
	margin: 20px 0 10px 0;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: url(~@/assets/img/eduSchool/平均试卷量bg.png) no-repeat center;
	background-size: 100% 100%;
	background-color: rgba(255, 255, 255, 0.05);
	position: relative;
	.text {
		position: absolute;
		margin-top: -10px;
		width: 100%;
		text-align: center;
	}
	.number {
		font-size: 32px;
		font-family: Oswald;
	}
}
.main {
	width: 80%;
	display: flex;
	display: -webkit-flex;
	flex-direction: row;
	margin: 30px 0 0 0;
	justify-content: space-around;
	.left {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 128px;
		height: 122px;
		background: url(~@/assets/img/teacher/总量表达.png) center center no-repeat;
		.number {
			font-size: 32px;
			font-family: Oswald;
		}
	}
	.right {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 128px;
		height: 122px;
		background: url(~@/assets/img/eduSchool/全区平均统计.png) center center
			no-repeat;
		.quantity {
			font-size: 22px;
			margin-bottom: 5px;
			font-family: ArialMT;
		}
		.char {
			font-size: 12px;
		}
	}
}
.bottom {
	display: flex;
	display: -webkit-flex;
	width: 94%;
	justify-content: space-around;
	.bottomItem {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		width: 180px;
		height: 90px;
		border-radius: 4px;
		background-image: linear-gradient(
			to right,
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0)
		);
		.content {
			display: flex;
			display: -webkit-flex;
			flex-direction: column;
			margin: 0 0 0 25px;
			span {
				width: 150px;
				height: 20px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
	.bottomTitle {
		margin: 10px 0 10px 10px;
		padding-left: 20px;
		font-size: 16px;
		font-family: YouSheBiaoTiHei;
		color: #00aaff;
		.top2 {
			font-size: 12px;
			color: #0088cc;
		}
	}
	.icon1 {
		background: url(~@/assets/img/eduSchool/排行榜.png) 0px center no-repeat;
	}
	.icon2 {
		background: url(~@/assets/img/eduSchool/重点关注.png) 0px center no-repeat;
	}
}
.bottom-leader {
	display: flex;
	display: -webkit-flex;
	width: 94%;
	margin-top: 10px;
	justify-content: space-around;
	.bottomItem {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		width: 180px;
		height: 60px;
		border-radius: 4px;
		background-image: linear-gradient(
			to right,
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0)
		);
		.content {
			display: flex;
			display: -webkit-flex;
			margin: 0 0 0 15px;
			span {
				width: 150px;
				height: 20px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-family: YouSheBiaoTiHei;
				font-size: 18px;
				line-height: 28px;
			}
			.rank {
				height: 28px;
				background: url(~@/assets/img/eduSchool/第二名.png) 0px center no-repeat;
				padding-left: 30px;
				line-height: 28px;
			}
			//   .schoolName {
			//   }
			.schoolScore {
				width: 50px;
				font-size: 12px;
				font-family: MicrosoftYaHei;
			}
		}
	}
	.bottomTitle {
		margin: 3px 0 5px 0;
		padding-left: 15px;
		font-size: 16px;
		font-family: YouSheBiaoTiHei;
		color: #00aaff;
		background: url(~@/assets/img/teacher/标题小标签.png) 0px center no-repeat;
	}
}
</style>
