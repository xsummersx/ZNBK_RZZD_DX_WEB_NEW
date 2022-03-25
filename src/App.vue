<script setup>
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
    <router-view></router-view>
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
    background-color: rgb(0 0 0 / 10%);
    @apply flex;
  }
</style>
