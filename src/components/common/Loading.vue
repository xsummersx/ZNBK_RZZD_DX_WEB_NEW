<!--
 * @Author: your name
 * @Date: 2022-01-18 08:58:48
 * @LastEditTime: 2022-01-18 08:58:48
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\common\Loading.vue
-->
<!--
 * @Author: 柳欢
 * @Date: 2021-06-23 19:45:59
 * @LastEditors: 柳欢
 * @LastEditTime: 2021-07-09 11:49:02
 * @Description: 小的动画
-->
<template>
  <div class="rzzdInfoLoading">
    <div class="rzzdInfoLoadingDiv">
      <div
        class="rzzdInfoLoading1"
        :style="{
          backgroundSize: backSize,
        }"
      ></div>
      <div
        class="rzzdInfoLoading2"
        :style="{
          backgroundSize: backSize,
        }"
      ></div>
      <div
        class="rzzdInfoLoading3"
        :style="{
          backgroundSize: backSize,
        }"
      ></div>
    </div>
    <!-- <p>正在加载{{ name }}认知质量评估数据...</p> -->
  </div>
</template>
<script>
export default {
  props: {
    backSize: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
.rzzdInfoLoading {
  //   position: absolute;
  //   width: 422px;
  // height: 691px;
  //   top: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #4fcbff;
  font-size: 16px;
}
.rzzdInfoLoadingDiv {
  width: 200px;
  height: 200px;
  position: relative;
  margin-bottom: 16px;
}
.rzzdInfoLoading1,
.rzzdInfoLoading2,
.rzzdInfoLoading3 {
  width: 200px;
  height: 200px;
  position: absolute;
  background-size: 50%;
  background-size: 50%;
  background-size: 50%;
}
.rzzdInfoLoading1 {
  background: url("../../assets/img/common/顺时针.png") no-repeat center center;
  animation: rateLoading 2s linear infinite;
}
.rzzdInfoLoading2 {
  background: url("../../assets/img/common/静止.png") no-repeat center center;
}
.rzzdInfoLoading3 {
  background: url("../../assets/img/common/逆时针.png") no-repeat center center;
  animation: rateLoading1 2s linear infinite;
}
@keyframes rateLoading {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
@keyframes rateLoading1 {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}
</style>
