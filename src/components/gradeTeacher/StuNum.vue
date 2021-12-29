<!--学生端累计作答试卷-->
<template>
	<div class="left-Content-Box">
		<span class="title">累计作答试卷</span>
		<div class="main">
			<div class="left">
				<span
					><span class="number">{{ info.ClassTotalPaperCount }}</span
					>份</span
				>
				<span>总量</span>
			</div>
			<CompareLastWeek :ChangeScore="info.ChangePaperCount" />
		</div>
		<CompareAndRank />
	</div>
</template>

<script>
// import { GetClassPaperNum } from "@/api/gradeTeacher/left.js";
export default {
	data() {
		return {
			info: {
				ClassTotalPaperCount: 500,
				ChangePaperCount: -12,
			},
		};
	},
	created() {
		// this.init();
	},
	components: {
		CompareLastWeek: () => import("../common/CompareLastWeek.vue"),
		CompareAndRank: () => import("../common/CompareAndRank.vue"),
	},
	computed: {},
	methods: {
		init() {
			// let data = { ...this.$store.state };
			// GetClassPaperNum(data).then((res) => {
			// 	this.info = res.Data;
			// });
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
