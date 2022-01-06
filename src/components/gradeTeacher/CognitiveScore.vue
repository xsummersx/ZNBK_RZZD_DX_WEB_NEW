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
			<Ring :FullIndex="info.FullIndex" :avgIndex="avgIndex" />
			<div class="middle" :class="info.CognitiveGradeName"></div>
			<CompareLastWeek :ChangeScore="info.ChangeIndex" />
		</div>
		<Top2
			:theFirstStu="theFirst.StudentName"
			:theFirstPre="theFirst.CurrentIndex"
			:theFirstClass="theFirst.CourseClassName"
			:theFirstAvg="theFirst.ClassAvgIndex"
			:theSecondStu="theSecond.StudentName"
			:theSecondPre="theSecond.CurrentIndex"
			:theSecondClass="theSecond.CourseClassName"
			:theSecondAvg="theSecond.ClassAvgIndex"
		/>
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
	},
	created() {
		this.init();
	},
	components: {
		CompareLastWeek: () => import("../common/CompareLastWeek.vue"),
		Ring: () => import("../common/Ring.vue"),
		Top2: () => import("../common/Top2.vue"),
	},
	mounted() {},
	methods: {
		init() {
			let data = { ...this.$store.state };
			delete data.UserInfo;
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
		margin-left: -32px;
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
</style>
