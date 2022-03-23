<!--
 * @Author: your name
 * @Date: 2021-12-16 15:14:38
 * @LastEditTime: 2022-03-21 18:38:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\dialog\historyDialog.vue
-->
<template>
	<div class="historyDialogBox">
		<div class="topBox">
			<div class="clearfix">
				<div class="float-l checkAll" @click="checkAll()">
					<span
						class="checkAllBtn"
						:class="checkedAll ? 'checkedAllBtn' : ''"
					></span>
					<span>全选</span>
				</div>
				<div class="float-r" style="position: relative">
					<!-- @input="showDelateIcon2()" -->
					<input
						class="stuInput"
						type="text"
						placeholder="请输入试卷名称搜索..."
						v-model="PaperSearchText"
						v-on:keyup.enter="searchPaper()"
					/>
					<span
						class="searchIconClear"
						style="left: 195px"
						v-show="showClear"
						@click="PaperSearchText = ''"
					></span>
					<span class="searchIcon" @click="searchPaper()"></span>
				</div>
			</div>
			<div class="paperBox" v-if="showPaperList.length > 0">
				<ul class="clearfix">
					<li
						class="float-l PaperLi"
						:class="item.checked ? 'checkedPaperLi' : ''"
						v-for="(item, index) in showPaperList"
						:key="item.PaperID"
						@click="checkPaper(index)"
						:title="item.PaperName"
					>
						<span>得分率</span><br />
						<span class="num">{{ (item.PaperScoreRate * 100).toFixed(0) }}</span
						>%<br />
						<span class="paperName">{{ item.PaperName }}</span>
					</li>
				</ul>
			</div>
			<div
				class="table-loading-block"
				v-else-if="showPaperList.length === 0 && loading"
			></div>
			<div class="temNoData" v-else></div>
			<div class="paginationBox" v-if="PaperCount > 5">
				<el-pagination
					class="pagination"
					@size-change="handleSizeChange1"
					@current-change="handleCurrentChange1"
					:current-page="currentPage1"
					:page-size="PageSize1"
					layout=" prev, pager, next,total,  jumper"
					:total="PaperCount"
				>
				</el-pagination>
			</div>
		</div>
		<div class="bottomBox">
			<div class="firstLine">
				<div style="height: 18px">
					根据您选择的<span class="num">{{ SelectedPaperCount }}</span
					>份试卷，系统生成如下对比分析表:<span
						class="refreshContent"
						@click="refresh()"
					>
						<span class="refreshIcon"></span><span>更新试卷对比分析表</span>
					</span>
				</div>

				<div
					v-if="SelectedPaperList.length"
					@click="GetExportGradePapersQTypeScore_V3()"
					class="exportPaper"
				>
					<span class="exportIcon"></span>
					导出试卷对比分析
				</div>
			</div>
			<div
				class="table"
				:style="{ height: getHeight(SelectedPaperList.length) }"
				v-if="showTable"
			>
				<div
					class="ttable"
					style="display: inline-block; border: 0; vertical-align: top"
				>
					<table>
						<thead>
							<tr>
								<th>序号</th>
								<th>试卷名称</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in SelectedPaperList" :key="item.PaperID">
								<td>{{ item.Index }}</td>
								<td>
									<div :title="item.PaperName">{{ item.PaperName }}</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<vuescroll
					:ops="ops"
					style="width: calc(100% - 331px); display: inline-block; height: 100%"
				>
					<table class="scrollTable">
						<thead>
							<tr>
								<!-- <th>序号</th>
							<th>试卷名称</th> -->
								<th>总分</th>
								<th>年级平均得分</th>
								<th v-for="item in SubjectiveQTypeList" :key="item.QTypeName">
									{{ item.QTypeName }}
								</th>
								<th v-for="item in ObjectiveQTypeList" :key="item.QTypeName">
									{{ item.QTypeName }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in SelectedPaperList" :key="item.PaperID">
								<!-- <td>{{ item.Index }}</td>
							<td>{{ item.PaperName }}</td> -->
								<td>{{ item.PaperFullScore }}</td>
								<td>{{ item.PaperAvgScore.toFixed() }}</td>
								<td
									v-for="item2 in item.SubjectiveQTypeList"
									:key="item2.QTypeName"
								>
									{{
										item2.QTypeAvgScore == "/"
											? "/"
											: Number(item2.QTypeAvgScore).toFixed(1)
									}}
								</td>
								<td
									v-for="item2 in item.ObjectiveQTypeList"
									:key="item2.QTypeName"
								>
									<!-- {{
									item2.QTypeAvgScore 
								}} -->
									{{
										item2.QTypeAvgScore == "/"
											? "/"
											: Number(item2.QTypeAvgScore).toFixed(1)
									}}
								</td>
							</tr>
						</tbody>
					</table>
				</vuescroll>
			</div>
			<div class="table-loading-block" v-if="!showTable && tableLoading" style="padding-top: 300px;"></div>
			<!-- <div
				class="table-loading-block"
				v-if="true"
				style="padding-top: 300px"
			></div> -->
			<div class="paginationBox" style="margin-top: 20px" v-if="allCount > 5">
				<el-pagination
					class="pagination"
					@size-change="handleSizeChange2"
					@current-change="handleCurrentChange2"
					:current-page="currentPage2"
					:page-size="PageSize2"
					layout=" prev, pager, next,total,  jumper"
					:total="allCount"
				>
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import { GetGradeReleasedPaperList_V3 } from "@/api/diolog/historyDiolog";
import { useDebounce } from "@/utils/debounce.js";
import vuescroll from "vuescroll";
export default {
	data() {
		return {
			checkPaperIndex: 0,
			checkedAll: false,
			PaperCount: 0,
			PaperSearchText: "",
			PaperNum1: 1,
			PaperNum2: 1,
			allCount: 0,
			PageSize1: 16,
			PageSize2: 5,
			currentPage1: 1,
			currentPage2: 1,
			// 默认每页显示的条数（可修改）
			PaperList: [],
			showPaperList: [],
			postList: [],
			SelectedPaperCount: 0,
			showTable: false,
			SelectedPaperList: [],
			ObjectiveQTypeList: [],
			SubjectiveQTypeList: [],
			showClear: false,
			ops: {
				rail: {
					background: "#98c8ff",
					opacity: 0.5,
				},
				bar: {
					keepShow: true,
					background: "#98c8ff",
				},
			},
			loading: true,
			tableLoading: false,
		};
	},
	mounted() {
		this.GetGradeReleasedPaperList_V3(-1, -1);
	},
	components: {
		vuescroll,
	},
	watch: {
		PaperSearchText: function () {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				if (this.PaperSearchText.length == 0) {
					this.showClear = false;
					this.searchPaper();
				}
				if (this.PaperSearchText.length > 0) {
					this.showClear = true;
				}
			}, 800);
		},
	},
	methods: {
		getHeight(n) {
			switch (n) {
				case 1:
					return "119px";
				case 2:
					return "168px";
				case 3:
					return "217px";
				case 4:
					return "266px";
				default:
					return "315px";
			}
		},
		// 获取年级历次已发布试卷
		GetGradeReleasedPaperList_V3(PaperNum, PageSize) {
			this.showPaperList = [];
			let params = {
				token: this.$store.state.token,
				TID: this.$store.state.TID,
				SchoolID: this.$store.state.SchoolID,
				GlobalGrade: this.$store.state.GlobalGrade,
				PageNum: PaperNum,
				PageSize: PageSize,
				SearchText: this.PaperSearchText,
			};
			GetGradeReleasedPaperList_V3(params)
				.then((res) => {
					this.PaperList = [];
					this.PaperCount = res.Data.PaperCount;
					res.Data.PaperList.map((item) => {
						this.PaperList.push(
							Object.assign(item, {
								checked: false,
							})
						);
					});
					this.showPaperList = this.PaperList.slice(
						(this.PaperNum1 - 1) * 16,
						this.PaperNum1 * 16
					);
					this.loading = false;
				})
				.catch(() => {
					this.loading = false;
				});
		},
		// 导出
		GetExportGradePapersQTypeScore_V3() {
			for (let i = 0; i < this.showPaperList.length; i++) {
				if (this.showPaperList[i].checked) {
					this.postList.push(this.showPaperList[i].PaperID);
				}
			}
			let params = {
				token: this.$store.state.token,
				TID: this.$store.state.TID,
				SchoolID: this.$store.state.SchoolID,
				GlobalGrade: this.$store.state.GlobalGrade,
				PaperList: this.postList,
			};

			this.axios
				.post("api/GradeLeaderRZZD/GetExportGradePapersQTypeScore_V3", params)
				.then((res) => {
					window.open(res.Data, "_self");
					// console.log(res);
				});
		},
		checkPaper(i) {
			this.SelectedPaperCount = 0;
			this.checkPaperIndex = i;
			this.showPaperList[i].checked = !this.showPaperList[i].checked;
			this.checkedAll = this.showPaperList.every(function (item) {
				return item.checked;
			});
			this.PaperList.map((item) => {
				if (item.checked) {
					this.SelectedPaperCount++;
				}
			});
		},
		checkAll() {
			this.checkedAll = !this.checkedAll;
			this.SelectedPaperCount = this.checkedAll ? this.PaperList.length : 0;
			for (let i = 0; i < this.PaperList.length; i++) {
				if (this.checkedAll) {
					this.PaperList[i].checked = true;
				} else {
					this.PaperList[i].checked = false;
				}
			}
		},
		searchPaper() {
			this.PaperNum1 = 1;
			this.currentPage1 = 1;
			this.checkedAll = false;
			this.SelectedPaperCount = 0;
			this.GetGradeReleasedPaperList_V3(-1, -1);
		},

		//搜索内容，发生变化监听，如果变为空则重新获取
		SearChange() {
			// console.log(1);
			useDebounce(() => {
				this.searchPaper();
			}, 800)();
		},
		handleSizeChange1(val) {
			// 改变每页显示的条数
			this.PageSize1 = val;
			// 注意：在改变每页显示的条数时，要将页码显示到第一页
			this.currentPage1 = 1;
		},
		handleSizeChange2(val) {
			// 改变每页显示的条数
			this.PageSize2 = val;
			// 注意：在改变每页显示的条数时，要将页码显示到第一页
			this.currentPage2 = 1;
		},
		// 显示第几页
		handleCurrentChange1(val) {
			this.currentPage1 = val;
			this.PaperNum1 = val;
			this.showPaperList = this.PaperList.slice(
				(this.PaperNum1 - 1) * 16,
				this.PaperNum1 * 16
			);
			// this.GetGradeReleasedPaperList_V3(this.PaperNum1, -1);
		},
		handleCurrentChange2(val) {
			this.currentPage2 = val;
			this.PaperNum2 = val;
			this.refresh();
		},
		// 更新试卷对比
		refresh() {
			this.postList = [];
			this.showTable = false;
			this.tableLoading = true;
			for (let i = 0; i < this.PaperList.length; i++) {
				if (this.PaperList[i].checked) {
					this.postList.push(this.PaperList[i].PaperID);
				}
			}
			let params = {
				token: this.$store.state.token,
				TID: this.$store.state.TID,
				SchoolID: this.$store.state.SchoolID,
				GlobalGrade: this.$store.state.GlobalGrade,
				SearchText: this.PaperSearchText,
				SelectedPageNum: this.PaperNum2,
				SelectedPageSize: this.PageSize2,
				PaperList: this.postList,
			};
			this.axios
				.post("api/GradeLeaderRZZD/GetGradeSelectedPaperList_V3", params)
				.then((res) => {
					this.showTable = false;
					this.SelectedPaperList = res.Data.SelectedPaperList;
					this.allCount = res.Data.SelectedPaperCount;
					// this.PaperNum2 = this.SelectedPaperList.length;
					if (this.SelectedPaperList.length > 0) {
						this.SubjectiveQTypeList =
							this.SelectedPaperList[0].SubjectiveQTypeList;
						this.ObjectiveQTypeList =
							this.SelectedPaperList[0].ObjectiveQTypeList;
						this.showTable = true;
					}
				})
				.catch(() => {
					this.showTable = true;
				});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/scroll.scss";
.historyDialogBox {
	width: 960px;
	height: 760px;
	background-color: rgba(0, 0, 51, 0.3);
	border-radius: 4px;
	margin: 20px auto;
	.topBox {
		padding: 20px;
		border-bottom: solid 1px #0070c6;
	}
}
.checkAll {
	color: #fff;
	cursor: pointer;
	.checkAllBtn {
		display: inline-block;
		width: 16px;
		height: 16px;
		background-color: #1973d5;
		border-radius: 1px;
		border: solid 1px #79d1ff;
		vertical-align: middle;
		margin-right: 10px;
	}
	.checkedAllBtn::before {
		content: "";
		display: inline-block;
		width: 8px;
		height: 16px;
		border-radius: 2px;
		border-bottom: 3px solid rgb(81, 238, 81);
		border-right: 3px solid rgb(81, 238, 81);
		transform: rotate(45deg);
		position: relative;
		top: -3px;
		left: 4px;
	}
}
.temNoData {
	width: 920px;
	height: 198px;
	background: url("../../assets/img/nodata/ChartsNoData.png") center center
		no-repeat;
	border-radius: 4px;
	text-align: center;
	line-height: 250px;
}
.paperBox {
	height: 198px;
	margin-top: 25px;
	ul {
		li {
			cursor: pointer;
			width: 115px;
			height: 64px;
			color: #0078ff;
			font-size: 12px;
			padding-top: 18px;
			text-align: center;
			margin-bottom: 35px;
			background: url("../../assets/img/grade/试卷_未选.png") center center
				no-repeat;
			.num {
				font-family: "Oswald";
				font-size: 16px;
			}
			.paperName {
				display: inline-block;
				width: 100px;
				color: rgba(255, 255, 255, 0.7);
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				margin-top: 5px;
			}
		}

		.checkedPaperLi {
			background: url("../../assets/img/grade/试卷_选中.png") center center
				no-repeat;
			position: relative;
			.paperName {
				color: rgba(255, 255, 255, 1);
			}
		}
		.checkedPaperLi::after {
			content: "";
			display: inline-block;
			width: 22px;
			height: 22px;
			background: url("../../assets/img/grade/勾.png") center center no-repeat;
			position: absolute;
			top: -4px;
			right: 22px;
		}
	}
}
.searchIcon {
	right: 10px;
}
.bottomBox {
	padding: 20px;
	.firstLine {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ffffff;
		.num {
			color: #ffcc00;
			margin: 0 5px;
		}
		.refreshContent {
			color: rgba(255, 255, 255, 0.5);
			cursor: pointer;
			text-decoration: underline;
			.refreshIcon {
				display: inline-block;
				width: 18px;
				height: 17px;
				background: url("../../assets/img/grade/refreshIcon.png") -18px -0px
					no-repeat;
				vertical-align: middle;
				margin-right: 5px;
				margin-left: 5px;
			}
			&:hover {
				color: rgba(255, 255, 255, 1);
				.refreshIcon {
					background: url("../../assets/img/grade/refreshIcon.png") 0 -0px no-repeat;
				}
			}
		}
	}
	.exportPaper {
		width: 152px;
		height: 28px;
		font-size: 14px;
		cursor: pointer;
		font-weight: normal;
		line-height: 28px;
		color: #ffffff;
		text-align: center;
		background: url("../../assets/img/grade/exportPaper.png") -0px -28px
			no-repeat;
		.exportIcon {
			display: inline-block;
			width: 14px;
			height: 14px;
			background: url("../../assets/img/common/exportIcon.png") center center
				no-repeat;
			position: relative;
			top: 2px;
		}
		&:hover {
			background: url("../../assets/img/grade/exportPaper.png") -0px -0px
				no-repeat;
		}
	}
}
.table {
	// display: inline-block;
	// overflow-x: scroll;
	margin-top: 10px;
	// width: calc(100% - 331px);
	.scrollTable {
		th:nth-child(1) {
			width: 80px;
		}
		th:nth-child(2) {
			width: 100px;
		}
		td:nth-child(3) {
			border-left: solid 1px rgba(255, 255, 255, 0.1);
		}
		td:nth-child(1) {
			color: #51f0ff;
		}
		td:nth-child(2) {
			color: #fff600;
		}
	}
	table {
		border-collapse: collapse;
		border: solid 1px rgba(255, 255, 255, 0.2);
		width: max-content;
		tr {
			height: 48px;
			line-height: 48px;
			text-align: center;
			border-top: 1px solid rgba(255, 255, 255, 0.1);
		}
		tr:nth-of-type(even) {
			background-color: rgba(87, 166, 255, 0.08);
		}
		tr:hover {
			background-color: rgba(87, 166, 255, 0.3);
		}
		th {
			color: #fff;
			font-weight: bold;
			background-color: rgba(126, 172, 255, 0.2);
			border: solid 1px rgba(255, 255, 255, 0.1);
		}
		// th:nth-child(1) {
		// 	width: 90px;
		// }
		// th:nth-child(2) {
		// 	width: 130px;
		// }
		// th:nth-child(3) {
		// 	width: 80px;
		// }
		// th:nth-child(4) {
		// 	width: 100px;
		// }
		// td:nth-child(5) {
		// 	border-left: solid 1px rgba(255, 255, 255, 0.1);
		// }

		td {
			width: 100px;
			color: rgba(255, 255, 255, 0.6);
		}
		// td:nth-child(1) {
		// 	color: rgba(255, 255, 255, 0.6);
		// }
		// td:nth-child(2) {
		// 	color: rgba(255, 255, 255, 1);
		// 	overflow: hidden;
		// 	white-space: nowrap;
		// 	text-overflow: ellipsis;
		// }
		// td:nth-child(3) {
		// 	color: #51f0ff;
		// }
		// td:nth-child(4) {
		// 	color: #fff600;
		// }
	}
}
.ttable {
	// display: inline-block;
	// width: 230px;
	td {
		width: 100px;
		color: rgba(255, 255, 255, 0.6);
		div {
			width: 200px;
			padding-left: 10px;
			padding-right: 10px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
	th:nth-child(1) {
		width: 90px;
	}
	th:nth-child(2) {
		width: 130px;
	}
	td:nth-child(1) {
		color: rgba(255, 255, 255, 0.6);
	}
	td:nth-child(2) {
		color: rgba(255, 255, 255, 1);
		// height: 49px !important;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
.table-loading-block {
	height: 48px;
	width: 48px;
	margin: 0 auto;
	background: url("../../assets/img/nodata/reportLoad.png") center center
		no-repeat;
	padding-top: 235px;
	animation: turn 1s linear infinite;
}
@keyframes turn {
	0% {
		-webkit-transform: rotate(0deg);
	}
	25% {
		-webkit-transform: rotate(90deg);
	}
	50% {
		-webkit-transform: rotate(180deg);
	}
	75% {
		-webkit-transform: rotate(270deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}
</style>
