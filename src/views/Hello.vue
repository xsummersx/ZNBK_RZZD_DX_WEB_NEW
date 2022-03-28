<script setup>
  import { useUserStore } from '@/store/modules/user';
  const store = useUserStore();
  console.log(store.name);
  const setName = () => {
    store.setName('变化后的名字');
    console.log(store.name);
  };
</script>

<template>
  <div>
    <p>
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>
    <HelloWorld msg="message" />
    <HelloJsx msg="message" />
    <button @click="setName">改名字</button>
  </div>
</template>

<style scoped>
  a {
    color: #42b983;
  }
</style>
