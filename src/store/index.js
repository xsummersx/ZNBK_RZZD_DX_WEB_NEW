/*
 * @Author: 共同负责
 * @Date: 2021-11-24 09:50:11
 * @LastEditTime: 2021-12-22 16:30:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 由柳欢负责，根据getUserInfo接口，设定状态参数
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    UserInfo:{},
    HeadDetailInfo:{},
    UserType: -1,
    token: "",
    SchoolID:"",
    CourseClassID:"",
    GlobalGrade:"",
    StageNo:"",
    ZsdArea:"",
    TID:"",
    CountyID:"",
    CityID:"",
    ProvinceID:"",
  },
  mutations: {
    updateUserData(state,data){
      state.UserInfo = data;
    },
    updateSchoolID(state,data){
      state.SchoolID = data;
    },
    updatetoken(state,data){
      state.token = data;
    },
    updateCourseClassID(state,data){
      state.CourseClassID = data;
    },
    updateGlobalGrade(state,data){
      state.GlobalGrade = data;
    },
    updateStageNo(state,data){
      state.StageNo = data;
    },
    updateProvinceID(state,data){
      state.ProvinceID = data;
    },
    updateCityID(state,data){
      state.CityID = data;
    },
    updateCountyID(state,data){
      state.CountyID = data;
    },
    updateTID(state,data){
      state.TID = data;
    }
  },
  actions: {
    
    updateUserData(state,data){
      state.UserInfo = data;
    }
  },
  modules: {},
});
