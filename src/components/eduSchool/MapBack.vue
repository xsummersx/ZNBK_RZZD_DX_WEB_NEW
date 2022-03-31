<!--
 * @Author: your name
 * @Date: 2022-03-04 10:06:33
 * @LastEditTime: 2022-03-31 16:54:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\eduSchool\MapBack.vue
-->
<template>
  <div class="Box">
    <!-- 无数据占位图 -->

    <div class="mapBack" v-show="mapImage">
      <img :src="mapImage" class="backImg" />
    </div>
    <div class="pointBox" v-show="mapImage">
      <div class="ItemBox">
        <div
          class="Item"
          :class="school.CognitiveGradeName + 'p'"
          :style="{ left: pointList[index].left + 'px', top: pointList[index].top + 'px' }"
          v-for="(school, index) in schoolList"
          :key="index"
          @mouseover="handleOver(index)"
          @mouseleave="handleAve"
        >
          <div class="schoolNameText" :class="school.CognitiveGradeName + '_Color'">
            {{ school.SchoolName }}
          </div>
          <div
            class="animat"
            :class="'toolTip' + school.CognitiveGradeName + 'BG'"
            v-if="activeIndex == index"
          >
            <div class="toolTipTop">
              <span class="toolTipTitle" :title="school.SchoolName">{{ school.SchoolName }}</span>
              <i
                class="toolTipIcon"
                @click="openWin(school.SchoolID)"
                title="点击跳转该学校认知质量大数据报告"
              ></i>
            </div>
            <div class="toolTipItem">
              <span class="toolTipTitleContLeft">累计作答试卷</span>
              <span class="toolTipTitleContRight">{{ school.AnsweredPaperNum }}份</span>
            </div>
            <div class="toolTipItem">
              <span class="toolTipTitleContLeft">平均正确率</span>
              <span class="toolTipTitleContRight">{{ numForm(school.PaperScoreRate) }}%</span>
            </div>
            <div class="toolTipItem">
              <span class="toolTipTitleContLeft">认知平均分</span>
              <span class="toolTipTitleContRight">{{ school.CurrentIndex }}分</span>
            </div>
            <div class="toolTipItem">
              <span class="toolTipTitleContLeft">高考成绩预估</span>
              <span class="toolTipTitleContRight">{{ school.PredictedScore }}分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="noData" v-show="!mapImage">暂无地图资源</div>
  </div>
