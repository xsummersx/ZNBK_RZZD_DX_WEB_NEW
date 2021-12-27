<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:22:09
 * @LastEditTime: 2021-12-09 10:28:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，教师=》认知平均分
-->
<template>
	<div class="left-Content-Box">
		<span class="title">认知平均分</span>
		<div class="main">
			<div class="left">
				<div class="circleWhite"></div>
				<div id="echart" style="width: 100%; height: 100%"></div>
				<div class="text">
					<span
						><span class="number">{{ avgIndex }}</span
						>分</span
					>
					<br />
					<span>总分:{{ info.FullIndex }}分</span>
				</div>
			</div>
			<div class="middle" :class="info.CognitiveGradeName"></div>
			<div class="right">
				<span class="quantity" :class="status === 'up' ? 'up' : 'down'"
					>{{ compareData }}<span class="char">分</span></span
				>
				<span>较上周</span>
			</div>
		</div>
		<div class="bottom">
			<span class="bottomTitle" v-if="$route.name === 'gradeRZZD'"
				>班级排行榜<span class="top2">TOP2</span></span
			>
			<span class="bottomTitle" v-if="$route.name === 'teacherRZZD'"
				>学生排行榜<span class="top2">TOP2</span></span
			>
			<div class="content" v-if="$route.name === 'teacherRZZD'">
				<span :title="theFirst.StudentName"
					>· {{ theFirst.StudentName + " " + theFirst.CurrentIndex }}分</span
				>
				<span :title="theSecond.StudentName"
					>· {{ theSecond.StudentName + " " + theSecond.CurrentIndex }}分</span
				>
			</div>
			<div class="content" v-else>
				<span :title="theFirst.CourseClassName"
					>·
					{{ theFirst.CourseClassName + " " + theFirst.ClassAvgIndex }}分</span
				>
				<span :title="theSecond.CourseClassName"
					>·
					{{
						theSecond.CourseClassName + " " + theSecond.ClassAvgIndex
					}}分</span
				>
			</div>
		</div>
		<div class="foot">
			<span class="btn">认知成绩分布</span>
			<i class="line"></i>
			<span class="btn">认知成绩走势</span>
		</div>
	</div>
</template>

<script>
import {
	GetClassCognitiveIndex,
	GetGradeCognitiveIndex,
} from "@/api/gradeTeacher/left.js";

