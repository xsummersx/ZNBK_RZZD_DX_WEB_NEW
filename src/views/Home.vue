<template>
  <div>home</div>
</template>

<script setup>
  const testFun = () => {
    console.log('out demo');
  };
  onMounted(() => {
    testFun();
    console.log('home home home');
    console.log(import.meta.env.VITE_APP_BASE_API);
  });
</script>

<style lang="scss" scoped></style>
