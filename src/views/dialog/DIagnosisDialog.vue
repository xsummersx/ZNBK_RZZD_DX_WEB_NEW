<template>
	<!-- 薄弱诊断内弹窗 -->
	<div class="diagnosisDiaPage">
		<div class="diagnosisDiaMain">
			<div class="ddLine"></div>
			<div class="ddTitle">
				<span
					class="titleName"
					:class="currentChoose === '常考' ? 'littleBG' : ''"
					@click="changeCurrChoose('常考')"
					><span class="titlePoint"></span>常考{{ typeName }}</span
				>
				<span
					class="titleName"
					:class="currentChoose === '次常考' ? 'littleBG' : ''"
					@click="changeCurrChoose('次常考')"
					><span class="titlePoint"></span>次常考{{ typeName }}</span
				>
				<span
					class="titleName"
					:class="currentChoose === '不常考' ? 'littleBG' : ''"
					@click="changeCurrChoose('不常考')"
					><span class="titlePoint"></span>不常考{{ typeName }}</span
				>
			</div>
			<div class="ddtotal" v-if="!loading">
				<span class="text1" v-if="!showResult">
					<span class="point"></span>共有<span
						class="totalNumber"
						v-if="!isSearching"
						>{{ zsdCount }}</span
					><span class="totalNumber" v-else>{{ searchCount }}</span> 个{{
						currentChoose + typeName
					}}</span
				>
				<span class="text1" v-else>
					<span class="point"></span>共找到<span
						class="totalNumber"
						v-if="!isSearching"
						>{{ zsdCount }}</span
					><span class="totalNumber" v-else>{{ searchCount }}</span> 个<span
						class="totalNumber"
						>{{ tipText }}</span
					>相关的{{ currentChoose + typeName }}</span
				>
				<input
					class="stuInput"
					type="text"
					:placeholder="'请输入' + typeName + '搜索...'"
					v-model="searchText"
					@keyup.enter="searchKnowledgeDD"
				/>
				<span
					class="searchIconClear"
					style="right: 30px"
					v-show="showClear"
					@click="clearInput"
				></span>
				<span
					class="searchIcon"
					style="right: 10px"
					@click="searchKnowledgeDD"
				></span>
			</div>
			<div
				class="ddBottomContent"
				v-if="typeName === '词汇' && !loading && !searching"
			>
				<div class="ddCon">
					<div
						class="ddVocaItem"
						v-for="(item, index) in vocaZsdList"
						:key="index"
						@click="handleDDClick(item.KlgUniqueID)"
					>
						<div class="ddVocaContent">
							<div class="vocaName">{{ item.ZsdString }}</div>
							<div class="contentItem">
								<span class="littleTitle">
									<span class="point"></span>测试概率</span
								>
								<span class="testRate">{{ (+item.TestRate).toFixed(4) }}</span>
							</div>
							<div class="contentItem">
								<span class="littleTitle">
									<span class="point"></span>认知分</span
								>
								<span class="score" v-if="userType === 'teacher'"
									>{{ item.ClassScore }}分</span
								>
								<span class="score" v-else-if="userType === 'grade'"
									>{{ item.GradeScore }}分</span
								>
								<span class="score" v-else>{{ item.PersonalScore }}分</span>
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
				<div class="nodataShow" v-show="isNDPicShow">
					<img class="noDataImg1" src="~@/assets/img/diagnosis/noVoca.png" />
					<span>暂无薄弱{{ currentChoose }}词汇噢~</span>
				</div>
			</div>
			<div
				class="ddBottomContent"
				v-if="typeName === '语法' && !loading && !searching"
				style="min-height: 480px"
			>
				<div class="ddCon">
					<div
						class="ddGraItem"
						v-for="(item, index) in graZsdList"
						:key="index"
						@click="handleDDClick(item.KlgUniqueID)"
					>
						<div class="ddGraContent">
							<div class="ddGraName">{{ item.ZsdString }}</div>
							<div class="contentItem">
								<span class="littleTitle">
									<span class="point"></span>测试概率</span
								>
								<span class="testRate">{{ (+item.TestRate).toFixed(4) }}</span>
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
								<span class="ddGraTitle">所属专题：{{ item.U_TopicName }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="nodataShow" v-show="isNDPicShow">
					<img class="noDataImg1" src="~@/assets/img/diagnosis/noGra.png" />
					<span>暂无薄弱{{ currentChoose }}语法噢~</span>
				</div>
			</div>
			<Loading
				v-if="(loading || searching) && typeName === '语法'"
				style="margin-top: 150px; margin-bottom: 139px"
			/>
			<Loading
				v-if="(loading || searching) && typeName === '词汇'"
				style="margin-top: 150px; margin-bottom: 109px"
			/>
			<div class="ddPagination" v-if="isShowpPagination && !loading">
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
</template>

<script>
import * as api from "@/api/diagnosis/dialog";
// import { useDebounce } from "@/utils/debounce";
export default {
	props: {
		typeName: {
			type: String,
			default: "词汇",
		},
		userType: {
			type: String,
			default: "teacher",
		},
		resInfo: {
			type: Object,
		},
	},
	data() {
		return {
			// 左上角知识点总数
			zsdCount: 0,
			// 顶部tab当时前选择
			currentChoose: "常考",
			// 搜索后的总数
			searchCount: 0,
			// typeName: "语法",
			// 搜索框文本
			searchText: "",
			// 词汇知识点列表
			vocaZsdList: [],
			// 语法知识点列表
			graZsdList: [],
			// 总分页数
			pageCount: 5,
			// 当前第几页
			currentPage: 1,
			// 每页显示的数量
			PageSize: 9,
			// 搜索状态
			isSearching: false,
			isNDPicShow: false,
			loading: true,
			searching: false,
			// 搜索后左上角文本的显示
			showResult: false,
			// 搜索后左上角显示的文本
			tipText: "",
			// 清空是否显示
			showClear: false,
		};
	},
	components: {
		Loading: () => import("@/components/common/Loading.vue"),
	},
	computed: {
		isShowpPagination: function () {
			if (this.isSearching) {
				if (this.searchCount === 0) {
					return false;
				} else {
					return true;
				}
			} else {
				if (this.zsdCount === 0) {
					return false;
				} else {
					return true;
				}
			}
		},
		currentChooseNum: function () {
			if (this.currentChoose === "常考") {
				return 0;
			} else if (this.currentChoose === "次常考") {
				return 1;
			} else {
				return 2;
			}
		},
		currentChooseLetter: function () {
			if (this.currentChoose === "常考") {
				return "A";
			} else if (this.currentChoose === "次常考") {
				return "B";
			} else {
				return "C";
			}
		},
	},
	watch: {
		searchText: function () {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				if (this.searchText.length == 0) {
					this.showClear = false;
					this.searchKnowledgeDD();
				}
				if (this.searchText.length > 0) {
					this.showClear = true;
				}
			}, 800);
		},
	},
	created() {
		this.init("");
	},
	methods: {
		init(searchText) {
			if (this.typeName == "词汇") {
				this.isNDPicShow = false;
				this.getVocaDetail(
					this.currentPage,
					this.currentChooseLetter,
					searchText
				);
			} else if (this.typeName == "语法") {
				this.isNDPicShow = false;
				this.getGraDetail(this.currentPage, this.currentChooseNum, searchText);
			}
		},
		// 获取词汇知识点
		getVocaDetail(pageNum, zsdType, searchText) {
			let params = {
				SchoolID: this.$route.query.schoolID,
				TID: this.resInfo.UserID,
				ZsdArea: "C",
				token: this.$route.query.token,
				PageNum: pageNum,
				PageSize: 15,
				ZsdType: zsdType,
				SearchText: searchText,
			};
			if (this.userType == "teacher") {
				// 老师词汇
				params["CourseClassID"] = this.$route.query.courseClassID;
				api
					.GetClassVocabDetailInfo(params)
					.then((res) => {
						this.vocaZsdList = res.Data.VocaList;
						this.zsdCount = res.Data.VocaCount;
						this.searchCount = res.Data.SearchVocaCount;
						if (this.isSearching) {
							this.pageCount = Math.ceil(res.Data.SearchVocaCount / 15);
						} else {
							this.pageCount = Math.ceil(res.Data.VocaCount / 15);
						}
						if (res.Data.VocaList.length > 0) {
							this.isNDPicShow = false;
						} else {
							this.isNDPicShow = true;
						}
						setTimeout(() => {
							this.loading = false;
							this.searching = false;
						}, 150);
					})
					.catch(() => {
						this.isNDPicShow = true;
						this.loading = false;
						this.searching = false;
					});
			} else if (this.userType == "grade") {
				// 年级组长词汇
				params["GlobalGrade"] = this.$route.query.globalGrade;
				api
					.GetGradeVocabDetailInfo(params)
					.then((res) => {
						this.vocaZsdList = res.Data.VocaList;
						this.zsdCount = res.Data.VocaCount;
						this.searchCount = res.Data.SearchVocaCount;
						if (this.isSearching) {
							this.pageCount = Math.ceil(res.Data.SearchVocaCount / 15);
						} else {
							this.pageCount = Math.ceil(res.Data.VocaCount / 15);
						}
						if (res.Data.VocaList.length > 0) {
							this.isNDPicShow = false;
						} else {
							this.isNDPicShow = true;
						}
						setTimeout(() => {
							this.loading = false;
							this.searching = false;
						}, 150);
					})
					.catch(() => {
						this.isNDPicShow = true;
						this.loading = false;
						this.searching = false;
					});
			} else if (this.userType == "stu") {
				// 个人词汇
				params["StuID"] = this.$route.query.StuID;
				api
					.GetStuDetailVocabulary(params)
					.then((res) => {
						this.vocaZsdList = res.Data.VocaList;
						this.zsdCount = res.Data.VocaCount;
						this.searchCount = res.Data.SearchVocaCount;
						if (this.isSearching) {
							this.pageCount = Math.ceil(res.Data.SearchVocaCount / 15);
						} else {
							this.pageCount = Math.ceil(res.Data.VocaCount / 15);
						}
						if (res.Data.VocaList.length > 0) {
							this.isNDPicShow = false;
						} else {
							this.isNDPicShow = true;
						}
						setTimeout(() => {
							this.loading = false;
							this.searching = false;
						}, 150);
					})
					.catch(() => {
						this.isNDPicShow = true;
						this.loading = false;
						this.searching = false;
					});
			}
		},
		// 获取语法知识点
		getGraDetail(pageNum, zsdType, searchText) {
			let params = {
				SchoolID: this.$route.query.schoolID,
				TID: this.resInfo.UserID,
				ZsdArea: "C",
				token: this.$route.query.token,
				PageNum: pageNum,
				PageSize: 12,
				ZsdType: zsdType,
				SearchText: searchText,
			};
			if (this.userType == "teacher") {
				// 老师语法
				params["CourseClassID"] = this.$route.query.courseClassID;
				api
					.GetGrammerZsdMapApplication(params)
					.then((res) => {
						this.graZsdList = res.Data.ZsdList;
						this.zsdCount = res.Data.ZsdCount;
						this.searchCount = res.Data.PageZsdCount;
						if (this.isSearching) {
							this.pageCount = Math.ceil(res.Data.PageZsdCount / 12);
						} else {
							this.pageCount = res.Data.TotalPageNum;
						}
						if (res.Data.ZsdList.length > 0) {
							this.isNDPicShow = false;
						} else {
							this.isNDPicShow = true;
						}
						setTimeout(() => {
							this.loading = false;
							this.searching = false;
						}, 150);
					})
					.catch(() => {
						this.isNDPicShow = true;
						this.loading = false;
						this.searching = false;
					});
			} else if (this.userType == "grade") {
				// 年级组长语法
				params["GlobalGrade"] = this.$route.query.globalGrade;
				api
					.GetGradeGrammerZsdMapApplication(params)
					.then((res) => {
						this.graZsdList = res.Data.ZsdList;
						this.zsdCount = res.Data.ZsdCount;
						this.searchCount = res.Data.PageZsdCount;
						if (this.isSearching) {
							this.pageCount = Math.ceil(res.Data.PageZsdCount / 12);
						} else {
							this.pageCount = res.Data.TotalPageNum;
						}
						if (res.Data.ZsdList.length > 0) {
							this.isNDPicShow = false;
						} else {
							this.isNDPicShow = true;
						}
						setTimeout(() => {
							this.loading = false;
							this.searching = false;
						}, 150);
					})
					.catch(() => {
						this.isNDPicShow = true;
						this.loading = false;
						this.searching = false;
					});
			} else if (this.userType == "stu") {
				// 个人语法
				params["StuID"] = this.$route.query.StuID;
				api
					.GetStuGrammerZsdMapApplication(params)
					.then((res) => {
						this.graZsdList = res.Data.ZsdList;
						this.zsdCount = res.Data.ZsdCount;
						this.searchCount = res.Data.PageZsdCount;
						if (this.isSearching) {
							this.pageCount = Math.ceil(res.Data.PageZsdCount / 12);
						} else {
							this.pageCount = res.Data.TotalPageNum;
						}
						if (res.Data.ZsdList.length > 0) {
							this.isNDPicShow = false;
						} else {
							this.isNDPicShow = true;
						}
						setTimeout(() => {
							this.loading = false;
							this.searching = false;
						}, 150);
					})
					.catch(() => {
						this.isNDPicShow = true;
						this.loading = false;
						this.searching = false;
					});
			}
		},
		// 改变当前tab的选择
		changeCurrChoose(val) {
			this.loading = true;
			this.searchText = "";
			this.currentPage = 1;
			this.currentChoose = val;
			if (this.isSearching) {
				this.init(this.searchText);
			} else {
				this.init("");
			}
		},
		// 搜索知识点
		searchKnowledgeDD() {
			this.tipText = this.searchText;
			this.searching = true;
			this.showResult = this.searchText === "" ? false : true;
			this.currentPage = 1;
			if (this.searchText != "") {
				this.isSearching = true;
			} else {
				this.isSearching = false;
			}
			this.init(this.searchText);
		},
		// 搜索内容变为空时重新调用接口
		// emptyChange() {
		// 	useDebounce(() => {
		// 		if (this.searchText == "") {
		// 			this.searchKnowledgeDD();
		// 		}
		// 	}, 500)();
		// },
		// searchKnowledgeDD() {
		// 	let that = this;
		// 	clearTimeout(this.timer);
		// 	this.timer = setTimeout(function () {
		// 		console.log(that.searchText);
		// 	}, 400);
		// 	// this.currentPage = 1;
		// 	// if (this.searchText != "") {
		// 	// 	this.isSearching = true;
		// 	// } else {
		// 	// 	this.isSearching = false;
		// 	// }
		// 	// this.init(this.searchText);
		// 	// console.log(this.searchText);
		// },
		// debounce(func, delay) {
		// 	let timeout;
		// 	return () => {
		// 		if (timeout) {
		// 			clearTimeout(timeout);
		// 		}
		// 		timeout = setTimeout(func, delay);
		// 	};
		// },
		// 显示第几页
		handleCurrentChange(val) {
			this.searching = true;
			// 改变默认的页数
			this.currentPage = val;
			if (this.isSearching) {
				this.init(this.searchText);
			} else {
				this.init("");
			}
		},
		// 点击调用exe弹窗
		handleDDClick(id) {
			this.$emit("handleClickItem", id);
		},
		// 清空input
		clearInput() {
			this.searchText = "";
		},
	},
};
</script>

