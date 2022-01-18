<template>
	<div class="bottom" v-if="$route.name === 'educationRZZD'">
		<!-- 全区排行榜 -->
		<div class="bottomItem">
			<span class="bottomTitle icon1"
				>全区排行榜<span class="top2">TOP2</span></span
			>
			<div class="content" v-if="SchoolList.length > 0">
				<span
					v-for="(item, index) in SchoolList.slice(0, 2)"
					:key="index"
					:title="item.SchoolName"
					>· {{ item.SchoolName }}</span
				>
			</div>
			<img v-else class="imgNoData" src="~@/assets/img/common/无数据.png" />
		</div>
		<!-- 重点关注 -->
		<div class="bottomItem">
			<span class="bottomTitle icon2"
				>全区重点关注<span class="top2">TOP2</span></span
			>
			<div class="content" v-if="FocusSchoolList.length > 0">
				<span
					v-for="(item, index) in FocusSchoolList.slice(0, 2)"
					:key="index"
					:title="item.SchoolName"
					>· {{ item.SchoolName }}</span
				>
			</div>
			<img v-else class="imgNoData" src="~@/assets/img/common/无数据.png" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		SchoolList: {
			type: Array,
		},
		FocusSchoolList: {
			type: Array,
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
		height: 90px;
		border-radius: 4px;
		background-image: linear-gradient(
			to right,
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0)
		);
		.imgNoData {
			width: 40px;
			height: 40px;
			margin: 0 auto;
		}
		.content {
			display: flex;
			display: -webkit-flex;
			flex-direction: column;
			margin: 0 0 0 25px;
			span {
				width: 150px;
				height: 23px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-family: MicrosoftYaHei;
			}
		}
	}
	.bottomTitle {
		margin: 10px 0 8px 10px;
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
</style>
