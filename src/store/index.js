/*
 * @Author: 共同负责
 * @Date: 2021-11-24 09:50:11
 * @LastEditTime: 2021-12-01 15:21:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 由柳欢负责，根据getUserInfo接口，设定状态参数
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "123",
    UserInfo:{},
    HeadDetailInfo:{},
  },
  mutations: {
    updateUserData(state,data){
      state.UserInfo = data;
    }
  },
  actions: {},
  modules: {},
});
