<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-14 08:41:12
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
      <!-- <div class="left">
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
      </div> -->
      <div>
        <div class="listenAbility" :class="classToName(lanResInfo.TL)">
          <div class="abilityLV">
            {{ numToString(lanResInfo.TL) }}
          </div>
          <div class="ability">听力能力</div>
        </div>
        <div class="readAbility" :class="classToName(lanResInfo.YD)">
          <div class="abilityLV">
            {{ numToString(lanResInfo.YD) }}
          </div>
          <div class="ability">阅读能力</div>
        </div>
        <div class="speakAbility" :class="classToName(lanResInfo.KY)">
          <div class="abilityLV">
            {{ numToString(lanResInfo.KY) }}
          </div>
          <div class="ability">口语能力</div>
        </div>
        <div class="writeAbility" :class="classToName(lanResInfo.XZ)">
          <div class="abilityLV">
            {{ numToString(lanResInfo.XZ) }}
          </div>
          <div class="ability">写作能力</div>
        </div>
        <div class="allAbility" :class="classToName(lanResInfo.ZH)">
          <div class="abilityLV">
            {{ numToString(lanResInfo.ZH) }}
          </div>
          <div class="ability">综合能力</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetClassLanguage } from "../../api/paperTwo/question";
export default {
  data() {
    return {
      ydResult: "bad",
      tlResult: "general",
      zhResult: "general",
      xzResult: "general",
      kyResult: "good",
      lanResInfo: {
        ZH: 0,
        XZ: 0,
        KY: 0,
        YD: 0,
        TL: 0,
      },
    };
  },

  created() {
    let params = {
      SchoolID: "S4-000020-9AB3",
      CourseClassID: "6A04CCDA-0598-4D6E-9A06-C7155E8BD8F5",
      TID: "T1014003",
      Token: "02020590-babb-43b7-81b2-64ed8a94d848",
    };
    GetClassLanguage(params).then((res) => {
      console.log(res);
      this.lanResInfo = res.Data;
    });
  },
  mounted() {},
  methods: {
    // 数字转为字符串
    numToString(i) {
      switch (i) {
        case 0:
          return "--";
        case 1:
          return "较差";
        case 2:
          return "一般";
        case 3:
          return "较好";
        default:
          break;
      }
    },
    //返回样式
    classToName(i) {
      switch (i) {
        case 0:
          return "grayBox";
        case 1:
          return "redBox";
        case 2:
          return "greenBox";
        case 3:
          return "blueBox";
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.right-small-box {
  margin-right: 30px;
  position: relative;
}
.listenAbility,
.readAbility,
.speakAbility,
.allAbility,
.writeAbility {
  position: absolute;
  border-radius: 100%;
  text-align: center;
  font-size: 12px;
  line-height: 1.5;
  padding-top: 20px;
  .abilityLV {
    font-size: 16px;
  }
  .ability {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
  }
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
//
.listenAbility {
  width: 88px;
  height: 88px;
  top: 116px;
  left: 162px;
  .ability {
    font-size: 14px;
  }
}
.readAbility {
  width: 64px;
  height: 64px;
  top: 38px;
  left: 184px;
  padding-top: 10px;
  .abilityLV {
    font-size: 16px;
  }
}
.speakAbility {
  width: 100px;
  height: 100px;
  top: 138px;
  left: 356px;
  .abilityLV {
    font-size: 22px;
  }
  .ability {
    font-size: 14px;
  }
}
.writeAbility {
  width: 60px;
  height: 60px;
  top: 50px;
  left: 376px;
  padding-top: 5px;
}
.allAbility {
  width: 72px;
  height: 72px;
  top: 64px;
  padding-top: 10px;
  left: 280px;
  .abilityLV {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
