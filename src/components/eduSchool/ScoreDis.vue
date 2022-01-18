<!--
 * @Author: 吴涛
 * @Date: 2021-11-30 14:30:34
 * @LastEditTime: 2022-01-18 13:57:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》认知成绩分布
-->
<template>
  <div class="Dis" :class="{ teacDis: $route.name == 'gradeRZZD' || $route.name == 'teacherRZZD' }">
    <div class="title" v-if="!($route.name == 'gradeRZZD' || $route.name == 'teacherRZZD')">认知成绩分布</div>

    <div class="button">
      <span @click="checkButton(0)" v-show="$route.name == 'educationRZZD'" :class="{ active: activeSpan == 0 }"
        ><i style="display: block" class="animate__animated" :class="{ animate__rubberBand: activeSpan == 0 }">学校</i></span
      >
      <span @click="checkButton(1)" v-show="$route.name == 'schoolRZZD' || $route.name == 'gradeRZZD'" :class="{ active: activeSpan == 1 }"
        ><i style="display: block" class="animate__animated" :class="{ animate__rubberBand: activeSpan == 1 }">班级</i></span
      >
      <span v-show="$route.name != 'teacherRZZD'" @click="checkButton(2)" :class="{ active: activeSpan == 2 }"
        ><i style="display: block" class="animate__animated" :class="{ animate__rubberBand: activeSpan == 2 }">学生</i></span
      >
    </div>
    <div class="tu" v-show="!loading">
      <div class="tu_Back"></div>
      <div class="Aline"></div>
      <div class="Bline"></div>
      <div class="Cline"></div>
      <div class="Dline"></div>
      <div class="Eline"></div>
      <div class="Acont">
        <span class="Text">
          <span class="TextDeng Acolor">A<sup>+</sup></span>
          <span class="Acolor">
            <b class="big">{{ List[0].LevelCount }}</b
            >{{ getText }}</span
          >
        </span>
        <span class="Text">
          <span class="norColor"
            >占比<b class="big">{{ List[0].LevelRation | toPercent(2) }}</b
            >%,</span
          >
          <span class="Acolor">
            <span v-if="List[0].TrastRation >= 0">↑</span>
            <span v-if="List[0].TrastRation < 0">↓</span>
            {{ List[0].TrastRation | toPercent(0) }}%
          </span>
        </span>
      </div>
      <div class="Bcont">
        <span class="Text">
          <span class="TextDeng Bcolor">B<sup>+</sup></span>
          <span class="Bcolor">
            <b class="big">{{ List[1].LevelCount }}</b
            >{{ getText }}</span
          >
        </span>
        <span class="Text">
          <span class="norColor"
            >占比<b class="big">{{ List[1].LevelRation | toPercent(2) }}</b
            >%,</span
          >
          <span class="Bcolor">
            <span v-if="List[1].TrastRation >= 0">↑</span>
            <span v-if="List[1].TrastRation < 0">↓</span>
            {{ List[1].TrastRation | toPercent(0) }}%
          </span>
        </span>
      </div>
      <div class="Ccont">
        <span class="Text">
          <span class="TextDeng Ccolor">C<sup>+</sup></span>
          <span class="Ccolor">
            <b class="big">{{ List[2].LevelCount }}</b
            >{{ getText }}</span
          >
        </span>
        <span class="Text">
          <span class="norColor"
            >占比<b class="big">{{ List[2].LevelRation | toPercent(2) }}</b
            >%,</span
          >
          <span class="Ccolor">
            <span v-if="List[2].TrastRation >= 0">↑</span>
            <span v-if="List[2].TrastRation < 0">↓</span>
            {{ List[2].TrastRation | toPercent(0) }}%
          </span>
        </span>
      </div>
      <div class="Dcont">
        <span class="Text">
          <span class="TextDeng Dcolor">D<sup>+</sup></span>
          <span class="Dcolor">
            <b class="big">{{ List[3].LevelCount }}</b
            >{{ getText }}</span
          >
        </span>
        <span class="Text">
          <span class="norColor"
            >占比<b class="big">{{ List[3].LevelRation | toPercent(2) }}</b
            >%,</span
          >
          <span class="Dcolor">
            <span v-if="List[3].TrastRation >= 0">↑</span>
            <span v-if="List[3].TrastRation < 0">↓</span>
            {{ List[3].TrastRation | toPercent(0) }}%
          </span>
        </span>
      </div>
      <div class="Econt">
        <span class="Text">
          <span class="TextDeng Ecolor">E<sup>+</sup></span>
          <span class="Ecolor">
            <b class="big">{{ List[4].LevelCount }}</b
            >{{ getText }}</span
          >
        </span>
        <span class="Text">
          <span class="norColor"
            >占比<b class="big">{{ List[4].LevelRation | toPercent(2) }}</b
            >%,</span
          >
          <span class="Ecolor">
            <span v-if="List[4].TrastRation >= 0">↑</span>
            <span v-if="List[4].TrastRation < 0">↓</span>
            {{ List[4].TrastRation | toPercent(0) }}%
          </span>
        </span>
      </div>
    </div>
    <EduNoData v-if="false" noDataType="1" style="margin-top: 120px"></EduNoData>
    <Loading v-show="loading" style="margin-top: 50px"></Loading>
  </div>
