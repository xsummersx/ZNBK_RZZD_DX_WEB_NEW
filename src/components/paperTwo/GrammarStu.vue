<template>
	<!-- 学生端语法认知 -->
	<div class="right-small-box">
		<div class="box-title clearfix">
			<span class="float-l title">语法认知</span>
			<span class="float-r check-icon"><i></i>薄弱语法诊断</span>
		</div>
		<div class="main">
			<div class="mainTop">
				<div class="scoreRate">
					<span class="title">平均答对率</span>
					<span class="rate"><span class="number">96</span>%</span>
				</div>
			</div>
			<Progress :isVoca="false"/>
		</div>
	</div>
</template>

<script>
export default {
	components: {
		Progress: () => import("../common/Progress.vue"),
	},
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
		justify-content: center;
		.title {
			display: block;
			margin: 3px 0 0 0;
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
