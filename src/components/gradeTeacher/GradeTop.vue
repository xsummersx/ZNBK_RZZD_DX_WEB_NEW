<!--
 * @Author: 柳欢
 * @Date: 2021-11-30 14:51:43
 * @LastEditTime: 2021-12-28 10:23:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长的重点班级，和认知对比分析
-->
<template>
  <div>
    <ArrowTitle titleStr="重点关注班级"></ArrowTitle>
    <div class="clearfix">
      <StudentBox
        class="float-l one-box"
        :stulist="propList1"
        arrIndex="1"
        titleStr="作答试卷较少班级"
      ></StudentBox>
      <StudentBox
        class="float-l"
        :stulist="propList2"
        arrIndex="2"
        titleStr="认知成绩较差班级"
      ></StudentBox>
      <StudentBox
        class="float-l three-box"
        :stulist="propList3"
        arrIndex="3"
        titleStr="退步较大班级"
      ></StudentBox>
    </div>
    <div></div>
  </div>
</template>

<script>
import { GetGradeSpecialFocusClass_V3 } from "@/api/gradeTeacher/right";
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
      SchoolID: this.$store.state.SchoolID,
      CourseClassID: this.$store.state.CourseClassID,
      TID: this.$store.state.TID,
      token: this.$store.state.token,
      GlobalGrade: this.$store.state.GlobalGrade,
      ZsdArea: this.$store.state.ZsdArea,
    };
    GetGradeSpecialFocusClass_V3(params).then((res) => {
      this.resInfo = res.Data;
      this.changeToSame(this.resInfo.PaperList, 1);
      this.changeToSame(this.resInfo.IndexList, 2);
      this.changeToSame(this.resInfo.IndexList, 3);
    });
  },
  created() {},
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
            Rank: arr[i].Rank,
            Name: arr[i].CourseClassName,
            Num: arr[i].ClassPaperCount,
          };
          this.propList1.push(arrObj);
        } else if (index == 2) {
          arrObj = {
            Rank: arr[i].Rank,
            Name: arr[i].CourseClassName,
            Num: arr[i].ClassAvgIndex,
          };
          this.propList2.push(arrObj);
        } else {
          arrObj = {
            Rank: arr[i].Rank,
            Name: arr[i].CourseClassName,
            Num: arr[i].ChangeRank,
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
</style>
