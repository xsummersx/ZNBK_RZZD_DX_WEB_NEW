<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:22:09
 * @LastEditTime: 2022-01-07 15:19:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，教师=》认知平均分
-->
<template>
	<div class="left-Content-Box">
		<span class="title">认知平均分</span>
		<div class="main" v-show="!loading">
			<Ring :FullIndex="info.FullIndex" :avgIndex="avgIndex" />
			<Middle :level="info.CognitiveGradeName" />
			<CompareLastWeek :ChangeScore="info.ChangeIndex" />
		</div>
		<Top2
			v-show="!loading"
			:theFirstStu="theFirst.StudentName"
			:theFirstPre="theFirst.CurrentIndex"
			:theFirstClass="theFirst.CourseClassName"
			:theFirstAvg="theFirst.ClassAvgIndex"
			:theSecondStu="theSecond.StudentName"
			:theSecondPre="theSecond.CurrentIndex"
			:theSecondClass="theSecond.CourseClassName"
			:theSecondAvg="theSecond.ClassAvgIndex"
		/>
		<div class="foot" v-show="!loading">
			<span class="btn" @click="openDis()">认知成绩分布</span>
			<i class="line"></i>
			<span class="btn" @click="openTrend()">认知成绩走势</span>
		</div>
		<Loading v-if="loading" style="margin-top: 35px" />
		<el-dialog
			:title="TitleDis"
			:visible.sync="dialogDis"
			:close-on-click-modal="false"
			width="440px"
			top="0vh"
		>
			<div class="DisContent">
				<ScoreDis></ScoreDis>
			</div>
		</el-dialog>
		<el-dialog
			:title="TitleDis"
			:visible.sync="dialogTrend"
			:close-on-click-modal="false"
			width="440px"
			top="0vh"
		>
			<div class="DisContent">
				<ScoreTrend></ScoreTrend>
			</div>
		</el-dialog>
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
			dialogDis: false, //认知成绩分布弹窗
			TitleDis: "认知成绩分布图",
			dialogTrend: false, //认知成绩走势弹窗
			info: {
				ClassAvgIndex: 0,
				GradeAvgIndex: 0,
				ChangeIndex: 0,
				CognitiveGradeName: "C",
				FullIndex: 0,
				StuIndexList: [
					{
						StudentName: "无",
						CurrentIndex: 0,
					},
					{
						StudentName: "无",
						CurrentIndex: 0,
					},
				],
				ClassList: [
					{
						CourseClassName: "无",
						ClassAvgIndex: 0,
					},
					{
						CourseClassName: "无",
						ClassAvgIndex: 0,
					},
				],
			},
			loading: true,
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
		Middle: () => import("../common/Middle.vue"),
		ScoreDis: () => import("../eduSchool/ScoreDis.vue"),
		ScoreTrend: () => import("../eduSchool/ScoreTrend.vue"),
		Loading: () => import("@/components/common/Loading.vue"),
	},
	mounted() {},
	methods: {
		init() {
			let data = { ...this.$store.state };
			delete data.UserInfo;
			if (this.$route.name === "teacherRZZD") {
				// 教师
				GetClassCognitiveIndex(data)
					.then((res) => {
						this.info = res.Data;
						setTimeout(() => {
							this.loading = false;
						}, 400);
					})
					.catch(() => {
						this.loading = false;
					});
			} else {
				// 年级组长
				GetGradeCognitiveIndex(data)
					.then((res) => {
						this.info = res.Data;
						setTimeout(() => {
							this.loading = false;
						}, 400);
					})
					.catch(() => {
						this.loading = false;
					});
			}
		},
		//打开认知成绩分布
		openDis() {
			this.dialogDis = true;
		},
		//打开认知成绩走势
		openTrend() {
			this.dialogTrend = true;
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
