<template>
	<!-- 学生端词汇认知 -->
	<div class="right-small-box">
		<div class="box-title clearfix">
			<span class="float-l title">词汇认知</span>
			<span class="float-r check-icon" @click="toDiagnosis"
				><i></i>薄弱词汇诊断</span
			>
		</div>
		<div class="main" v-if="isShow && !loading">
			<div class="mainTop">
				<div class="masteredCount">
					<span class="title">平均掌握量</span>
					<span class="count"
						><span class="number">{{ masteredCount }}</span
						>个</span
					>
				</div>
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
				:isVoca="true"
				:FirstScoreRate="FirstScoreRate"
				:SecondScoreRate="SecondScoreRate"
				:ThirdScoreRate="ThirdScoreRate"
			/>
		</div>
		<NoDataVGL v-if="!isShow && !loading" type="voca" />
		<Loading v-show="loading" style="margin-top: 20px" />
	</div>
</template>

<script>
import { GetStuVocabulary } from "@/api/stu/right";
export default {
	data() {
		return {
			// 平均掌握量
			masteredCount: 2965,
			// 词汇答对率
			scoreRate: 1.0,
			// 常考
			FirstScoreRate: 1.0,
			// 次常考
			SecondScoreRate: 0.0,
			// 不常考
			ThirdScoreRate: 0.0,
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
		// 跳转薄弱诊断
		toDiagnosis() {
			let url = this.$router.resolve({
				path: "/DiagReport",
				query: {
					token: this.$store.state.token,
					userType: "stu",
					reportType: "voca",
					stageNo: this.$store.state.StageNo,
					StuID: this.$store.state.StuID,
					schoolID: this.$store.state.SchoolID,
				},
			});
			window.open(url.href, "_blank");
		},
		init() {
			let params = {
				Token: this.$store.state.token,
				TID: this.$store.state.TID,
				SchoolID: this.$store.state.SchoolID,
				StuID: this.$store.state.StuID,
				ZsdArea: this.$store.state.ZsdArea,
			};
			GetStuVocabulary(params)
				.then((res) => {
					if (
						res.Data.MasteredCount === 0 &&
						res.Data.VocabularyScoreRate === 0 &&
						res.Data.FirstScoreRate === 0 &&
						res.Data.SecondScoreRate === 0 &&
						res.Data.ThirdScoreRate === 0
					) {
						this.isShow = false;
					} else {
						this.masteredCount = res.Data.MasteredCount;
						this.scoreRate = res.Data.VocabularyScoreRate;
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
		justify-content: space-between;
		.title {
			display: block;
			margin: 3px 0 0 0;
		}
		.masteredCount {
			width: 170px;
			height: 60px;
			background: url(~@/assets/img/teacher/掌握2_iSpt.png) 0px center no-repeat;
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
