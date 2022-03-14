<!--
 * @Author: your name
 * @Date: 2021-12-28 15:18:20
 * @LastEditTime: 2022-03-02 16:02:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\dialog\TeachQuesDia.vue
-->
<template>
	<div class="DioContent">
		<div class="clearfix">
			<div
				@click="chooseType(0)"
				class="float-l sortBtn"
				:class="SortType == 0 ? 'activeSortBtn' : ''"
			>
				按题型顺序查看
			</div>
			<div
				@click="chooseType(1)"
				class="float-l sortBtn"
				:class="SortType == 1 ? 'activeSortBtn' : ''"
			>
				按试卷序号查看
			</div>
			<div
				@click="GetExportClassPaperQTypeReport_V3()"
				class="exportBtn float-r"
			>
				<span class="exportIcon"></span>
				导出试卷题型得分分析
			</div>
		</div>
		<div class="table">
			<table
				class="ttable"
				style="display: inline-block; border: 0; vertical-align: top"
			>
				<thead
					style="height: 65px; border-right: solid 1px rgba(225, 225, 225, 0.2)"
				>
					<tr>
						<th>序号</th>
						<th>题型名称</th>
						<th>平均得分率</th>
					</tr>
				</thead>
				<tbody
					style="
						border-left: solid 1px rgba(225, 225, 225, 0.2);
						border-bottom: solid 1px rgba(225, 225, 225, 0.2);
						border-right: solid 1px rgba(225, 225, 225, 0.2);
					"
				>
					<tr v-for="(item, index) in showList" :key="index">
						<td>{{ item.QuesIndex }}</td>
						<td>{{ item.QTypeName }}</td>
						<td>{{ (item.PaperScoreRate * 100).toFixed() + "%" }}</td>
					</tr>
				</tbody>
			</table>
			<vuescroll
				:ops="ops"
				style="width: calc(100% - 331px); display: inline-block"
			>
				<!-- <vuescroll :ops="ops"> -->
				<table>
					<thead>
						<tr>
							<!-- <th>序号</th>
							<th>题型名称</th>
							<th>平均得分率</th> -->
							<th
								class="oneTH"
								v-for="(item, index) in QTypeStuMapList"
								:key="index"
							>
								<div class="oneTH1">
									{{
										"得分率" +
										item.RangeMinRate * 100 +
										"~" +
										(item.RangeMaxRate * 100).toFixed(0) +
										"%"
									}}
								</div>
								<div class="oneTH2">
									<span class="oneSpan1">人数</span
									><span class="oneSpan2">名单</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in showList" :key="index">
							<!-- <td>{{ item.QuesIndex }}</td>
							<td>{{ item.QTypeName }}</td>
							<td>{{ (item.PaperScoreRate * 100).toFixed() + "%" }}</td> -->
							<td
								class="borderTD"
								v-for="(item2, index2) in item.QTypeStuMapList"
								:key="index2"
							>
								<span class="oneSpan1">{{ item2.StuCount + "人" }}</span>
								<span class="oneSpan2" :title="item2.StuNameList">{{
									item2.StuNameList || "/"
								}}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</vuescroll>
		</div>
		<div class="paginationBox" v-if="StuCount > 5">
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
import { GetClassPaperQTypeReport_V3 } from "@/api/diolog/stuReportDiolog";
import { GetExportClassPaperQTypeReport_V3 } from "@/api/diolog/stuReportDiolog";
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
			PageSize: 5,
			SortType: 0,
			currentPage: 1,
			SearchText: "",
			showList: [],
			QTypeStuMapList: [],
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
		vuescroll,
	},
	mounted() {
		this.GetClassPaperQTypeReport_V3();
	},
	methods: {
		chooseType(i) {
			this.SortType = i;
			this.currentPage = 1;
			this.PageNum = 1;
			this.GetClassPaperQTypeReport_V3();
		},
		// // 获取班级试卷题型对比分析
		GetClassPaperQTypeReport_V3() {
			let params = {
				token: this.$store.state.token,
				TID: this.$store.state.TID,
				SchoolID: this.$store.state.SchoolID,
				CourseClassID: this.$store.state.CourseClassID,
				PaperID: this.PaperID,
				PaperName: this.PaperName,
				PageNum: this.PageNum,
				PageSize: this.PageSize,
				SortType: this.SortType,
				SearchText: this.SearchText,
			};
			GetClassPaperQTypeReport_V3(params).then((res) => {
				console.log(res);
				this.StuCount = res.Data.PageCount;
				this.showList = res.Data.QTypeList;
				if (this.StuCount != 0) {
					this.QTypeStuMapList = this.showList[0].QTypeStuMapList;
				}
			});
		},
		GetExportClassPaperQTypeReport_V3() {
			let params = {
				token: this.$store.state.token,
				TID: this.$store.state.TID,
				SchoolID: this.$store.state.SchoolID,
				GlobalGrade: this.$store.state.GlobalGrade,
				CourseClassID: this.$store.state.CourseClassID,
				PaperID: this.PaperID,
				PaperName: this.PaperName,
				SortType: this.SortType,
			};
			GetExportClassPaperQTypeReport_V3(params).then((res) => {
				window.open(res.Data, "_self");
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
			this.PageNum = val;
			this.emptyText = "加载中...";
			this.GetClassPaperQTypeReport_V3();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/scroll.scss";
// table tr th:nth-child(2){
//   padding-left:100px
// }
// table tr td:nth-child(2){
//   padding-left:100px
// }
// table tr th:nth-child(3){
//   padding-left:230px
// }
// table tr td:nth-child(3){
//   padding-left:230px
// }
// table tr th:nth-child(4){
//   padding-left:330px
// }
// table tr td:nth-child(4){
//   padding-left:330px
// }
// table tr th:nth-child(1),table tr th:nth-child(3){
//   width: 100px;
//   height: 65px;
//   position: fixed;
// }
// table tr th:nth-child(2){
//   width: 130px;
//   height: 65px;
//   position: fixed;
// }
// table tr td:nth-child(1),table tr td:nth-child(3){
//   width: 100px;
//   height: 48px;
//   position: fixed;
// }
// table tr td:nth-child(2){
//   width: 130px;
//   height: 48px;
//   position: fixed;
// }
.DioContent {
	padding: 10px 20px 20px 20px;
}
.sortBtn {
	height: 28px;
	line-height: 28px;
	color: rgba(255, 255, 255, 0.5);
	margin-right: 30px;
	cursor: pointer;
}
.activeSortBtn {
	color: #fff;
	position: relative;
}
.activeSortBtn::after {
	display: inline-block;
	content: "";
	background-color: #fff;
	width: 100px;
	height: 2px;
	border-radius: 100%;
	position: absolute;
	left: 0px;
	top: 24px;
}
.table {
	height: 330px;
	margin: 10px 0 20px;
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
		// 	width: 80px;
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
				width: 80px;
				color: #fff600;
			}
			.oneSpan2 {
				width: 160px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
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
	th:nth-child(3) {
		width: 80px;
	}
	td:nth-child(1) {
		color: rgba(255, 255, 255, 0.6);
	}
	td:nth-child(2),
	td:nth-child(3) {
		color: rgba(255, 255, 255, 1);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	td:nth-child(3) {
		color: #51f0ff;
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
			width: 80px;
			border-right: 1px solid rgba(255, 255, 255, 0.1);
		}
		.oneSpan2 {
			width: 160px;
		}
	}
}
.exportBtn {
	width: 210px;
	height: 28px;
	line-height: 28px;
	background: url("../../assets/img/viewImg/导出班级做题特点对比分析.png") -210px -0px
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
		background: url("../../assets/img/viewImg/导出班级做题特点对比分析.png") -0px -0px
			no-repeat;
	}
	&:hover {
		background: url("../../assets/img/viewImg/导出班级做题特点对比分析.png") -420px -0px
			no-repeat;
	}
}
.paginationBox {
	margin: 20px 0 0;
}
</style>
