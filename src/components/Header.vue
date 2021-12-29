<!--
 * @Author: 柳欢 负责
 * @Date: 2021-11-29 09:48:36
 * @LastEditTime: 2021-12-28 10:23:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 柳欢=》头部信息，包括了用户信息及退出登录等
-->
<template>
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
    <div class="float-l centerHead">{{ className }}认知质量评估报告</div>
    <div class="float-r rightHead">
      <div class="userInfo" style="float: right">
        <span class="questionIcon"></span>
        <span class="lineIcon"></span>
        <img class="teacherHead" :src="UserInfo.PhotoPath" @click="toUserInfo()" alt="" />
        <span class="teacherName" @click="toUserInfo()">
          {{ UserInfo.UserName }}
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
        <!-- <span class="className className1">{{ UserInfo.SchoolName }}</span> -->
        <span class="className">{{ className }}</span>
        <span class="switchIcon">
          <div v-if="classContShow" class="classContent">
            <div class="dotTitle">切换班级</div>
            <ul style="height: 100px" class="clearfix">
              <vuescroll :ops="ops">
                <li
                  class="float-l classItem"
                  @click="chooseClass(i)"
                  :class="chooseClassIndex == i ? 'activeClass' : 'normalClass'"
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
      <div class="ZsdAreaBox"><i></i>最佳分辨率 1920 * 1080; 按F11键可全屏</div>
    </div>
  </div>
</template>

<script>
// import { getUserInfo } from "../api/head/test";
// import { GetClassHeadDetailInfo } from "../api/head/test";
export default {
  data() {
    return {
      UserInfo: {},
      resInfo: {},
      classContShow: false,

      className: "",
      classID: "",
    };
  },
  created() {
    // this.getUserInfo();
    //请求getUserInfo
    // let params = {
    //   token: this.$route.query.token,
    //   UserID: "T1014003",
    // };
    // let params1 = {
    //   token: this.$route.query.token,
    //   CourseClassID: "6A04CCDA-0598-4D6E-9A06-C7155E8BD8F5",
    //   SchoolID: this.$store.state.UserInfo.SchoolID,
    //   GlobalGrade: "K12",
    // };
    // getUserInfo(params).then((res) => {
    //   this.UserInfo = res.Data;
    //   this.$store.commit("updateUserData", this.UserInfo);
    // });
    // params1 = {
    //   token: this.$route.query.token,
    //   CourseClassID: "6A04CCDA-0598-4D6E-9A06-C7155E8BD8F5",
    //   SchoolID: this.$store.state.UserInfo.SchoolID,
    //   GlobalGrade: "K12",
    // };
    // GetClassHeadDetailInfo(params1).then((res) => {
    //   this.resInfo = res.Data;
    // });
  },
  mounted() {
    // 点击其他地方选择班级框框消失
    window.addEventListener("click", (e) => {
      let thisClassName = e.target.className;
      if (thisClassName == "className" || thisClassName == "switchIcon") {
        this.classContShow = !this.classContShow;
      } else if (thisClassName != "className" || thisClassName != "switchIcon") {
        if (thisClassName == "float-l classItem activeClass") {
          this.classContShow = true;
        } else {
          this.classContShow = false;
        }
      }
    });
  },
  methods: {
    // 用户信息
    toUserInfo() {
      this.axios.get("RZZD/GetSubSystemInfo?").then((res) => {
        let url =
          res.data.Data.BaseSysID +
          "usermgr/personalmgr/default.aspx?lg_tk=" +
          this.$route.query.token;
        window.open(url, "_blank");
      });
    },
    // 用户信息
    getUserInfo() {
      this.axios.get("RZZD/GetUserInfo?").then((res) => {
        this.UserInfo = res.Data;
        this.UserInfo.StageNo = this.$route.query.StageNo;
        this.$store.commit("updateUserData", this.UserInfo);
        this.GetHeadDetailInfo();
      });
    },
    // 获取头部信息
    GetHeadDetailInfo() {
      let CourseClassID = this.$route.query.CourseClassID;
      this.$store.commit("updateCourseClassID", CourseClassID);
      let SchoolID = "";
      if (this.UserInfo.UserType == 1) {
        SchoolID = "";
      } else {
        SchoolID = this.$route.query.SchoolID;
      }
      this.$store.commit("updateSchoolID", SchoolID);
      // this.propObject.SchoolID = this.$route.query.SchoolID;
      this.$store.commit("updateGlobalGrade", this.$route.query.GlobalGrade);
      // this.propObject.GlobalGrade = this.$route.query.GlobalGrade;
      this.axios
        .get(
          "RZZD/GetClassHeadDetailInfo?CourseClassID=" +
            CourseClassID +
            "&SchoolID=" +
            SchoolID +
            "&GlobalGrade=" +
            this.$store.state.GlobalGrade
        )
        .then((res) => {
          this.resInfo = res.Data;
          this.className = this.resInfo.CurrName;
          if (this.resInfo.SwitchInfoList.length == 0) {
            // let token = this.$route.query.token;
            this.$znbkLayer.znbkConfirmWithNoButton(
              "当前账号无班级信息，请联系管理员进行设置",
              "确定",
              () => {
                window.close();
              }
            );
          } else if (this.resInfo.StuCount == 0) {
            this.$znbkLayer.znbkConfirmWithNoButton(
              "当前班级未创建学生账号，请联系管理员进行设置",
              "确定",
              () => {
                window.close();
              }
            );
          } else {
            for (let i = 0; i < this.resInfo.SwitchInfoList.length; i++) {
              if (this.resInfo.SwitchInfoList[i].Name == this.className) {
                this.chooseClassIndex = i;
              }
            }
            this.GetClassInitResultString();
          }
        });
    },

    // 选择班级
    chooseClass(i) {
      this.chooseClassIndex = i;
      this.className = this.resInfo.SwitchInfoList[i].Name;
      this.classID = this.resInfo.SwitchInfoList[i].ID;
      this.$store.commit("updateCourseClassID", this.classID);
      this.timer = new Date().getTime();
      let url = window.location.hash;
      let arr = url.split("?")[1].split("&");
      let CourseClassID = "";
      for (let i in arr) {
        if (arr[i].indexOf("CourseClassID") > -1) {
          CourseClassID = arr[i].split("=")[1];
        }
      }
      url = url.replace(
        "CourseClassID=" + CourseClassID,
        "CourseClassID=" + this.classID
      );
      window.location.hash = url;
      this.GetHeadDetailInfo();
    },
  },
};
</script>

<style lang="scss" scoped>
.rightHead {
  position: relative;
  .ZsdAreaBox {
    line-height: 20px;
    position: absolute;
    top: 80px;
    right: 60px;
    width: 280px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    i {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: url("../assets/img/head/分辨率提示.png") center center no-repeat;
      margin-right: 5px;
    }
  }
}
.dotTitle {
  font-size: 14px;
  color: #ffffff;
  font-family: MicrosoftYaHei;
  font-weight: 700;
  text-align: left;
  margin-bottom: 10px;
}
</style>
