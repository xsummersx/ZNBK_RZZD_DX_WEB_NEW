<!--
 * @Author: your name
 * @Date: 2021-12-29 09:31:22
 * @LastEditTime: 2022-03-02 15:57:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\dialog\TeachScore.vue
-->
<template>
	<div class="bottom-box">
		<div v-show="showList.length > 0" class="clearfix">
			<div
				@click="GetExportGradePaperQtypeClassCompareList_V3()"
				class="exportBtn float-r"
			>
				<span class="exportIcon"></span>
				导出班级成绩对比分析
			</div>
		</div>
		<div
			v-show="showList.length > 0 && !showLoading"
			class="table"
			:style="{ height: getHeight(showList.length) }"
		>
			<table
				style="
					display: inline-block;
					border-right: 0;
					border-left: 0;
					border-top: 0;
					border-bottom: 0;
					vertical-align: top;
				"
				class="ttable"
			>
				<thead
					style="height: 65px; border-right: solid 1px rgba(225, 225, 225, 0.2)"
				>
					<tr>
						<th>序号</th>
						<th>班级</th>
					</tr>
				</thead>
				<tbody
					style="
						border-left: solid 1px rgba(225, 225, 225, 0.2);
						border-bottom: solid 1px rgba(225, 225, 225, 0.2);
						border-right: solid 1px rgba(225, 225, 225, 0.2);
					"
				>
					<tr v-for="item in showList" :key="item.CourseClassName">
						<td>{{ item.Index }}</td>
						<td>{{ item.CourseClassName }}</td>
					</tr>
				</tbody>
			</table>
			<vuescroll
				class="v-scroll"
				:ops="ops"
				style="display: inline-block; width: calc(100% - 231px)"
			>
				<table style="border-left-width: 0">
					<thead>
						<tr>
							<!-- <th>序号</th>
							<th>班级</th> -->
							<th style="border-left-width: 0">试卷得分</th>
							<th>班级排名</th>
							<th
								class="oneTH"
								v-for="item in ObjectiveQTypeList"
								:key="item.QTypeName"
							>
								<div class="oneTH1">{{ item.QTypeName }}</div>
								<div class="oneTH2">
									<span class="oneSpan1">得分率</span
									><span class="oneSpan2">排名</span>
								</div>
							</th>
							<th
								class="oneTH"
								v-for="item in SubjectiveQTypeList"
								:key="item.QTypeName"
							>
								<div class="oneTH1">{{ item.QTypeName }}</div>
								<div class="oneTH2">
									<span class="oneSpan1">得分率</span
									><span class="oneSpan2">排名</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in showList" :key="item.CourseClassName">
							<!-- <td>{{ item.Index }}</td>
							<td>{{ item.CourseClassName }}</td> -->
							<td style="border-left-width: 0">{{ item.PaperAvgScore }}</td>
							<td
								:class="
									item.GradeRank == 1
										? 'rank1'
										: item.GradeRank == 2
										? 'rank2'
										: item.GradeRank == 3
										? 'rank3'
										: 'stu-rank'
								"
							>
								{{ item.GradeRank > 3 ? item.GradeRank : "" }}
							</td>
							<td
								class="borderTD"
								v-for="item2 in item.ObjectiveQTypeList"
								:key="item2.QTypeName"
							>
								<span class="oneSpan1">{{
									(item2.PaperScoreRate * 100).toFixed() + "%"
								}}</span>
								<span class="oneSpan2">{{ item2.QTypeGradeRank }}</span>
							</td>
							<td
								class="borderTD"
								v-for="item2 in item.SubjectiveQTypeList"
								:key="item2.QTypeName"
							>
								<span class="oneSpan1">{{
									(item2.PaperScoreRate * 100).toFixed() + "%"
								}}</span>
								<span class="oneSpan2">{{ item2.QTypeGradeRank }}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</vuescroll>
		</div>
		<div v-show="showList.length <= 0 && !showLoading" class="temNoData">
			<span>暂无班级成绩对比分析数据噢~</span>
		</div>

		<Loading
			v-show="showLoading"
			style="width: 960px; height: 330px"
			backSize="80%"
		></Loading>
		<div class="paginationBox" v-if="StuCount > 8">
			<el-pagination
				class="pagination"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="PageSize"
				layout=" prev, pager, next,total,  jumper"
				:total="StuCount"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { GetGradePaperQtypeClassCompareList_V3 } from "@/api/diolog/stuReportDiolog";
