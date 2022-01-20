<!--
 * @Author: 柳欢
 * @Date: 2021-12-29 09:05:28
 * @LastEditTime: 2021-12-29 09:05:28
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\studentRZZD.vue
-->
<template>
  <div class="right-small-Box">
    <div class="box-title clearfix">
      <span class="float-l title">学习特点</span>
    </div>
    <div v-show="!showLoading">
      <div class="study-box1">
        <div class="study-box1"></div>
        <div class="study-box2"></div>
      </div>

      <div class="study-box2">
        <div class="study-box">学生学习时长</div>
        <div class="study-box">学生知识掌握速度</div>
      </div>

      <div class="study-box3">
        <div class="study-box yellowFont">
          <span>{{ resInfo.PerAvgTime.toFixed(2) }}</span
          >H
        </div>
        <div class="study-box BlueFont">
          <span>{{ resInfo.PerAvgSpeed }}</span>
        </div>
      </div>
    </div>
    <Loading
      v-show="showLoading"
      style="width: 360px; height: 205px"
      backSize="80%"
    ></Loading>
  </div>
</template>

<script>
import { GetStuStudyFeature_V3 } from "../../api/student/right";
import Loading from "../common/Loading.vue";
export default {
  data() {
    return {
      resInfo: {
        PerAvgTime: 0,
      },
      showLoading: true,
    };
  },
  components: {
    Loading,
  },
  methods: {
    GetStuStudyFeature_V3() {
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        StuID: this.$store.state.StuID,
      };
      GetStuStudyFeature_V3(params).then((res) => {
        this.showLoading = false;
        this.resInfo = res.Data;
      });
    },
  },
  mounted() {
    this.GetStuStudyFeature_V3();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/js/dialog/colorGlobal.scss";
@import "../../assets/js/dialog/elementReset_Dialog.scss";
.right-small-Box {
  display: inline-block;
  width: 410px;
  height: 260px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px 0px 4px 4px;
  margin-top: 20px;
  padding: 18px 20px 0 30px;
}
.study-box1,
.study-box2,
.study-box3 {
  display: flex;
  margin: 10px 0 0 0;
  .study-box,
  .study-box1,
  .study-box2 {
    flex: 1;
    width: 110px;
    height: 128px;
    text-align: center;
  }
  .study-box {
    height: 20px;
  }
  .yellowFont {
    color: #f7be37;
    span {
      font-family: "Oswald";
      font-size: 28px;
    }
  }
  .BlueFont {
    font-family: "Oswald";
    font-size: 28px;
    color: #4bf3f9;
  }
  .study-box1 {
    background: url("../../assets/img/student/学生学习时长.png") center center no-repeat;
  }
  .study-box2 {
    background: url("../../assets/img/student/学生知识掌握速度.png") center center
      no-repeat;
  }
}
.study-box3 {
  margin: 0;
  .study-box {
    height: 36px;
  }
}
</style>
