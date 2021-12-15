<!--
 * @Author: 柳欢
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-14 15:13:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教师，学习特点
-->
<template>
  <div class="right-small-box">
    <div class="box-title clearfix">
      <span class="float-l title">学习特点</span>
    </div>
    <div class="main">
      <div class="left">
        <div class="masteredCount">
          <span>平均学习时长</span>
          <br />
          <span class="count"> <span class="number">8500</span>个</span>
        </div>
        <div class="masteredCount">
          <span>平均知识掌握速度</span>
          <span class="count"><span class="number">96</span>%</span>
        </div>
      </div>
      <div class="right">
        <div class="pieChart"></div>

        <span>知识掌握速度</span>
      </div>
      <div class="right">
        <div class="pieChart"></div>

        <span>知识掌握速度</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.main {
  height: 80%;
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
  .left {
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: space-around;
    .masteredCount {
      width: 136px;
      height: 74px;
      padding: 0 0 0 10px;
      background: url(~@/assets/img/teacher/list.png) center center no-repeat;
      .count {
        display: block;
        margin-top: 10px;
        color: #4bf3f9;
        font-size: 14px;
        font-weight: bold;
        .number {
          font-family: "Oswald";
          font-size: 28px;
          font-weight: normal;
        }
      }
    }
  }
  .right {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    .pieChart {
      width: 188px;
      height: 80px;
      background: url(~@/assets/img/teacher/底座.png) center center no-repeat;
      margin-bottom: 10px;
    }
  }
}
</style>