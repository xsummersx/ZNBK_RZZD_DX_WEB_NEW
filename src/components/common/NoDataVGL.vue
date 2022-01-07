<template>
	<div class="graImg" v-if="type === 'gra'">
		<img class="graImgii" src="~@/assets/img/common/暂无语法认知.png" />
		<span>暂无语法认知数据噢~</span>
	</div>
	<div class="graImg" v-else-if="type === 'voca'">
		<img class="graImgii" src="~@/assets/img/common/暂无词汇认知.png" />
		<span>暂无词汇认知数据噢~</span>
	</div>
    <div class="graImg" v-else-if="type === 'lan'">
		<img class="graImgii" src="~@/assets/img/common/暂无语言能力.png" />
		<span>暂无语言能力数据噢~</span>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
		},
	},
};
</script>

<style lang="scss" scoped>
.graImg {
	width: 100%;
	height: 80%;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.graImgii {
		width: 88px;
		height: 88px;
	}
}
</style>
