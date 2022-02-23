<!--
 * @Author: 吴涛
 * @Date: 2021-11-30 14:27:26
 * @LastEditTime: 2022-02-23 11:33:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》地图，图0
-->
<template>
  <div class="map">
    <div v-show="showData" style="z-index: 5; position: absolute">
      <div class="noData" v-show="IsHaveSchool == false || IsHaveMap == false">
        {{ noDataText0 }}
      </div>
      <div
        id="mapID"
        v-show="IsHaveMap"
        :style="{ opacity: IsHaveSchool == false ? 0.2 : 1 }"
      ></div>
      <div
        class="legend"
        v-show="IsHaveMap"
        :style="{ opacity: IsHaveSchool == false ? 0.2 : 1 }"
      ></div>
      <div class="btnText">
        <span class="text" @click="dialogVisible = true">学校认知情况</span><i class="btnIcon"></i>
      </div>
    </div>
    <vue-particles
      color="#04aed8"
      :particleOpacity="0.4"
      :particlesNumber="100"
      shapeType="triangle"
      :particleSize="4"
      linesColor="#39878a"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      id="particles-js"
    ></vue-particles>
    <Loading v-show="!showData" style="margin-top: 200px"></Loading>
    <el-dialog
      title="学校认知情况"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="820px"
      top="0vh"
    >
      <div>
        <SchoolInfoTable></SchoolInfoTable>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getMapJson } from "@/api/eduSchool/right.js";
