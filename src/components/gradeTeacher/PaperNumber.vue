<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:22:09
 * @LastEditTime: 2021-12-09 11:20:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长、教师=》累计试卷作答份数
-->
<template>
	<div class="left-Content-Box">
		<span class="title">累计作答试卷</span>
		<div class="main">
			<div class="left">
				<span
					><span class="number">{{ count }}</span
					>份</span
				>
				<span>总量</span>
			</div>
			<CompareLastWeek :ChangeScore="info.ChangePaperCount" />
		</div>
		<div class="bottom">
			<span class="bottomTitle" v-if="$route.name === 'gradeRZZD'"
				>班级排行榜<span class="top2">TOP2</span></span
			>
			<span class="bottomTitle" v-if="$route.name === 'teacherRZZD'"
				>学生排行榜<span class="top2">TOP2</span></span
			>
			<div class="content" v-if="$route.name === 'teacherRZZD'">
				<span :title="theFirst.StuName"
					>· {{ theFirst.StuName + " " + theFirst.PaperCount }}份</span
				>
				<span :title="theSecond.StuName"
					>· {{ theSecond.StuName + " " + theSecond.PaperCount }}份</span
				>
			</div>
			<div class="content" v-else>
				<span :title="theFirst.CourseClassName"
					>·
					{{
						theFirst.CourseClassName + " " + theFirst.ClassPaperCount
					}}份</span
				>
				<span :title="theSecond.CourseClassName"
					>·
					{{
						theSecond.CourseClassName + " " + theSecond.ClassPaperCount
					}}份</span
				>
			</div>
		</div>
	</div>
</template>

<script>
import { GetClassPaperNum, GetGradePaperNum } from "@/api/gradeTeacher/left.js";
export default {
	data() {
		return {
			// 1:教师
			// 12:年级组长
			userType: 1,
			info: {
				ClassTotalPaperCount: 500,
				ChangePaperCount: -12,
				StuPaperCountList: [
					{
						Index: 13,
						StuID: "1201054",
						StuPhotoPath: null,
						StuName: "1201054",
						PaperCount: 1,
						PaperAvgRate: 0.5833333,
						ClassRank: 3,
						GradeRank: 3,
					},
					{
						Index: 13,
						StuID: "1201057",
						StuPhotoPath: null,
						StuName: "张青青",
						PaperCount: 3,
						PaperAvgRate: 0.5833333,
						ClassRank: 3,
						GradeRank: 3,
					},
					{
						Index: 13,
						StuID: "1201055",
						StuPhotoPath: null,
						StuName: "卢倩峰",
						PaperCount: 2,
						PaperAvgRate: 0.5833333,
						ClassRank: 3,
						GradeRank: 3,
					},
				],
				ClassList: [
					{
						CourseClassName: "初三（1班）",
						CourseClassID: "FD4A1310-57EB-40FB-BC20-B8120FFDDA5D",
						ClassPaperCount: 3,
					},
					{
						CourseClassName: "初三（1班）",
						CourseClassID: "FD4A1310-57EB-40FB-BC20-B8120FFDDA5D",
						ClassPaperCount: 3,
					},
				],
				AvgCountPaperInClassAcc: 0,
			},
		};
	},
	created() {
		this.init();
	},
	components: {
		CompareLastWeek: () => import("../common/CompareLastWeek.vue"),
	},
	computed: {
		isTeacher: function () {
			return this.$route.name === "teacherRZZD";
		},
		count: function () {
			if (this.isTeacher) {
				return this.info.ClassTotalPaperCount;
			} else {
				return this.info.AvgCountPaperInClassAcc;
			}
		},
		theFirst: function () {
			if (this.isTeacher) {
				return this.info.StuPaperCountList[0];
			} else {
				return this.info.ClassList[0];
			}
		},
		theSecond: function () {
			if (this.isTeacher) {
				return this.info.StuPaperCountList[1];
			} else {
				return this.info.ClassList[1];
			}
		},
	},
	methods: {
		init() {
			let data = { ...this.$store.state };
			delete data.UserInfo;
			if (this.$route.name === "teacherRZZD") {
				// 教师
				GetClassPaperNum(data).then((res) => {
					this.info = res.Data;
				});
			} else {
				// 年级组长
				GetGradePaperNum(data).then((res) => {
					this.info = res.Data;
				});
			}
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
	width: 400px;
	height: 278px;
	// background: url("../../assets/img/teacher/累计作答试卷_bg.png") center center no-repeat;
	background: url(~@/assets/img/teacher/累计作答试卷_bg.png) center center
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
