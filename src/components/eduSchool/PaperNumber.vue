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
		<div class="paper" v-show="$route.name === 'educationRZZD' && !loading">
			<!-- <div id="eduChart" style="width: 122px; height: 122px"></div> -->
			<div class="text" v-if="$route.name === 'educationRZZD' && !loading">
				<span
					><span class="number">{{ count.toFixed(0) }}</span
					><span class="charChar">份</span></span
				>
				<br />
				<span class="avgNum">平均试卷量</span>
			</div>
		</div>
		<div class="main" v-if="$route.name === 'schoolRZZD' && !loading">
			<div class="left">
				<span
					><span class="number">{{ count.toFixed(0) }}</span
					><span class="charChar">份</span></span
				>
				<span class="textColor font12">总量</span>
			</div>
			<div class="right">
				<span class="quantity"
					>{{ info.AreaAvgPaper }}<span class="char">份</span></span
				>
				<span class="textColor font12">全区平均量</span>
			</div>
		</div>
		<Top
			v-if="$route.name === 'educationRZZD' && !loading"
			:SchoolList="info.SchoolList"
			:FocusSchoolList="info.FocusSchoolList"
		/>
		<RankAndFirst
			v-if="$route.name === 'schoolRZZD' && !loading"
			:MySchoolRank="info.MySchoolRank"
			:FirstSchool="info.FirstSchool"
			:FirstScore="info.FirstScore"
			:isScore="false"
		/>
		<Loading v-if="loading" style="margin-top: 25px" />
	</div>
</template>

<script>
import { GetSchoolPaperNum, GetAreaPaperNum } from "@/api/eduSchool/left.js";
import gsap from "gsap";
export default {
	data() {
		return {
			// 接口返回数据
			info: {
				// 学校作答总量
				SchoolCount: 0,
				// 全区平均
				AreaAvgPaper: 0,
				// 排名第一学校
				FirstSchool: "蓝鸽高中",
				// 本校区排名
				MySchoolRank: 1,
				// 排名第一份数
				FirstScore: 0,
				// 教育局显示总量
				AreaAvgCount: 0,
				// 排行榜
				SchoolList: [],
				// 重点关注
				FocusSchoolList: [],
			},
			loading: true,
			count: 0,
		};
	},
	created() {
		this.init();
	},
	components: {
		RankAndFirst: () => import("../common/RankAndFirst.vue"),
		Top: () => import("../common/Top.vue"),
		Loading: () => import("@/components/common/Loading.vue"),
	},
	mounted() {
		// if (this.$route.name === "educationRZZD") {
		// 	this.chart();
		// }
	},
	methods: {
		init() {
			let data = { ...this.$store.state };
			delete data.UserInfo;
			if (this.$route.name === "educationRZZD") {
				GetAreaPaperNum(data)
					.then((res) => {
						if (res.Data != null) {
							this.info = res.Data;
							setTimeout(() => {
								this.loading = false;
								gsap.to(this, {
									duration: 1.5,
									count: res.Data.AreaAvgCount,
								});
							}, 400);
						}
					})
					.catch(() => {
						this.loading = false;
					});
			} else {
				GetSchoolPaperNum(data)
					.then((res) => {
						if (res.Data != null) {
							this.info = res.Data;
							setTimeout(() => {
								this.loading = false;
								gsap.to(this, {
									duration: 1.5,
									count: res.Data.SchoolCount,
								});
							}, 400);
						}
					})
					.catch(() => {
						this.loading = false;
					});
			}
		},
		// chart() {
		// 	let chartDom = document.getElementById("eduChart");
		// 	let myChart = this.$echarts.init(chartDom, null, {
		// 		renderer: "svg",
		// 	});
		// 	let option;
		// 	option = {
		// 		polar: {
		// 			radius: ["80%", "86%"],
		// 			center: ["50%", "50%"],
		// 		},
		// 		color: [
		// 			{
		// 				type: "linear",
		// 				x: 0,
		// 				y: 0,
		// 				x2: 0,
		// 				y2: 1,
		// 				colorStops: [
		// 					{
		// 						offset: 0,
		// 						color: "#005811",
		// 					},
		// 					{
		// 						offset: 0.6,
		// 						color: "#00ff12",
		// 					},
		// 					{
		// 						offset: 1,
		// 						color: "#00ff12",
		// 					},
		// 				],
		// 			},
		// 		],
		// 		angleAxis: {
		// 			max: 100,
		// 			// startAngle: 210,
		// 			show: false,
		// 		},
		// 		radiusAxis: {
		// 			type: "category",
		// 			show: false,
		// 			axisLabel: {
		// 				show: false,
		// 			},
		// 			axisLine: {
		// 				show: false,
		// 			},
		// 			axisTick: {
		// 				show: false,
		// 			},
		// 		},
		// 		series: [
		// 			{
		// 				name: "",
		// 				type: "bar",
		// 				roundCap: true,
		// 				z: 10,
		// 				data: [25],
		// 				coordinateSystem: "polar",
		// 			},
		// 			{
		// 				type: "pie",
		// 				name: "1",
		// 				roundCap: true,
		// 				radius: ["80%", "85%"],
		// 				hoverAnimation: false,
		// 				itemStyle: {
		// 					color: {
		// 						type: "linear",
		// 						x: 0,
		// 						y: 0,
		// 						x2: 0,
		// 						y2: 1,
		// 						colorStops: [
		// 							{
		// 								offset: 0,
		// 								color: "#005811",
		// 							},
		// 						],
		// 					},
		// 				},
		// 				label: {
		// 					show: false,
		// 				},
		// 				data: [75],
		// 			},
		// 		],
		// 	};
		// 	myChart.setOption(option);
		// },
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
.charChar {
	font-size: 14px;
	font-weight: bold;
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
	background: url(~@/assets/img/eduSchool/平均试卷量_iSpt.png) no-repeat center;
	background-size: 100% 100%;
	// background-color: rgba(255, 255, 255, 0.05);
	position: relative;
	.text {
		position: absolute;
		margin-top: -10px;
		width: 100%;
		text-align: center;

		.avgNum {
			font-size: 12px;
		}
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

	.font12 {
		font-size: 12px;
	}
	.left {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 128px;
		height: 122px;
		background: url(~@/assets/img/teacher/总量表达_iSpt.png) center center no-repeat;
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
		background: url(~@/assets/img/eduSchool/全区平均统计_iSpt.png) center center
			no-repeat;
		.quantity {
			font-size: 22px;
			margin-bottom: 5px;
			font-family: Oswald;
		}
		.char {
			font-size: 14px;
			font-weight: bold;
		}
	}
}
</style>
