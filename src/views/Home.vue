<!--
 * @Author: 主页面
 * @Date: 2021-11-29 09:20:26
 * @LastEditTime: 2021-12-09 10:15:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 主页面，柳欢
-->
<template>
  <div>
    <div class="clearfix Main-content">
      <!-- <video
        id="videoCtrl"
        style="position: absolute; top: 0; left: 0; z-index: 0"
        src="../assets/video/back.mp4"
      ></video> -->
      <div class="Second-content">
        <div class="ContentHeader clearfix">
          <div class="float-l leftHead">
            <div>
              <span
                :class="
                  UserInfo.UserType == 8
                    ? 'eduProduct'
                    : UserInfo.UserType == 7
                    ? 'schoolProduct'
                    : UserInfo.StageNo == 'C'
                    ? 'highProduct'
                    : 'middleProduct'
                "
              ></span>
            </div>
            <div class="ZsdAreaBox">
              该报告依据大数据分析的<span @click="switchArea()"
                >{{ UserInfo.StageNo == "B" ? "中" : "高" }}考测试谱</span
              >，通过数字化评估学生历次学习轨迹分析得来。
            </div>
          </div>
          <div class="float-l centerHead">班级认知质量评估报告</div>
          <div class="float-r rightHead">
            <div class="userInfo" style="float: right">
              <span class="questionIcon"></span>
              <span class="lineIcon"></span>
              <img
                class="teacherHead"
                :src="resInfo.PhotoPath"
                @click="toUserInfo()"
                alt=""
              />
              <span class="teacherName" @click="toUserInfo()">
                {{ resInfo.UserName }}
              </span>
              <span
                :class="
                  UserInfo.UserType == 8
                    ? 'eduIcon'
                    : UserInfo.UserType == 7
                    ? 'schoolIcon'
                    : UserInfo.UserType == 12
                    ? 'gradeLeader'
                    : 'teacherIcon'
                "
              ></span>
              <span class="exitIcon" @click="exit()"></span>
            </div>
            <div class="RZZDName">
              <i class="checkClassIcon"></i>
              <span class="className className1">{{ resInfo.SchoolName }}</span>
              <span class="className">{{
                UserInfo.CourseClassName ? UserInfo.CourseClassName : className
              }}</span>
              <span class="switchIcon">
                <div v-if="classContShow" class="classContent">
                  <div class="dotTitle">切换班级</div>
                  <ul style="height: 100px" class="clearfix">
                    <vuescroll :ops="ops">
                      <li
                        class="float-l classItem"
                        @click="chooseClass(i)"
                        :class="
                          chooseClassIndex == i ? 'activeClass' : 'normalClass'
                        "
                        v-for="(item, i) in resInfo.SwitchInfoList"
                        :key="i"
                      >
                        <span>{{ item.Name }}</span>
                      </li>
                    </vuescroll>
                  </ul>
                </div></span
              >
            </div>
          </div>
        </div>
        <router-view v-if="openView"></router-view>
      </div>
      <div class="bottomfont float-l">蓝鸽科技 版权所有</div>
      <!-- <div id="move"></div> -->
    </div>
  </div>
</template>
<script>
// import { getUserInfo } from "../api/head/test";
// import { GetClassHeadDetailInfo } from "../api/head/test";
export default {
  name: "home",
  data() {
    return {
      openView: true, //是否开启主页面内容
      UserInfo: {},
      resInfo: {},
      classContShow:false,

      className:""
    };
  },
  created() {
    //请求getUserInfo
    // let params = {
    //   Token: "4e6bc131-3cb5-4ef1-850b-236a2b80fc48",
    //   UserID: "T1014003",
    // };
    // let params1 = {
    //   CourseClassID: "6A04CCDA-0598-4D6E-9A06-C7155E8BD8F5",
    //   SchoolID: "S4-000020-9AB3",
    //   GlobalGrade: "K12",
    // };
    // getUserInfo(params).then((res) => {
    //   console.log(res);
    //   this.UserInfo = res.data.Data;
    //   this.$store.commit('updateUserData',this.this.UserInfo)
    // });
    // GetClassHeadDetailInfo(params1).then((res) => {
    //   console.log(res);
    //   this.resInfo = res.data.Data;
    // });
  },
};
</script>
