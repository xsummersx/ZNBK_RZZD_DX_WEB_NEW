<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:25:48
 * @LastEditTime: 2021-11-30 14:25:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》高考预估成绩，图0，图1
-->
<template>
	<div class="left-Content-Box" :style="boxHeight">
		<span class="title">高考预估成绩</span>
		<div class="main" v-if="$route.name === 'educationRZZD'">
			<Polo :FullScore="info.FullScore" :score="info.AreaAvgScore" />
			<div class="right">
				<span class="quantity" :class="status === 'up' ? 'up' : 'down'"
					>{{ comparedData }}<span class="char">分</span></span
				>
				<span>较上周</span>
			</div>
		</div>
		<div class="main" v-if="$route.name === 'schoolRZZD'">
			<div class="leader">
				<span class="textColor">全校平均预估成绩</span>
				<Polo :FullScore="info.FullScore" :score="info.SchoolAvgScore" />
				<div class="compare">
					<i class="icon"></i>
					<span>较上周 </span>
					<span class="quantity" :class="status === 'up' ? 'up' : 'down'"
						>{{ comparedData }}<span class="char">分</span></span
					>
				</div>
			</div>
			<div class="right-leader">
				<span class="score"
					>{{ info.AreaAvgScore }}<span class="char">分</span></span
				>
				<span class="textColor">全区平均预估成绩</span>
			</div>
		</div>
		<Top
			v-if="$route.name === 'educationRZZD'"
			:SchoolList="info.SchoolList"
			:FocusSchoolList="info.FocusSchoolList"
		/>
		<RankAndFirst
			v-if="$route.name === 'schoolRZZD'"
			:MySchoolRank="info.MySchoolRank"
			:FirstSchool="info.FirstSchool"
			:FirstScore="info.FirstScore"
			:isScore="true"
		/>
	</div>
</template>

<script>
import {
	GetSchoolPredicted,
	GetAreaPredictedScore,
} from "@/api/eduSchool/left.js";

export default {
	data() {
		return {
			info: {
				// 全区平均
				AreaAvgScore: 107,
				// 学校平均
				SchoolAvgScore: 107,
				// 较上周
				ChangeScore: 10,
				// 满分
				FullScore: 150,
				// 排名第一
				FirstSchool: "蓝鸽高中",
				// 第一分数
				FirstScore: 150,
				// 本校排名
				MySchoolRank: 20,
				// 排行榜
				SchoolList: [
					{
						SchoolID: "",
						SchoolName: "蓝鸽高中",
						SchoolRank: 1,
					},
					{
						SchoolID: "",
						SchoolName: "蓝鸽高中",
						SchoolRank: 1,
					},
				],
				// 重点关注
				FocusSchoolList: [
					{
						SchoolID: "",
						SchoolName: "蓝鸽高中",
						SchoolRank: 1,
					},
					{
						SchoolID: "",
						SchoolName: "蓝鸽高中",
						SchoolRank: 1,
					},
				],
			},
		};
	},
	created() {
		this.init();
	},
	computed: {
		boxHeight: function () {
			if (this.$route.name === "schoolRZZD") {
				return "height: 308px";
			} else {
				return "height: 298px";
			}
		},
		comparedData: function () {
			if (this.info.ChangeScore < 0) {
				return Math.abs(this.info.ChangeScore);
			} else {
				return this.info.ChangeScore;
			}
		},
		status: function () {
			if (this.info.ChangeScore < 0) {
				return "down";
			} else {
				return "up";
			}
		},
	},
	components: {
		RankAndFirst: () => import("../common/RankAndFirst.vue"),
		Top: () => import("../common/Top.vue"),
		Polo: () => import("../common/Polo.vue"),
	},
	methods: {
		init() {
			let data = { ...this.$store.state };

			if (this.$route.name === "educationRZZD") {
				GetAreaPredictedScore(data).then((res) => {
					this.info = res.Data;
				});
			} else {
				GetSchoolPredicted(data).then((res) => {
					this.info = res.Data;
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.numberColor {
	color: #a2afcc;
}
.textColor {
	color: #fff;
	opacity: 0.8;
}
.left-Content-Box {
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	margin: 20px 0;
	width: 400px;
	// height: 308px;
	background: url(~@/assets/img/teacher/认知平均分_bg.png) center center
		no-repeat;
	background-size: 100% 100%;
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
	margin: 30px 0 5px;
	justify-content: space-around;
	.right {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 128px;
		height: 122px;
		background: url(~@/assets/img/teacher/较上周底座.png) center center
			no-repeat;
	}
	.quantity {
		padding-left: 12px;
		font-size: 18px;
		margin-bottom: 5px;
		font-family: ArialMT;
	}
	.up {
		background: url(~@/assets/img/teacher/升.png) 0px center no-repeat;
		color: #60ff60;
	}
	.down {
		background: url(~@/assets/img/teacher/降.png) 0px center no-repeat;
		color: #ff0000;
	}
	.char {
		font-size: 12px;
	}
	.leader {
		margin-top: -15px;
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		left: -5px;
		.compare {
			margin: 10px 0 -10px 0;
			.icon {
				height: 22px;
				width: 37px;
				left: -5px;
				bottom: 0;
				background: url(~@/assets/img/eduSchool/VS.png) center center no-repeat;
				position: absolute;
			}
		}
	}
	.right-leader {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		padding-top: 40px;
		// justify-content: center;
		align-items: center;
		width: 162px;
		height: 142px;
		background: url(~@/assets/img/eduSchool/全区平均统计.png) center center
			no-repeat;
		.score {
			font-size: 24px;
			//   margin-bottom: 5px;
			font-family: Oswald;
		}
	}
}
</style>
