<!--
 * @Author: 吴涛
 * @Date: 2021-11-30 14:27:26
 * @LastEditTime: 2022-03-09 11:22:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》地图，图0
-->
<template>
  <div class="map">
    <!-- <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkzRjM1NDBENTdGOTExRUNCQUY5REU3QkM3QjZBNEU1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkzRjM1NDBFNTdGOTExRUNCQUY5REU3QkM3QjZBNEU1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTNGMzU0MEI1N0Y5MTFFQ0JBRjlERTdCQzdCNkE0RTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTNGMzU0MEM1N0Y5MTFFQ0JBRjlERTdCQzdCNkE0RTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4hYdkYAAAFeUlEQVR42oRXTYhWZRQ+Z7ygji4kBqOBsihmKlcuKioVGoaowSAkiaGmHzc6ENRqiHKVlAVFLUJcxmRICRJGCIYZ0RgGtWilMYi0mJDUWtjY4rvn9Jz3/73fN9P9eL/7/pzznv+fy0/oU9T/KAaX83X424mxC+MhjDsxNgWgvzAuY/yCcRbja4x/Vr+TqFFVv0clLfVgTHdg8jo2ZpRpI/fxYy/djNdmUn4Qq/3YBFGdB/K7OPw9gjo83MthPiStkhghFZJWSFubU4PNA1hfUNFZEdmoIg5OBOeYG7zBkuA+27Mzk0FkA+bA0QuAOQCcBptErYdxuABsbGIsaOBIWUdw2Qmsdnhu1YluBNwfZwUZfNaU15xGWJb1WB7EzuOQczeTXE3KNcnErfwFwLkV0++xHrPb7A47YiPPWb2cTBNMopS48crEP5AD7g6sFgC0E5dciWeNqTfofRjCn8J8LF4hQZj41uLddZvuSgIL4hg1QegUzrbjvWzsBsKO9AfY2BYlKv3NqU/DpVHikoPK4QIsq1ek05pD2mY0cDbrvNoRZnoE831eNbAGq3t7vKhDTrZ0GvCXUcSJZxpcInEUzBg8ex/+PwXuOUcYGwcdrxp8iKOCsz2V01U3sfUt3he9RDwOVicwW19pKRgpKcYzanK8hc3JRlsZB/Jj0dsiZGVLDsYgPQJ23sTkOmX/MjvegvO3gb4/iyt9KSScTABlvGlb2UNBW302Kx1K6Q3ceWgFj7oOoNmQMN7RAX4QzR+st6dpRR7lmkAizslJ+AzWh6RDlIusxD6IjbEJ4EyaQ0UGlGscyxGN9NqttVsOevj91c8r2A/xN+lhB7q9ve8DYRnJtq8dqXgWUvIYkLRSFPm9H5KfcKHBrGrbGzEbD2U9cEeo6GV8s1tdVqk+K8BWe2ubttdew3I0hYuWdksp+H4sfh2kbe5qSGkrUb92krT+6BriuL2E6aiGyIvgMV94JN0LZ3mtOK2gtXrri5bpWGP6yXbmTPo3qFrPIea292uEy7hGfNIxLM6HElTEaVU10CTobO1HRQ5ORucFqLp3Gsu5VFVCGPjck3hcGzqLZzHO5OjIqRVzZC/+gjxsTrUp9VZyneYtP44PQR2XwMyWGHCaOSvQYn1ElWH63NQVyt4YJDGGngzVoDZGaVt/1WUQuBuqtmRNhzHe64tIp9Vsz3DNFDamuk7LVMERD0ya7jlsrQKPfneXLYYh5SLI3ObzuOaUG9Y+X7ssVjpSp/hntxiYN4j/wPQe4C03XmBaxpizkrVCNlqZ/zp5/t8zF2hRJGzPUeBOg+upOm8HB2LqD59O3onq5uT53lRux/vG0agEi+NwiXP7l6Dqn4F+ew6FMmtoEeBZycKdMtTtXkiWQP/l2Mmwa3166rny6epPAD0DgLPgZJiKRDCgSIfQ1KJLyIypJlcz1e7GyZXS9cyrqwsx/QnTabxP4L2m6igCg55gcDrnbFKVQM7Ct1hPY32+W6caEem2xvacBMKMuv6I1qiTTvo6Tor74Tapex9IRDM4Oykdpdmf77m6hD3QMbx7sPk8Ll/n+2wtEwFV2a7uQP+Fpl8A0eNCndoYgALhHHBcJEtcdhxnS7j2S6COUNVnc+g3qSgCTv6rIPQ04BaUs6a0ouE+YTQEgeZk4cInhcYCZg9j8RVEvle10+5zri74XQTiLuwtuv5DxPmCaHTC3GgkVWtZ+Cn2uRoddhEEHwATRwDwXA7iqr34DHv4WqQbZWOhovELrCqA3rmKzmNAKxP3boCJ53HVN/j4+wjnm8Lx3wi5V6HW+ZSvtSgVnS8TCiHI/MmGbFstihxTX38aP8TwjGL2cfjKfAXrJep+ccQEE3GKAmdS/SfAAOqATOizqXftAAAAAElFTkSuQmCC"
      alt=""
    /> -->
    <div v-show="showData" style="z-index: 5; position: absolute">
      <!-- 地图 -->
      <!-- <div
        id="mapID"
        v-show="IsHaveMap"
        :style="{ opacity: IsHaveSchool == false ? 0.2 : 1 }"
      ></div> -->
      <MapOnly
        v-if="false"
        :params="params"
        v-show="IsHaveMap"
        :style="{ opacity: IsHaveSchool == false ? 0.2 : 1 }"
      ></MapOnly>
      <MapBack :params="params" v-show="IsHaveMap"></MapBack>>
      <div
        class="legend"
        v-show="IsHaveMap"
        :style="{ opacity: IsHaveSchool == false ? 0.2 : 1 }"
      ></div>
      <!-- 按钮 -->
      <div class="btnText">
        <span class="text" @click="dialogVisible = true">学校认知情况</span><i class="btnIcon"></i>
      </div>
    </div>
    <vue-particles
      color="#04aed8"
      :particleOpacity="0.4"
      :particlesNumber="50"
      shapeType="circle"
      :particleSize="4"
      linesColor="#39878a"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      id="particles-js"
    ></vue-particles>
    <Loading v-show="!showData" style="margin-top: 200px"></Loading>
    <el-dialog
      title="学校认知情况"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="820px"
      top="0vh"
    >
      <div>
        <SchoolInfoTable></SchoolInfoTable>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MapOnly from "./MapOnly";
