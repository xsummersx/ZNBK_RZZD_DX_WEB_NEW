<!--学生端累计作答试卷-->
<template>
	<div class="left-Content-Box">
		<span class="title">累计作答试卷</span>
		<div class="main">
			<div class="left">
				<span
					><span class="number">{{ info.PersonTotalPaperCount }}</span
					>份</span
				>
				<span>总量</span>
			</div>
			<CompareLastWeek :ChangeScore="info.PaperCountChange" />
		</div>
		<CompareAndRank
			:isScore="false"
			:classCompare="info.TrastCLassAvgPaper"
			:gradeCompare="info.TrastGradeAvgPaper"
			:ClassRank="info.ClassRank"
			:GradeRank="info.GradeRank"
		/>
	</div>
</template>

<script>
import { GetStuPaperNum } from "@/api/stu/left.js";
export default {
	data() {
		return {
			info: {
				PersonTotalPaperCount: 0,
				AreaMaxPaper: 0,
				PaperCountChange: 0,
				TrastCLassAvgPaper: 0,
				TrastGradeAvgPaper: 0,
				ClassRank: 0,
				GradeRank: 0,
			},
			isShow: true,
		};
	},
	created() {
		this.init();
	},
	components: {
		CompareLastWeek: () => import("../common/CompareLastWeek.vue"),
		CompareAndRank: () => import("../common/CompareAndRank.vue"),
	},
	computed: {},
	methods: {
		init() {
			let data = {
				token: this.$store.state.token,
				StuID: this.$store.state.StuID,
				CourseClassID: this.$store.state.CourseClassID,
				GlobalGrade: this.$store.state.GlobalGrade,
				SchoolID: this.$store.state.SchoolID,
				CountyID: this.$store.state.CountyID,
				TID: this.$store.state.TID,
			};
			GetStuPaperNum(data)
				.then((res) => {
					this.info = res.Data;
					this.isShow = true;
				})
				.catch();
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
	margin: 20px 0 5px 0;
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
</style>
