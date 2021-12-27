<!--
 * @Author: 主页面
 * @Date: 2021-11-29 09:20:26
 * @LastEditTime: 2021-12-24 16:19:31
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
                  UserInfo.UserType == 8 ? 'eduProduct' : UserInfo.UserType == 7 ? 'schoolProduct' : UserInfo.StageNo == 'C' ? 'highProduct' : 'middleProduct'
                "
              ></span>
            </div>
            <div class="ZsdAreaBox">
              该报告依据大数据分析的<span @click="switchArea()">{{ UserInfo.StageNo == "B" ? "中" : "高" }}考测试谱</span
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
                :class="UserInfo.UserType == 8 ? 'eduIcon' : UserInfo.UserType == 7 ? 'schoolIcon' : UserInfo.UserType == 12 ? 'gradeLeader' : 'teacherIcon'"
              ></span>
              <span class="exitIcon" @click="exit()"></span>
            </div>
            <div class="RZZDName">
              <i class="checkClassIcon"></i>
              <span class="className className1">{{ UserInfo.SchoolName }}</span>
              <span class="className">{{ UserInfo.CourseClassName ? UserInfo.CourseClassName : className }}</span>
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
        <router-view></router-view>
      </div>
      <div class="bottomfont float-l">蓝鸽科技 版权所有</div>
      <!-- <div id="move"></div> -->
    </div>
    <el-dialog title="高考测试知识谱" :visible.sync="dialogVisible" :close-on-click-modal="false" width="820px" top="0vh">
      <div>
        <SpectrumDiolog></SpectrumDiolog>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserInfo } from "../api/head/header";
