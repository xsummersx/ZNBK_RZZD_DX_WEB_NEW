<template>
  <div v-loading="load">加载？</div>
  <div>data: {{ data?.Data }}</div>
  <!-- <button @click="reload">重新加载</button> -->
</template>

<script setup>
  import { getUserInfo } from '@/api';

  const token = ref('36db3721-f2ad-4389-94ee-db729d20a43f');
  const getPromise = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          Code: 200,
          Data: 'Data1',
          Message: 'message1',
        });
      }, 1000);
    });
  };
  // const { data, loading: load, error } = useRequest(getUserInfo({ token: token.value }));
  const { data, loading: load, error } = useRequest(getPromise);
</script>

<style lang="scss" scoped></style>
