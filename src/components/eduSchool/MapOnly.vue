<!--
 * @Author: your name
 * @Date: 2022-03-03 14:08:41
 * @LastEditTime: 2022-03-03 15:23:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\eduSchool\MapOnly.vue
-->
<template>
  <div style="position: relative; overflow: hidden; width: 940px; height: 620px">
    <div id="mapID_only" style="z-index: 100; position: absolute"></div>
    <div id="mapID_All" style="z-index: 5; position: absolute" v-show="false"></div>
  </div>
</template>
<script>
import { getMapJson } from "@/api/eduSchool/right.js";
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
export default {
  name: "MapOnly",
  data() {
    return {};
  },
  mounted() {
    let params = {
      Token: "95f5bf2a-87ff-47fd-96f4-6153bdd788fa",
      TID: "EZ4001",
      ProvinceID: "330000",
      CityID: "330400",
      CountyID: "330402",
      GlobalGrade: "K12",
      StageNo: "C",
      ZsdArea: "C",
    };
    getMapJson(params).then((res) => {
      let mapDate = [];
      res.Data.SchoolList.map((item) => {
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
      let CountyName = "";
      let centerPoint = [];
      res.Data.MapResources.features.map((mapItem) => {
        if (mapItem.properties.adcode == res.Data.adcode) {
          CountyName = mapItem.properties.name;
          centerPoint = mapItem.properties.centroid;
        }
      });
      this.getMapOnly(res.Data.MapResources, mapDate, CountyName, centerPoint);
      //this.getMapAll(res.Data.MapResources);
    });
  },
  methods: {
    getMapOnly(MapResources, mapDate, CountyName, centerPoint) {
      let echarts = require("echarts");
      let mapEchart = echarts.init(document.getElementById("mapID_only"));
      echarts.registerMap("bd", MapResources);
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
            // let url =
            //   window.location.origin +
            //   "/Web/index.html#/home/schoolRZZD?token=" +
            //   window.location.hash.split("?")[1].split("=")[1] +
            //   "&SchoolID=" +
            //   params.data.SchoolID;
            let url = "";
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
          layoutCenter: ["50%", "50%"],
          center: centerPoint,
          layoutSize: "250%",
          silent: false,
          roam: false, //是否启用鼠标滚轮缩放功能
          zoom: 1,
          zlevel: 1,
          regions: [
            {
              // 重点 部分 ,在这里给大家模拟一个省份颜色与界线颜色的修改,如果想修改多个省份就在后面多添加几个对象即可.
              name: CountyName, // 对应的是import "./china"  数据中的名称如: name: "广东省"(下面有截图)
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
                  color: "#024ccc", //地图区域名称文字的颜色
                },
              },
              emphasis: {
                textStyle: {
                  color: "#024ccc",
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
                opacity: 0.7, //透明度
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
    },
    getMapAll(MapResources) {
      let echarts = require("echarts");
      let mapEchart = echarts.init(document.getElementById("mapID_All"));
      echarts.registerMap("bd", MapResources);
      let option = {
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
          },
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
        ],
      };
      mapEchart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
#mapID_only,
#mapID_All {
  width: 940px;
  height: 620px;
  z-index: 5;
  position: relative;
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
