<template>
	<!-- 薄弱诊断 -->
	<div class="diagnosisPage">
		<div class="diagnosisTitle">
			<div class="titleLeft"></div>
			<div class="titleMiddle">
				嘉兴一中-高三(1)班-{{ titleText }}薄弱{{ typeName }}诊断报告
			</div>
			<div class="titleRight"></div>
		</div>
		<div class="diagnosisMain">
			<div class="mainTop">
				<div class="mainTopLeft">
					<div class="tips">
						<div>老师您好，</div>
						<div>
							蓝鸽大数据基于您的{{
								recommendText
							}}词汇学习情况，进行智能诊断分析，
						</div>
						<div>为您安排如下薄弱{{ typeName }}教学计划:</div>
					</div>
				</div>
				<div class="mainTopRight">
					<div
						class="focus"
						v-if="userType === 'teacher' || userType === 'grade'"
					>
						<span class="focusTitle" v-if="userType === 'teacher'"
							>重点关注学生</span
						>
						<span class="focusTitle" v-else>重点关注班级</span>
						<div class="stuList">
							<div class="stuItem">
								<span class="stuRank">1</span>
								<span class="stuName"
									><img
										class="stuPhoto"
										src="http://172.16.41.236:5000/LgFtp/UserInfo/Photo/Default/Nopic.jpg"
									/>王小明</span
								>
								<span class="stuScore"
									>{{ typeName }}认知分：<span class="score">6666分</span></span
								>
								<span class="stuRate"
									>答对率：<span class="correctRate">40%</span></span
								>
							</div>
							<div class="stuItem">
								<span class="stuRank">2</span>
								<span class="stuName"
									><img
										class="stuPhoto"
										src="http://172.16.41.236:5000/LgFtp/UserInfo/Photo/Default/Nopic.jpg"
									/>王中明</span
								>
								<span class="stuScore"
									>{{ typeName }}认知分：<span class="score">6666分</span></span
								>
								<span class="stuRate"
									>答对率：<span class="correctRate">40%</span></span
								>
							</div>
							<div class="stuItem">
								<span class="stuRank">3</span>
								<span class="stuName"
									><img
										class="stuPhoto"
										src="http://172.16.41.236:5000/LgFtp/UserInfo/Photo/Default/Nopic.jpg"
									/>王大明</span
								>
								<span class="stuScore"
									>{{ typeName }}认知分：<span class="score">6666分</span></span
								>
								<span class="stuRate"
									>答对率：<span class="correctRate">40%</span></span
								>
							</div>
						</div>
					</div>
					<div class="rightBottom">
						<input
							class="stuInput"
							type="text"
							:placeholder="'请输入' + typeName + '搜索...'"
							v-model="searchText"
							@keyup.enter="s"
						/>
						<span class="searchIcon" style="right: 140px"></span>
						<i class="line"></i>
						<div
							class="exportScore"
							style="margin-right: 0px"
							@click="GetScoreReport()"
						>
							<span class="exportIcon"></span>
							导出报告
						</div>
					</div>
				</div>
			</div>
			<div class="mainBottom">
				<div class="bottomTitle">
					<span class="lightingIcon">今日推荐讲解{{ typeName }}</span>
				</div>
				<div class="total">
					<span class="text1"
						><span class="point"></span>共推荐<span class="totalNumber">15</span
						>个讲解{{ typeName }}</span
					>
					<span class="btn" @click="openDialog"
						>查看所有薄弱{{ typeName }}</span
					>
				</div>
				<div class="bottomContent" v-if="reportType === 'voca'">
					<div class="bcCon">
						<div class="vocaItem" v-for="(item, index) in arr" :key="index">
							<div class="vocaContent">
								<div class="vocaName">freezing</div>
								<div class="contentItem">
									<span class="littleTitle">
										<span class="point"></span>测试概率</span
									>
									<span class="testRate">1.0000</span>
								</div>
								<div class="contentItem">
									<span class="littleTitle">
										<span class="point"></span>认知分</span
									>
									<span class="score">300分</span>
								</div>
								<div class="contentItem">
									<span class="littleTitle">
										<span class="point"></span>答对率</span
									>
									<span class="correctRate">2%</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bottomContent" v-if="reportType === 'gra'">
					<div class="bcCon">
						<div class="graItem" v-for="(item, index) in arr1" :key="index">
							<div class="graContent">
								<div class="graName">freezingxxxxxxxxxxxxxxxxxxx</div>
								<div class="contentItem">
									<span class="littleTitle">
										<span class="point"></span>测试概率</span
									>
									<span class="testRate">1.0000</span>
								</div>
								<div class="contentItem">
									<span class="littleTitle">
										<span class="point"></span>认知分</span
									>
									<span class="score">300分</span>
								</div>
								<div class="contentItem">
									<span class="littleTitle">
										<span class="point"></span>答对率</span
									>
									<span class="correctRate">2%</span>
								</div>
								<div class="contentItem">
									<span class="graTitle">所属专题：现在完成时</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="diagnosisPagination" v-if="false">
					<el-pagination
						class="pagination"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						layout=" prev, pager, next, total, jumper"
						:page-count="pageCount"
					>
					</el-pagination>
				</div>
			</div>
		</div>
		<el-dialog
			:title="dialogTitle + typeName"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="1120px"
		>
			<DIagnosisDialog />
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
			arr1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			searchText: "",
			// 总分页数
			pageCount: 1,
			// 当前第几页
			currentPage: 1,
			// 每页显示的数量
			PageSize: 9,
			userType: "grade",
			reportType: "voca",
			dialogTitle: "薄弱",
			dialogVisible: false,
		};
	},
	computed: {
		typeName: function () {
			if (this.reportType == "voca") {
				return "词汇";
			} else {
				return "语法";
			}
		},
		recommendText: function () {
			if (this.userType == "teacher") {
				return "班级";
			} else if (this.userType == "grade") {
				return "年级";
			} else {
				return "学生";
			}
		},
		titleText: function () {
			if (this.userType == "teacher") {
				return "班级";
			} else if (this.userType == "grade") {
				return "年级";
			} else {
				return "个人";
			}
		},
	},
	components: {
		DIagnosisDialog: () => import("./DIagnosisDialog.vue"),
	},
	methods: {
		openDialog() {
			this.dialogVisible = true;
		},
		// 显示第几页
		handleCurrentChange(val) {
			// 改变默认的页数
			this.currentPage = val;
		},
	},
};
</script>
<style lang="scss">
@import "../../assets/js/dialog/colorGlobal.scss";
@import "../../assets/js/dialog/elementReset_Dialog.scss";
</style>
<style lang="scss" scoped>
.diagnosisPage {
	width: 1920px;
	height: 1080px;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	background: url(~@/assets/img/diagnosis/整体大BG.png) center center no-repeat;
}
.diagnosisTitle {
	height: 84px;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	.titleLeft {
		width: 186px;
		height: 84px;
		background: url(~@/assets/img/diagnosis/标题头_左边.png) center center
			no-repeat;
	}
	.titleMiddle {
		font-family: YouSheBiaoTiHei;
		font-size: 28px;
		color: #ffffff;
		width: auto;
		height: 84px;
		line-height: 65px;
		background: url(~@/assets/img/diagnosis/标题头_中间.png) center center
			repeat-x;
	}
	.titleRight {
		width: 186px;
		height: 84px;
		background: url(~@/assets/img/diagnosis/标题头_右边.png) center center
			no-repeat;
	}
}
.diagnosisMain {
	width: 1200px;
	height: 934px;
	margin: -23px 0 0 0;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	background: url(~@/assets/img/diagnosis/内容框bg.png) center center no-repeat;
	.score {
		color: #fff000;
	}
	.correctRate {
		color: #00f0ff;
	}
}
.mainTop {
	display: flex;
	display: -webkit-flex;
}
.mainTopLeft {
	width: 689px;
	height: 290px;
	margin: 37px 0 0 0;
	background: url(~@/assets/img/diagnosis/蓝鸽智能推荐官.png) center center
		no-repeat;
	position: relative;
	.tips {
		top: 70px;
		right: 10px;
		position: absolute;
		div {
			margin: 5px 0 0;
			text-shadow: 1px 1px 2px rgba(20, 48, 152, 0.6);
		}
	}
}
.mainTopRight {
	width: 485px;
	height: 237px;
	position: relative;
	margin: 90px 35px 0 17px;
	.focus {
		width: 485px;
		height: 150px;
		padding-top: 12px;
		background-color: rgba(#ffffff, 0.08);
		border-radius: 4px;
		.focusTitle {
			font-family: YouSheBiaoTiHei;
			font-size: 18px;
			padding-left: 20px;
		}
		.stuList {
			.stuItem {
				width: 86%;
				margin: 10px auto;
				display: flex;
				display: -webkit-flex;
				justify-content: space-between;
				align-items: center;
				.stuRank {
					width: 16px;
					height: 16px;
					font-size: 12px;
					margin: 0 -10px 0 0;
					border-radius: 50%;
					background-color: rgba(#fff, 0.35);
					text-align: center;
				}
				.stuName {
					display: flex;
					display: -webkit-flex;
					align-items: center;
					.stuPhoto {
						width: 24px;
						height: 24px;
						margin-right: 5px;
						border-radius: 50%;
					}
				}
				.stuScore {
					color: #d9d9d9;
				}
				.stuRate {
					color: #d9d9d9;
				}
			}
		}
	}
	.rightBottom {
		display: flex;
		display: -webkit-flex;
		// justify-content: flex-end;
		right: 0;
		bottom: 20px;
		position: absolute;
		.line {
			margin: 0 10px 0 8px;
			width: 2px;
			background: url(~@/assets/img/teacher/分界线.png) 0px center no-repeat;
		}
	}
}
.mainBottom {
	.bottomTitle {
		width: 1136px;
		height: 40px;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		background: url(~@/assets/img/diagnosis/标题bg.png) center center no-repeat;
		.lightingIcon {
			margin: 0 10px 0 0;
			height: 20px;
			line-height: 20px;
			padding-left: 25px;
			font-family: YouSheBiaoTiHei;
			font-size: 18px;
			background: url(~@/assets/img/diagnosis/优先推荐.png) 0px center no-repeat;
			color: #fff;
			text-shadow: 1px 1px 2px rgba(20, 48, 152, 0.6);
		}
	}
	.total {
		margin: 0 auto;
		width: 1044px;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		.text1 {
			display: flex;
			display: -webkit-flex;
			align-items: center;
			.point {
				display: block;
				width: 6px;
				height: 6px;
				margin-right: 5px;
				border-radius: 50%;
				background-color: #6fd5ff;
			}
			.totalNumber {
				color: #fff000;
			}
		}

		.btn {
			height: 18px;
			padding-left: 20px;
			margin-right: 4px;
			background: url(~@/assets/img/teacher/查看_默认.png) 0px center no-repeat;
			color: #ddd;
			cursor: pointer;
			&:hover {
				color: #fff;
				background: url(~@/assets/img/teacher/查看_悬停.png) 0px center
					no-repeat;
			}
		}
	}
	.bottomContent {
		margin: 10px auto 0;
		width: 1050px;
		min-height: 450px;
		.bcCon {
			display: flex;
			display: -webkit-flex;
			flex-wrap: wrap;
		}
		.vocaItem {
			width: 208px;
			height: 148px;
			margin: 1px;
			cursor: pointer;
			&:hover {
				background: url(~@/assets/img/diagnosis/词汇悬停.png) center center /
					100% 100%;
			}
			&:hover .vocaContent {
				opacity: 1;
				background-color: rgba(#b8ddee, 0.15);
			}
			.vocaContent {
				width: 200px;
				height: 140px;
				border-radius: 4px;
				margin: 4px;
				background-color: rgba(#b8ddee, 0.1);
				opacity: 0.7;
				.vocaName {
					padding: 14px 0 0 16px;
					// margin-bottom: 15px;
					color: #fff;
					font-size: 16px;
				}
				.contentItem {
					margin: 12px auto 0;
					width: 165px;
					display: flex;
					display: -webkit-flex;
					justify-content: space-between;
					align-items: center;
					.littleTitle {
						display: flex;
						display: -webkit-flex;
						align-items: center;
						color: #fff;
					}
					.point {
						display: block;
						width: 6px;
						height: 6px;
						margin-right: 5px;
						border-radius: 50%;
						background-color: #fff;
					}
					.testRate {
						color: #00ff2a;
					}
				}
			}
		}
		.graItem {
			width: 260px;
			height: 158px;
			margin: 1px;
			cursor: pointer;
			&:hover {
				background: url(~@/assets/img/diagnosis/词汇悬停.png) center center /
					100% 100%;
			}
			&:hover .graContent {
				opacity: 1;
				background-color: rgba(#b8ddee, 0.15);
			}
			.graContent {
				width: 252px;
				height: 150px;
				border-radius: 4px;
				margin: 4px;
				background-color: rgba(#b8ddee, 0.1);
				opacity: 0.7;
				.graName {
					padding: 14px 0 0 16px;
					margin-bottom: 15px;
					color: #fff;
					font-size: 16px;
					width: 240px;
					// height: 20px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.contentItem {
					margin: 5px auto 0;
					width: 220px;
					display: flex;
					display: -webkit-flex;
					justify-content: space-between;
					align-items: center;
					.littleTitle {
						display: flex;
						display: -webkit-flex;
						align-items: center;
						color: #fff;
					}
					.point {
						display: block;
						width: 6px;
						height: 6px;
						margin-right: 5px;
						border-radius: 50%;
						background-color: #fff;
					}
					.testRate {
						color: #00ff2a;
					}
					.graTitle {
						margin: 5px 0 0 0;
						color: #00aaff;
					}
				}
			}
		}
	}
	.diagnosisPagination {
		margin: 15px auto 0;
	}
}
</style>
