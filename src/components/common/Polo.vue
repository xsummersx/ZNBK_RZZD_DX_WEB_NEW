<template>
	<!-- 水球图 -->
	<div class="left">
		<div class="progress">
			<div class="inner">
				<div class="percent">
					<span
						><span class="number">{{ score }}</span
						><span class="charChar">分</span></span
					>
					<br />
					<span class="fullScore">满分:{{ FullScore }}分</span>
				</div>
				<div class="water"></div>
				<div class="glare"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		FullScore: {
			type: Number,
			default: 150,
		},
		score: {
			type: Number,
			default: 150,
		},
	},
	methods: {
		// 可修改液体占比
		changePercent(waterPercent) {
			this.$(".water").css({
				top: 100 - waterPercent + "%",
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.left {
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 128px;
	height: 122px;
}
.number {
	font-size: 32px;
	font-family: Oswald;
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
		.charChar {
			font-size: 14px;
			font-weight: bold;
		}
		.fullScore {
			font-size: 12px;
		}

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

			top: 55%;
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

		.percent {
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