import SchoolInfoTable from "./SchoolInfoTable";
import "@/assets/css/particless.css";
import {
  get_A,
  get_B,
  get_C,
  get_D,
  get_E,
  get_F,
  mapBG0,
  activeBG,
} from "@/api/eduSchool/imgPo.js";
import Loading from "../common/Loading";
export default {
  name: "Map",
  data() {
    return {
      noDataText0: "暂无教育局地图数据噢~",
      IsHaveSchool: false, //是否有学校
      IsHaveMap: false, //是否有地图
      showData: false, //是否接口异步请求完成
      dialogVisible: false,
    };
  },
  mounted() {
    this.drawMap();
  },
  components: {
    Loading,
    SchoolInfoTable,
  },
  methods: {
    //跳转学校点击事件
    // SchoolClick(id) {
    //   this.$store.commit("updateSchoolID", id);
    //   window.open(
    //     window.location.origin +
    //       "/Web/index.html#/home/schoolRZZD?token=" +
    //       this.$store.state.token,
    //   );
    // },
    //统计图绘制
    drawMap() {
      let params = {
        Token: this.$store.state.token,
        TID: this.$store.state.TID,
        ProvinceID: this.$store.state.ProvinceID,
        CityID: this.$store.state.CityID,
        CountyID: this.$store.state.CountyID,
        GlobalGrade: this.$store.state.GlobalGrade,
        StageNo: this.$store.state.StageNo,
        ZsdArea: this.$store.state.ZsdArea,
      };

      getMapJson(params).then((res) => {
        this.showData = true;
        if (res.Data.MapResources.features.length > 0) {
          this.IsHaveMap = true;
        }
        let mapDate = [];
        res.Data.SchoolList.map((item) => {
          if (item.Longitude != -1 && item.Latitude != -1) {
            this.IsHaveSchool = true; //有学校信息的
          }
          mapDate.push({
            SchoolID: item.SchoolID,
            name: item.SchoolName,
            value: [item.Longitude, item.Latitude],
            datas: item.CognitiveGradeName,
            CurrentIndex: item.CurrentIndex, //认知指数
            PredictedScore: item.PredictedScore, //预估成绩
            PaperScoreRate: (item.PaperScoreRate * 100).toFixed(0), //已作答试卷平均得分率
            AnsweredPaperNum: item.AnsweredPaperNum, //累计作答试卷份数
          });
        });
        res.Data.OtherSchoolList.map((item) => {
          mapDate.push({
            SchoolID: item.SchoolID,
            name: item.SchoolName,
            value: [item.Longitude, item.Latitude],
            datas: "F",
          });
        });
        // let quyuData = [];
        // res.Data.MapResources.features.map((item) => {
        //   quyuData.push({ name: item.properties.name, tipData: 50 });
        // });
        let echarts = require("echarts");
        let mapEchart = echarts.init(document.getElementById("mapID"));
        echarts.registerMap("bd", res.Data.MapResources);
        // let only = {
        //   type: "FeatureCollection",
        //   features: [],
        // };
        // res.Data.MapResources.features.map((item, index) => {
        //   if (index > 0) {
        //     only.features.push(item);
        //   }
        // });
        // echarts.registerMap("only", only);
        let option = {
          // visualMap: {
          //   show: true,
          //   min: 0,
          //   max: 200,
          //   left: "10%",
          //   top: "bottom",
          //   calculable: true,
          //   seriesIndex: [1],
          //   inRange: {
          //     color: ["#0643a5", "#0634a1"], // 蓝绿#0643a5", //0634a1
          //   },
          // },
          //tooltip: {
          //show: true,
          // formatter: function (params) {
          //   console.log(params);
          //   return "<div style='color:red'>学校</div>";
          // },
          //},
          tooltip: {
            zlevel: 100,
            show: true,
            triggerOn: "mousemove",
            enterable: true,
            trigger: "item",
            alwaysShowContent: true,
            position: "right",
            renderMode: "html",
            // position: function (point, params, dom, rect, size) {
            //   console.log(point, params, dom, rect, size);
            //   return [rect];
            // },
            backgroundColor: "transparent", //让geo的点击实现为空白
            textStyle: {
              //让geo的点击实现为空白
              color: "transparent",
            },
            borderWidth: 0, //让geo的点击实现为空白
            shadowBlur: 0, //让geo的点击实现为空白
            shadowColor: "transparent", //让geo的点击实现为空白
            // hideDelay:10000,
            // formatter: function (params) {
            //   console.log(params);
            //   if (params) {
            //     option.tooltip.show = true;
            //     var info = '<div class="tipBG">学校</div>';
            //     return info;
            //   }
            //   //   return "<div style='color:red'>学校</div>";
            // },
            formatter: function (params) {
              console.log(params);
              let url =
                window.location.origin +
                "/Web/index.html#/home/schoolRZZD?token=" +
                window.location.hash.split("?")[1].split("=")[1] +
                "&SchoolID=" +
                params.data.SchoolID;
              let divTop =
                '<div class="toolTipTop"><span class="toolTipTitle" title="' +
                params.data.name +
                '">' +
                params.data.name +
                '</span><i class="toolTipIcon" title="点击跳转该学校认知质量大数据报告" onclick="javascript:window.open(\'' +
                url +
                "')\"></i></div>";
              let divNone =
                '<div class="toolTipTop"><span class="toolTipTitle" title="' +
                params.data.name +
                '">' +
                params.data.name +
                "</span></div>";
              let divList =
                '<div class="toolTipItem"><span class="toolTipTitleContLeft">累计作答试卷</span><span class="toolTipTitleContRight">' +
                params.data.AnsweredPaperNum +
                '份</span></div><div class="toolTipItem"><span class="toolTipTitleContLeft">平均正确率</span><span class="toolTipTitleContRight">' +
                params.data.PaperScoreRate +
                '%</span></div><div class="toolTipItem"><span class="toolTipTitleContLeft">认知平均分</span><span class="toolTipTitleContRight">' +
                params.data.CurrentIndex +
                '分</span></div><div class="toolTipItem"><span class="toolTipTitleContLeft">高考成绩预估</span><span class="toolTipTitleContRight">' +
                params.data.PredictedScore +
                "分</span></div>";

              if (params.data.datas != "F") {
                return (
                  '<div class="toolTip' + params.data.datas + 'BG">' + divTop + divList + "</div>"
                );
              } else {
                return '<div class="toolTip' + params.data.datas + 'BG">' + divNone + "</div>";
              }
            },
          },
          geo: {
            show: true,
            map: "bd",
            aspectScale: 1,
            layoutCenter: ["50%", "50.5%"],
            layoutSize: "100%",
            silent: false,
            roam: false,
            zoom: 1.22,
            zlevel: 1,
            regions: [
              {
                // 重点 部分 ,在这里给大家模拟一个省份颜色与界线颜色的修改,如果想修改多个省份就在后面多添加几个对象即可.
                name: "南湖区", // 对应的是import "./china"  数据中的名称如: name: "广东省"(下面有截图)
                itemStyle: {
                  normal: {
                    opacity: 1, // 透明度
                    borderColor: "#18ff00", // 省份界线颜色
                    borderWidth: 4, // 省份界线的宽度
                    areaColor: {
                      image: activeBG(),
                      repeat: "repeat",
                    }, //"#045323", // 整个省份的颜色
                    shadowColor: "rgba(0,0,0,0.5)",
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                  },
                  emphasis: {
                    borderColor: "#18ff00", // 省份界线颜色
                    borderWidth: 4, // 省份界线的宽度
                    areaColor: {
                      image: activeBG(),
                      repeat: "repeat",
                    }, //"#045323", // 整个省份的颜色
                  },
                },
              },
            ],
            itemStyle: {
              normal: {
                areaColor: "transparent",
                borderWidth: 0,
                shadowColor: "rgba(10,76,139,1)",
                shadowOffsetY: 0,
                shadowBlur: 60,
              },
              emphasis: {
                borderWidth: 0,
                areaColor: "transparent",
              },
            },
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
          },
          series: [
            {
              name: "散点",
              type: "scatter",
              coordinateSystem: "geo",
            },
            // {
            //   type: "map",
            //   map: "bd",
            //   geoIndex: 0,
            //   aspectScale: 0.75, //长宽比
            //   data: quyuData,
            // },
            {
              zlevel: 0,
              type: "map",
              selectedMode: false, //默认关闭选中状态
              //data: quyuData,
              silent: false,
              aspectScale: 1,
              roam: false,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: "#24aefa",
                  },
                },
                emphasis: {
                  textStyle: {
                    color: "#24aefa",
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "#00b4ff",
                  borderWidth: 3,
                  areaColor: {
                    image: mapBG0(),
                    repeat: "repeat",
                  },
                  shadowColor: "#23074d",
                  shadowBlur: 30,
                  shadowOffsetX: -2,
                  shadowOffsetY: 5,
                  label: {
                    show: true,
                  },
                },
                emphasis: {
                  areaColor: {
                    image: mapBG0(),
                    repeat: "repeat",
                  },
                  //areaColor: "#013797",
                },
              },
              zoom: 1.1,
              map: "bd",
            },
            // gif动画
            {
              tooltip: {
                show: false,
              },
              type: "effectScatter",
              coordinateSystem: "geo",
              rippleEffect: {
                scale: 7,
                brushType: "stroke",
              },
              showEffectOn: "render",
              itemStyle: {
                normal: {
                  shadowColor: "#0ff",
                  shadowBlur: 5,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  color: function (params) {
                    var colorList = [
                      new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        {
                          offset: 0,
                          color: "#009cff",
                        },
                        {
                          offset: 1,
                          color: "#2deeff",
                        },
                      ]),
                      new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        {
                          offset: 0,
                          color: "#009e09",
                        },
                        {
                          offset: 1,
                          color: "#48ff4d",
                        },
                      ]),
                      new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        {
                          offset: 0,
                          color: "#00ffd7",
                        },
                        {
                          offset: 1,
                          color: "#00b095",
                        },
                      ]),
                      new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        {
                          offset: 0,
                          color: "#ffc334",
                        },
                        {
                          offset: 1,
                          color: "#ff9000",
                        },
                      ]),
                      new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        {
                          offset: 0,
                          color: "#ff9090",
                        },
                        {
                          offset: 1,
                          color: "#ff5b5b",
                        },
                      ]),
                      new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        {
                          offset: 0,
                          color: "#d6d6d6",
                        },
                        {
                          offset: 1,
                          color: "#969696",
                        },
                      ]),
                    ];
                    if (params.data.datas == "A") {
                      return colorList[0];
                    } else if (params.data.datas == "B") {
                      return colorList[1];
                    } else if (params.data.datas == "C") {
                      return colorList[2];
                    } else if (params.data.datas == "D") {
                      return colorList[3];
                    } else if (params.data.datas == "E") {
                      return colorList[4];
                    } else if (params.data.datas == "F") {
                      return colorList[5];
                    }
                  },
                },
              },
              label: {
                normal: {
                  color: "#fff",
                },
              },
              symbol: "circle",
              symbolSize: [7, 3],
              data: mapDate,
              zlevel: 1,
            },
            //地域图标
            {
              zlevel: 100,
              type: "scatter",
              coordinateSystem: "geo",
              itemStyle: {
                color: "#fff",
              },
              symbol: function (value, params) {
                if (params.data.datas == "A") {
                  return get_A();
                } else if (params.data.datas == "B") {
                  return get_B();
                } else if (params.data.datas == "C") {
                  return get_C();
                } else if (params.data.datas == "D") {
                  return get_D();
                } else if (params.data.datas == "E") {
                  return get_E();
                } else if (params.data.datas == "F") {
                  return get_F();
                }
              },
              symbolSize: [20, 23],
              symbolOffset: [0, -14],
              z: 9999,
              data: mapDate,
            },
          ],
        };
        mapEchart.setOption(option);

        // mapEchart.on("click", function (params) {
        //   //点击事件
        //   console.log(params);
        // });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.noData {
  position: absolute;
  left: 370px;
  top: 250px;
  width: 176px;
  height: 160px;
  margin: 0 auto;
  z-index: 100;
  padding-top: 130px;
  background: url(~@/assets/img/eduSchool/mapNoData.png) no-repeat top center;

  color: #fff;
  font-size: 12px;
  text-align: center;
}
.map {
  width: 940px;
  height: 636px;
  margin: 0 10px;
  position: relative;
  overflow: hidden;
}
#mapID {
  width: 940px;
  height: 620px;
}
.legend {
  width: 34px;
  height: 92px;
  background: url(~@/assets/img/eduSchool/legend.png) no-repeat center center;
  position: absolute;
  left: 58px;
  top: 28px;
}
.btnText {
  position: absolute;
  width: 100px;
  height: 20px;
  right: 30px;
  top: 28px;
  cursor: pointer;
  .text {
    line-height: 20px;
    float: left;
    color: #fff;
    opacity: 0.8;
  }
  .btnIcon {
    float: left;
    width: 8px;
    height: 8px;
    margin-left: 4px;
    margin-top: 6px;
    background: url(~@/assets/img/eduSchool/下一页详情_默认.png) no-repeat center center;
  }
}
.btnText:hover {
  .text {
    opacity: 1;
  }
  .btnIcon {
    background: url(~@/assets/img/eduSchool/下一页详情_悬停.png) no-repeat center center;
  }
}
</style>
<style>
.toolTipABG {
  width: 220px;
  height: 240px;
  background: url(~@/assets/img/eduSchool/ABG.png) no-repeat center center;
  color: #fff;
  position: relative;
}
.toolTipABG::after {
  width: 34px;
  height: 12px;
  background: url(~@/assets/img/eduSchool/LINEA.png) no-repeat center right;
  content: "";
  position: absolute;
  left: -17px;
  top: 48%;
}
.toolTipBBG {
  width: 220px;
  height: 240px;
  background: url(~@/assets/img/eduSchool/BBG.png) no-repeat center center;
  color: #fff;
  position: relative;
}
.toolTipBBG::after {
  width: 34px;
  height: 12px;
  background: url(~@/assets/img/eduSchool/LINEB.png) no-repeat center right;
  content: "";
  position: absolute;
  left: -17px;
  top: 48%;
}
.toolTipCBG {
  width: 220px;
  height: 240px;
  background: url(~@/assets/img/eduSchool/CBG.png) no-repeat center center;
  color: #fff;
  position: relative;
}
.toolTipCBG::after {
  width: 34px;
  height: 12px;
  background: url(~@/assets/img/eduSchool/LINEC.png) no-repeat center right;
  content: "";
  position: absolute;
  left: -17px;
  top: 48%;
}
.toolTipDBG {
  width: 220px;
  height: 240px;
  background: url(~@/assets/img/eduSchool/DBG.png) no-repeat center center;
  color: #fff;
  position: relative;
}
.toolTipDBG::after {
  width: 34px;
  height: 12px;
  background: url(~@/assets/img/eduSchool/LINED.png) no-repeat center right;
  content: "";
  position: absolute;
  left: -17px;
  top: 48%;
}
.toolTipEBG {
  width: 220px;
  height: 240px;
  background: url(~@/assets/img/eduSchool/EBG.png) no-repeat center center;
  color: #fff;
  position: relative;
}
.toolTipEBG::after {
  width: 34px;
  height: 12px;
  background: url(~@/assets/img/eduSchool/LINEE.png) no-repeat center right;
  content: "";
  position: absolute;
  left: -17px;
  top: 48%;
}
.toolTipFBG {
  width: 200px;
  height: 54px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 6px;
}
.toolTipFBG::after {
  width: 27px;
  height: 12px;
  background: url(~@/assets/img/eduSchool/LINEF.png) no-repeat center right;
  content: "";
  position: absolute;
  left: -10px;
  top: 40%;
}
.toolTipTop {
  overflow: hidden;
  margin-bottom: 20px;
}
.toolTipTitle {
  width: 145px;
  height: 50px;
  line-height: 58px;
  color: #fff;
  font-size: 14px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 28px;
}
.toolTipIcon {
  float: right;
  width: 18px;
  height: 18px;
  margin-right: 20px;
  margin-top: 20px;
  background: url(~@/assets/img/eduSchool/查看_默认.png) no-repeat center center;
  position: relative;
  cursor: pointer;
}
.toolTipIcon:hover {
  background: url(~@/assets/img/eduSchool/查看_悬停.png) no-repeat center center;
}
.toolTipItem {
  overflow: hidden;
  width: 170px;
  height: 32px;
  line-height: 32px;
  margin-left: 28px;
  float: left;
}
.toolTipTitleContLeft {
  float: left;
  width: 90px;
}
.toolTipTitleContRight {
  text-align: right;
  width: 75px;
  float: left;
}
</style>
