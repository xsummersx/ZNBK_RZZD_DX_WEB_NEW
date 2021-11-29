<!--
 * @Description: 错误界面
 * @Author: 姚泽毅
 * @Date: 2021-09-05 11:11:29
 * @LastEditTime: 2021-09-22 21:02:59
-->
<template>
  <div class="error">
    <div class="err_container">
      <p class="err_text1">o(︶︿︶)o页面掉线了</p>
      <p class="err_text2">可能您已在其它页面登出，或者您的账号在其它机器上登录了</p>
      <p class="err_text3">
        如果需要继续访问，您可以尝试以下操作
        <button @click="toLogin()">重新登录</button>
        或
        <a href="javascript:location.reload()">刷新页面</a>
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
