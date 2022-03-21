import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      name: '名字',
    };
  },
  actions: {
    setName(item) {
      this.name = item;
    },
  },
});
