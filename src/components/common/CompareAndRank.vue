<template>
	<div class="bottom">
		<!-- 全区排行榜 -->
		<div class="bottomItem">
			<span class="bottomTitle">比较情况</span>
			<div class="content">
				<!-- <span
					v-for="(item, index) in compareList.slice(0, 2)"
					:key="index"
					:title="item.SchoolName"
					>· {{ item.SchoolName }}</span
				> -->
                <span>· 较班级平均</span>
                <span>· 较年级平均</span>
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
                <span>· 班级排名</span>
                <span>· 年级排名</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		compareList: {
			type: Array,
		},
		rankList: {
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
		margin: 3px 0 5px 0;
		padding-left: 15px;
		font-size: 16px;
		font-family: YouSheBiaoTiHei;
		color: #00aaff;
		background: url(~@/assets/img/teacher/标题小标签.png) 0px center no-repeat;
	}
}
</style>