</template>
<script>
import { getMapInfo } from "@/api/eduSchool/right.js";
export default {
  props: {
    params: Object,
  },
  name: "MapBack",
  data() {
    return {
      pointList: [
        {
          left: 290,
          top: 200,
        },
        {
          left: 230,
          top: 140,
        },
        {
          left: 350,
          top: 140,
        },
        {
          left: 350,
          top: 260,
        },
        {
          left: 230,
          top: 260,
        },
        {
          left: 170,
          top: 80,
        },
        {
          left: 400,
          top: 80,
        },
        {
          left: 400,
          top: 310,
        },
        {
          left: 170,
          top: 310,
        },
      ],
      timer: undefined, //定时器
      activeIndex: 0,
      schoolList: [],
      mapImage: "img",
      lowShow: false, //坐标信息延迟显示
    };
  },
  mounted() {
    this.getMap();
    this.OpenTime();
  },
  methods: {
    //请求地图数据信息
    getMap() {
      getMapInfo(this.params).then((res) => {
        console.log(res);
        if (res.Code == 1) {
          this.schoolList = res.Data.SchoolList;
          this.mapImage = res.Data.Image;
        }
      });
    },
    //定时器
    OpenTime() {
      this.timer = setInterval(() => {
        this.jumpNext();
      }, 8000);
    },
    //鼠标悬浮
    handleOver(index) {
      clearInterval(this.timer);
      this.activeIndex = index;
    },
    //跳转下一个学校显示
    jumpNext() {
      if (this.activeIndex < this.schoolList.length - 1) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0;
      }
    },
    //鼠标离开
    handleAve() {
      this.jumpNext();
      this.OpenTime();
    },
    //数据格式化
    numForm(val) {
      return (val * 100).toFixed(0);
    },
    //跳转页面
    openWin(schoolID) {
      let url =
        window.location.origin +
        "/Web/index.html#/home/schoolRZZD?token=" +
        window.location.hash.split("?")[1].split("=")[1] +
        "&SchoolID=" +
        schoolID +
        "&GlobalGrade=" +
        this.$store.state.GlobalGrade;
      window.open(url);
    },
  },
};
</script>
<style scoped>
.noData {
  position: absolute;
  left: 370px;
  top: 250px;
  width: 176px;
  height: 160px;
  margin: 0 auto;
  opacity: 0.6;
  z-index: 5;
  padding-top: 130px;
  background: url(~@/assets/img/eduSchool/mapNoData.png) no-repeat top center;

  color: #fff;
  font-size: 12px;
  text-align: center;
}
</style>
<style>
.Box {
  width: 940px;
  height: 636px;
  z-index: 5;
  position: relative;
}
.mapBack {
  width: 940px;
  height: 636px;
  z-index: 5;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.backImg {
}
.pointBox {
  width: 580px;
  height: 400px;
  position: absolute;
  margin: 120px 180px;
  z-index: 10;
}
.ItemBox {
  width: 580px;
  height: 400px;
  left: 0;
  top: 0;
  position: relative;
}
.Item {
  width: 58px;
  height: 50px;
  position: absolute;
  left: 250px;
  top: 160px;
  cursor: pointer;
}
.schoolNameText {
  width: 60px;
  height: 20px;
  position: absolute;
  top: -18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  font-size: 12px;
  color: 12px;
  text-shadow: 0 0 4px #000;
}
.A_Color {
  color: #009cff;
}
.B_Color {
  color: #18ff00;
}
.C_Color {
  color: #00ffd8;
}
.D_Color {
  color: #ffc334;
}
.E_Color {
  color: #ff8080;
}
.Ap {
  background: url(~@/assets/img/newMap/A+-默认.png) center center no-repeat;
}
.Ap:hover {
  background: url(~@/assets/img/eduSchool/aspt.png) no-repeat center center;
}
.Bp {
  background: url(~@/assets/img/newMap/B+-默认.png) center center no-repeat;
}
.Bp:hover {
  background: url(~@/assets/img/eduSchool/bspt.png) no-repeat center center;
}
.Cp {
  background: url(~@/assets/img/newMap/C+-默认.png) center center no-repeat;
}
.Cp:hover {
  background: url(~@/assets/img/eduSchool/cspt.png) no-repeat center center;
}
.Dp {
  background: url(~@/assets/img/newMap/D+-默认.png) center center no-repeat;
}
.Dp:hover {
  background: url(~@/assets/img/eduSchool/dspt.png) no-repeat center center;
}
.Ep {
  background: url(~@/assets/img/newMap/E+-默认.png) center center no-repeat;
}
.Ep:hover {
  background: url(~@/assets/img/eduSchool/espt.png) no-repeat center center;
}
</style>
<style scoped>
.animat {
  animation: leftInit 1s ease-in;
  -ms-animation: leftInit 1s ease-in; /* IE 9 */
  -moz-animation: leftInit 1s ease-in; /* Firefox */
  -webkit-animation: leftInit 1s ease-in; /* Safari 和 Chrome */
  -o-animation: leftInit 1s ease-in; /* Opera */
}
@keyframes leftInit {
  0% {
    opacity: 0;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.toolTipABG {
  width: 220px;
  height: 240px;
  background: url(~@/assets/img/eduSchool/ABG.png) no-repeat center center;
  color: #fff;
  position: relative;
  top: -107px;
  left: 67px;
  z-index: 10001;
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
  top: -107px;
  left: 67px;
  z-index: 10001;
  z-index: 10001;
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
  top: -107px;
  left: 67px;
  z-index: 10001;
  z-index: 10001;
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
  top: -107px;
  left: 67px;
  z-index: 10001;
  z-index: 10001;
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
  top: -107px;
  left: 67px;
  z-index: 10001;
  z-index: 10001;
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

.pointBox {
  opacity: 0;
  animation: showInit 2s ease-in;
  -ms-animation: showInit 2s ease-in; /* IE 9 */
  -moz-animation: showInit 2s ease-in; /* Firefox */
  -webkit-animation: showInit 2s ease-in; /* Safari 和 Chrome */
  -o-animation: showInit 2s ease-in; /* Opera */
  animation-delay: 3s;
  -ms-animation-delay: 3s;
  -moz-animation-delay: 3s;
  -webkit-animation-delay: 3s;
  -o-animation-delay: 3s;
  animation-fill-mode: forwards;
  -ms-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
}
@keyframes showInit {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
