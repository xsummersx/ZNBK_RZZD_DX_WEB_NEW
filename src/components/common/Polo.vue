<template>
	<!-- 水球图 -->
	<div class="left">
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			style="display: none"
		>
			<symbol id="wave">
				<path
					d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"
				></path>
				<path
					d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"
				></path>
				<path
					d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"
				></path>
				<path
					d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"
				></path>
			</symbol>
		</svg>
		<div class="progress">
			<div class="inner">
				<div class="percent">
					<span
						><span class="number">{{ count.toFixed(0) }}</span
						><span class="charChar">分</span></span
					>
					<br />
					<span class="fullScore">满分:{{ FullScore }}分</span>
				</div>
				<div id="waterPolo" class="water">
					<svg viewBox="0 0 560 20" class="water_wave water_wave_back">
						<use xlink:href="#wave"></use>
					</svg>
					<svg viewBox="0 0 560 20" class="water_wave water_wave_front">
						<use xlink:href="#wave"></use>
					</svg>
				</div>
				<!-- <div class="water animation-go-up" id="poloWater"></div>
				<div class="glare"></div> -->
			</div>
		</div>
	</div>
</template>

<script>
import gsap from "gsap";
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
	data() {
		return {
			count: 0,
		};
	},
	mounted() {
		// setTimeout(() => {
		// 	let ani = this.$("#poloWater");
		// 	ani.removeClass("animation-go-up");
		// 	ani.addClass("animation-spin");
		// }, 2000);
		// let ani = this.$("#poloWater");
		// ani.on("animationend webkitAnimationEnd", function () {
		// 	ani.removeClass("animation-go-up");
		// 	ani.addClass("animation-spin");
		// });
		let water = document.getElementById("waterPolo");
		let percent = 0;
		let interval;
		interval = setInterval(function () {
			percent++;
			water.style.transform = "translate(0" + "," + (100 - percent) + "%)";
			if (percent == 45) {
				clearInterval(interval);
			}
		}, 30);
		gsap.to(this, { duration: 1.5, count: this.score });
	},
	methods: {
		// 可修改液体占比
		// changePercent(waterPercent) {
		// 	this.$(".water").css({
		// 		top: 100 - waterPercent + "%",
		// 	});
		// },
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
$wfColor: rgba(64,214,61, 1);
// $wbColor: #c7eeff;
$wbColor: rgba(65, 205, 62, 0.6);
// @keyframes spin {
// 	from {
// 		transform: rotate(0deg);
// 	}
// 	to {
// 		transform: rotate(360deg);
// 	}
// }
// @-webkit-keyframes spin {
// 	from {
// 		transform: rotate(0deg);
// 	}
// 	to {
// 		transform: rotate(360deg);
// 	}
// }
// @keyframes go-up {
// 	from {
// 		top: 100%;
// 		transform: rotate(0deg);
// 	}
// 	to {
// 		top: 55%;
// 		transform: rotate(90deg);
// 	}
// }
// @-webkit-keyframes go-up {
// 	from {
// 		top: 100%;
// 		transform: rotate(0deg);
// 	}
// 	to {
// 		top: 55%;
// 		transform: rotate(90deg);
// 	}
// }
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
			// text-shadow: 0px 0px 1px #000;
		}

		// .water {
		// 	position: absolute;
		// 	z-index: 1;
		// 	background: rgba(45, 184, 42, 1);
		// 	width: 200%;
		// 	height: 200%;

		// 	transform: translateZ(0);
		// 	-webkit-transform: translateZ(0);

		// 	transition: all 1s ease !important;
		// 	-webkit-transition: all 1s ease !important;

		// 	top: 55%;
		// 	left: -50%;
		// 	border: 1px solid transparent;
		// 	border-radius: 40% !important;
		// }
		// .animation-spin {
		// 	animation-duration: 10s;
		// 	animation-name: spin;
		// 	animation-iteration-count: infinite;
		// 	animation-timing-function: linear;
		// }
		// .animation-go-up {
		// 	animation: go-up 2s;
		// }

		// .glare {
		// 	position: absolute;
		// 	top: -120%;
		// 	left: -120%;
		// 	z-index: 5;
		// 	width: 200%;
		// 	height: 200%;
		// 	transform: rotate(45deg);
		// 	background: #ffffff;
		// 	background: rgba(255, 255, 255, 0.2);
		// 	border-radius: 50%;
		// }
		.water {
			position: absolute;
			left: 0;
			top: 0;
			z-index: 3;
			width: 100%;
			height: 100%;
			transform: translate(0, 100%);
			background: $wfColor;
			transition: all 0.3s;
			&_wave {
				width: 200%;
				position: absolute;
				bottom: 100%;
				&_back {
					right: 0;
					fill: $wbColor;
					animation: wave-back 2s infinite linear;
				}
				&_front {
					left: 0;
					fill: $wfColor;
					margin-bottom: -1px;
					animation: wave-front 1s infinite linear;
				}
			}
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
@keyframes wave-front {
	100% {
		transform: translate(-50%, 0);
	}
}

@keyframes wave-back {
	100% {
		transform: translate(50%, 0);
	}
}
</style>
