<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:22:09
 * @LastEditTime: 2021-12-09 11:20:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长、教师=》累计试卷作答份数
-->
<template>
  <div class="left-Content-Box">
    <span class="title">累计作答试卷</span>
    <div class="main">
      <div class="left">
        <span
          ><span class="number">{{ info.ClassTotalPaperCount }}</span
          >份</span
        >
        <span>总量</span>
      </div>
      <div class="right">
        <span class="quantity" :class="status === 'up' ? 'up' : 'down'"
          >{{ comparedData }}<span class="char">份</span></span
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
        <span>·{{ theFirst.StuName + " " + theFirst.PaperCount }}份</span>
        <span>·{{ theSecond.StuName + " " + theSecond.PaperCount }}份</span>
      </div>
    </div>
  </div>
</template>

<script>
import { GetClassPaperNum } from "@/api/gradeTeacher/teacher.js";
export default {
  data() {
    return {
      // status: "down",
      userType: "teacher",
      info: {
        ClassTotalPaperCount: 500,
        ChangePaperCount: -12,
        StuPaperCountList: [
          {
            Index: 13,
            StuID: "1201054",
            StuPhotoPath: null,
            StuName: "1201054",
            PaperCount: 1,
            PaperAvgRate: 0.5833333,
            ClassRank: 3,
            GradeRank: 3,
          },
          {
            Index: 13,
            StuID: "1201057",
            StuPhotoPath: null,
            StuName: "张青青",
            PaperCount: 3,
            PaperAvgRate: 0.5833333,
            ClassRank: 3,
            GradeRank: 3,
          },

          {
            Index: 13,
            StuID: "1201055",
            StuPhotoPath: null,
            StuName: "卢倩峰",
            PaperCount: 2,
            PaperAvgRate: 0.5833333,
            ClassRank: 3,
            GradeRank: 3,
          },
        ],
      },
    };
  },
  created() {
    this.info.StuPaperCountList.sort((a, b) => {
      return b.PaperCount - a.PaperCount;
    });
  },
  computed: {
    theFirst: function () {
      return this.info.StuPaperCountList[0];
    },
    theSecond: function () {
      return this.info.StuPaperCountList[1];
    },
    comparedData: function () {
      if (this.info.ChangePaperCount < 0) {
        return Math.abs(this.info.ChangePaperCount);
      } else {
        return this.info.ChangePaperCount;
      }
    },
    status: function () {
      if (this.info.ChangePaperCount < 0) {
        return "down";
      } else {
        return "up";
      }
    },
  },
  // watch: {
  //   info: function () {
  //     this.info.StuPaperCountList.sort((a, b) => {
  //       return b.PaperCount - a.PaperCount;
  //     });
  //   },
  // },
  methods: {
    init() {
      let data;
      GetClassPaperNum(data).then((res) => {
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
  width: 400px;
  height: 278px;
  // background: url("../../assets/img/teacher/累计作答试卷_bg.png") center center no-repeat;
  background: url(~@/assets/img/teacher/累计作答试卷_bg.png) center center no-repeat;
  .title {
    margin-top: 6px;
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
  }
}
.main {
  width: 80%;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  margin: 30px 0 0 0;
  justify-content: space-around;
  .left {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 122px;
    background: url(~@/assets/img/teacher/总量表达.png) center center no-repeat;
    .number {
      font-size: 32px;
      font-family: Oswald;
    }
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
</style>
