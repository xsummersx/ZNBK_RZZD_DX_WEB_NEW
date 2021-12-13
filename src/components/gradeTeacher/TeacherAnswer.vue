<!--
 * @Author: 柳欢
 * @Date: 2021-11-30 14:52:21
 * @LastEditTime: 2021-12-13 16:14:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，教师-历次作答统计
-->
<template>
  <div>
    <ArrowTitle titleStr="历次作答统计"></ArrowTitle>
    <div class="right-long-box">
      <div class="float-l timeText">
        <div
          @click="chooseActiveTime(index)"
          :class="
            index == activeTimeIndex ? 'active-timeItem' : 'normal-timeItem'
          "
          class="timeItem"
          v-for="(item, index) in timeList"
          :key="index"
        >
          {{ item.day }}<br />
          {{ item.date }}
        </div>
      </div>
      <div class="float-l timeLine"></div>
      <div class="float-l paperText">
        <div
          @click="chooseActivePaper(index)"
          :class="
            index == activePaperIndex ? 'active-paperItem' : 'normal-paperItem'
          "
          class="paperItem"
          v-for="(item, index) in paperList"
          :key="index"
        >
          <span
            ><span>{{ item.day }}</span
            ><span style="font-size: 12px">分</span></span
          >
        </div>
      </div>
      <div class="float-r">
        <div class="right-btn clearfix">
          <span class="float-l paper-name">2020南湖实验三校联考卷</span>
          <span class="float-r paper-analyse">试卷题型得分分析</span>
          <span class="float-r paper-line"></span>
          <span class="float-r paper-report">学生成绩单</span>
        </div>
        <div id="responseCharts"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTimeIndex: 0,
      activePaperIndex: 0,
      timeList: [
        { day: "星期一", date: "11月28日" },
        { day: "星期一", date: "11月28日" },
        { day: "星期一", date: "11月28日" },
      ],
      paperList: [{ day: "85" }, { day: "85" }, { day: "85" }],
    };
  },
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    chooseActiveTime(i) {
      this.activeTimeIndex = i;
    },
    chooseActivePaper(i) {
      this.activePaperIndex = i;
    },
    drawLine() {
      // let xData2 = [];
      // let seriesData2 = [];
      // let MAX = [];
      // let that = this;
      // let TypeInfoAvgScore = (that.resInfo.TypeInfoAvgScore * 100).toFixed();
      // for (let i = 0; i < that.resInfo.TypeInfoList.length; i++) {
      //   xData2.push(that.resInfo.TypeInfoList[i].TypeName);
      //   var bol = that.resInfo.MinRateGenreName.some(function (element) {
      //     if (element == that.resInfo.TypeInfoList[i].TypeName) {
      //       return element;
      //     }
      //   });
      // }
      var echarts = require("echarts");
      var responseCharts = echarts.init(
        document.getElementById("responseCharts")
      );
      responseCharts.setOption(this.$optionObj.responseOption);
      responseCharts.setOption({});
    },
  },
};
</script>

<style lang="scss" scoped>
.right-long-box {
  width: 1270px;
  height: 250px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 16px 24px 0 0;
  overflow: hidden;
}
.timeText {
  width: 96px;
  height: 250px;
  color: #a2afcc;
  font-size: 14px;
  text-align: center;
  .timeItem {
    margin: 22px 0;
    cursor: pointer;
  }
  .active-timeItem {
    position: relative;
    color: #00bbff;
  }
  .normal-timeItem {
    color: #a2afcc;
    position: relative;
  }
  .normal-timeItem::after {
    content: "";
    width: 9px;
    height: 9px;
    border: solid 1px #a2afcc;
    border-radius: 100%;
    position: absolute;
    top: 12px;
    right: -6px;
    display: inline-block;
  }
  .active-timeItem::after {
    content: "";
    width: 30px;
    height: 40px;
    position: absolute;
    top: -5px;
    right: -15px;
    display: inline-block;
    background: url("../../assets/img/teacher/选中.png") center center no-repeat;
  }
}
.timeLine {
  width: 1px;
  height: 250px;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.1)
  );
}
.paperText {
  width: 60px;
  height: 250px;
  margin-left: 13px;
  .paperItem {
    width: 46px;
    height: 50px;
    line-height: 65px;
    font-family: "Oswald";
    background: url("../../assets/img/teacher/试卷_未选.png") center center
      no-repeat;
    margin: 10px auto;
    text-align: center;
    cursor: pointer;
    color: #0078ff;
    font-size: 16px;
  }
  .active-paperItem {
    background: url("../../assets/img/teacher/试卷_选中.png") center center
      no-repeat;
    position: relative;
  }
  .normal-paperItem {
    position: relative;
  }
  .normal-paperItem::after {
    content: "";
  }
  .active-paperItem::after {
    content: "";
    width: 30px;
    height: 40px;
    position: absolute;
    top: 6px;
    right: -30px;
    display: inline-block;
    background: url("../../assets/img/teacher/选中.png") center center no-repeat;
  }
}
.right-btn {
  height: 18px;
  .paper-name {
    font-weight: bold;
    font-size: 14px;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .paper-line {
    display: inline-block;
    width: 1px;
    height: 20px;
    background-image: linear-gradient(
      0deg,
      #ffffff 0%,
      #ffffff 50%,
      #ffffff 100%
    );
    opacity: 0.3;
  }
  .paper-line {
    display: inline-block;
    width: 1px;
    height: 20px;
    background-image: linear-gradient(
      0deg,
      rgba(255,255,255, 0.3) 0%,
      rgba(255,255,255, 1) 50%,
      rgba(255,255,255, 0.3) 100%,
    );
    margin: 0 10px;
  }
  .paper-analyse,
  .paper-report {
    height: 18px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
    padding-left: 20px;
    background: url("../../assets/img/teacher/查看_默认.png") center left
      no-repeat;
  }
  .paper-analyse:hover,
  .paper-report:hover {
    color: rgba(255,255,255, 1);
    background: url("../../assets/img/teacher/查看_悬停.png") center left
      no-repeat;
  }
}
#responseCharts {
  width: 1050px;
  height: 210px;
}
</style>