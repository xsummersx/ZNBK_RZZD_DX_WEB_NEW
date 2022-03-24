<!--
 * @Author: 汤宇昕
 * @FilePath: 学生端认知平均分
-->
<template>
  <div class="left-Content-Box">
    <span class="title">认知平均分</span>
    <div class="main" v-if="!loading">
      <Ring :FullIndex="info.FullIndex" :avgIndex="info.PersonIndex" />
      <Middle :level="info.CognitiveGradeName.substring(0, 1)" />
      <CompareLastWeek :ChangeScore="info.IndexChange" />
    </div>
    <CompareAndRank
      v-show="!loading"
      :classCompare="info.TrastClassAvgIndex"
      :gradeCompare="info.TrastGradeAvgIndex"
      :ClassRank="info.ClassRank"
      :GradeRank="info.GradeRank"
    />
    <div class="foot" v-show="!loading">
      <span class="btn" @click="openTrend()">认知成绩走势</span>
    </div>
    <Loading v-if="loading" style="margin-top: 35px" />
    <el-dialog
      :title="TitleDis"
      :visible.sync="dialogTrend"
      :close-on-click-modal="false"
      width="440px"
      top="0vh"
    >
      <div class="DisContent">
        <ScoreTrend></ScoreTrend>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetStuCognitiveIndex } from "@/api/stu/left.js";
export default {
  data() {
    return {
      info: {
        CognitiveGradeName: "C+",
        FullIndex: 0,
        PersonIndex: 0,
        IndexChange: 0,
        TrastClassAvgIndex: 0,
        TrastGradeAvgIndex: 0,
        ClassRank: 0,
        GradeRank: 0,
      },
      // isShow: true,
      TitleDis: "认知成绩分布图",
      dialogTrend: false, //认知成绩走势弹窗
      loading: true,
    };
  },
  computed: {},
  created() {
    this.init();
  },
  components: {
    CompareLastWeek: () => import("../common/CompareLastWeek.vue"),
    Ring: () => import("../common/Ring.vue"),
    CompareAndRank: () => import("../common/CompareAndRank.vue"),
    Middle: () => import("../common/Middle.vue"),
    ScoreTrend: () => import("../eduSchool/ScoreTrend.vue"),
    Loading: () => import("@/components/common/Loading.vue"),
  },
  mounted() {},
  methods: {
    init() {
      let data = {
        token: this.$store.state.token,
        StuID: this.$store.state.StuID,
        CourseClassID: this.$store.state.CourseClassID,
        GlobalGrade: this.$store.state.GlobalGrade,
        SchoolID: this.$store.state.SchoolID,
        TID: this.$store.state.TID,
        ZsdArea: this.$store.state.ZsdArea,
        StageNo: this.$store.state.StageNo,
      };
      GetStuCognitiveIndex(data)
        .then((res) => {
          if (res.Data != null) {
            this.info = res.Data;
          }
          setTimeout(() => {
            this.loading = false;
          }, 400);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //打开认知成绩走势
    openTrend() {
      this.dialogTrend = true;
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
.main {
  width: 80%;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  margin: 20px 0 -5px 0;
  justify-content: space-around;
  .right {
    margin-left: -32px;
  }
}
.foot {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  margin: auto 0;
  width: 90%;
  .btn {
    // width: 17px;
    height: 18px;
    padding-left: 20px;
    margin-right: 4px;
    vertical-align: middle;
    background: url(~@/assets/img/teacher/查看_默认.png) 0px center no-repeat;
    color: #ddd;
    cursor: pointer;
    &:hover {
      color: #fff;
      background: url(~@/assets/img/teacher/查看_悬停.png) 0px center no-repeat;
    }
  }
}
</style>
