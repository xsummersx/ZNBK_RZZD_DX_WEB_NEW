<!--
 * @Author: 柳欢
 * @Date: 2021-07-30 14:36:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-29 10:52:21
 * @Description: 
-->
<template>
  <div></div>
</template>
<script>
import { getUserInfo } from "./../api/head/getUserInfo.js";
export default {
  data() {
    return {};
  },
  mounted() {
    getUserInfo("1").then((res) => {
      console.log(res);
    });
  },
};
</script>
