<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-09 11:18:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教师，语言能力
-->
<template>
  <div class="right-small-box">
    <div class="box-title clearfix">
      <span class="float-l title">语言能力</span>
      <span class="float-r check-icon"><i></i>班级语言能力对比分析</span>
    </div>
    <div class="main">
      <div class="left">
        <div class="yd">
          <span class="result bad">较差</span>
          <span class="textSize-12 color">阅读能力</span>
        </div>
        <div class="tl">
          <span class="result general">一般</span>
          <span class="textSize-14 color">听力能力</span>
        </div>
      </div>
      <div class="middle">
        <span class="result general">一般</span>
        <span class="textSize-12 color">综合能力</span>
      </div>
      <div class="right">
        <div class="xz">
          <span class="result general">一般</span>
          <span class="textSize-12 color">写作能力</span>
        </div>
        <div class="ky">
          <span class="result good">较好</span>
          <span class="textSize-14 color">口语能力</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ydResult: "bad",
      tlResult: "general",
      zhResult: "general",
      xzResult: "general",
      kyResult: "good",
    };
  },
};
</script>

<style lang="scss" scoped>
.right-small-box {
  margin-right: 30px;
}
.color {
  color: #ddd;
}
.textSize-12 {
  font-size: 12px;
}
.textSize-14 {
  font-size: 14px;
}
.main {
  margin: 20px auto 0;
  width: 356px;
  height: 162px;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  // align-items: center;
  background: url(~@/assets/img/grade/宇宙圆环轨迹.png) center center no-repeat;
}
.bad {
  color: #ff8080;
}
.general {
  color: #60ff60;
}
.good {
  color: #00c6ff;
}
.left {
  .yd {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    background: url(~@/assets/img/grade/左后较差.png) center center no-repeat;
    .result {
      font-size: 16px;
    }
  }
  .tl {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 88px;
    height: 88px;
    background: url(~@/assets/img/grade/一般中号.png) center center no-repeat;
    .result {
      font-size: 20px;
    }
  }
}
.middle {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  background: url(~@/assets/img/grade/中间一般.png) center center no-repeat;
  .result {
    font-size: 16px;
  }
}
.right {
  .xz {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background: url(~@/assets/img/grade/右后一般.png) center center no-repeat;
    .result {
      font-size: 14px;
    }
  }
  .ky {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background: url(~@/assets/img/grade/较好大号.png) center center no-repeat;
    .result {
      font-size: 22px;
    }
  }
}
</style>
