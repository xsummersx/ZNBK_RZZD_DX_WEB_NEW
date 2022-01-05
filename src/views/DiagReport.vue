<!--
 * @Author: your name
 * @Date: 2021-12-31 10:37:22
 * @LastEditTime: 2021-12-31 10:37:22
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\report.vue
-->
<template>
	<div class="schoolReportBack">
		<!-- 头部信息 -->
		<div class="clearfix" style="height: 60px">
			<div
				class="productName float-l"
				:class="$route.query.StageNo == 'C' ? 'productName' : 'productName2'"
			></div>
			<div class="rightInfo float-r">
				<!-- <div
          class="float-r"
          :class="$route.query.str == 'school' ? 'schoolIcon' : 'teacherIcon'"
        ></div> -->
				<img
					class="teacherHead"
					:src="resInfo2.PhotoPath"
					@click="toUserInfo()"
					alt=""
				/>
				<span class="teacherName" @click="toUserInfo()">
					{{ resInfo2.UserName }}
				</span>
				<span
					:class="
						resInfo2.UserType == 8
							? 'eduIcon'
							: resInfo2.UserType == 7
							? 'schoolIcon'
							: resInfo2.UserType == 12
							? 'gradeLeader'
							: 'teacherIcon'
					"
				></span>
				<span class="exitIcon" @click="exit()"></span>
			</div>
		</div>
		<Diagnosis :resInfo="resInfo2" v-if="isShow" />
	</div>
</template>

<script>
// import { getUserInfo } from "../api/head/test";
import { GetSubSystemInfo } from "../api/head/header";
import { ExitTheSystem } from "../api/head/header";
export default {
	data() {
		return {
			resInfo2: {},
			isShow: false,
		};
	},
	components: {
		Diagnosis: () => import("./dialog/Diagnosis.vue"),
	},
	created() {
		this.GetUserInfo();
	},
	methods: {
		GetUserInfo() {
			// let params = {
			//   token: this.$route.query.token,
			// };
			// GetUserInfo(params).then((res) => {
			//   console.log(res);
			// });
			this.axios
				.get("api/RZZD/GetUserInfo?token=" + this.$route.query.token)
				.then((res) => {
					// console.log(res);
					this.resInfo2 = res.Data;
					this.isShow = true;
				});
		},
		// 退出系统
		exit() {
			this.$messagebox
				.confirm("是否确定退出系统？", "", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "info", //蓝色叹号-warning， //warning,问号-info，绿色打钩-success，//红色错误-error
					center: true,
					customClass: "MessageBig",
				})
				.then(() => {
					let params = {
						token: this.$route.query.token,
					};
					ExitTheSystem(params).then((res) => {
						if (res.Code == 1) {
							window.open(res.Data, "_self");
						}
					});
				})
				.catch(() => {});
		},
		// 用户信息
		toUserInfo() {
			let params = {
				token: this.$route.query.token,
			};
			GetSubSystemInfo(params).then((res) => {
				let url =
					res.Data.BaseSysID +
					"usermgr/personalmgr/default.aspx?lg_tk=" +
					this.$route.query.token;
				window.open(url, "_blank");
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.schoolReportBack {
	width: 1920px;
	height: 1080px;
	background: url("../assets/img/head/整体大BG.png") center center no-repeat;
	margin: 0 auto;
	.productName,
	.productName2 {
		width: 380px;
		height: 60px;
		background: url("../assets/img/head/产品名_高考.png") 20px center no-repeat;
	}
	.productName2 {
		background: url("../assets/img/head/产品名_中考.png") 20px center no-repeat;
	}
	.rightInfo {
		line-height: 52px;
		span {
			display: inline-block;
			vertical-align: middle;
		}
		.exitIcon {
			width: 15px;
			margin: 0 20px 0 0;
			height: 15px;
			background: url("../assets/img/head/exitIcon.png") center center no-repeat;
			cursor: pointer;
		}
		.exitIcon:hover {
			background: url("../assets/img/head/exitIcon_h.png") center center
				no-repeat;
		}
		.teacherName {
			margin: 0 0 0 0;
			color: #fff;
			opacity: 0.85;
			cursor: pointer;
		}
		.teacherName:hover {
			opacity: 1;
			text-decoration: underline;
		}
		.schoolIcon,
		.gradeLeader {
			width: 65px;
			margin: 0 5px;
			height: 16px;
			background: url("../assets/img/head/schoolLeaderIcon.png") center center
				no-repeat;
			vertical-align: middle;
		}
		.gradeLeader {
			background: url("../assets/img/head/gradeLeaderIcon.png") center center
				no-repeat;
		}
		.eduIcon {
			width: 76px;
			margin: 0 5px;
			height: 16px;
			background: url("../assets/img/head/eduIcon.png") center center no-repeat;
			vertical-align: middle;
		}

		.teacherIcon {
			width: 65px;
			margin: 0 5px;
			height: 16px;
			background: url("../assets/img/head/teacherIcon.png") center center
				no-repeat;
			vertical-align: middle;
		}
		.teacherHead {
			width: 28px;
			height: 28px;
			vertical-align: middle;
			cursor: pointer;
			margin-right: 8px;
			object-fit: cover;
			border-radius: 100%;
			-webkit-border-radius: 100%;
			-moz-border-radius: 100%;
			-ms-border-radius: 100%;
			-o-border-radius: 100%;
		}
	}
}
</style>
