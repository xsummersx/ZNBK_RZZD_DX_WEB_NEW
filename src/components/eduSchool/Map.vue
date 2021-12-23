<!--
 * @Author: 吴涛
 * @Date: 2021-11-30 14:27:26
 * @LastEditTime: 2021-12-23 15:43:47
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
            datas: 0,
            img: "",
          });
        });
        res.Data.OtherSchoolList.map((item) => {
          mapDate.push({
            name: item.SchoolName,
            value: [item.Longitude, item.Latitude],
            datas: 0,
            img: "",
          });
        });
        let echarts = require("echarts");
        let mapEchart = echarts.init(document.getElementById("mapID"));
        echarts.registerMap("bd", res.Data.MapResources);
        let option = {
          title: {
            top: 20,
            text: "嘉兴市",
            subtext: "",
            x: "center",
            textStyle: {
              color: "#fff",
              fontWeight: 100,
              fontSize: 14,
            },
          },
          geo: {
            map: "bd",
            aspectScale: 1,
            layoutCenter: ["50%", "50.5%"],
            layoutSize: "100%",
            silent: true,
            roam: false,
            zoom: 1.22,
            itemStyle: {
              normal: {
                areaColor: "#001668",
                shadowColor: "#0068bc",
                shadowBlur: 3,
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                borderColor: "#001668",
                borderWidth: 2,
              },
              emphasis: {
                areaColor: "red",
              },
            },
          },
          series: [
            {
              type: "map",
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
                  borderWidth: 2,
                  // areaColor: {
                  //   image: imgBack,
                  //   repeat: "repeat",
                  // },
                  areaColor: "#002090", //0634a1
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 1,
                  label: {
                    show: true,
                  },
                },
                emphasis: {
                  // areaColor: {
                  //   image: imgBack,
                  //   repeat: "repeat",
                  // },
                  areaColor: "#002090",
                },
              },
              zoom: 1.1,
              map: "bd",
            },
            //gif动画
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
                  color: function () {
                    var colorList = [
                      new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        {
                          offset: 0,
                          color: "#64fbc5",
                        },
                        {
                          offset: 1,
                          color: "#018ace",
                        },
                      ]),
                    ];
                    return colorList[0];
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
              symbol: "pin",
              symbolSize: [40, 40],
              symbolOffset: [0, 0],
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
