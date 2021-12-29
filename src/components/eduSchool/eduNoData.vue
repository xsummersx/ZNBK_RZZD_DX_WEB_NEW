<!--
 * @Author: your name
 * @Date: 2021-12-28 10:21:36
 * @LastEditTime: 2021-12-28 11:17:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\eduSchool\eduNoData.vue
-->
<template>
  <div class="noData">
    <div class="item" v-if="noDataType == 0"><i class="icon0"></i><span class="text">暂无学校认知情况数据噢~</span></div>
    <div class="item" v-if="noDataType == 1"><i class="icon1"></i><span class="text">暂无认知成绩分布数据噢~</span></div>
    <div class="item" v-if="noDataType == 2"><i class="icon2"></i><span class="text">暂无认知成绩走势数据噢~</span></div>
    <div class="item" v-if="noDataType == 3"><i class="icon3"></i><span class="text">暂无认知详情数据噢~</span></div>
    <div class="itemBig" v-if="noDataType == 4"><i class="icon4"></i><span class="text">暂无班级认知情况对比分析数据噢~</span></div>
  </div>
</template>
<script>
export default {
  name: "eduNoData",
  props: {
    noDataType: Number,
  },
};
</script>
<style lang="scss" scoped>
.noData {
  overflow: hidden;
  margin: 0 auto;
  .item {
    width: 160px;
    height: 120px;
    margin: 0 auto;
    .icon0 {
      display: block;
      width: 88px;
      height: 88px;
      margin: 0 auto;
      background: url(~@/assets/img/eduSchool/暂无班级认知情况.png) no-repeat center center;
    }
    .icon1 {
      display: block;
      width: 88px;
      height: 88px;
      margin: 0 auto;
      background: url(~@/assets/img/eduSchool/暂无成绩走势.png) no-repeat center center;
    }
    .icon2 {
      display: block;
      width: 88px;
      height: 88px;
      margin: 0 auto;
      background: url(~@/assets/img/eduSchool/暂无学生认知成绩分布数据.png) no-repeat center center;
    }
    .icon3 {
      display: block;
      width: 88px;
      height: 88px;
      margin: 0 auto;
      background: url(~@/assets/img/eduSchool/暂无认知情况详情.png) no-repeat center center;
    }
    .text {
      display: block;
      line-height: 24px;
      color: #fff;
      font-size: 12px;
      text-align: center;
    }
  }
  .itemBig {
    width: 240px;
    height: 160px;
    margin: 0 auto;
    .icon4 {
      display: block;
      width: 197px;
      height: 126px;
      margin: 0 auto;
      background: url(~@/assets/img/eduSchool/暂无认知情况对比分析.png) no-repeat center center;
    }
    .text {
      display: block;
      line-height: 24px;
      color: #fff;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>
