<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:25:48
 * @LastEditTime: 2021-12-09 10:28:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，教师=》高考预估成绩
-->
<template>
  <div class="left-Content-Box">
    <span class="title">高考预估成绩</span>
    <div class="main">
      <div class="left">
        <div class="fu-progress">
          <div class="fu-inner">
            <div class="fu-percent percent">
              <span
                ><span class="number">{{ info.ClassAvgScore }}</span
                >分</span
              >
              <br />
              <span>满分:{{ info.FullScore }}分</span>
            </div>
            <div class="water"></div>
            <div class="glare"></div>
          </div>
        </div>
      </div>
      <div class="right">
        <span class="quantity" :class="status === 'up' ? 'up' : 'down'"
          >{{ comparedData }}<span class="char">分</span></span
        >
        <span>较上周</span>
      </div>
    </div>
    <div class="bottom">
      <span class="bottomTitle" v-if="userType === 'grade'"
        >班级排行榜<span class="top2">TOP2</span></span
      >
      <span class="bottomTitle" v-if="userType === 'teacher'"
        >学生排行榜<span class="top2">TOP2</span></span
      >
      <div class="content">
        <span>·{{ theFirst.StudentName + " " + theFirst.PredictedScore }}分</span>
        <span>·{{ theSecond.StudentName + " " + theSecond.PredictedScore }}分</span>
      </div>
    </div>
  </div>
</template>

<script>
import { GetClassPredictedScore } from "@/api/gradeTeacher/teacher.js";

export default {
  data() {
    return {
      // status: "up",
      userType: "teacher",
      info: {
        ClassAvgScore: 80,
        FullScore: 120,
        ChangeScore: 10,
        StuScoreList: [
          {
            StudentID: "1201046",
            StudentName: "江南",
            CourseClassID: "90EC6CF6-945C-4710-AFB8-96BC6CC0A549",
            SchoolID: "S2-000054-B4BC",
            PredictedScore: 80,
            FullScore: 120,
          },
          {
            StudentID: "1201049",
            StudentName: "南疆",
            CourseClassID: "90EC6CF6-945C-4710-AFB8-96BC6CC0A549",
            SchoolID: "S2-000054-B4BC",
            PredictedScore: 60,
            FullScore: 120,
          },
          {
            StudentID: "1201051",
            StudentName: "牛奶人",
            CourseClassID: "90EC6CF6-945C-4710-AFB8-96BC6CC0A549",
            SchoolID: "S2-000054-B4BC",
            PredictedScore: 70,
            FullScore: 120,
          },
        ],
      },
    };
  },
  created() {
    this.info.StuScoreList.sort((a, b) => {
      return b.PredictedScore - a.PredictedScore;
    });
  },
  computed: {
    theFirst: function () {
      return this.info.StuScoreList[0];
    },
    theSecond: function () {
      return this.info.StuScoreList[1];
    },
    comparedData: function () {
      if (this.info.ChangeScore < 0) {
        return Math.abs(this.info.ChangeScore);
      } else {
        return this.info.ChangeScore;
      }
    },
    status: function () {
      if (this.info.ChangeScore < 0) {
        return "down";
      } else {
        return "up";
      }
    },
  },
  // watch: {
  //   info: function () {
  //     this.info.StuScoreList.sort((a, b) => {
  //       return b.PredictedScore - a.PredictedScore;
  //     });
  //   },
  // },
  methods: {
    changePercent(waterPercent) {
      this.$(".water").css({
        top: 100 - waterPercent + "%",
      });
    },
    init() {
      let data;
      GetClassPredictedScore(data).then((res) => {
        this.info = res.Data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.left-Content-Box {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 400px;
  height: 308px;
  background: url(~@/assets/img/teacher/认知平均分_bg.png) center center no-repeat;
  .title {
    margin-top: 6px;
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
  }
}
.number {
  font-size: 32px;
  font-family: Oswald;
}
.main {
  width: 80%;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  margin: 30px 0;
  justify-content: space-around;
  .left {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 122px;
    // background: url(~@/assets/img/teacher/总量表达.png) center center no-repeat;
  }
  .right {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 122px;
    background: url(~@/assets/img/teacher/较上周底座.png) center center no-repeat;
    .quantity {
      padding-left: 12px;
      font-size: 18px;
      margin-bottom: 5px;
      font-family: ArialMT;
    }
    .up {
      background: url(~@/assets/img/teacher/升.png) 0px center no-repeat;
      color: #60ff60;
    }
    .down {
      background: url(~@/assets/img/teacher/降.png) 0px center no-repeat;
      color: #ff0000;
    }
    .char {
      font-size: 12px;
    }
  }
}
.bottom {
  margin: 10px 0 0 0;
  width: 368px;
  height: 60px;
  padding-top: 5px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  border-radius: 4px;
  .bottomTitle {
    background: url(~@/assets/img/teacher/标题小标签.png) 0px center no-repeat;
    padding-left: 10px;
    font-size: 16px;
    font-family: YouSheBiaoTiHei;
    color: #00aaff;
    .top2 {
      font-size: 12px;
      color: #0088cc;
    }
  }
  .content {
    display: flex;
    display: -webkit-flex;
    margin: 5px 0 0 0;
    justify-content: space-around;
    // span {
    // flex-grow: 1;
    // }
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
.fu-progress {
  position: relative;
  width: 114px;
  height: 114px;
  border: 5px solid rgba(65, 205, 62, 0.4);
  border-radius: 50% !important;
  .fu-inner {
    position: absolute;
    overflow: hidden;
    z-index: 2;
    width: 104px;
    height: 104px;
    border-radius: 50% !important;

    .water {
      position: absolute;
      z-index: 1;
      background: rgba(45, 184, 42, 1);
      width: 200%;
      height: 200%;

      transform: translateZ(0);
      -webkit-transform: translateZ(0);

      transition: all 1s ease !important;
      -webkit-transition: all 1s ease !important;

      top: 55%;
      left: -50%;
      border: 1px solid transparent;
      border-radius: 40% !important;
      animation-duration: 10s;
      animation-name: spin;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }

    .glare {
      position: absolute;
      top: -120%;
      left: -120%;
      z-index: 5;
      width: 200%;
      height: 200%;
      transform: rotate(45deg);
      background: #ffffff;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
    }

    .fu-percent {
      position: absolute;
      top: 15px;
      width: 100%;
      height: 100%;
      z-index: 99;
      text-align: center;
    }
  }
}
</style>
