<template>
	<div class="bottom">
		<!-- 全区排行榜 -->
		<div class="bottomItem">
			<span class="bottomTitle">比较情况</span>
			<div class="content">
				<span
					>· 较班级平均&nbsp;&nbsp;
					<span class="quantity" :class="status === 'up' ? 'up' : 'down'"
						>{{ comparedData }}<span class="char" v-if="isScore">分</span
						><span class="char" v-else>份</span></span
					></span
				>
				<span
					>· 较年级平均&nbsp;&nbsp;
					<span class="quantity" :class="status1 === 'up' ? 'up' : 'down'"
						>{{ comparedData1 }}<span class="char" v-if="isScore">分</span
						><span class="char" v-else>份</span></span
					></span
				>
			</div>
		</div>
		<!-- 重点关注 -->
		<div class="bottomItem">
			<span class="bottomTitle">排名情况</span>
			<div class="content">
				<!-- <span
					v-for="(item, index) in rankList.slice(0, 2)"
					:key="index"
					:title="item.SchoolName"
					>· {{ item.SchoolName }}</span
				> -->
				<span
					>· 班级排名 &nbsp;&nbsp;<span class="rankNumber">{{
						ClassRank
					}}</span></span
				>
				<span
					>· 年级排名 &nbsp;&nbsp;<span class="rankNumber">{{
						GradeRank
					}}</span></span
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		classCompare: {
			type: Number,
		},
		gradeCompare: {
			type: Number,
		},
		isScore: {
			type: Boolean,
			default: true,
		},
		ClassRank: {
			type: Number,
		},
		GradeRank: {
			type: Number,
		},
	},
	data() {
		return {
			// ChangeScore: 100,
			// ChangeScore1: -100,
		};
	},
	computed: {
		comparedData: function () {
			if (this.classCompare < 0) {
				return Math.abs(this.classCompare);
			} else {
				return this.classCompare;
			}
		},
		status: function () {
			if (this.classCompare < 0) {
				return "down";
			} else {
				return "up";
			}
		},
		comparedData1: function () {
			if (this.gradeCompare < 0) {
				return Math.abs(this.gradeCompare);
			} else {
				return this.gradeCompare;
			}
		},
		status1: function () {
			if (this.gradeCompare < 0) {
				return "down";
			} else {
				return "up";
			}
		},
	},
};
</script>

<style lang="scss" scoped>
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
		height: 80px;
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
			margin: 0 0 0 15px;
			span {
				width: 160px;
				height: 20px;
				line-height: 20px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.quantity {
				padding-left: 12px;
				font-size: 16px;
				margin-bottom: 5px;
				font-family: ArialMT;
			}
			.up {
				background: url(~@/assets/img/teacher/升.png) 0px center no-repeat;
				color: #60ff60;
			}
			.down {
				background: url(~@/assets/img/teacher/降.png) 0px center no-repeat;
				color: #ff8080;
			}
			.char {
				font-size: 12px;
			}
			.rankNumber {
				color: #4bf3f9;
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
</style>
