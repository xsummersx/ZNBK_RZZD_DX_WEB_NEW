<template>
	<!-- 较上周 -->
	<div class="right">
		<span class="quantity" :class="status === 'up' ? 'up' : 'down'"
			>{{ comparedData }}<span v-if="type === '1'" class="char">分</span
			><span v-else class="char">份</span></span
		>
		<span class="cLastWeek">较上周</span>
	</div>
</template>

<script>
export default {
	props: {
		ChangeScore: {
			type: Number,
			default: 1,
		},
		type: {
			//1:分；2:份
			type: String,
			default: "1",
		},
	},
	computed: {
		comparedData: function () {
			if (this.ChangeScore < 0) {
				return Math.abs(this.ChangeScore);
			} else {
				return this.ChangeScore;
			}
		},
		status: function () {
			if (this.ChangeScore < 0) {
				return "down";
			} else {
				return "up";
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.right {
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 128px;
	height: 122px;
	background: url(~@/assets/img/teacher/较上周_iSpt.png) center center no-repeat;
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
	.cLastWeek {
		font-size: 12px;
	}
}
</style>
