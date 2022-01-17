<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-10 11:21:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教师，词汇
-->
<template>
	<div class="right-small-box">
		<div class="box-title clearfix">
			<span class="float-l title">词汇认知</span>
			<span class="float-r check-icon" @click="toDiagnosis"
				><i></i>薄弱词汇诊断</span
			>
		</div>
		<div class="main" v-show="isShow">
			<div class="left">
				<div class="masteredCount">
					<span>词汇平均掌握量</span>
					<br />
					<span class="count">
						<span class="number">{{ info.MasteredCount }}</span
						>个
					</span>
				</div>
				<div class="scoreRate">
					<span>词汇平均答对率</span>
					<span class="rate"
						><span class="number">{{
							(info.VocabularyScoreRate * 100).toFixed(2)
						}}</span
						>%</span
					>
				</div>
			</div>
			<div class="right">
				<div class="pieChart" id="pieChart"></div>
				<span>词汇掌握程度</span>
			</div>
		</div>
		<NoDataVGL v-if="!isShow" type="voca" />
		<el-dialog
			:title="dialogTitle"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="500px"
		>
			<div class="dialogContent">
				<div class="dialogMain">
					<el-table
						:empty-text="emptyText"
						:data="tableData"
						style="width: 450px"
					>
						<el-table-column prop="VocaRank" label="排名" width="80">
							<template slot-scope="scope">
								<span class="gray">
									{{ scope.row.VocaRank }}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="StuName" label="姓名" width="88">
							<template slot-scope="scope">
								<div>
									<!-- <img class="stuPhoto" :src="scope.row.PhotoPath" alt="" /> -->
									<span class="stuname" :title="scope.row.StuName">{{
										scope.row.StuName
									}}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column
							prop="VocaMasterCount"
							label="词汇掌握量"
							width="140"
						>
							<template slot-scope="scope">
								<span class="gray">
									{{ scope.row.VocaMasterCount }}
								</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="VocaMaterRate"
							label="词汇答对率"
							width="140"
						>
							<template slot-scope="scope">
								<span class="gray">
									{{ (scope.row.VocaMaterRate * 100).toFixed(2) }}%
								</span>
							</template>
						</el-table-column>
					</el-table>
					<div class="paginationBox" v-if="pageCount > 1">
						<el-pagination
							class="pagination"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							layout=" prev, pager, next,total"
							:page-count="pageCount"
						>
						</el-pagination>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {
	GetClassVocabulary,
	GetClassVocaConclusionDetail,
} from "@/api/paperTwo/question.js";
import "echarts-gl";
export default {
	data() {
		return {
			currentType: -1,
			dialogTitle: "学生名单",
			dialogVisible: false,
			emptyText: "暂无数据",
			// 分页数
			pageCount: 1,
			StuCount: 9,
			// 默认显示第几页
			currentPage: 1,
			// 每页显示的数量
			PageSize: 9,
			tableData: [
				// {
				// 	Conclusion: 1,
				// 	VocaRank: 1,
				// 	StuName: "1201046",
				// 	VocaMasterCount: 4077,
				// 	VocaMaterRate: 0.4497,
				// },
				// {
				// 	Conclusion: 1,
				// 	VocaRank: 2,
				// 	StuName: "1201060",
				// 	VocaMasterCount: 4077,
				// 	VocaMaterRate: 0.4497,
				// },
				// {
				// 	Conclusion: 1,
				// 	VocaRank: 3,
				// 	StuName: "1201051",
				// 	VocaMasterCount: 4024,
				// 	VocaMaterRate: 0.4439,
				// },
				// {
				// 	Conclusion: 1,
				// 	VocaRank: 4,
				// 	StuName: "1201053",
				// 	VocaMasterCount: 4024,
				// 	VocaMaterRate: 0.4439,
				// },
			],
			option: {},
			info: {
				Conclusion: 0,
				VocabularyTotalCount: 9066,
				MasteredCount: 4003,
				VocabularyScoreRate: 0.447262049,
				StuList: [
					{
						Conclusion: 3,
						StuCount: 23,
						StuRatio: 0.45,
					},
					{
						Conclusion: 2,
						StuCount: 17,
						StuRatio: 0.35,
					},
					{
						Conclusion: 1,
						StuCount: 10,
						StuRatio: 0.2,
					},
				],
			},
			isShow: true,
		};
	},
	created() {
		this.init();
	},
	computed: {
		optionData: function () {
			let arr = [];
			this.info.StuList.map((item) => {
				if (+item.Conclusion === 2) {
					arr.push({
						name: "掌握一般",
						value: item.StuRatio * 100,
						count: item.StuCount,
						itemStyle: {
							color: "rgba(12,206,7,0.9)",
						},
					});
				} else if (+item.Conclusion === 3) {
					arr.push({
						name: "掌握较好",
						value: item.StuRatio * 100,
						count: item.StuCount,
						itemStyle: {
							color: "rgba(0,204,255,1)",
						},
					});
				} else {
					arr.push({
						name: "掌握较差",
						value: item.StuRatio * 100,
						count: item.StuCount,
						itemStyle: {
							color: "rgba(255,128,128,1)",
							// color: "#ff8080",
						},
					});
				}
			});
			return arr;
		},
	},
	mounted() {
		// this.drawInit();
	},
	components: {
		NoDataVGL: () => import("../common/NoDataVGL.vue"),
	},
	methods: {
		// 初始化
		init() {
			let params = {
				...this.$store.state,
			};
			delete params.UserInfo;
			GetClassVocabulary(params).then((res) => {
				this.info = res.Data;
				if (res.Data.StuList.length === 0) {
					this.isShow = false;
				} else {
					this.isShow = true;
				}
				this.drawInit();
			});
		},
		drawInit() {
			//构建3d饼状图
			let myChart = this.$echarts.init(document.getElementById("pieChart"));
			// 传入数据生成 option
			this.option = this.getPie3D(this.optionData, 0);
			myChart.setOption(this.option);
			this.bindListen(myChart);
		},

		getPie3D(pieData, internalDiameterRatio) {
			let series = [];
			let sumValue = 0;
			let startValue = 0;
			let endValue = 0;
			// let legendData = [];
			let k =
				typeof internalDiameterRatio !== "undefined"
					? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
					: 1 / 3;

			// 为每一个饼图数据，生成一个 series-surface 配置
			for (let i = 0; i < pieData.length; i++) {
				sumValue += pieData[i].value;

				let seriesItem = {
					name:
						typeof pieData[i].name === "undefined"
							? `series${i}`
							: pieData[i].name,
					type: "surface",

					parametric: true,
					wireframe: {
						show: false,
					},
					pieData: pieData[i],
					pieStatus: {
						selected: false,
						hovered: false,
						k: k,
					},
					itemStyle: {
						opacity: 1,
					},
				};
				if (typeof pieData[i].itemStyle != "undefined") {
					let itemStyle = {};
					typeof pieData[i].itemStyle.color != "undefined"
						? (itemStyle.color = pieData[i].itemStyle.color)
						: null;
					typeof pieData[i].itemStyle.opacity != "undefined"
						? (itemStyle.opacity = pieData[i].itemStyle.opacity)
						: null;
					seriesItem.itemStyle = itemStyle;
				}
				series.push(seriesItem);
			}

			// 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
			// 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，实现每一个扇形。
			for (let i = 0; i < series.length; i++) {
				endValue = startValue + series[i].pieData.value;
				series[i].pieData.startRatio = startValue / sumValue;
				series[i].pieData.endRatio = endValue / sumValue;
				series[i].parametricEquation = this.getParametricEquation(
					series[i].pieData.startRatio,
					series[i].pieData.endRatio,
					false,
					false,
					k,
					series[i].pieData.value
				);

				startValue = endValue;

				// legendData.push(series[i].name);
			}
			let boxHeight = this.getHeight3D(series, 40); //通过传参设定3d饼/环的高度
			// 配置
			let option = {
				tooltip: {
					trigger: "item",
					formatter: (params) => {
						if (params.seriesName !== "mouseoutSeries") {
							return `${
								params.seriesName
							}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
								params.color
							};"></span><span style="font-weight: bold">${this.getCount(
								params.seriesName
							)}</span>人 (${option.series[
								params.seriesIndex
							].pieData.value.toFixed(2)}%)`;
						}
					},
				},
				xAxis3D: {
					min: -1.3,
					max: 1.3,
				},
				yAxis3D: {
					min: -1.3,
					max: 1.3,
				},
				zAxis3D: {
					min: -1.3,
					max: 1.3,
				},
				grid3D: {
					show: false,
					boxHeight: boxHeight,
					viewControl: {
						distance: 230,
						alpha: 20,
						beta: 40,
						rotateSensitivity: [1, 0],
						zoomSensitivity: 0, //设置为0无法缩放
						panSensitivity: 0, //设置为0无法平移
					},
				},
				series: series,
			};
			return option;
		},

		//获取3d丙图的最高扇区的高度
		getHeight3D(series, height) {
			series.sort((a, b) => {
				return b.pieData.value - a.pieData.value;
			});
			return (height * 25) / series[0].pieData.value;
		},

		// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
		getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
			// 计算
			let midRatio = (startRatio + endRatio) / 2;
			let startRadian = startRatio * Math.PI * 2;
			let endRadian = endRatio * Math.PI * 2;
			let midRadian = midRatio * Math.PI * 2;
			// 如果只有一个扇形，则不实现选中效果。
			if (startRatio === 0 && endRatio === 1) {
				isSelected = false;
			}
			// 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
			k = typeof k !== "undefined" ? k : 1 / 3;
			// 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
			let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
			let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
			// 计算高亮效果的放大比例（未高亮，则比例为 1）
			let hoverRate = isHovered ? 1.05 : 1;
			// 返回曲面参数方程
			return {
				u: {
					min: -Math.PI,
					max: Math.PI * 3,
					step: Math.PI / 32,
				},
				v: {
					min: 0,
					max: Math.PI * 2,
					step: Math.PI / 20,
				},
				x: function (u, v) {
					if (u < startRadian) {
						return (
							offsetX +
							Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
						);
					}
					if (u > endRadian) {
						return (
							offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
						);
					}
					return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
				},
				y: function (u, v) {
					if (u < startRadian) {
						return (
							offsetY +
							Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
						);
					}
					if (u > endRadian) {
						return (
							offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
						);
					}
					return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
				},
				z: function (u, v) {
					if (u < -Math.PI * 0.5) {
						return Math.sin(u);
					}
					if (u > Math.PI * 2.5) {
						return Math.sin(u) * h * 0.1;
					}
					return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
				},
			};
		},
		bindListen(myChart) {
			// 监听点击事件，实现弹窗
			myChart.on("click", (params) => {
				console.log(params);
				this.openDialog(params.seriesName);
			});
		},
		getCount(d) {
			return this.optionData.filter((item) => item.name === d)[0].count;
		},

		openDialog(n) {
			if (n === "掌握较好") {
				this.dialogTitle = "词汇掌握较好学生名单";
				this.dialogVisible = true;
				this.currentType = 3;
			} else if (n === "掌握一般") {
				this.dialogTitle = "词汇掌握一般学生名单";
				this.dialogVisible = true;
				this.currentType = 2;
			} else if (n === "掌握较差") {
				this.dialogTitle = "词汇掌握较差学生名单";
				this.dialogVisible = true;
				this.currentType = 1;
			}
			this.dialogVisible = true;
			this.getStuList(1);
		},
		// 显示第几页
		handleCurrentChange(val) {
			// 改变默认的页数
			this.getStuList(val);
			this.currentPage = val;
			this.emptyText = "加载中...";
		},
		// 获取学校名单
		getStuList(PageNum) {
			let params = {
				// SchoolID: "S4-000020-9AB3",
				// CourseClassID: "6A04CCDA-0598-4D6E-9A06-C7155E8BD8F5",
				// TID: "T1014003",
				// Token: "02020590-babb-43b7-81b2-64ed8a94d848",
				// ZsdArea: "C",
				...this.$store.state,
				MasterType: this.currentType,
				PageNum: PageNum,
				PageSize: this.PageSize,
			};
			delete params.UserInfo;
			// console.log(params);
			GetClassVocaConclusionDetail(params).then((res) => {
				this.tableData = res.Data.StuVocaList;
				this.pageCount = Math.ceil(res.Data.PageCount / 9);
				this.emptyText = "暂无数据";
			});
			// setTimeout(() => {
			// 	this.emptyText = "暂无数据";
			// }, 1500);
		},
		// 跳转薄弱诊断
		toDiagnosis() {
			let url = this.$router.resolve({
				path: "/DiagReport",
				query: {
					token: this.$store.state.token,
					userType: "teacher",
					reportType: "voca",
					courseClassID: this.$store.state.CourseClassID,
					stageNo: this.$store.state.StageNo,
					schoolID: this.$store.state.SchoolID,
				},
			});
			window.open(url.href, "_blank");
		},
	},
};
</script>

