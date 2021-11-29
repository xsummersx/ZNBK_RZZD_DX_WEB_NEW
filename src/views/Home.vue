<!--
 * @Author: Home页面
 * @Date: 2021-11-29 09:20:26
 * @LastEditTime: 2021-11-29 09:23:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: Home页面，用于获取token用户身份的基础信息
-->
<template>
  <div>
    <router-view v-if="openView"></router-view>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      openView: false, //是否开启主页面内容
    };
  },
  created() {
    //请求getUserInfo
  },
};
</script>
