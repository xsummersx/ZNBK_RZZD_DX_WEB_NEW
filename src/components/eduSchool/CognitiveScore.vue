<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:22:09
 * @LastEditTime: 2021-11-30 14:24:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》认知平均分，图0，图1
-->
<template>
	<div class="left-Content-Box" :style="boxHeight">
		<span class="title">认知平均分</span>
		<div class="main" v-if="$route.name === 'educationRZZD'">
			<Ring :FullIndex="info.FullIndex" :avgIndex="info.AreaAvgIndex" />
			<Middle :level="info.CognitiveGradeName" />
			<div class="right">
				<span class="quantity" :class="status === 'up' ? 'up' : 'down'"
					>{{ comparedData }}<span class="char">分</span></span
				>
				<span class="font12">较上周</span>
			</div>
		</div>
		<div class="main" v-if="$route.name === 'schoolRZZD'">
			<div class="leader">
				<span class="textColor font12">全校平均认知分</span>
				<Ring
					:FullIndex="info.FullIndex"
					:avgIndex="info.SchoolAvgIndex"
					:isMR="false"
				/>
				<div class="compare">
					<i class="icon"></i>
					<span>较上周 </span>
					<span class="quantity" :class="status === 'up' ? 'up' : 'down'"
						>{{ comparedData }}<span class="char">分</span></span
					>
				</div>
			</div>
			<Middle :level="info.CognitiveGradeName" />
			<div class="right-leader">
				<span class="score"
					>{{ info.AreaAvgIndex }}<span class="charChar">分</span></span
				>
				<span class="textColor font12">全区平均认知分</span>
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
	GetSchoolCongnitiveIndex,
	GetAreaCognitiveIndex,
} from "@/api/eduSchool/left.js";

export default {
	data() {
		return {
			info: {
				// 学校平均分
				SchoolAvgIndex: 0,
				// 较上周
				ChangeIndex: 0,
				// 等级
				CognitiveGradeName: "A",
				// 满分
				FullIndex: 0,
				// 全区平均分
				AreaAvgIndex: 0,
				// 排名第一学校
				FirstSchool: "蓝鸽高中",
				// 排名第一分数
				FirstScore: 0,
				// 本校区排名
				MySchoolRank: 1,
				// 全区排行榜
				SchoolList: [],
				// 重点关注
				FocusSchoolList: [],
			},
		};
	},
	created() {
		this.init();
	},
	components: {
		RankAndFirst: () => import("../common/RankAndFirst.vue"),
		Top: () => import("../common/Top.vue"),
		Ring: () => import("../common/Ring.vue"),
		Middle: () => import("../common/Middle.vue"),
	},
	computed: {
		// 不同身份不同高度
		boxHeight: function () {
			if (this.$route.name === "schoolRZZD") {
				return "height: 308px";
			} else {
				return "height: 298px";
			}
		},
		// 返回较上周数据
		comparedData: function () {
			if (this.info.ChangeIndex < 0) {
				return Math.abs(this.info.ChangeIndex);
			} else {
				return this.info.ChangeIndex;
			}
		},
		// 返回较上周是上升还是下降
		status: function () {
			if (this.info.ChangeIndex < 0) {
				return "down";
			} else {
				return "up";
			}
		},
	},
	mounted() {},
	methods: {
		// 初始化
		init() {
			let data = { ...this.$store.state };
			delete data.UserInfo;
			if (this.$route.name === "educationRZZD") {
				// 教育局
				GetAreaCognitiveIndex(data)
					.then((res) => {
						if (res.Data != null) {
							this.info = res.Data;
						}
					})
					.catch();
			} else {
				// 校领导
				GetSchoolCongnitiveIndex(data)
					.then((res) => {
						if (res.Data != null) {
							this.info = res.Data;
						}
					})
					.catch();
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
.font12 {
	font-size: 12px;
}
.charChar {
	font-size: 14px;
	font-weight: bold;
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
.main {
	width: 80%;
	display: flex;
	display: -webkit-flex;
	flex-direction: row;
	margin: 15px 0 -10px 0;
	justify-content: space-around;
	.right {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 128px;
		height: 122px;
		margin-left: -32px;
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
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 140px;
		margin-right: -10px;
		margin-bottom: 5px;
		position: relative;
		.compare {
			.icon {
				height: 22px;
				width: 37px;
				left: 0px;
				bottom: 12px;
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
		margin-left: -32px;
		background: url(~@/assets/img/eduSchool/全区平均统计.png) center center
			no-repeat;
		.score {
			font-size: 24px;
			//   margin-bottom: 5px;
			font-family: Oswald;
		}
	}
}
.bottom {
	display: flex;
	display: -webkit-flex;
	width: 94%;
	justify-content: space-around;
	margin: 10px 0 0 0;
}
</style>