<style lang="scss" scoped>
.right-small-box {
	margin-right: 30px;
}
.main {
	height: 80%;
	display: -webkit-flex;
	display: flex;
	justify-content: space-around;
	.number {
		font-family: Oswald;
		font-size: 28px;
		color: #4bf3f9;
	}
	.left {
		height: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: space-around;
		.masteredCount {
			width: 201px;
			height: 74px;
			background: url(~@/assets/img/teacher/词汇平均掌握量.png) 0px center
				no-repeat;
			padding-left: 90px;
			.count {
				display: block;
				margin-top: 8px;
				color: #4bf3f9;
			}
		}
		.scoreRate {
			width: 201px;
			height: 74px;
			background: url(~@/assets/img/teacher/平均答对率.png) 0px center no-repeat;
			padding-left: 90px;
			.rate {
				display: block;
				margin-top: 8px;
				color: #4bf3f9;
			}
		}
	}
	.right {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		.pieChart {
			width: 188px;
			height: 180px;
			background: url(~@/assets/img/teacher/底座.png) center 75px no-repeat;
			// margin-bottom: 10px;
		}
	}
}

.dialogContent {
	width: 500px;
	height: 400px;
}
.dialogMain {
	// margin: 0px 0;
	padding: 25px 0;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}
</style>
