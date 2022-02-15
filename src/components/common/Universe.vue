<template>
	<div class="main">
		<div class="listenAbility" :class="classToName(lanResInfo.TL)">
			<div class="abilityLV">
				{{ numToString(lanResInfo.TL) }}
			</div>
			<div class="ability">听力能力</div>
		</div>
		<div class="readAbility" :class="classToName(lanResInfo.YD)">
			<div class="abilityLV">
				{{ numToString(lanResInfo.YD) }}
			</div>
			<div class="ability">阅读能力</div>
		</div>
		<div class="speakAbility" :class="classToName(lanResInfo.KY)">
			<div class="abilityLV">
				{{ numToString(lanResInfo.KY) }}
			</div>
			<div class="ability">口语能力</div>
		</div>
		<div class="writeAbility" :class="classToName(lanResInfo.XZ)">
			<div class="abilityLV">
				{{ numToString(lanResInfo.XZ) }}
			</div>
			<div class="ability">写作能力</div>
		</div>
		<div class="allAbility" :class="classToName(lanResInfo.ZH)">
			<div class="abilityLV">
				{{ numToString(lanResInfo.ZH) }}
			</div>
			<div class="ability">综合能力</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		lanResInfo: {
			type: Object,
			default: () => {
				return { ZH: 0, XZ: 0, KY: 0, YD: 0, TL: 0 };
			},
		},
	},
	methods: {
		// 数字转为字符串
		numToString(i) {
			switch (i) {
				case 0:
					return "--";
				case 1:
					return "较差";
				case 2:
					return "一般";
				case 3:
					return "较好";
				default:
					break;
			}
		},
		//返回样式
		classToName(i) {
			switch (i) {
				case 0:
					return "grayBox";
				case 1:
					return "redBox";
				case 2:
					return "greenBox";
				case 3:
					return "blueBox";
				default:
					break;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.grayBox {
	color: rgba(153, 155, 160, 0.8);
	background-image: Radial-gradient(
		rgba(153, 155, 160, 0.2) 0%,
		rgba(153, 155, 160, 0.2) 50%,
		rgba(153, 155, 160, 0.9) 100%
	);
}
.redBox {
	color: #ff8080;
	background-image: Radial-gradient(
		rgba(251, 131, 131, 0.2) 0%,
		rgba(251, 131, 131, 0.2) 50%,
		rgba(251, 131, 131, 0.9) 100%
	);
}
.greenBox {
	color: #60ff60;
	background-image: Radial-gradient(
		rgba(2, 102, 0, 0.8) 0%,
		rgba(2, 102, 0, 0.8) 40%,
		rgba(6, 192, 3, 1) 100%
	);
}
.blueBox {
	color: #00c6ff;
	background-image: Radial-gradient(
		rgba(12, 92, 238, 0.2) 0%,
		rgba(12, 92, 238, 0.4) 50%,
		rgba(80, 141, 250, 1) 100%
	);
}
</style>
