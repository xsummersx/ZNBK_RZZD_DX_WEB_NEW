<!--
 * @Author: 柳欢
 * @Date: 2021-11-30 14:51:43
 * @LastEditTime: 2021-12-13 14:53:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教师的重点学生，和认知对比分析
-->
<template>
  <div>
    <ArrowTitle titleStr="重点关注学生"></ArrowTitle>
    <div class="clearfix">
      <StudentBox
        class="float-l one-box"
        arrIndex="1"
        :stulist="propList1"
        titleStr="作答试卷较少学生"
      ></StudentBox>
      <StudentBox
        class="float-l"
        arrIndex="2"
        :stulist="propList2"
        titleStr="认知成绩最差学生"
      ></StudentBox>
      <StudentBox
        class="float-l three-box"
        arrIndex="3"
        :stulist="propList3"
        titleStr="退步最大学生"
      ></StudentBox>
    </div>
    <div></div>
  </div>
</template>

<script>
import { GetClassSpecialFocusStudents_V3 } from "@/api/gradeTeacher/right";
export default {
  data() {
    return {
      resInfo: {},
      propList1: [],
      propList2: [],
      propList3: [],
    };
  },
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
    StudentBox: () => import("../common/StudentBox.vue"),
  },
  mounted() {
    let params = {
      token: this.$store.state.token,
      TID: this.$store.state.TID,
      CourseClassID: this.$store.state.CourseClassID,
      SchoolID: this.$store.state.SchoolID,
      GlobalGrade: this.$store.state.GlobalGrade,
      ZsdArea: this.$store.state.ZsdArea,
      StageNo: this.$store.state.StageNo,
    };
    GetClassSpecialFocusStudents_V3(params).then((res) => {
      this.resInfo = res.Data;
      this.changeToSame(this.resInfo.PaperList, 1);
      this.changeToSame(this.resInfo.IndexList, 2);
      this.changeToSame(this.resInfo.RegressList, 3);
    });
  },

  methods: {
    changeToSame(arr, index) {
      for (let i = 0; i < 3; i++) {
        var arrObj = {
          Rank: "",
          Name: "",
          Num: "",
        };
        if (index == 1) {
          arrObj = {
            Rank: arr[i].ClassRank,
            Name: arr[i].StuName,
            Num: arr[i].StuData,
          };
          this.propList1.push(arrObj);
        } else if (index == 2) {
          arrObj = {
            Rank: arr[i].ClassRank,
            Name: arr[i].StuName,
            Num: arr[i].StuData,
          };
          this.propList2.push(arrObj);
        } else {
          arrObj = {
            Rank: arr[i].ClassRank,
            Name: arr[i].StuName,
            Num: arr[i].StuData,
          };
          this.propList3.push(arrObj);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.one-box {
  margin: 0 25px 0 40px;
}
.three-box {
  margin: 0 40px 0 25px;
}
.clearfix {
  height: 90px;
}
</style>
