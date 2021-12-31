<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-10 11:41:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，语言能力
-->
<template>
	<div class="right-small-box">
		<div class="box-title clearfix">
			<span class="float-l title">语言能力</span>
			<span class="float-r check-icon" @click="openDialog"
				><i></i>班级语言能力对比分析</span
			>
		</div>
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
		<el-dialog
			title="班级语言能力对比分析"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="1000px"
			top="0vh"
		>
			<LanDialog :list="ClassList" />
		</el-dialog>
	</div>
</template>

<script>
import { GetGradeLanguage } from "@/api/paperTwo/question";
export default {
	data() {
		return {
			lanResInfo: {
				ZH: 3,
				XZ: 2,
				KY: 3,
				YD: 1,
				TL: 2,
			},
			dialogVisible: false,
			ClassList: [
				{
					CourseClassID: null,
					CourseClassName: "初三（1）班",
					ZHScore: 0,
					TLScore: 10,
					KYScore: 30,
					YDScore: 20,
					XZScore: 80,
				},
				{
					CourseClassID: null,
					CourseClassName: "初三（2）班",
					ZHScore: 0,
					TLScore: 90,
					KYScore: 20,
					YDScore: 50,
					XZScore: 70,
				},
				{
					CourseClassID: null,
					CourseClassName: "初三（3）班",
					ZHScore: 0,
					TLScore: 100,
					KYScore: 20,
					YDScore: 50,
					XZScore: 5,
				},
				{
					CourseClassID: null,
					CourseClassName: "初三（4）班",
					ZHScore: 30,
					TLScore: 40,
					KYScore: 50,
					YDScore: 70,
					XZScore: 10,
				},
				{
					CourseClassID: null,
					CourseClassName: "初三（5）班",
					ZHScore: 0,
					TLScore: 20,
					KYScore: 10,
					YDScore: 70,
					XZScore: 20,
				},
				{
					CourseClassID: null,
					CourseClassName: "初三（6）班",
					ZHScore: 0,
					TLScore: 90,
					KYScore: 80,
					YDScore: 70,
					XZScore: 60,
				},
			],
		};
	},
	components: {
		LanDialog: () => import("./dialog/LanDialog.vue"),
	},
	created() {
		let params = {
			...this.$store.state,
		};
		delete params.UserInfo;
		GetGradeLanguage(params).then((res) => {
			this.lanResInfo = res.Data.Conlusion;
			this.ClassList = res.Data.ClassList;
		});
	},
	mounted() {},
	methods: {
		openDialog() {
			this.dialogVisible = true;
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
.main {
	margin: 10px auto 0;
	width: 356px;
	// height: 162px;
	height: 80%;
	// display: flex;
	// display: -webkit-flex;
	// justify-content: center;
	// align-items: center;
	background: url(~@/assets/img/grade/宇宙圆环轨迹.png) center 10px no-repeat;
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
</style>
