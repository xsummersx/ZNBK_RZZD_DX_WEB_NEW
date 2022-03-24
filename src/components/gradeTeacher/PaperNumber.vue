<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:22:09
 * @LastEditTime: 2022-03-24 11:10:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长、教师=》累计试卷作答份数
-->
<template>
  <div class="left-Content-Box">
    <span class="title">累计作答试卷</span>
    <div class="main" v-if="!loading">
      <div class="left">
        <span
          ><span class="number">{{ count.toFixed(0) }}</span
          ><span class="charChar">份</span></span
        >
        <span class="totalNum">总量</span>
      </div>
      <CompareLastWeek :ChangeScore="info.ChangePaperCount" type="2" />
    </div>
    <Top2
      v-if="!loading"
      :theFirstStu="theFirst.StuName"
      :theFirstPre="theFirst.PaperCount"
      :theFirstClass="theFirst.CourseClassName"
      :theFirstAvg="theFirst.ClassPaperCount"
      :theSecondStu="theSecond.StuName"
      :theSecondPre="theSecond.PaperCount"
      :theSecondClass="theSecond.CourseClassName"
      :theSecondAvg="theSecond.ClassPaperCount"
      :isScore="false"
    />
    <Loading v-if="loading" style="margin-top: 25px" />
  </div>
</template>

<script>
import { GetClassPaperNum, GetGradePaperNum } from "@/api/gradeTeacher/left.js";
import gsap from "gsap";
export default {
  data() {
    return {
      info: {
        ClassTotalPaperCount: 0,
        ChangePaperCount: 0,
        StuPaperCountList: [
          {
            StuName: "无",
            PaperCount: 0,
          },
          {
            StuName: "无",
            PaperCount: 0,
          },
        ],
        ClassList: [
          {
            CourseClassName: "无",
            ClassPaperCount: 0,
          },
          {
            CourseClassName: "无",
            ClassPaperCount: 0,
          },
        ],
        AvgCountPaperInClassAcc: 0,
      },
      count: 0,
      loading: true,
    };
  },
  created() {
    this.init();
  },
  components: {
    CompareLastWeek: () => import("../common/CompareLastWeek.vue"),
    Top2: () => import("../common/Top2.vue"),
    Loading: () => import("@/components/common/Loading.vue"),
  },
  computed: {
    isTeacher: function () {
      return this.$route.name === "teacherRZZD";
    },
    // count: function () {
    // 	if (this.isTeacher) {
    // 		return this.info.ClassTotalPaperCount;
    // 	} else {
    // 		return this.info.AvgCountPaperInClassAcc;
    // 	}
    // },
    theFirst: function () {
      if (this.isTeacher) {
        return this.info.StuPaperCountList[0];
      } else {
        return this.info.ClassList[0];
      }
    },
    theSecond: function () {
      if (this.isTeacher) {
        return this.info.StuPaperCountList[1];
      } else {
        return this.info.ClassList[1];
      }
    },
  },
  methods: {
    init() {
      let data = { ...this.$store.state };
      delete data.UserInfo;
      if (this.$route.name === "teacherRZZD") {
        // 教师
        GetClassPaperNum(data)
          .then((res) => {
            this.info = res.Data;
            if (res.Data.StuPaperCountList.length === 0) {
              this.info.StuPaperCountList = [
                {
                  StuName: "无",
                  PaperCount: 0,
                },
                {
                  StuName: "无",
                  PaperCount: 0,
                },
              ];
            }
            setTimeout(() => {
              this.loading = false;
              gsap.to(this, {
                duration: 1.5,
                count: res.Data.ClassTotalPaperCount,
              });
            }, 400);
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        // 年级组长
        GetGradePaperNum(data)
          .then((res) => {
            this.info = res.Data;
            if (res.Data.ClassList.length === 0) {
              this.info.ClassList = [
                {
                  CourseClassName: "无",
                  ClassPaperCount: 0,
                },
                {
                  CourseClassName: "无",
                  ClassPaperCount: 0,
                },
              ];
            }
            setTimeout(() => {
              this.loading = false;
              gsap.to(this, {
                duration: 1.5,
                count: res.Data.AvgCountPaperInClassAcc,
              });
            }, 400);
          })
          .catch(() => {
            this.loading = false;
          });
      }
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
    background: url(~@/assets/img/teacher/总量表达_iSpt.png) center center no-repeat;
    .number {
      font-size: 32px;
      font-family: Oswald;
    }
    .charChar {
      font-size: 14px;
      font-weight: bold;
    }
    .totalNum {
      font-size: 12px;
    }
  }
}
</style>
