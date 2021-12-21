<!--
 * @Author: 吴涛
 * @Date: 2021-11-30 14:30:34
 * @LastEditTime: 2021-12-21 09:01:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》认知成绩分布
-->
<template>
  <div class="Dis">
    <div class="title">认知成绩分布</div>
    <div class="button">
      <span @click="checkButton(0)" :class="{ active: activeSpan == 0 }">学校</span>
      <span @click="checkButton(1)" v-show="false" :class="{ active: activeSpan == 1 }">班级</span>
      <span @click="checkButton(2)" :class="{ active: activeSpan == 2 }">学生</span>
    </div>
    <div class="tu">
      <div class="tu_Back"></div>
      <div class="Aline"></div>
      <div class="Bline"></div>
      <div class="Cline"></div>
      <div class="Dline"></div>
      <div class="Eline"></div>
      <div class="Acont">
        <span class="Text">
          <span class="TextDeng Acolor">A<sup>+</sup></span>
          <span class="Acolor"> <b class="big">1</b>{{ getText }}</span>
        </span>
        <span class="Text">
          <span class="norColor">占比<b class="big">20</b>%,</span>
          <span class="Acolor"><span>↑</span><span>↓</span>20%</span>
        </span>
      </div>
      <div class="Bcont">
        <span class="Text">
          <span class="TextDeng Bcolor">B<sup>+</sup></span>
          <span class="Bcolor"> <b class="big">1</b>{{ getText }}</span>
        </span>
        <span class="Text">
          <span class="norColor">占比<b class="big">20</b>%,</span>
          <span class="Bcolor"><span>↑</span><span>↓</span>20%</span>
        </span>
      </div>
      <div class="Ccont">
        <span class="Text">
          <span class="TextDeng Ccolor">C<sup>+</sup></span>
          <span class="Ccolor"> <b class="big">1</b>{{ getText }}</span>
        </span>
        <span class="Text">
          <span class="norColor">占比<b class="big">20</b>%,</span>
          <span class="Ccolor"><span>↑</span><span>↓</span>20%</span>
        </span>
      </div>
      <div class="Dcont">
        <span class="Text">
          <span class="TextDeng Dcolor">D<sup>+</sup></span>
          <span class="Dcolor"> <b class="big">1</b>{{ getText }}</span>
        </span>
        <span class="Text">
          <span class="norColor">占比<b class="big">20</b>%,</span>
          <span class="Dcolor"><span>↑</span><span>↓</span>20%</span>
        </span>
      </div>
      <div class="Econt">
        <span class="Text">
          <span class="TextDeng Ecolor">E<sup>+</sup></span>
          <span class="Ecolor"> <b class="big">1</b>{{ getText }}</span>
        </span>
        <span class="Text">
          <span class="norColor">占比<b class="big">20</b>%,</span>
          <span class="Ecolor"><span>↑</span><span>↓</span>20%</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ScoreDis",
  data() {
    return {
      activeSpan: 0, //0-学校，1-班级，2-学生
    };
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
  mounted() {},
  methods: {
    //切换按钮
    checkButton(n) {
      this.activeSpan = n;
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
    font-size: 16px;
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
    left: 285px;
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
    left: 282px;
    top: 93px;
    text-align: right;
  }
  .Econt {
    position: absolute;
    left: 276px;
    top: 226px;
    text-align: right;
  }
}
</style>
