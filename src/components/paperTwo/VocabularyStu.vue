<template>
	<!-- 学生端词汇认知 -->
	<div class="right-small-box">
		<div class="box-title clearfix">
			<span class="float-l title">词汇认知</span>
			<span class="float-r check-icon"><i></i>薄弱词汇诊断</span>
		</div>
		<div class="main">
			<div class="mainTop">
				<div class="masteredCount">
					<span class="title">平均掌握量</span>
					<span class="count"><span class="number">8500</span>个</span>
				</div>
				<div class="scoreRate">
					<span class="title">平均答对率</span>
					<span class="rate"><span class="number">96</span>%</span>
				</div>
			</div>
			<Progress :isVoca="true"/>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	components: {
		Progress: () => import("../common/Progress.vue"),
	},
	mounted() {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.right-small-box {
	margin-right: 20px;
	width: 410px;
	height: 292px;
}
.main {
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	.number {
		font-family: Oswald;
		font-size: 28px;
		color: #4bf3f9;
	}
	.mainTop {
		display: flex;
		display: -webkit-flex;
		width: 100%;
		margin: 16px 0 0 0;
		justify-content: space-between;
		.title {
			display: block;
			margin: 3px 0 0 0;
		}
		.masteredCount {
			width: 170px;
			height: 60px;
			background: url(~@/assets/img/teacher/词汇掌握量.png) 0px center no-repeat;
			padding-left: 70px;
			.count {
				display: block;
				// margin-top: 8px;
				color: #4bf3f9;
			}
		}
		.scoreRate {
			width: 170px;
			height: 60px;
			background: url(~@/assets/img/teacher/词汇答对率.png) 0px center no-repeat;
			padding-left: 70px;
			.rate {
				display: block;
				// margin-top: 8px;
				color: #4bf3f9;
			}
		}
	}
}
</style>