import MapBack from "./MapBack";
import SchoolInfoTable from "./SchoolInfoTable";
import "@/assets/css/particless.css";
import Loading from "../common/Loading";
export default {
  name: "Map",
  data() {
    return {
      noDataText0: "暂无教育局地图数据噢~",
      IsHaveSchool: true, //是否有学校
      IsHaveMap: true, //是否有地图
      showData: true, //是否接口异步请求完成
      dialogVisible: false,
      params: {},
    };
  },
  created() {
    this.drawMap();
  },
  components: {
    Loading,
    SchoolInfoTable,
    MapOnly,
    MapBack,
  },
  methods: {
    //跳转学校点击事件
    // SchoolClick(id) {
    //   this.$store.commit("updateSchoolID", id);
    //   window.open(
    //     window.location.origin +
    //       "/Web/index.html#/home/schoolRZZD?token=" +
    //       this.$store.state.token,
    //   );
    // },
    //统计图绘制
    drawMap() {
      this.params = {
        Token: this.$store.state.token,
        TID: this.$store.state.TID,
        ProvinceID: this.$store.state.ProvinceID,
        CityID: this.$store.state.CityID,
        CountyID: this.$store.state.CountyID,
        GlobalGrade: this.$store.state.GlobalGrade,
        StageNo: this.$store.state.StageNo,
        ZsdArea: this.$store.state.ZsdArea,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.map {
  width: 940px;
  height: 636px;
  margin: 0 10px;
  position: relative;
  overflow: hidden;
}
#mapID {
  width: 940px;
  height: 620px;
}
.legend {
  width: 34px;
  height: 92px;
  background: url(~@/assets/img/eduSchool/legend.png) no-repeat center center;
  position: absolute;
  left: 58px;
  top: 28px;
}
.btnText {
  position: absolute;
  width: 100px;
  height: 20px;
  right: 8px;
  top: 10px;
  z-index: 100;
  cursor: pointer;
  .text {
    line-height: 20px;
    float: left;
    color: #fff;
    opacity: 0.8;
  }
  .btnIcon {
    float: left;
    width: 8px;
    height: 8px;
    margin-left: 4px;
    margin-top: 6px;
    background: url(~@/assets/img/eduSchool/下一页详情_默认.png) no-repeat center center;
  }
}
.btnText:hover {
  .text {
    opacity: 1;
  }
  .btnIcon {
    background: url(~@/assets/img/eduSchool/下一页详情_悬停.png) no-repeat center center;
  }
}
</style>
<style>
.toolTipABG {
  width: 220px;
  height: 240px;
  background: url(~@/assets/img/eduSchool/ABG.png) no-repeat center center;
  color: #fff;
  position: relative;
}
.toolTipABG::after {
  width: 34px;
  height: 12px;
  background: url(~@/assets/img/eduSchool/LINEA.png) no-repeat center right;
  content: "";
  position: absolute;
  left: -17px;
  top: 48%;
}
.toolTipBBG {
  width: 220px;
  height: 240px;
  background: url(~@/assets/img/eduSchool/BBG.png) no-repeat center center;
  color: #fff;
  position: relative;
}
.toolTipBBG::after {
  width: 34px;
  height: 12px;
  background: url(~@/assets/img/eduSchool/LINEB.png) no-repeat center right;
  content: "";
  position: absolute;
  left: -17px;
  top: 48%;
}
.toolTipCBG {
  width: 220px;
  height: 240px;
  background: url(~@/assets/img/eduSchool/CBG.png) no-repeat center center;
  color: #fff;
  position: relative;
}
.toolTipCBG::after {
  width: 34px;
  height: 12px;
  background: url(~@/assets/img/eduSchool/LINEC.png) no-repeat center right;
  content: "";
  position: absolute;
  left: -17px;
  top: 48%;
}
.toolTipDBG {
  width: 220px;
  height: 240px;
  background: url(~@/assets/img/eduSchool/DBG.png) no-repeat center center;
  color: #fff;
  position: relative;
}
.toolTipDBG::after {
  width: 34px;
  height: 12px;
  background: url(~@/assets/img/eduSchool/LINED.png) no-repeat center right;
  content: "";
  position: absolute;
  left: -17px;
  top: 48%;
}
.toolTipEBG {
  width: 220px;
  height: 240px;
  background: url(~@/assets/img/eduSchool/EBG.png) no-repeat center center;
  color: #fff;
  position: relative;
}
.toolTipEBG::after {
  width: 34px;
  height: 12px;
  background: url(~@/assets/img/eduSchool/LINEE.png) no-repeat center right;
  content: "";
  position: absolute;
  left: -17px;
  top: 48%;
}
.toolTipFBG {
  width: 200px;
  height: 54px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 6px;
}
.toolTipFBG::after {
  width: 27px;
  height: 12px;
  background: url(~@/assets/img/eduSchool/LINEF.png) no-repeat center right;
  content: "";
  position: absolute;
  left: -10px;
  top: 40%;
}
.toolTipTop {
  overflow: hidden;
  margin-bottom: 20px;
}
.toolTipTitle {
  width: 145px;
  height: 50px;
  line-height: 58px;
  color: #fff;
  font-size: 14px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 28px;
}
.toolTipIcon {
  float: right;
  width: 18px;
  height: 18px;
  margin-right: 20px;
  margin-top: 20px;
  background: url(~@/assets/img/eduSchool/查看_默认.png) no-repeat center center;
  position: relative;
  cursor: pointer;
}
.toolTipIcon:hover {
  background: url(~@/assets/img/eduSchool/查看_悬停.png) no-repeat center center;
}
.toolTipItem {
  overflow: hidden;
  width: 170px;
  height: 32px;
  line-height: 32px;
  margin-left: 28px;
  float: left;
}
.toolTipTitleContLeft {
  float: left;
  width: 90px;
}
.toolTipTitleContRight {
  text-align: right;
  width: 75px;
  float: left;
}
</style>