import { GetDirectorHeadDetailInfo } from "../api/head/header";
import { GetSchoolHeadDetailInfo } from "../api/head/header";
import { GetGradeLeaderDetailInfo } from "../api/head/header";
import { GetClassHeadDetailInfo } from "../api/head/header";
import { GetCountyInitResultString } from "../api/head/header";
import { GetSchoolInitResultString } from "../api/head/header";
// import { GetDirectorHeadDetailInfo } from "../api/head/header";
import { GetSubSystemInfo } from "../api/head/header";
import { ExitTheSystem } from "../api/head/header";
import vuescroll from "vuescroll";
export default {
  name: "home",
  data() {
    return {
      openView: false, //是否开启主页面内容
      UserInfo: {},
      resInfo: {},
      classContShow: false,
      dialogVisible: false,
      className: "",
      ops: {
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: "#9cd1ff",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: "5px",
          disable: false,
        },
      },
    };
  },
  components: {
    SpectrumDiolog: () => import("../views/dialog/SpectrumDiolog.vue"),
    vuescroll,
  },
  created() {},
  mounted() {
    this.getUserInfo();
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
    getUserInfo() {
      let params = {
        token: this.$route.query.token,
      };
      getUserInfo(params).then((res) => {
        this.UserInfo = res.Data;
        this.$store.commit("updateCountyID", this.UserInfo.CountyID);
        this.$store.commit("updatetoken", this.$route.query.token);
        this.$store.commit("updateProvinceID", this.UserInfo.ProvinceID);
        this.$store.commit("updateCityID", this.UserInfo.CityID);
        this.$store.commit("updateSchoolID", this.UserInfo.SchoolID);
        this.$store.commit("updateCourseClassID", this.$route.query.CourseClassID);
        this.$store.commit("updateUserID", this.UserInfo.UserID);
        this.$store.commit("updateTID", this.UserInfo.UserID);
        this.$store.commit("updateGlobalGrade", this.UserInfo.GlobalGrade);
        this.$store.commit("updateUserData", this.UserInfo);
        if (this.$route.name == "gradeRZZD") {
          this.GetGradeLeaderDetailInfo(1);
        } else if (this.$route.name == "teacherRZZD") {
          this.GetClassHeadDetailInfo();
        } else if (this.$route.name == "educationRZZD") {
          this.GetDirectorHeadDetailInfo();
        } else if (this.$route.name == "schoolRZZD") {
          this.GetSchoolHeadDetailInfo(this.UserInfo.SchoolID, 0);
        }
      });
    },
    GetClassHeadDetailInfo() {
      this.openView = false;
      let CourseClassID = this.$store.state.CourseClassID;
      let SchoolID = "";
      let GlobalGrade = this.$route.query.GlobalGrade;
      let StageNo = "";
      StageNo = GlobalGrade.substring(1) > 9 ? "C" : "B";
      this.$store.commit("updateStageNo", StageNo);
      if (this.UserInfo.UserType == 1) {
        SchoolID = this.$store.state.SchoolID;
      } else {
        SchoolID = this.$route.query.SchoolID;
      }
      this.$store.commit("updateSchoolID", SchoolID);
      this.$store.commit("updateGlobalGrade", this.$route.query.GlobalGrade);
      this.$store.commit("updateCourseClassID", CourseClassID);
      let params = {
        token: this.$store.state.token,
        CourseClassID: this.$store.state.CourseClassID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$route.query.GlobalGrade,
      };
      GetClassHeadDetailInfo(params).then((res) => {
        this.resInfo = res.Data;
        this.className = this.resInfo.CurrName;
        this.openView = true;
        if (this.resInfo.SwitchInfoList.length == 0) {
          // let token = this.$route.query.token;
          this.$znbkLayer.znbkConfirmWithNoButton("当前账号无班级信息，请联系管理员进行设置", "确定", () => {
            window.close();
          });
        } else if (this.resInfo.StuCount == 0) {
          this.$znbkLayer.znbkConfirmWithNoButton("当前班级未创建学生账号，请联系管理员进行设置", "确定", () => {
            window.close();
          });
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
    // 获取教师端初始化认知评估文案内容
    GetClassInitResultString() {
      let SchoolID = this.$store.state.SchoolID;
      let GlobalGrade = this.$store.state.GlobalGrade;
      let UserID = this.$store.state.UserID;
      let CourseClassID = this.$store.state.CourseClassID;
      this.axios
        .get(
          "/api/RZZD/GetClassInitResultString?SchoolID=" +
            SchoolID +
            "&GlobalGrade=" +
            GlobalGrade +
            "&UserID=" +
            UserID +
            "&CourseClassID=" +
            CourseClassID +
            "&Flag=" +
            0
        )
        .then((res) => {
          this.resInfo4 = res.Data;
          if (this.resInfo4 != "") {
            this.showPopUp = !this.showPopUp;
            this.showAreaSwitch = true;
          }
        });
    },
    // 获取年级头部信息
    GetGradeLeaderDetailInfo(i) {
      let params = {
        token: this.$route.query.token,
      };
      GetGradeLeaderDetailInfo(params).then((res) => {
        this.resInfo = res.Data;
        this.className = this.resInfo.CurrName;
        if (this.resInfo.SwitchInfoList.length == 0) {
          // let token = this.$route.query.token;
          // this.$znbkLayer.znbkConfirmWithNoButton(
          //   "当前账号无班级信息，请联系管理员进行设置",
          //   "确定",
          //   () => {
          //     window.close();
          //   }
          // );
          this.$alert("当前账号无班级信息，请联系管理员进行设置", "", {
            confirmButtonText: "确定",
            callback: () => {
              // window.close();
            },
          });
        } else if (this.resInfo.StuCount == 0) {
          this.$alert("当前账号无班级信息，请联系管理员进行设置", "", {
            confirmButtonText: "确定",
            callback: () => {
              // window.close();
            },
          });
          // this.$znbkLayer.znbkConfirmWithNoButton(
          //   "当前年级未创建学生账号，请联系管理员进行设置",
          //   "确定",
          //   () => {
          //     window.close();
          //   }
          // );
        } else {
          for (let i = 0; i < this.resInfo.SwitchInfoList.length; i++) {
            if (this.resInfo.SwitchInfoList[i].Name == this.className) {
              this.chooseClassIndex = i;
            }
          }
          this.GetSchoolInitResultString(i);
        }
      });
    },

    // 获取学校头部信息
    GetSchoolHeadDetailInfo(SchoolID, i) {
      this.openView = false;
      SchoolID = this.$store.state.SchoolID ? this.$store.state.SchoolID : SchoolID;
      let GlobalGrade = "";
      if (this.$store.state.GlobalGrade) {
        GlobalGrade = this.$store.state.GlobalGrade;
      }
      let params = {
        token: this.$route.query.token,
        GlobalGrade: GlobalGrade,
        SchoolID: SchoolID,
      };
      GetSchoolHeadDetailInfo(params).then((res) => {
        this.resInfo = res.Data;
        this.className = this.resInfo.CurrName;
        this.openView = true;
        if (this.resInfo.SwitchInfoList.length == 0) {
          // let token = this.$route.query.token;
          // this.$znbkLayer.znbkConfirmWithNoButton(
          //   "当前账号无班级信息，请联系管理员进行设置",
          //   "确定",
          //   () => {
          //     window.close();
          //   }
          // );
          this.$alert("当前账号无班级信息，请联系管理员进行设置", "", {
            confirmButtonText: "确定",
            callback: () => {
              // window.close();
            },
          });
        } else if (this.resInfo.StuCount == 0) {
          this.$alert("当前账号无班级信息，请联系管理员进行设置", "", {
            confirmButtonText: "确定",
            callback: () => {
              // window.close();
            },
          });
          // this.$znbkLayer.znbkConfirmWithNoButton(
          //   "当前年级未创建学生账号，请联系管理员进行设置",
          //   "确定",
          //   () => {
          //     window.close();
          //   }
          // );
        } else {
          for (let i = 0; i < this.resInfo.SwitchInfoList.length; i++) {
            if (this.resInfo.SwitchInfoList[i].Name == this.className) {
              this.chooseClassIndex = i;
              this.$store.commit("updateGlobalGrade", this.resInfo.SwitchInfoList[i].ID);
              if (this.resInfo.SwitchInfoList[i].ID.substr(1) < 10) {
                this.$store.commit("updateStageNo", "B");
              } else {
                this.$store.commit("updateStageNo", "C");
              }
            }
          }
          this.GetSchoolInitResultString(i);
        }
      });
    },
    // 获取教育局头部信息
    GetDirectorHeadDetailInfo() {
      this.openView = false;
      let GlobalGrade = "";
      if (this.$store.state.GlobalGrade) {
        GlobalGrade = this.$store.state.GlobalGrade;
      }
      let params = {
        token: this.$route.query.token,
        GlobalGrade: GlobalGrade,
      };
      GetDirectorHeadDetailInfo(params).then((res) => {
        this.resInfo = res.Data;
        this.className = this.resInfo.CurrName;
        this.openView = true;
        if (this.resInfo.SwitchInfoList.length == 0) {
          // let token = this.$route.query.token;
          // this.$znbkLayer.znbkConfirmWithNoButton(
          //   "当前账号无班级信息，请联系管理员进行设置",
          //   "确定",
          //   () => {
          //     window.close();
          //   }
          // );
          this.$alert("当前账号无班级信息，请联系管理员进行设置", "", {
            confirmButtonText: "确定",
            callback: () => {
              // window.close();
            },
          });
        } else if (this.resInfo.StuCount == 0) {
          this.$alert("当前账号无班级信息，请联系管理员进行设置", "", {
            confirmButtonText: "确定",
            callback: () => {
              // window.close();
            },
          });
          // this.$znbkLayer.znbkConfirmWithNoButton(
          //   "当前年级未创建学生账号，请联系管理员进行设置",
          //   "确定",
          //   () => {
          //     window.close();
          //   }
          // );
        } else {
          for (let i = 0; i < this.resInfo.SwitchInfoList.length; i++) {
            if (this.resInfo.SwitchInfoList[i].Name == this.className) {
              this.chooseClassIndex = i;
              this.$store.commit("updateGlobalGrade", this.resInfo.SwitchInfoList[i].ID);

              // this.propObject.GlobalGrade = this.resInfo.SwitchInfoList[i].ID;
              if (this.resInfo.SwitchInfoList[i].ID.substr(1) < 10) {
                this.$store.commit("updateStageNo", "B");
                // this.propObject.StageNo = "B";
              } else {
                this.$store.commit("updateStageNo", "C");
                // this.propObject.StageNo = "C";
              }
            }
          }
          this.GetCountyInitResultString();
        }
      });
    },

    // 获取教师端初始化认知评估文案内容
    GetCountyInitResultString() {
      let params = {
        token: this.$route.query.token,
        CountyID: this.$store.state.CountyID,
        GlobalGrade: this.$store.state.GlobalGrade,
        UserID: this.$store.state.UserID,
      };

      GetCountyInitResultString(params).then((res) => {
        this.resInfo4 = res.Data;
        if (this.resInfo4 != "") {
          this.showPopUp = !this.showPopUp;
          this.showAreaSwitch = true;
        }
        // this.GetCommonKnowledgeSpectrum();
      });
    },
    // 获取教师端初始化认知评估文案内容
    GetSchoolInitResultString(i) {
      let params = {
        token: this.$route.query.token,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        UserID: this.$store.state.UserID,
        Flag: i,
      };

      GetSchoolInitResultString(params).then((res) => {
        this.resInfo4 = res.Data;
        if (this.resInfo4 != "") {
          this.showPopUp = !this.showPopUp;
          this.showAreaSwitch = true;
        }
        // this.GetCommonKnowledgeSpectrum();
      });
    },
    // 打开弹窗
    switchArea() {
      this.dialogVisible = true;
    },
    // 选择班级
    chooseClass(i) {
      this.chooseClassIndex = i;
      this.className = this.resInfo.SwitchInfoList[i].Name;
      this.classID = this.resInfo.SwitchInfoList[i].ID;
      this.$store.commit("updateCourseClassID", this.classID);
      this.GetClassHeadDetailInfo();
    },
    // 退出系统
    exit() {
      this.$messagebox
        .confirm("是否确定退出系统？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info", //蓝色叹号-warning， //warning,问号-info，绿色打钩-success，//红色错误-error
          center: true,
          customClass: "MessageBig",
        })
        .then(() => {
          let params = {
            token: this.$route.query.token,
          };
          ExitTheSystem(params).then((res) => {
            if (res.Code == 1) {
              window.open(res.Data, "_self");
            }
          });
        })
        .catch(() => {});
    },
    // 用户信息
    toUserInfo() {
      let params = {
        token: this.$route.query.token,
      };
      GetSubSystemInfo(params).then((res) => {
        let url = res.Data.BaseSysID + "usermgr/personalmgr/default.aspx?lg_tk=" + this.$route.query.token;
        window.open(url, "_blank");
      });
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
