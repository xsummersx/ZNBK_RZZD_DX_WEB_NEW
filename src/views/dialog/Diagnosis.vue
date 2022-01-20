<template>
	<!-- 薄弱诊断 -->
	<div class="diagnosisPage">
		<div class="diagnosisTitle">
			<div class="titleLeft"></div>
			<div class="titleMiddle" v-if="userType === 'teacher'">
				{{ SchoolName + "-" + CourseClassName }}-{{ titleText }}薄弱{{
					typeName
				}}诊断报告
			</div>
			<div class="titleMiddle" v-else-if="userType === 'grade'">
				{{ SchoolName + "-" + GradeName }}-{{ titleText }}薄弱{{
					typeName
				}}诊断报告
			</div>
			<div class="titleMiddle" v-else-if="userType === 'stu'">
				{{ StuName }}-{{ titleText }}薄弱{{ typeName }}诊断报告
			</div>
			<div class="titleRight"></div>
		</div>
		<div class="diagnosisMain">
			<div class="mainTop" v-if="!loading">
				<div class="mainTopLeft">
					<div class="tips">
						<div>老师您好，</div>
						<div>
							蓝鸽大数据基于您的{{ recommendText
							}}{{ typeName }}学习情况，进行智能诊断分析，
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
						<div class="stuList" v-if="userType === 'teacher'">
							<div
								class="stuItem"
								v-for="(item, index) in focusList"
								:key="index"
							>
								<div class="listFront">
									<span class="stuRank">{{ item.Index }}</span>
									<span class="stuName"
										><img class="stuPhoto" :src="item.PhotoPath" />{{
											item.StuName
										}}</span
									>
								</div>

								<span class="stuScore"
									>{{ typeName }}认知分：<span class="score"
										>{{ item.CognitiveIndex.toFixed(2) }}分</span
									></span
								>
								<span class="stuRate"
									>答对率：<span class="correctRate"
										>{{ (item.StuScoreRate * 100).toFixed(2) }}%</span
									></span
								>
							</div>
							<img
								v-if="focusList.length === 0"
								class="noDataImg"
								src="~@/assets/img/eduSchool/nodata.png"
							/>
						</div>
						<div class="stuList" v-else>
							<div
								class="stuItem"
								v-for="(item, index) in focusList"
								:key="index"
							>
								<span class="stuRank">{{ item.Index }}</span>
								<span class="stuName"> {{ item.CourseClassName }}</span>
								<span class="stuScore"
									>{{ typeName }}认知分：<span class="score"
										>{{ item.CognitiveIndex.toFixed(2) }}分</span
									></span
								>
								<span class="stuRate"
									>答对率：<span class="correctRate"
										>{{ (item.ScoreRate * 100).toFixed(2) }}%</span
									></span
								>
							</div>
							<img
								v-if="focusList.length === 0"
								class="noDataImg"
								src="~@/assets/img/eduSchool/nodata.png"
							/>
						</div>
					</div>
					<div class="rightBottom" v-if="showExports">
						<input
							class="stuInput"
							type="text"
							:placeholder="'请输入' + typeName + '搜索...'"
							v-model="searchText"
							@keyup.enter="searchKnowledge"
						/>
						<span
							class="searchIcon"
							style="right: 140px"
							@click="searchKnowledge"
						></span>
						<i class="line"></i>
						<div
							class="exportScore"
							style="margin-right: 0px"
							@click="exportReport"
						>
							<span class="exportIcon"></span>
							导出报告
						</div>
					</div>
					<div class="rightBottom" v-else>
						<input
							class="stuInput"
							type="text"
							:placeholder="'请输入' + typeName + '搜索...'"
							v-model="searchText"
							@keyup.enter="searchKnowledge"
						/>
						<span
							class="searchIcon"
							style="right: 10px"
							@click="searchKnowledge"
						></span>
					</div>
				</div>
			</div>
			<div class="mainBottom" v-if="!loading">
				<div class="bottomTitle">
					<span class="lightingIcon">今日推荐讲解{{ typeName }}</span>
				</div>
				<div class="total">
					<span class="text1"
						><span class="point"></span>共推荐<span class="totalNumber">{{
							recommendCount
						}}</span
						>个讲解{{ typeName }}</span
					>
					<span class="btn" @click="openDialog"
						>查看所有薄弱{{ typeName }}</span
					>
				</div>
				<div class="bottomContent" v-if="reportType === 'voca'">
					<div class="bcCon">
						<div
							class="vocaItem"
							v-for="(item, index) in vocaList"
							:key="index"
							@click="handleClickItem(item.KlgUniqueID)"
						>
							<div class="vocaContent">
								<div class="vocaName">{{ item.ZsdString }}</div>
								<div class="contentItem">
									<span class="littleTitle">
										<span class="point"></span>测试概率</span
									>
									<span class="testRate">{{
										(+item.TestRate).toFixed(4)
									}}</span>
								</div>
								<div class="contentItem">
									<span class="littleTitle">
										<span class="point"></span>认知分</span
									>
									<span class="score">{{ item.ClassScore }}分</span>
								</div>
								<div class="contentItem">
									<span class="littleTitle">
										<span class="point"></span>答对率</span
									>
									<span class="correctRate"
										>{{ (item.ScoreRate * 100).toFixed(2) }}%</span
									>
								</div>
							</div>
						</div>
					</div>
					<div class="nodataShow" v-if="vocaList.length === 0">
						<img class="noDataImg1" src="~@/assets/img/diagnosis/noRecom.png" />
						<span>暂无推荐词汇噢~</span>
					</div>
				</div>
				<div class="bottomContent" v-if="reportType === 'gra'">
					<div class="bcCon">
						<div
							class="graItem"
							v-for="(item, index) in graList"
							:key="index"
							@click="handleClickItem(item.KlgUniqueID)"
						>
							<div class="graContent">
								<div class="graName">{{ item.ZsdString }}</div>
								<div class="contentItem">
									<span class="littleTitle">
										<span class="point"></span>测试概率</span
									>
									<span class="testRate">{{
										(+item.TestRate).toFixed(4)
									}}</span>
								</div>
								<div class="contentItem">
									<span class="littleTitle">
										<span class="point"></span>认知分</span
									>
									<span class="score">{{ item.CurrScore }}分</span>
								</div>
								<div class="contentItem">
									<span class="littleTitle">
										<span class="point"></span>答对率</span
									>
									<span class="correctRate"
										>{{ (item.ScoreRate * 100).toFixed(2) }}%</span
									>
								</div>
								<div class="contentItem">
									<span class="graTitle">所属专题：{{ item.U_TopicName }}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="nodataShow" v-if="graList.length === 0">
						<img class="noDataImg1" src="~@/assets/img/diagnosis/noRecom.png" />
						<span>暂无推荐语法噢~</span>
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
			<div class="loadingItem" v-show="loading">
				<Loading />
			</div>
		</div>
		<el-dialog
			:title="dialogTitle + typeName"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="1120px"
		>
			<DiagnosisDialog
				:typeName="typeName"
				:userType="userType"
				:resInfo="resInfo"
				@handleClickItem="handleClickItem"
			/>
		</el-dialog>
	</div>
