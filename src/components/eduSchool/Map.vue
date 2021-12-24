<!--
 * @Author: 吴涛
 * @Date: 2021-11-30 14:27:26
 * @LastEditTime: 2021-12-24 10:47:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》地图，图0
-->
<template>
  <div class="map">
    <div id="mapID"></div>
  </div>
</template>
<script>
import { getMapJson } from "@/api/eduSchool/right.js";
import { get_A, get_B, get_C, get_D, get_E, get_F, mapBG0 } from "@/api/eduSchool/imgPo.js";
export default {
  name: "Map",
  data() {
    return {};
  },
  mounted() {
    this.drawMap();
  },
  methods: {
    drawMap() {
      let params = {
        Token: "533ddc22-aca3-4e74-b157-d50a8bb2cba2",
        TID: "T1201004",
        ProvinceID: "330000",
        CityID: "330400",
        CountyID: "330402",
        GlobalGrade: "K12",
        StageNo: "C",
        ZsdArea: "C",
      };
      //需要采用echarts4.9版本
      //var imgBack = "";
      getMapJson(params).then((res) => {
        console.log(res);
        let mapDate = [];
        res.Data.SchoolList.map((item) => {
          mapDate.push({
            name: item.SchoolName,
            value: [item.Longitude, item.Latitude],
            datas: item.CognitiveGradeName,
          });
        });
        res.Data.OtherSchoolList.map((item) => {
          mapDate.push({
            name: item.SchoolName,
            value: [item.Longitude, item.Latitude],
            datas: "F",
          });
        });
        // let quyuData = [];
        // res.Data.MapResources.features.map((item) => {
        //   quyuData.push({ name: item.properties.name, value: 50 });
        // });
        let echarts = require("echarts");
        let mapEchart = echarts.init(document.getElementById("mapID"));

        echarts.registerMap("bd", res.Data.MapResources);
        let only = {
          type: "FeatureCollection",
          features: [],
        };
        res.Data.MapResources.features.map((item, index) => {
          if (index > 0) {
            only.features.push(item);
          }
        });
        echarts.registerMap("only", only);
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
                    borderColor: "#fff", // 省份界线颜色
                    borderWidth: 3, // 省份界线的宽度
                    areaColor: "red", // 整个省份的颜色
                  },
                },
              },
            ],
            itemStyle: {
              normal: {
                areaColor: "#001668",
                shadowColor: "#0068bc",
                shadowBlur: 3,
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                borderColor: "#001668",
                borderWidth: 3,
              },
              emphasis: {
                areaColor: "red",
              },
            },
          },
          series: [
            {
              zlevel: 2,
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
              zlevel: 2,
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
                  // areaColor: function (value, params) {
                  //   console.log(value, params);
                  // }, //"#0643a5", //0634a1
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 1,
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
              map: "only",
            },
            // gif动画
            {
              zlevel: 2,
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
              type: "scatter",
              coordinateSystem: "geo",
              itemStyle: {
                color: "#fff",
              },
              zlevel: 2,
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
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.map {
  width: 940px;
  height: 636px;
  margin: 0 10px;
}
#mapID {
  width: 940px;
  height: 620px;
}
</style>
