<!--
 * @Author: 吴涛
 * @Date: 2021-11-29 09:29:13
 * @LastEditTime: 2021-11-30 14:00:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 吴涛=》登录失效的页面
-->

<template>
  <div class="error">
    <div class="err_container">
      <p class="err_text1">o(︶︿︶)o页面掉线了</p>
      <p class="err_text2">可能您已在其它页面登出，或者您的账号在其它机器上登录了</p>
      <p class="err_text3">
        如果需要继续访问，您可以尝试以下操作
        <button @click="toLogin()">重新登录</button>
        <!-- 或
        <a href="javascript:location.reload()">刷新页面</a> -->
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  mounted() {},
  methods: {
    toLogin() {
      window.open(this.$baseUrl, "_self");
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  width: 100vw;
  height: 100vh;
  background: radial-gradient(#fff 500px, #b8b8b8);
  display: flex;
  justify-content: center;
  align-items: center;
  .err_container {
    width: 460px;
    height: 234px;
    margin: 0 auto;
    text-align: left;
  }
  .err_text1 {
    margin-bottom: 28px;
    color: #808b94;
    font-size: 46px;
  }
  .err_text2 {
    font-size: 12px;
    color: #808b94;
  }
  .err_text3 {
    font-size: 12px;
    color: #333333;
    font-weight: bold;
    margin-top: 40px;
    margin-bottom: 0px;
    button {
      cursor: pointer;
      width: 90px;
      height: 32px;
      margin: 16px 8px 0;
      outline: none;
      border: none;
      border: 1px solid #003253;
      border-radius: 3px;
      font-size: 14px;
      color: #fff;
      background-color: #0099ff;
      box-shadow: 2px 5px 5px -2px #6cc4ff inset;
    }
    a {
      color: #0099ff;
      margin-left: 10px;
      font-size: 14px;
    }
  }
}
</style>