</template>

<script>
import * as api from "@/api/diagnosis";
export default {
	props: {
		resInfo: {
			type: Object,
		},
	},
	data() {
		return {
			// 重点关注列表
			focusList: [],
			// 词汇列表
			vocaList: [],
			// 语法列表
			graList: [],
			// 搜索框文本
			searchText: "",
			// 总分页数
			pageCount: 1,
			// 当前第几页
			currentPage: 1,
			// 每页显示的数量
			PageSize: 9,
			// 用户身份 teacher：老师，grade：年级组长，stu：学生
			userType: this.$route.query.userType,
			// 报告类型 voca：词汇，gra：语法
			reportType: this.$route.query.reportType,
			// dialog标题
			dialogTitle: "薄弱",
			// dialog是否可见
			dialogVisible: false,
			// 学校名称
			SchoolName: "",
			// 班级名称
			CourseClassName: "",
			// 学生姓名
			StuName: "",
			// 年级名称
			GradeName: "",
			// 推荐语法/词汇知识点数量
			recommendCount: 0,
			loading: true,
		};
	},
	computed: {
		// 报告类型
		typeName: function () {
			if (this.reportType == "voca") {
				return "词汇";
			} else {
				return "语法";
			}
		},
		// 智能官显示文本
		recommendText: function () {
			if (this.userType == "teacher") {
				return "班级";
			} else if (this.userType == "grade") {
				return "年级";
			} else {
				return "学生";
			}
		},
		// 标题文本
		titleText: function () {
			if (this.userType == "teacher") {
				return "班级";
			} else if (this.userType == "grade") {
				return "年级";
			} else {
				return "个人";
			}
		},
		// 是否显示导出
		showExports: function () {
			if (this.reportType == "voca") {
				if (this.vocaList.length === 0) {
					return false;
				} else {
					return true;
				}
			} else {
				if (this.graList.length === 0) {
					return false;
				} else {
					return true;
				}
			}
		},
	},
	created() {
		this.init("");
		this.initBase();
	},
	components: {
		DiagnosisDialog: () => import("./DIagnosisDialog.vue"),
		Loading: () => import("@/components/common/Loading.vue"),
	},
	methods: {
		// 初始化
		init(searchText) {
			if (this.reportType == "voca") {
				// 词汇
				this.getVocaHome(searchText);
			} else if (this.reportType == "gra") {
				// 语法
				this.getGraHome(searchText);
			}
		},
		// 词汇首页
		getVocaHome(searchText) {
			let params = {
				SchoolID: this.$route.query.schoolID,
				TID: this.resInfo.UserID,
				ZsdArea: "C",
				token: this.$route.query.token,
				PageNum: 1,
				PageSize: 15,
				ShowNum: 15,
				SearchText: searchText,
			};
			if (this.userType == "teacher") {
				// 老师词汇首页
				params["CourseClassID"] = this.$route.query.courseClassID;
				api.GetClassRecommendVoca(params).then((res) => {
					this.vocaList = res.Data.VocaRecommendList;
					this.SchoolName = res.Data.SchoolName;
					this.CourseClassName = res.Data.CourseClassName;
					this.recommendCount = res.Data.VocaRecommendCount;
					this.focusList = res.Data.StuFocusInfoList;
					setTimeout(() => {
						this.loading = false;
					}, 300);
				});
			} else if (this.userType == "grade") {
				// 年级组长词汇首页
				params["GlobalGrade"] = this.$route.query.globalGrade;
				api.GetGradeRecommendVoca(params).then((res) => {
					this.vocaList = res.Data.VocaRecommendList;
					this.SchoolName = res.Data.SchoolName;
					this.GradeName = res.Data.GradeName;
					this.recommendCount = res.Data.VocaRecommendCount;
					this.focusList = res.Data.ClassFocusInfoList;
					setTimeout(() => {
						this.loading = false;
					}, 300);
				});
			} else if (this.userType == "stu") {
				// 个人词汇首页
				params["StuID"] = this.$route.query.StuID;
				api.GetStuVocabInfoList(params).then((res) => {
					this.vocaList = res.Data.VocaRecommendList;
					this.StuName = res.Data.StuName;
					this.recommendCount = res.Data.VocaRecommendCount;
					setTimeout(() => {
						this.loading = false;
					}, 300);
				});
			}
		},
		// 语法首页
		getGraHome(searchText) {
			let params = {
				SchoolID: this.$route.query.schoolID,
				TID: this.resInfo.UserID,
				ZsdArea: "C",
				token: this.$route.query.token,
				PageNum: 1,
				PageSize: 12,
				RecommendCount: 12,
				SearchText: searchText,
			};
			if (this.userType == "teacher") {
				// 老师语法
				params["CourseClassID"] = this.$route.query.courseClassID;
				api.GetClassWeakGrammerDiagnosis(params).then((res) => {
					this.graList = res.Data.GrammerZsdList;
					this.SchoolName = res.Data.SchoolName;
					this.CourseClassName = res.Data.CourseClassName;
					this.recommendCount = res.Data.PageCount;
					this.focusList = res.Data.StuFocusInfoList;
					setTimeout(() => {
						this.loading = false;
					}, 300);
				});
			} else if (this.userType == "grade") {
				// 年级组长语法
				params["GlobalGrade"] = this.$route.query.globalGrade;
				api.GetGradeWeakGrammerDiagnosis(params).then((res) => {
					this.graList = res.Data.GrammerZsdList;
					this.SchoolName = res.Data.SchoolName;
					this.GradeName = res.Data.GradeName;
					this.recommendCount = res.Data.PageCount;
					this.focusList = res.Data.ClassFocusInfoList;
					setTimeout(() => {
						this.loading = false;
					}, 300);
				});
			} else if (this.userType == "stu") {
				// 个人语法
				params["StuID"] = this.$route.query.StuID;
				api.GetStuWeakGrammerDiagnosis(params).then((res) => {
					this.graList = res.Data.GrammerZsdList;
					this.StuName = res.Data.StuName;
					this.recommendCount = res.Data.PageCount;
					setTimeout(() => {
						this.loading = false;
					}, 300);
				});
			}
		},
		// 打开dialog
		openDialog() {
			this.dialogVisible = true;
		},
		// 导出报告
		exportReport() {
			if (this.reportType == "voca") {
				// 词汇
				this.vocaReport();
			} else if (this.reportType == "gra") {
				// 语法
				this.graReport();
			}
		},
		// 词汇报告
		vocaReport() {
			let params = {
				SchoolID: this.$route.query.schoolID,
				TID: this.resInfo.UserID,
				ZsdArea: "C",
				token: this.$route.query.token,
				RecommendCount: 15,
			};
			if (this.userType == "teacher") {
				// 老师词汇
				params["CourseClassID"] = this.$route.query.courseClassID;
				api.GetExportClassVocabPlans(params).then((res) => {
					window.open(res.Data, "_self");
				});
			} else if (this.userType == "grade") {
				// 年级组长词汇
				params["GlobalGrade"] = this.$route.query.globalGrade;
				api.GetExportGradeVocabPlans(params).then((res) => {
					window.open(res.Data, "_self");
				});
			} else if (this.userType == "stu") {
				// 个人词汇
				params["StuID"] = this.$route.query.StuID;
				api.GetExportStuGrammerPlans(params).then((res) => {
					window.open(res.Data, "_self");
				});
			}
		},
		// 语法报告
		graReport() {
			let params = {
				SchoolID: this.$route.query.schoolID,
				TID: this.resInfo.UserID,
				ZsdArea: "C",
				token: this.$route.query.token,
				RecommendCount: 12,
			};
			if (this.userType == "teacher") {
				// 老师语法
				params["CourseClassID"] = this.$route.query.courseClassID;
				api.GetExportClassWeakGrammerDiagnosis(params).then((res) => {
					window.open(res.Data, "_self");
				});
			} else if (this.userType == "grade") {
				// 年级组长语法
				params["GlobalGrade"] = this.$route.query.globalGrade;
				api.GetExportGradeWeakGrammerDiagnosis(params).then((res) => {
					window.open(res.Data, "_self");
				});
			} else if (this.userType == "stu") {
				// 个人语法
				params["StuID"] = this.$route.query.StuID;
				api.GetExportStuWeakGrammerDiagnosis(params).then((res) => {
					window.open(res.Data, "_self");
				});
			}
		},
		// 搜索知识点
		searchKnowledge() {
			// this.currentPage = 1;
			this.init(this.searchText);
		},
		// 显示第几页
		handleCurrentChange(val) {
			// 改变页数
			this.currentPage = val;
		},
		// 单个知识点的点击
		handleClickItem(uniqueCode) {
			let params = {
				stageNo: this.$route.query.stageNo,
				uniqueCode: uniqueCode,
				UseType: 1,
			};
			api.GetZSDCourseware(params).then((res) => {
				this.zsdClick(res.Data);
			});
		},
		//初始化基础平台
		initBase() {
			this.clientObj = this.$com.BsToCsFunc(this.InitFunc);
		},
		//②与基础平台的5次握手
		InitFunc(obj) {
			this.jcptFlag = obj;
		},
		//启动exe的方法
		EClient(args) {
			let proName = "IResLib";
			let moduleName = "EnglishCard";
			let porotol = "lgwebp://IResLib\\EnglishCard\\KnowledgeCourseware.exe";
			let StartClient_WS = this.$baseUrl; //基础平台
			this.$com.start(proName, moduleName, StartClient_WS, porotol, args);
		},
		//点击事件
		zsdClick(url) {
			if (this.jcptFlag == undefined) {
				this.$message({
					message: "还未加载完成课件信息，请稍候~",
					duration: 2000,
					type: "warning",
					center: true,
				});
			} else {
				if (this.jcptFlag != false) {
					// console.log("启动参数：" + url);
					if (url == "") {
						this.$message({
							message: "还未加载完成课件信息，请稍候再试~",
							duration: 2000,
							type: "warning",
							center: true,
						});
					} else {
						this.EClient(url);
					}
				} else {
					this.$message({
						message: "您未安装基础平台插件包！",
						duration: 2000,
						type: "warning",
						center: true,
					});
				}
			}
		},
	},
};
</script>
<style lang="scss">
@import "~@/assets/js/dialog/colorGlobal.scss";
@import "~@/assets/js/dialog/elementReset_Dialog.scss";
</style>
<style lang="scss" scoped>
.diagnosisPage {
	// width: 1920px;
	// height: 1080px;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	// background: url(~@/assets/img/diagnosis/整体大BG.png) center center no-repeat;
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
			display: flex;
			display: -webkit-flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.noDataImg {
				width: 64px;
				height: 64px;
				margin: 20px 0 0;
			}
			.stuItem {
				width: 86%;
				margin: 5px auto;
				display: flex;
				display: -webkit-flex;
				justify-content: space-between;
				align-items: center;
				.listFront {
					width: 110px;
					display: flex;
					display: -webkit-flex;
					align-items: center;
				}
				.stuRank {
					width: 16px;
					height: 16px;
					font-size: 12px;
					margin: 0 10px 0 0;
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
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						width: 220px;
						display: block;
					}
				}
			}
		}
	}
	.diagnosisPagination {
		margin: 15px auto 0;
	}
}
.loadingItem {
	height: 100%;
	display: flex;
	display: -webkit-flex;
}
// .noDataImg1 {
// 	width: 88px;
// 	height: 88px;
// 	margin: 180px auto 0;
// }
.nodataShow {
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	width: 100%;
	height: 450px;
	justify-content: center;
	align-items: center;
	.noDataImg1 {
		width: 88px;
		height: 88px;
		margin: 0 0 10px;
		// margin: 180px auto 0;
	}
}
</style>
