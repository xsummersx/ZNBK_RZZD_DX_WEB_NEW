<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-10 11:21:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教师，语法认知
-->
<template>
	<div class="right-small-box">
		<div class="box-title clearfix">
			<span class="float-l title">语法认知</span>
			<span class="float-r check-icon"><i></i>薄弱语法诊断</span>
		</div>
		<div class="main">
			<div class="left">
				<div class="scoreRate">
					<span>语法平均答对率</span>
					<span class="rate"
						><span class="number">{{
							(info.GrammarScoreRate * 100).toFixed(2)
						}}</span
						>%</span
					>
				</div>
			</div>
			<div class="right">
				<div class="chart" id="charts"></div>
				<span>语法掌握程度</span>
			</div>
		</div>
		<el-dialog
			:title="dialogTitle"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			width="500px"
			top="0vh"
		>
			<div class="dialogContent">
				<div class="dialogMain">
					<el-table
						:empty-text="emptyText"
						:data="tableData"
						style="width: 450px"
					>
						<el-table-column prop="Index" label="排名" width="80">
							<template slot-scope="scope">
								<span class="gray">
									{{ scope.row.Index }}
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
							prop="GramMasterCount"
							label="语法掌握量"
							width="140"
						>
							<template slot-scope="scope">
								<span class="gray">
									{{ scope.row.GramMasterCount }}
								</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="GramScoreRate"
							label="语法答对率"
							width="140"
						>
							<template slot-scope="scope">
								<span class="gray">
									{{ (scope.row.GramScoreRate * 100).toFixed(2) }}%
								</span>
							</template>
						</el-table-column>
					</el-table>
					<div class="paginationBox" v-if="pageCount > 1">
						<el-pagination
							class="pagination"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							layout=" prev, pager, next, total"
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
	GetClassGrammer,
	GetClassGrammerList,
} from "@/api/paperTwo/question.js";
import "echarts-gl";
export default {
	data() {
		return {
			// 掌握类型全部-1，较好3，一般2，较差1
			currentType: -1,
			// dialog标题
			dialogTitle: "学生名单",
			dialogVisible: false,
			// 空数据时显示
			emptyText: "暂无数据",
			// 分页数
			pageCount: 1,
			StuCount: 9,
			// 默认显示第几页
			currentPage: 1,
			// 每页显示的数量
			PageSize: 9,
			// 表格数据
			tableData: [
				{
					Index: 1,
					StuID: "1201046",
					StuName: "1201046",
					PhotoPath:
						"http://172.16.41.236:5000/LgFtp/UserInfo/Photo/Default/Nopic.jpg",
					GramMasterCount: 192,
					GramScoreRate: 0.56,
					GramMaterRate: 0.68,
				},
				{
					Index: 2,
					StuID: "1201047",
					StuName: "1201047",
					PhotoPath:
						"http://172.16.41.236:5000/LgFtp/UserInfo/Photo/Default/Nopic.jpg",
					GramMasterCount: 192,
					GramScoreRate: 0.56,
					GramMaterRate: 0.68,
				},
				{
					Index: 3,
					StuID: "1201046",
					StuName: "1201046",
					PhotoPath:
						"http://172.16.41.236:5000/LgFtp/UserInfo/Photo/Default/Nopic.jpg",
					GramMasterCount: 192,
					GramScoreRate: 0.56,
					GramMaterRate: 0.68,
				},
				{
					Index: 4,
					StuID: "1201047",
					StuName: "1201047",
					PhotoPath:
						"http://172.16.41.236:5000/LgFtp/UserInfo/Photo/Default/Nopic.jpg",
					GramMasterCount: 192,
					GramScoreRate: 0.56,
					GramMaterRate: 0.68,
				},
				{
					Index: 5,
					StuID: "1201046",
					StuName: "1201046",
					PhotoPath:
						"http://172.16.41.236:5000/LgFtp/UserInfo/Photo/Default/Nopic.jpg",
					GramMasterCount: 192,
					GramScoreRate: 0.56,
					GramMaterRate: 0.68,
				},
				{
					Index: 6,
					StuID: "1201047",
					StuName: "1201047",
					PhotoPath:
						"http://172.16.41.236:5000/LgFtp/UserInfo/Photo/Default/Nopic.jpg",
					GramMasterCount: 192,
					GramScoreRate: 0.56,
					GramMaterRate: 0.68,
				},
				{
					Index: 7,
					StuID: "1201046",
					StuName: "1201046",
					PhotoPath:
						"http://172.16.41.236:5000/LgFtp/UserInfo/Photo/Default/Nopic.jpg",
					GramMasterCount: 192,
					GramScoreRate: 0.56,
					GramMaterRate: 0.68,
				},
				{
					Index: 8,
					StuID: "1201047",
					StuName: "1201047",
					PhotoPath:
						"http://172.16.41.236:5000/LgFtp/UserInfo/Photo/Default/Nopic.jpg",
					GramMasterCount: 192,
					GramScoreRate: 0.56,
					GramMaterRate: 0.68,
				},
				{
					Index: 9,
					StuID: "1201047",
					StuName: "1201047",
					PhotoPath:
						"http://172.16.41.236:5000/LgFtp/UserInfo/Photo/Default/Nopic.jpg",
					GramMasterCount: 192,
					GramScoreRate: 0.56,
					GramMaterRate: 0.68,
				},
			],
			option: {},
			// 接口返回数据
			info: {
				GrammarScoreRate: 0.6985816,
				GrammerMasteredMapList: [
					{
						MasteredConclusion: 1,
						StuCount: 10,
						StuCountProportion: 0.20,
					},
					{
						MasteredConclusion: 2,
						StuCount: 35,
						StuCountProportion: 0.32,
					},
					{
						MasteredConclusion: 3,
						StuCount: 15,
						StuCountProportion: 0.48,
					},
				],
			},
		};
	},
	created() {
		// this.init();
	},
	computed: {
		optionData: function () {
			let arr = [];
			this.info.GrammerMasteredMapList.map((item) => {
				if (+item.MasteredConclusion === 2) {
					arr.push({
						name: "掌握一般",
						value: item.StuCountProportion * 100,
						count: item.StuCount,
						itemStyle: {
							color: "#0cce07",
						},
					});
				} else if (+item.MasteredConclusion === 3) {
					arr.push({
						name: "掌握较好",
						value: item.StuCountProportion * 100,
						count: item.StuCount,
						itemStyle: {
							color: "#00ccff",
						},
					});
				} else {
					arr.push({
						name: "掌握较差",
						value: item.StuCountProportion * 100,
						count: item.StuCount,
						itemStyle: {
							color: "#ff8080",
						},
					});
				}
			});
			return arr;
		},
	},
	mounted() {
		this.drawInit();
	},
	methods: {
		// 初始化
		init() {
			GetClassGrammer({ ...this.$store.state }).then((res) => {
				this.info = res.Data;
				this.drawInit();
			});
		},
		drawInit() {
			//构建3d饼状图
			let myChart = this.$echarts.init(document.getElementById("charts"));
			// 传入数据生成 option
			this.option = this.getPie3D(this.optionData, 0.6);
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
			let boxHeight = this.getHeight3D(series, 20); //通过传参设定3d饼/环的高度
			// 配置
			let option = {
				tooltip: {
					formatter: (params) => {
						if (params.seriesName !== "mouseoutSeries") {
							return `${
								params.seriesName
							}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
								params.color
							};"></span><span style="font-weight: bold">${this.getCount(
								params.seriesName
							)}</span>人 (${
								option.series[params.seriesIndex].pieData.value.toFixed(2)
							}%)`;
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
						distance: 140,
						alpha: 20,
						beta: 150,
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
			// let that = this;
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
				this.dialogTitle = "语法掌握较好学生名单";
				this.currentType = 3;
			} else if (n === "掌握一般") {
				this.dialogTitle = "语法掌握一般学生名单";
				this.currentType = 2;
			} else if (n === "掌握较差") {
				this.dialogTitle = "语法掌握较差学生名单";
				this.currentType = 1;
			}
			this.dialogVisible = true;
			this.getStuList(1);
		},
		handleSizeChange(val) {
			// 改变每页显示的条数
			if (this.$route.query.str == "gradeLeader") {
				this.PageSize2 = val;
			}
			this.PageSize = val;
			// 注意：在改变每页显示的条数时，要将页码显示到第一页
			this.currentPage = 1;
		},
		// 显示第几页
		handleCurrentChange(val) {
			// 改变默认的页数
			this.emptyText = "加载中...";
			this.currentPage = val;
			this.tableData = [];
			this.getStuList(val);
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
			// console.log(params);
			GetClassGrammerList(params).then((res) => {
				this.tableData = res.Data.StuGrammerList;
				this.pageCount = res.Data.PageCount;
				this.emptyText = "暂无数据";
			});
			// setTimeout(() => {
			// 		this.emptyText = "暂无数据";
			// }, 1500);
		},
	},
};
</script>

<style lang="scss" scoped>
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
		justify-content: center;
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
		.chart {
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
