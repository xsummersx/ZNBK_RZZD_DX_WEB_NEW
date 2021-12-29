<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:25:48
 * @LastEditTime: 2021-12-09 10:28:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，教师=》高考预估成绩
-->
<template>
	<div class="left-Content-Box">
		<span class="title">高考预估成绩</span>
		<div class="main">
			<Polo :FullScore="info.FullScore" :score="score" />
			<CompareLastWeek :ChangeScore="info.ChangeScore" />
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
					>· {{ theFirst.StudentName + " " + theFirst.PredictedScore }}分</span
				>
				<span :title="theSecond.StudentName"
					>·
					{{ theSecond.StudentName + " " + theSecond.PredictedScore }}分</span
				>
			</div>
			<div class="content" v-else>
				<span :title="theFirst.CourseClassName"
					>·
					{{ theFirst.CourseClassName + " " + theFirst.ClassAvgScore }}分</span
				>
				<span :title="theSecond.CourseClassName"
					>· {{ theSecond.CourseClassName }}
					<span class="numberColor">{{ theSecond.ClassAvgScore }}分</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import {
	GetClassPredictedScore,
	GetGradePredictedScore,
} from "@/api/gradeTeacher/left.js";

export default {
	data() {
		return {
			// 1:教师
			// 12:年级组长
			userType: 1,
			info: {
				ClassAvgScore: 80,
				GradeAvgScore: 38,
				FullScore: 120,
				ChangeScore: 10,
				StuScoreList: [
					{
						StudentID: "1201046",
						StudentName: "江南",
						CourseClassID: "90EC6CF6-945C-4710-AFB8-96BC6CC0A549",
						SchoolID: "S2-000054-B4BC",
						PredictedScore: 80,
						FullScore: 120,
					},
					{
						StudentID: "1201051",
						StudentName: "牛奶人",
						CourseClassID: "90EC6CF6-945C-4710-AFB8-96BC6CC0A549",
						SchoolID: "S2-000054-B4BC",
						PredictedScore: 70,
						FullScore: 120,
					},
				],
				ClassList: [
					{
						CourseClassID: "499B60B2-D4E8-4135-BE7D-F9DF32403A5B",
						CourseClassName: "初三（3）班",
						ClassAvgScore: 102,
					},
					{
						CourseClassID: "BFF54539-01AF-4759-823A-0EBB5C1415DE",
						CourseClassName: "初三2班",
						ClassAvgScore: 65,
					},
				],
			},
		};
	},
	created() {
		this.init();
	},
	components: {
		CompareLastWeek: () => import("../common/CompareLastWeek.vue"),
		Polo: () => import("../common/Polo.vue"),
	},
	computed: {
		score: function () {
			if (this.$route.name === "teacherRZZD") {
				return this.info.ClassAvgScore;
			} else {
				return this.info.GradeAvgScore;
			}
		},
		theFirst: function () {
			if (this.$route.name === "teacherRZZD") {
				return this.info.StuScoreList[0];
			} else {
				return this.info.ClassList[0];
			}
		},
		theSecond: function () {
			if (this.info.StuScoreList || this.info.ClassList) {
				if (this.$route.name === "teacherRZZD") {
					return this.info.StuScoreList[1];
				} else {
					return this.info.ClassList[1];
				}
			} else {
				return {};
			}
		},
	},
	methods: {
		init() {
			let data = { ...this.$store.state };
			if (this.$route.name === "teacherRZZD") {
				// 教师
				GetClassPredictedScore(data).then((res) => {
					this.info = res.Data;
				});
			} else if (this.$route.name === "gradeRZZD") {
				// 年级组长
				GetGradePredictedScore(data).then((res) => {
					this.info = res.Data;
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
// .numberColor {
// 	color: #a2afcc;
// 	// opacity: 0.8;
// }
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
.number {
	font-size: 32px;
	font-family: Oswald;
}
.main {
	width: 80%;
	display: flex;
	display: -webkit-flex;
	flex-direction: row;
	margin: 30px 0 20px;
	justify-content: space-around;
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
</style>
