<!--
 * @Author: your name
 * @Date: 2022-03-21 13:46:03
 * @LastEditTime: 2022-03-28 11:51:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_dx_web_new\src\App.vue
-->
<script setup>
  const color = '#ddd';
  const router = useRouter();
  const toPage = (item) => {
    router.push(item);
  };
</script>
<script>
  export default {
    name: 'App',
  };
</script>

<template>
  <div class="flexCenter flex-col h-full w-full">
    <el-button @click="toPage('/')">to home</el-button>
    <el-button class="btn" @click="toPage('/hello')">to hello</el-button>
    <button class="btn" @click="toPage('/jsx')">to jsx</button>
    <button class="btn" @click="toPage('/chart')">to chart</button>
    <el-button class="btn" @click="toPage('/request')">to request</el-button>
    当前路径：{{ $route.path }}
    <div class="test">111</div>
    <RouterView />
    <!-- RouterView结合transition使用,!!transition元素只能作为单个元素/组件的过度效果 -->
    <!-- <RouterView v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </RouterView> -->
  </div>
</template>

<style lang="scss">
  #app {
    height: 100vh;
    background-color: #ddd;
  }

  .test {
    width: 100px;
    height: 100px;
    color: v-bind(color);
    background-color: rgb(0 0 0 / 10%);
    @apply flex;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
