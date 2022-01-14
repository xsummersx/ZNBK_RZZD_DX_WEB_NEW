<template>
	<div class="bottom">
		<span class="bottomTitle" v-if="$route.name === 'gradeRZZD'"
			>班级排行榜<span class="top2">TOP2</span></span
		>
		<span class="bottomTitle" v-if="$route.name === 'teacherRZZD'"
			>学生排行榜<span class="top2">TOP2</span></span
		>
		<div class="content" v-if="$route.name === 'teacherRZZD'">
			<div :title="theFirstStu" class="top2Item">
				<span>· {{ theFirstStu }}</span
				><span class="top2ItemColor"
					>{{ theFirstPre }}<span v-if="isScore">分</span
					><span v-else>份</span></span
				>
			</div>
			<div :title="theSecondStu" class="top2Item">
				<span>· {{ theSecondStu }}</span
				><span class="top2ItemColor"
					>{{ theSecondPre }}<span v-if="isScore">分</span
					><span v-else>份</span></span
				>
			</div>
		</div>
		<div class="content" v-else>
			<div :title="theFirstClass" class="top2Item">
				<span>· {{ theFirstClass }}</span
				><span class="top2ItemColor"
					>{{ theFirstAvg }}<span v-if="isScore">分</span
					><span v-else>份</span></span
				>
			</div>
			<div :title="theSecondClass" class="top2Item">
				<span>· {{ theSecondClass }}</span
				><span class="top2ItemColor"
					>{{ theSecondAvg }}<span v-if="isScore">分</span
					><span v-else>份</span></span
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		theFirstStu: {
			type: String,
			default: "",
		},
		theFirstPre: {
			type: Number,
			default: 0,
		},
		theFirstClass: {
			type: String,
			default: "",
		},
		theFirstAvg: {
			type: Number,
			default: 0,
		},
		theSecondStu: {
			type: String,
			default: "",
		},
		theSecondPre: {
			type: Number,
			default: 0,
		},
		theSecondClass: {
			type: String,
			default: "",
		},
		theSecondAvg: {
			type: Number,
			default: 0,
		},
		isScore: {
			type: Boolean,
			default: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.bottom {
	margin: 10px 0 0 0;
	width: 368px;
	height: 60px;
	padding-top: 5px;
	background-image: linear-gradient(
		to right,
		rgba(255, 255, 255, 0.1),
		rgba(255, 255, 255, 0)
	);
	border-radius: 4px;
	.bottomTitle {
		background: url(~@/assets/img/teacher/标题小标签.png) 0px center no-repeat;
		padding-left: 10px;
		font-size: 16px;
		font-family: YouSheBiaoTiHei;
		color: #00aaff;
		.top2 {
			font-size: 12px;
			color: #0088cc;
		}
	}
	.content {
		display: flex;
		display: -webkit-flex;
		margin: 5px 0 0 0;
		// padding: 0 10px 0 10px;
		.top2Item {
			flex: 1;
			display: flex;
			display: -webkit-flex;
			justify-content: space-around;
		}
		.top2ItemColor {
			// color: #ddd;
			opacity: 0.8;
		}
	}
}
</style>
