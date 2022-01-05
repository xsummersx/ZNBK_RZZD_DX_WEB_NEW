<!--
 * @Author: 汤宇昕
 * @FilePath: 学生端认知平均分
-->
<template>
	<div class="left-Content-Box">
		<span class="title">认知平均分</span>
		<div class="main">
			<Ring :FullIndex="info.FullIndex" :avgIndex="info.PersonIndex" />
			<div
				class="middle"
				:class="info.CognitiveGradeName.substring(0, 1)"
			></div>
			<CompareLastWeek :ChangeScore="info.IndexChange" />
		</div>
		<CompareAndRank
			v-if="isShow"
			:classCompare="info.TrastCLassAvgIndex"
			:gradeCompare="info.TrastGradeAvgIndex"
			:ClassRank="info.ClassRank"
			:GradeRank="info.GradeRank"
		/>
		<div class="foot">
			<span class="btn">认知成绩走势</span>
		</div>
	</div>
</template>

<script>
import { GetStuCognitiveIndex } from "@/api/stu/left.js";
export default {
	data() {
		return {
			info: {
				CognitiveGradeName: "C+",
				FullIndex: 10000,
				PersonIndex: 5888,
				IndexChange: 20,
				TrastCLassAvgIndex: 158,
				TrastGradeAvgIndex: 124,
				ClassRank: 8,
				GradeRank: 50,
			},
			isShow: true,
		};
	},
	computed: {},
	created() {
		this.init();
	},
	components: {
		CompareLastWeek: () => import("../common/CompareLastWeek.vue"),
		Ring: () => import("../common/Ring.vue"),
		CompareAndRank: () => import("../common/CompareAndRank.vue"),
	},
	mounted() {},
	methods: {
		init() {
			let data = {
				token: this.$store.state.token,
				StuID: this.$store.state.StuID,
				CourseClassID: this.$store.state.CourseClassID,
				GlobalGrade: this.$store.state.GlobalGrade,
				SchoolID: this.$store.state.SchoolID,
				TID: this.$store.state.TID,
				ZsdArea: this.$store.state.ZsdArea,
				StageNo: this.$store.state.StageNo,
			};
			GetStuCognitiveIndex(data).then((res) => {
				this.info = res.Data;
				this.isShow = true;
			});
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
	margin: 20px 0 -5px 0;
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
}
</style>
