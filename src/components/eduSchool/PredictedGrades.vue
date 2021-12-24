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
			<div class="left">
				<div class="progress">
					<div class="inner">
						<div class="fuPercent percent">
							<span><span class="number">108</span>分</span>
							<br />
							<span>满分:150分</span>
						</div>
						<div class="water"></div>
						<div class="glare"></div>
					</div>
				</div>
				<!-- <span><span class="number">180</span>分</span>
        <span>满分:150分</span> -->
			</div>
			<div class="right">
				<span class="quantity" :class="status === 'up' ? 'up' : 'down'"
					>5<span class="char">分</span></span
				>
				<span>较上周</span>
			</div>
		</div>
		<div class="main" v-if="$route.name === 'schoolRZZD'">
			<div class="leader">
				<span class="textColor">全校平均预估成绩</span>
				<div class="left">
					<div class="progress">
						<div class="inner">
							<div class="fuPercent percent">
								<span><span class="number">108</span>分</span>
								<br />
								<span>满分:150分</span>
							</div>
							<div class="water"></div>
							<div class="glare"></div>
						</div>
					</div>
					<!-- <span><span class="number">180</span>分</span>
          <span>满分:150分</span> -->
				</div>
				<div class="compare">
					<i class="icon"></i>
					<span>较上周 </span>
					<span class="quantity" :class="status === 'up' ? 'up' : 'down'"
						>5<span class="char">分</span></span
					>
				</div>
			</div>

			<div class="right-leader">
				<span class="score">148<span class="char">分</span></span>
				<span class="textColor">全区平均预估成绩</span>
			</div>
		</div>
		<div class="bottom" v-if="$route.name === 'educationRZZD'">
			<!-- 全区排行榜 -->
			<div class="bottomItem">
				<span class="bottomTitle icon1"
					>全区排行榜<span class="top2">TOP2</span></span
				>
				<div class="content">
					<span title="嘉兴市实验中学">· 嘉兴市实验中学</span>
					<span title="南湖实验中学">· 南湖实验中学</span>
				</div>
			</div>
			<!-- 重点关注 -->
			<div class="bottomItem">
				<span class="bottomTitle icon2"
					>全区重点关注<span class="top2">TOP2</span></span
				>
				<div class="content">
					<span title="海盐中学">· 海盐中学</span>
					<span title="浙师大附属嘉善实验中学">· 浙师大附属嘉善实验中学</span>
				</div>
			</div>
		</div>
		<div class="bottom-leader" v-if="$route.name === 'schoolRZZD'">
			<!-- 本校区排名 -->
			<div class="bottomItem">
				<span class="bottomTitle">本校区排名</span>
				<div class="content">
					<span class="rank">第二名</span>
				</div>
			</div>
			<!-- 全区第一名学校 -->
			<div class="bottomItem">
				<span class="bottomTitle">全区第一名学校</span>
				<div class="content">
					<span class="schoolName" title="浙师大附属嘉善实验中学"
						>浙师大附属嘉善实验中学</span
					>
					<span class="schoolScore numberColor">140分</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { GetGradeLeaderPredictedScore } from "@/api/eduSchool/left.js";

export default {
	data() {
		return {
			status: "up",
			// 8:教育局
			// 7:校领导
			userType: 8,
			// boxHeight: "height: 298px"
		};
	},
	computed: {
		boxHeight: function () {
			if (this.$route.name === "schoolRZZD") {
				return "height: 308px";
			} else {
				return "height: 298px";
			}
		},
	},
	methods: {
		init() {
			let data;
			GetGradeLeaderPredictedScore(data).then((res) => {
				this.info = res.Data;
			});
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
	.left {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 128px;
		height: 122px;
	}
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

.bottom {
	display: flex;
	display: -webkit-flex;
	width: 94%;
	justify-content: space-around;
	.bottomItem {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		width: 180px;
		height: 90px;
		border-radius: 4px;
		background-image: linear-gradient(
			to right,
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0)
		);
		.content {
			display: flex;
			display: -webkit-flex;
			flex-direction: column;
			margin: 0 0 0 25px;
			span {
				width: 150px;
				height: 20px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
	.bottomTitle {
		margin: 10px 0 10px 10px;
		padding-left: 20px;
		font-size: 16px;
		font-family: YouSheBiaoTiHei;
		color: #00aaff;
		.top2 {
			font-size: 12px;
			color: #0088cc;
		}
	}
	.icon1 {
		background: url(~@/assets/img/eduSchool/排行榜.png) 0px center no-repeat;
	}
	.icon2 {
		background: url(~@/assets/img/eduSchool/重点关注.png) 0px center no-repeat;
	}
}
.bottom-leader {
	display: flex;
	display: -webkit-flex;
	width: 94%;
	margin-top: 10px;
	justify-content: space-around;
	.bottomItem {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		width: 180px;
		height: 60px;
		border-radius: 4px;
		background-image: linear-gradient(
			to right,
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0)
		);
		.content {
			display: flex;
			display: -webkit-flex;
			margin: 0 0 0 15px;
			span {
				width: 150px;
				height: 20px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-family: YouSheBiaoTiHei;
				font-size: 18px;
				line-height: 28px;
			}
			.rank {
				height: 28px;
				background: url(~@/assets/img/eduSchool/第二名.png) 0px center no-repeat;
				padding-left: 30px;
				line-height: 28px;
			}
			//   .schoolName {
			//   }
			.schoolScore {
				width: 50px;
				font-size: 12px;
				font-family: MicrosoftYaHei;
			}
		}
	}
	.bottomTitle {
		margin: 3px 0 5px 0;
		padding-left: 15px;
		font-size: 16px;
		font-family: YouSheBiaoTiHei;
		color: #00aaff;
		background: url(~@/assets/img/teacher/标题小标签.png) 0px center no-repeat;
	}
}
@keyframes spin {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}
.progress {
	position: relative;
	width: 114px;
	height: 114px;
	border: 5px solid rgba(65, 205, 62, 0.4);
	border-radius: 50% !important;
	.inner {
		position: absolute;
		overflow: hidden;
		z-index: 2;
		width: 114px;
		height: 114px;
		top: -5px;
		left: -5px;
		border-radius: 50% !important;

		.water {
			position: absolute;
			z-index: 1;
			background: rgba(45, 184, 42, 1);
			width: 200%;
			height: 200%;

			transform: translateZ(0);
			-webkit-transform: translateZ(0);

			transition: all 1s ease !important;
			-webkit-transition: all 1s ease !important;

			top: 50%;
			left: -50%;
			border: 1px solid transparent;
			border-radius: 40% !important;
			animation-duration: 10s;
			animation-name: spin;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
		}

		.glare {
			position: absolute;
			top: -120%;
			left: -120%;
			z-index: 5;
			width: 200%;
			height: 200%;
			transform: rotate(45deg);
			background: #ffffff;
			background: rgba(255, 255, 255, 0.2);
			border-radius: 50%;
		}

		.fuPercent {
			position: absolute;
			top: 20px;
			width: 100%;
			height: 100%;
			z-index: 99;
			text-align: center;
		}
	}
}
</style>