<style lang="scss" scoped>
.diagnosisDiaPage {
	height: 660px;
	padding: 20px 0 0 0;
	color: #fff;
}
.diagnosisDiaMain {
	width: 1080px;
	height: 620px;
	margin: 0 auto;
	border-radius: 4px;
	background-color: rgba(#000033, 0.6);
	.ddLine {
		width: 1080px;
		height: 3px;
		background: url(~@/assets/img/diagnosis/实线.png) center center no-repeat;
	}
	.ddTitle {
		margin: 0 auto;
		// width: 390px;
		height: 40px;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-family: YouSheBiaoTiHei;
		text-shadow: 1px 1px 2px rgba(20, 48, 152, 0.6);
		.titlePoint {
			display: block;
			width: 6px;
			height: 6px;
			margin-right: 5px;
			border-radius: 50%;
			background-color: #6fd5ff;
		}
		.titleName {
			width: 180px;
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			// margin: 0 60px 0 0;
		}
		.littleBG {
			width: 206px;
			height: 40px;
			// margin: 0 20px 0 20px;
			background: url(~@/assets/img/diagnosis/顶部悬浮背景_小.png) center center
				no-repeat;
		}
	}
	.ddtotal {
		margin: 0 auto;
		width: 1044px;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		color: #fff;
		position: relative;
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
	}
}

.ddBottomContent {
	margin: 10px auto 0;
	width: 1050px;
	min-height: 450px;
	.ddCon {
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
	}
	.ddVocaItem {
		width: 208px;
		height: 148px;
		margin: 1px;
		cursor: pointer;
		&:hover {
			background: url(~@/assets/img/diagnosis/词汇悬停.png) center center / 100%
				100%;
		}
		&:hover .ddVocaContent {
			opacity: 1;
			background-color: rgba(#b8ddee, 0.15);
		}
		.ddVocaContent {
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
				width: 180px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
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
	.ddGraItem {
		width: 260px;
		height: 158px;
		margin: 1px;
		cursor: pointer;
		&:hover {
			background: url(~@/assets/img/diagnosis/词汇悬停.png) center center / 100%
				100%;
		}
		&:hover .ddGraContent {
			opacity: 1;
			background-color: rgba(#b8ddee, 0.15);
		}
		.ddGraContent {
			width: 252px;
			height: 150px;
			border-radius: 4px;
			margin: 4px;
			background-color: rgba(#b8ddee, 0.1);
			opacity: 0.7;
			.ddGraName {
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
				.ddGraTitle {
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
.ddPagination {
	margin: 15px 0 0 0;
}
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