export default {
	data() {
		return {
			// 1:教师
			// 12:年级组长
			userType: 1,
			info: {
				ClassAvgIndex: 6633,
				GradeAvgIndex: 4268,
				ChangeIndex: 100,
				CognitiveGradeName: "C",
				FullIndex: 10000,
				StuIndexList: [
					{
						StudentID: "1201046",
						StudentName: "江南",
						CourseClassID: "90EC6CF6-945C-4710-AFB8-96BC6CC0A549",
						CurrentIndex: 6661,
						SchoolID: "S2-000054-B4BC",
					},
					{
						StudentID: "1201060",
						StudentName: "乔瑟夫",
						CourseClassID: "90EC6CF6-945C-4710-AFB8-96BC6CC0A549",
						CurrentIndex: 5000,
						SchoolID: "S2-000054-B4BC",
					},
				],
				ClassList: [
					{
						CourseClassID: "BFF54539-01AF-4759-823A-0EBB5C1415DE",
						CourseClassName: "初三2班",
						ClassAvgIndex: 8413,
						Rank: 1,
					},
					{
						CourseClassID: "499B60B2-D4E8-4135-BE7D-F9DF32403A5B",
						CourseClassName: "初三（3）班",
						ClassAvgIndex: 6778,
						Rank: 2,
					},
				],
			},
		};
	},
	computed: {
		avgIndex: function () {
			if (this.$route.name === "teacherRZZD") {
				return this.info.ClassAvgIndex;
			} else {
				return this.info.GradeAvgIndex;
			}
		},
		theFirst: function () {
			if (this.$route.name === "teacherRZZD") {
				return this.info.StuIndexList[0];
			} else {
				return this.info.ClassList[0];
			}
		},
		theSecond: function () {
			if (this.$route.name === "teacherRZZD") {
				return this.info.StuIndexList[1];
			} else {
				return this.info.ClassList[1];
			}
		},
		compareData: function () {
			if (this.info.ChangeIndex < 0) {
				return Math.abs(this.info.ChangeIndex);
			} else {
				return this.info.ChangeIndex;
			}
		},
		status: function () {
			if (this.info.ChangeIndex < 0) {
				return "down";
			} else {
				return "up";
			}
		},
	},
	created() {
		this.init();
	},
	watch: {
		info: function () {
			if (this.$route.name === "teacherRZZD") {
				this.info.StuIndexList.sort((a, b) => {
					return b.CurrentIndex - a.CurrentIndex;
				});
			} else {
				this.info.ClassList.sort((a, b) => {
					return b.ClassAvgIndex - a.ClassAvgIndex;
				});
			}
		},
	},
	mounted() {
		this.chart();
	},
	methods: {
		init() {
			let data = { ...this.$store.state };
			if (this.$route.name === "teacherRZZD") {
				// 教师
				GetClassCognitiveIndex(data).then((res) => {
					this.info = res.Data;
				});
			} else {
				// 年级组长
				GetGradeCognitiveIndex(data).then((res) => {
					this.info = res.Data;
				});
			}
		},
		chart() {
			let chartDom = document.getElementById("echart");
			let myChart = this.$echarts.init(chartDom);
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
							normal: {
								color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 0.5, [
									{
										offset: 0.5,
										color: "#ffd572",
									},
									{
										offset: 1,
										color: "#ff8a01",
									},
								]),
								shadowColor: "rgba(0, 0, 0, 0.2)", //设置折线阴影
								shadowBlur: 8,
								shadowOffsetY: -3,
								shadowOffsetX: -3,
							},
						},
						data: [(100 * 2) / 3],
						coordinateSystem: "polar",
					},
					{
						type: "pie",
						name: "内层细圆环",
						radius: ["84%", "78%"],
						hoverAnimation: false,
						clockWise: true,
						itemStyle: {
							normal: {
								color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 1,
										color: "#7f8c8d",
									},
								]),
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
.left-Content-Box {
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	margin: 20px 0;
	width: 400px;
	height: 308px;
	background: url(~@/assets/img/teacher/认知平均分_bg.png) center center
		no-repeat;
	.title {
		margin-top: 6px;
		font-family: YouSheBiaoTiHei;
		font-size: 24px;
	}
}
.main {
	width: 80%;
	display: flex;
	display: -webkit-flex;
	flex-direction: row;
	margin: 20px 0 0 0;
	justify-content: space-around;
	.left {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 140px;
		height: 140px;
		margin-right: -32px;
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
	.middle {
		width: 64px;
		margin-top: -90px;
	}
	.A {
		background: url(~@/assets/img/teacher/小A+.png) center center no-repeat;
	}
	.B {
		background: url(~@/assets/img/teacher/小B+.png) center center no-repeat;
	}
	.C {
		background: url(~@/assets/img/teacher/小C+.png) center center no-repeat;
	}
	.D {
		background: url(~@/assets/img/teacher/小D+.png) center center no-repeat;
	}
	.E {
		background: url(~@/assets/img/teacher/小E+.png) center center no-repeat;
	}
	.right {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 128px;
		height: 122px;
		margin-left: -32px;
		background: url(~@/assets/img/teacher/较上周底座.png) center center
			no-repeat;
		.quantity {
			padding-left: 12px;
			font-size: 18px;
			margin-bottom: 5px;
			font-family: ArialMT;
		}
		.up {
			background: url(~@/assets/img/teacher/升.png) 0px center no-repeat;
			color: #60ff60;
		}
		.down {
			background: url(~@/assets/img/teacher/降.png) 0px center no-repeat;
			color: #ff0000;
		}
		.char {
			font-size: 12px;
		}
	}
}
.bottom {
	margin: 10px 0 0 0;
	width: 368px;
	height: 60px;
	padding-top: 5px;
	background-image: linear-gradient(
		to right,
		rgba(255, 255, 255, 0.1),
		rgba(255, 255, 255, 0)
	);
	border-radius: 4px;
	.bottomTitle {
		background: url(~@/assets/img/teacher/标题小标签.png) 0px center no-repeat;
		padding-left: 10px;
		font-size: 16px;
		font-family: YouSheBiaoTiHei;
		color: #00aaff;
		.top2 {
			font-size: 12px;
			color: #0088cc;
		}
	}
	.content {
		display: flex;
		display: -webkit-flex;
		margin: 5px 0 0 0;
		justify-content: space-around;
		// span {
		// flex-grow: 1;
		// }
	}
}
.foot {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-end;
	margin: auto 0;
	width: 90%;
	.btn {
		// width: 17px;
		height: 18px;
		padding-left: 20px;
		margin-right: 4px;
		vertical-align: middle;
		background: url(~@/assets/img/teacher/查看_默认.png) 0px center no-repeat;
		color: #ddd;
		cursor: pointer;
		&:hover {
			color: #fff;
			background: url(~@/assets/img/teacher/查看_悬停.png) 0px center no-repeat;
		}
	}
	.line {
		margin: 0 10px 0 8px;
		width: 2px;
		background: url(~@/assets/img/teacher/分界线.png) 0px center no-repeat;
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