import { GetExportGradePaperQtypeClassCompareList_V3 } from "@/api/diolog/stuReportDiolog";
import Loading from "../../components/common/Loading.vue";
import vuescroll from "vuescroll";
export default {
	props: {
		PaperName: String,
		PaperID: String,
	},
	data() {
		return {
			StuCount: 0,
			PageNum: 1,
			PageSize: 8,
			SearchText: "",
			showList: [],
			showLoading: true,
			ObjectiveQTypeList: [],
			SubjectiveQTypeList: [],
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
		};
	},
	components: {
		Loading,
		vuescroll,
	},

	mounted() {
		this.GetGradePaperQtypeClassCompareList_V3();
	},
	methods: {
		getHeight(n) {
			switch (n) {
				case 1:
					return "136px";
				case 2:
					return "184px";
				case 3:
					return "232px";
				case 4:
					return "280px";
				case 5:
					return "328px";
				case 6:
					return "376px";
				case 7:
					return "424px";
				default:
					return "472px";
			}
		},
		// // 获取年级试卷题型对比分析
		GetGradePaperQtypeClassCompareList_V3() {
			let params = {
				token: this.$store.state.token,
				TID: this.$store.state.TID,
				SchoolID: this.$store.state.SchoolID,
				GlobalGrade: this.$store.state.GlobalGrade,
				PaperID: this.PaperID,
				PaperName: this.PaperName,
				PageNum: this.PageNum,
				PageSize: this.PageSize,
				SearchText: this.SearchText,
			};
			GetGradePaperQtypeClassCompareList_V3(params).then((res) => {
				this.showLoading = false;
				this.StuCount = res.Data.PageClassCount;
				this.showList = res.Data.ClassQtypeRateRankList;
				if (this.showList.length > 0) {
					this.ObjectiveQTypeList = this.showList[0].ObjectiveQTypeList;
					this.SubjectiveQTypeList = this.showList[0].SubjectiveQTypeList;
				}
			});
		},
		handleSizeChange(val) {
			// 改变每页显示的条数
			this.PageSize = val;
			// 注意：在改变每页显示的条数时，要将页码显示到第一页
			this.currentPage = 1;
		},
		// 显示第几页
		handleCurrentChange(val) {
			// 改变默认的页数
			this.currentPage = val;
			this.emptyText = "加载中...";
			// this.showList = [];
		},
		GetExportGradePaperQtypeClassCompareList_V3() {
			let params = {
				token: this.$store.state.token,
				TID: this.$store.state.TID,
				SchoolID: this.$store.state.SchoolID,
				GlobalGrade: this.$store.state.GlobalGrade,
				PaperID: this.PaperID,
				PaperName: this.PaperName,
			};
			GetExportGradePaperQtypeClassCompareList_V3(params).then((res) => {
				window.open(res.Data, "_self");
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/scroll.scss";
.bottom-box {
	padding: 10px 20px;
	.exportBtn {
		width: 182px;
		height: 28px;
		line-height: 28px;
		margin-bottom: 10px;
		background: url("../../assets/img/viewImg/导出试卷题型得分分析.png") -0px -28px
			no-repeat;
		border-radius: 4px;
		font-size: 14px;
		color: #ffffff;
		text-align: center;
		cursor: pointer;
		.exportIcon {
			display: inline-block;
			width: 14px;
			height: 14px;
			background: url("../../assets/img/common/exportIcon.png") center center
				no-repeat;
			position: relative;
			top: 2px;
		}
		&:active {
			background: url("../../assets/img/viewImg/导出试卷题型得分分析.png") -0px -0px
				no-repeat;
		}
		&:hover {
			background: url("../../assets/img/viewImg/导出试卷题型得分分析.png") -0px -56px
				no-repeat;
		}
	}
}
.table {
	height: 400px;
	margin: 10px 0 20px;
	.v-scroll {
		th:nth-child(1) {
			width: 130px;
		}
		td:nth-child(3) {
			border-left: solid 1px rgba(255, 255, 255, 0.1);
		}
		td:nth-child(1) {
			color: rgba(255, 255, 255, 1);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		td:nth-child(1) {
			color: #51f0ff;
		}
	}
	table {
		border-collapse: collapse;
		border: solid 1px rgba(255, 255, 255, 0.2);
		width: max-content;
		tr {
			height: 48px;
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
		// 	width: 130px;
		// }
		// td:nth-child(5) {
		// 	border-left: solid 1px rgba(255, 255, 255, 0.1);
		// }
		.borderTD {
			border-right: 1px solid rgba(255, 255, 255, 0.1);
			border-left: 1px solid rgba(255, 255, 255, 0.1);
		}
		td {
			width: 100px;
			color: rgba(255, 255, 255, 0.6);
			span {
				display: inline-block;
			}
			.oneSpan1 {
				width: 120px;
				color: #fff600;
			}
			.oneSpan2 {
				width: 120px;
			}
		}
		// td:nth-child(1) {
		// 	color: rgba(255, 255, 255, 0.6);
		// }
		// td:nth-child(2),
		// td:nth-child(3) {
		// 	color: rgba(255, 255, 255, 1);
		// 	overflow: hidden;
		// 	white-space: nowrap;
		// 	text-overflow: ellipsis;
		// }

		// td:nth-child(3) {
		// 	color: #51f0ff;
		// }
	}
}
.ttable {
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
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
.oneTH {
	width: 250px;
	height: 64px;
	.oneTH1,
	.oneTH2 {
		height: 32px;
		line-height: 32px;
	}
	.oneTH1 {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
	.oneTH2 {
		span {
			display: inline-block;
		}
		.oneSpan1 {
			width: 120px;
			border-right: 1px solid rgba(255, 255, 255, 0.1);
		}
		.oneSpan2 {
			width: 120px;
		}
	}
}
.paginationBox {
	margin: 0 0 10px;
}
.stu-rank {
	width: 20px;
	height: 20px;
	line-height: 20px;
	border-radius: 100%;
	font-size: 12px;
	color: #666666;
	margin-right: 5px;
	background: url("~@/assets/img/grade/其他名次BG.png") center center no-repeat;
	vertical-align: middle;
}
.rank1,
.rank2,
.rank3 {
	width: 22px;
	height: 48px;
	margin-right: 5px;
	background: url("~@/assets/img/grade/第一名.png") center center no-repeat;
}
.rank2 {
	background: url("~@/assets/img/grade/第二名.png") center center no-repeat;
}
.rank3 {
	background: url("~@/assets/img/grade/第三名.png") center center no-repeat;
}
.temNoData {
	width: 960px;
	height: 400px;
	background: url("../../assets/img/nodata/ChartsNoData.png") center center
		no-repeat;
	border-radius: 4px;
	text-align: center;
	color: #ffffff;
	span {
		display: inline-block;
		margin-top: 250px;
	}
}
</style>
