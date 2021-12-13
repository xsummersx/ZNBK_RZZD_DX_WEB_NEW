<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-09 11:15:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教师，语法认知
-->
<template>
  <div class="right-small-box">
    <div class="box-title clearfix">
      <span class="float-l title">语法认知</span>
      <span class="float-r check-icon"><i></i>薄弱语法诊断</span>
    </div>
    <div class="main">
      <div class="left">
        <div class="scoreRate">
          <span>语法平均答对率</span>
          <span class="rate"><span class="number">98</span>%</span>
        </div>
      </div>
      <div class="right">
        <div class="chart"></div>
        <span>语法掌握程度</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main {
  height: 80%;
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
  .number {
    font-family: Oswald;
    font-size: 28px;
    color: #4bf3f9;
  }
  .left {
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    .scoreRate {
      width: 201px;
      height: 74px;
      background: url(~@/assets/img/teacher/平均答对率.png) 0px center no-repeat;
      padding-left: 90px;
      .rate {
        display: block;
        margin-top: 8px;
        color: #4bf3f9;
      }
    }
  }
  .right {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    .chart {
      width: 188px;
      height: 80px;
      background: url(~@/assets/img/teacher/底座.png) center center no-repeat;
      margin-bottom: 10px;
    }
  }
}
</style>
