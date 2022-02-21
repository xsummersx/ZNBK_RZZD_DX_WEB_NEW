<template>
	<!-- 学生端语法认知 -->
	<div class="right-small-box">
		<div class="box-title clearfix">
			<span class="float-l title">语法认知</span>
			<span class="float-r check-icon" @click="toDiagnosis"
				><i></i>薄弱语法诊断</span
			>
		</div>
		<div class="main" v-if="isShow && !loading">
			<div class="mainTop">
				<div class="scoreRate">
					<span class="title">平均答对率</span>
					<span class="rate"
						><span class="number">{{ (scoreRate * 100).toFixed(2) }}</span
						>%</span
					>
				</div>
			</div>
			<Progress
				v-if="isShow"
				:isVoca="false"
				:FirstScoreRate="FirstScoreRate"
				:SecondScoreRate="SecondScoreRate"
				:ThirdScoreRate="ThirdScoreRate"
			/>
		</div>
		<NoDataVGL v-if="!isShow && !loading" type="gra" />
		<Loading v-show="loading" style="margin-top: 20px"/>
	</div>
</template>

<script>
import { GetStuGrammer } from "@/api/stu/right";
export default {
	data() {
		return {
			scoreRate: 0,
			FirstScoreRate: 0,
			SecondScoreRate: 0,
			ThirdScoreRate: 0,
			isShow: false,
			loading: true,
		};
	},
	components: {
		Progress: () => import("../common/Progress.vue"),
		NoDataVGL: () => import("../common/NoDataVGL.vue"),
		Loading: () => import("../common/Loading.vue"),
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			let params = {
				Token: this.$store.state.token,
				TID: this.$store.state.TID,
				SchoolID: this.$store.state.SchoolID,
				StuID: this.$store.state.StuID,
				ZsdArea: this.$store.state.ZsdArea,
			};
			GetStuGrammer(params)
				.then((res) => {
					if (
						res.Data.GrammarScoreRate === 0 &&
						res.Data.FirstScoreRate === 0 &&
						res.Data.SecondScoreRate === 0 &&
						res.Data.ThirdScoreRate === 0
					) {
						this.isShow = false;
					} else {
						this.scoreRate = res.Data.GrammarScoreRate;
						this.FirstScoreRate = res.Data.FirstScoreRate;
						this.SecondScoreRate = res.Data.SecondScoreRate;
						this.ThirdScoreRate = res.Data.ThirdScoreRate;
						this.isShow = true;
					}
					setTimeout(() => {
						this.loading = false;
					}, 400);
				})
				.catch(() => {
					this.isShow = false;
					setTimeout(() => {
						this.loading = false;
					}, 400);
				});
		},
		// 跳转薄弱诊断
		toDiagnosis() {
			let url = this.$router.resolve({
				path: "/DiagReport",
				query: {
					token: this.$store.state.token,
					userType: "stu",
					reportType: "gra",
					stageNo: this.$store.state.StageNo,
					StuID: this.$store.state.StuID,
					schoolID: this.$store.state.SchoolID,
				},
			});
			window.open(url.href, "_blank");
		},
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
			background: url(~@/assets/img/teacher/答对2_iSpt.png) 0px center no-repeat;
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