</template>
<script>
import { GetArea, GetAreaSchool, GetAreaGrade, GetAreaTeacher } from "@/api/eduSchool/right.js";
import EduNoData from "./eduNoData";
import Loading from "../common/Loading";
import "animate.css"; // npm install animate.css --save安装，再引入
export default {
  name: "ScoreDis",
  data() {
    return {
      activeSpan: 0, //0-学校，1-班级，2-学生,
      List: [],
      showData: true, //是否有数据
      loading: true, //是否加载中
    };
  },
  created() {
    if (this.$route.name == "schoolRZZD" || this.$route.name == "gradeRZZD") {
      this.activeSpan = 1;
    } else if (this.$route.name == "teacherRZZD") {
      this.activeSpan = 2;
    }
  },
  computed: {
    getText: function () {
      if (this.activeSpan == 0) {
        return "所学校";
      } else if (this.activeSpan == 1) {
        return "个班级";
      } else if (this.activeSpan == 2) {
        return "个学生";
      } else {
        return "";
      }
    },
  },
  components: {
    EduNoData,
    Loading,
  },
  mounted() {
    this.getInfo(this.$route.name, "class");
  },
  methods: {
    //切换按钮
    checkButton(n) {
      this.loading = true;
      this.activeSpan = n;
      setTimeout(() => {
        if (n == 2) {
          this.getInfo(this.$route.name, "student");
        } else {
          this.getInfo(this.$route.name, "class");
        }
      }, 300);
    },
    //请求接口
    getInfo(name, type) {
      let params = {
        Token: this.$store.state.token,
        TID: this.$store.state.TID,
        GlobalGrade: this.$store.state.GlobalGrade,
        ZsdArea: this.$store.state.ZsdArea,
        StageNo: this.$store.state.StageNo,
        SwitchType: "", //传student显示学生认知成绩分布图，传其他显示学校认知成绩分布图
      };
      if (name == "educationRZZD") {
        params.ProvinceID = this.$store.state.ProvinceID;
        params.CityID = this.$store.state.CityID;
        params.CountyID = this.$store.state.CountyID;
        params.SwitchType = type;
        GetArea(params).then((res) => {
          if (res.Code == 1) {
            if (res.Data.IndexTable.length > 0) {
              this.List = res.Data.IndexTable;
            } else {
              this.showData = false;
            }
          }
          this.loading = false;
        });
      } else if (name == "schoolRZZD") {
        params.SchoolID = this.$store.state.SchoolID;
        params.SwitchType = type;
        GetAreaSchool(params).then((res) => {
          if (res.Code == 1) {
            if (res.Data.IndexTable.length > 0) {
              this.List = res.Data.IndexTable;
            } else {
              this.showData = false;
            }
          }
          this.loading = false;
        });
      } else if (name == "gradeRZZD") {
        params.SchoolID = this.$store.state.SchoolID;
        params.SwitchType = type;
        GetAreaGrade(params).then((res) => {
          if (res.Code == 1) {
            if (res.Data.IndexTable.length > 0) {
              this.List = res.Data.IndexTable;
            } else {
              this.showData = false;
            }
          }
          this.loading = false;
        });
      } else if (name == "teacherRZZD") {
        params.CourseClassID = this.$store.state.CourseClassID;
        params.SchoolID = this.$store.state.SchoolID;
        // params.SwitchType = "student";
        GetAreaTeacher(params).then((res) => {
          if (res.Code == 1) {
            if (res.Data.length > 0) {
              this.List = res.Data;
            } else {
              this.showData = false;
            }
          }
          this.loading = false;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.Dis {
  width: 400px;
  height: 388px;
  margin-left: 10px;
  background: url(~@/assets/img/eduSchool/认知成绩分布_bg.png) center center no-repeat;
  overflow: hidden;
}
.teacDis {
  background-image: none !important;
  background: rgba(0, 0, 51, 0.2) !important;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
.title {
  font-family: "YouSheBiaoTiHei";
  font-size: 24px;
  margin-top: 6px;
  text-align: center;
}
.button {
  text-align: right;
  margin-right: 16px;
  margin-top: 20px;
  span {
    display: inline-block;
    width: 48px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    color: #333;
    background: #7088c7;
    cursor: pointer;
    margin-right: -3px;
    border-radius: 3px;
    i {
      font-style: normal;
    }
  }
  span:hover {
    color: #fff;
  }
  .active {
    color: #fff;
    position: relative;
    background-image: linear-gradient(266deg, #0060ff 0%, #00a2ff 100%);
  }
}
.tu {
  width: 400px;
  height: 305px;
  position: relative;
  .tu_Back {
    width: 400px;
    height: 305px;
    position: absolute;
    left: 0;
    top: 0;
    background: url(~@/assets/img/eduSchool/jzt.png) center center no-repeat;
  }
  .Aline {
    width: 155px;
    height: 51px;
    position: absolute;
    left: 35px;
    top: 30px;
    background: url(~@/assets/img/eduSchool/A线.png) center center no-repeat;
  }
  .Bline {
    width: 149px;
    height: 72px;
    position: absolute;
    left: 230px;
    top: 50px;
    background: url(~@/assets/img/eduSchool/B线.png) center center no-repeat;
  }
  .Cline {
    width: 120px;
    height: 40px;
    position: absolute;
    left: 28px;
    top: 102px;
    background: url(~@/assets/img/eduSchool/C线.png) center center no-repeat;
  }
  .Dline {
    width: 154px;
    height: 71px;
    position: absolute;
    left: 218px;
    top: 124px;
    background: url(~@/assets/img/eduSchool/D线.png) center center no-repeat;
  }
  .Eline {
    width: 169px;
    height: 37px;
    position: absolute;
    left: 200px;
    top: 220px;
    background: url(~@/assets/img/eduSchool/E线.png) center center no-repeat;
  }
  .Text {
    font-size: 12px;
    color: #fff;
    display: block;
  }
  .TextDeng {
    font-size: 20px;
    margin-right: 5px;
  }
  .big {
    font-size: 13px;
    font-weight: normal;
  }
  .Acolor {
    color: #51f0ff;
  }
  .Bcolor {
    color: #18ff00;
  }
  .Ccolor {
    color: #00ffd8;
  }
  .Dcolor {
    color: #ffcc00;
  }
  .Ecolor {
    color: #ff8080;
  }
  .Acont {
    position: absolute;
    left: 30px;
    top: 0px;
  }
  .Bcont {
    position: absolute;
    right: 23px;
    top: 20px;
    text-align: right;
  }
  .Ccont {
    position: absolute;
    left: 25px;
    top: 71px;
  }
  .Dcont {
    position: absolute;
    right: 30px;
    top: 93px;
    text-align: right;
  }
  .Econt {
    position: absolute;
    right: 33px;
    top: 226px;
    text-align: right;
  }
}
</style>
