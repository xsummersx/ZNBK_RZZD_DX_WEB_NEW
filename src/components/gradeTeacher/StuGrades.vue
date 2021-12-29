<!--学生端高考预估分-->
<template>
	<div class="left-Content-Box">
		<span class="title">高考预估成绩</span>
		<div class="main">
			<Polo :FullScore="info.FullScore" :score="info.AvgScore" />
			<CompareLastWeek :ChangeScore="info.ChangeScore" />
		</div>
		<CompareAndRank />
	</div>
</template>

<script>
// import {
// 	GetClassPredictedScore,
// } from "@/api/gradeTeacher/left.js";

export default {
	data() {
		return {
			info: {
				AvgScore: 80,
				FullScore: 120,
				ChangeScore: 10,
			},
		};
	},
	created() {
		// this.init();
	},
	components: {
		CompareLastWeek: () => import("../common/CompareLastWeek.vue"),
		Polo: () => import("../common/Polo.vue"),
		CompareAndRank: () => import("../common/CompareAndRank.vue"),
	},
	computed: {},
	methods: {
		init() {
			// let data = { ...this.$store.state };
			// 	GetClassPredictedScore(data).then((res) => {
			// 		this.info = res.Data;
			// 	});
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
</style>
