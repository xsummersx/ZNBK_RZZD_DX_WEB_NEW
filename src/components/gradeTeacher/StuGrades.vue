<!--学生端高考预估分-->
<template>
  <div class="left-Content-Box">
    <span class="title">高考预估成绩</span>
    <div class="main" v-if="!loading">
      <Polo :FullScore="info.FullScore" :score="info.PersonScore" />
      <CompareLastWeek :ChangeScore="info.ScoreChange" />
    </div>
    <CompareAndRank
      v-if="!loading"
      :classCompare="info.TrastClassAvgScore"
      :gradeCompare="info.TrastGradeAvgScore"
      :ClassRank="info.ClassRank"
      :GradeRank="info.GradeRank"
    />
    <Loading v-if="loading" style="margin-top: 35px" />
  </div>
</template>

<script>
import { GetStuPredictedScore } from "@/api/stu/left.js";
export default {
  data() {
    return {
      info: {
        PersonScore: 0,
        FullScore: 150,
        ScoreChange: 0,
        TrastClassAvgScore: 0,
        TrastGradeAvgScore: 0,
        ClassRank: 0,
        GradeRank: 0,
      },
      loading: true,
    };
  },
  created() {
    this.init();
  },
  components: {
    CompareLastWeek: () => import("../common/CompareLastWeek.vue"),
    Polo: () => import("../common/Polo.vue"),
    CompareAndRank: () => import("../common/CompareAndRank.vue"),
    Loading: () => import("@/components/common/Loading.vue"),
  },
  computed: {},
  methods: {
    init() {
      let data = {
        token: this.$store.state.token,
        StuID: this.$store.state.StuID,
        CourseClassID: this.$store.state.CourseClassID,
        GlobalGrade: this.$store.state.GlobalGrade,
        SchoolID: this.$store.state.SchoolID,
        TID: this.$store.state.TID,
      };
      GetStuPredictedScore(data)
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
  margin: 30px 0 20px;
  justify-content: space-around;
}
</style>
