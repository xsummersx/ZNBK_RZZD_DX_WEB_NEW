/*
 * @Author: 共同负责
 * @Date: 2021-11-24 09:50:11
 * @LastEditTime: 2021-12-22 14:05:23
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
    UserType: 1,
    token: "de9e0767-256f-4af3-bde5-07bf6f0f8db0",
    Token: "de9e0767-256f-4af3-bde5-07bf6f0f8db0",
    SchoolID:"S4-000043-85AF",
    CourseClassID:"C789103E-F59B-422F-AD17-A664C21CA12E",
    GlobalGrade:"K12",
    StageNo:"C",
    ZsdArea:"C",
    TID:"236QQM0102",
    CountyID:"320201",
    CityID:"320200",
    ProvinceID:"320000",
  },
  mutations: {
    updateUserData(state,data){
      state.UserInfo = data;
    },
    updateSchoolID(state,data){
      state.SchoolID = data;
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
