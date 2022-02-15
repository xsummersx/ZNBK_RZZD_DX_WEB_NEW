<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-15 17:07:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教师，语言能力
-->
<template>
	<div class="right-small-box">
		<div class="box-title clearfix">
			<span class="float-l title">语言能力</span>
		</div>
		<div class="main" v-if="isShow">
			<div
				class="listenAbility animation-move"
				:class="classToName(lanResInfo.TL)"
			>
				<div class="abilityLV">
					{{ numToString(lanResInfo.TL) }}
				</div>
				<div class="ability">听力能力</div>
			</div>
			<div
				class="readAbility animation-move"
				:class="classToName(lanResInfo.YD)"
			>
				<div class="abilityLV">
					{{ numToString(lanResInfo.YD) }}
				</div>
				<div class="ability">阅读能力</div>
			</div>
			<div
				class="speakAbility animation-move"
				:class="classToName(lanResInfo.KY)"
			>
				<div class="abilityLV">
					{{ numToString(lanResInfo.KY) }}
				</div>
				<div class="ability">口语能力</div>
			</div>
			<div
				class="writeAbility animation-move"
				:class="classToName(lanResInfo.XZ)"
			>
				<div class="abilityLV">
					{{ numToString(lanResInfo.XZ) }}
				</div>
				<div class="ability">写作能力</div>
			</div>
			<div
				class="allAbility animation-move-reverse"
				:class="classToName(lanResInfo.ZH)"
			>
				<div class="abilityLV">
					{{ numToString(lanResInfo.ZH) }}
				</div>
				<div class="ability">综合能力</div>
			</div>
		</div>
		<NoDataVGL v-else type="lan" />
	</div>
</template>

<script>
import { GetClassLanguage } from "@/api/paperTwo/question";
export default {
	data() {
		return {
			lanResInfo: {
				ZH: 0,
				XZ: 0,
				KY: 0,
				YD: 0,
				TL: 0,
			},
			isShow: true,
		};
	},

	created() {
		this.init();
	},
	components: {
		NoDataVGL: () => import("../common/NoDataVGL.vue"),
	},
	methods: {
		init() {
			let params = {
				...this.$store.state,
			};
			delete params.UserInfo;
			GetClassLanguage(params)
				.then((res) => {
					// console.log(res);
					this.lanResInfo = res.Data;
					let { ZH, XZ, KY, YD, TL } = this.lanResInfo;
					if (ZH == 0 && XZ == 0 && KY == 0 && YD == 0 && TL == 0) {
						this.isShow = false;
					} else {
						this.isShow = true;
					}
				})
				.catch(() => {
					this.isShow = false;
				});
		},
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
.right-small-box {
	margin-right: 30px;
	position: relative;
}
.listenAbility,
.readAbility,
.speakAbility,
.allAbility,
.writeAbility {
	position: absolute;
	border-radius: 100%;
	text-align: center;
	font-size: 12px;
	line-height: 1.5;
	padding-top: 20px;
	.abilityLV {
		font-size: 16px;
	}
	.ability {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.7);
	}
}
.color {
	color: #ddd;
}
.textSize-12 {
	font-size: 12px;
}
.textSize-14 {
	font-size: 14px;
}
.main {
	margin: 10px auto 0;
	width: 356px;
	// height: 162px;
	height: 80%;
	background: url(~@/assets/img/grade/宇宙圆环轨迹.png) center 10px no-repeat;
}
.listenAbility {
	width: 88px;
	height: 88px;
	top: 116px;
	left: 162px;
	.abilityLV {
		font-size: 20px;
	}
	.ability {
		font-size: 14px;
	}
}
.readAbility {
	width: 64px;
	height: 64px;
	top: 38px;
	left: 184px;
	padding-top: 10px;
	.abilityLV {
		font-size: 16px;
	}
}
.speakAbility {
	width: 100px;
	height: 100px;
	top: 138px;
	left: 356px;
	.abilityLV {
		font-size: 22px;
	}
	.ability {
		font-size: 14px;
	}
}
.writeAbility {
	width: 60px;
	height: 60px;
	top: 50px;
	left: 376px;
	padding-top: 10px;
	.abilityLV {
		font-size: 14px;
	}
}
.allAbility {
	width: 72px;
	height: 72px;
	top: 64px;
	padding-top: 15px;
	left: 280px;
	.abilityLV {
		font-size: 16px;
	}
}
@keyframes move {
	0% {
		transform: translateY(0px);
	}
	25% {
		transform: translateY(3px);
	}
	50% {
		transform: translateY(0px);
	}
	75% {
		transform: translateY(-3px);
	}
	100% {
		transform: translateY(0px);
	}
}
@keyframes move-reverse {
	0% {
		transform: translateY(0px);
	}
	25% {
		transform: translateY(-3px);
	}
	50% {
		transform: translateY(0px);
	}
	75% {
		transform: translateY(3px);
	}
	100% {
		transform: translateY(0px);
	}
}
.animation-move {
	animation: move 4s linear infinite;
}
.animation-move-reverse {
	animation: move-reverse 4s linear infinite;
}
</style>
