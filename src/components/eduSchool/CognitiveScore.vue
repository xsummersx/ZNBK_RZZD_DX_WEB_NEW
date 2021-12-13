<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:22:09
 * @LastEditTime: 2021-11-30 14:24:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》认知平均分，图0，图1
-->
<template>
  <div class="left-Content-Box">
    <span class="title">认知平均分</span>
    <div class="main" v-if="userType === 'edu'">
      <div class="left">
        <div class="svg">
          <svg viewBox="0 0 100 100">
            <path
              d="
        M 50 50
        m 0 47
        a 47 47 0 1 1 0 -94
        a 47 47 0 1 1 0 94
        "
              stroke="#555"
              stroke-width="2"
              fill="none"
            ></path>
            <path
              d="
        M 50 50
        m 0 47
        a 47 47 0 1 1 0 -94
        a 47 47 0 1 1 0 94
        "
              stroke="orange"
              fill="none"
              stroke-linecap="round"
              stroke-width="6"
              style="
                stroke-dasharray: 220px, 295px;
                stroke-dashoffset: -36.9137px;
                transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s;
              "
            ></path>
          </svg>
          <div class="text">
            <span><span class="number">5419</span>分</span>
            <br />
            <span>总分:10000分</span>
          </div>
        </div>
      </div>
      <div class="middle" :class="level"></div>
      <div class="right">
        <span class="quantity" :class="status === 'up' ? 'up' : 'down'"
          >1200<span class="char">分</span></span
        >
        <span>较上周</span>
      </div>
    </div>
    <div class="main" v-if="userType === 'leader'">
      <div class="leader">
        <span class="textColor">全校平均认知分</span>
        <div class="left">
          <div class="svg">
            <svg viewBox="0 0 100 100">
              <path
                d="
        M 50 50
        m 0 47
        a 47 47 0 1 1 0 -94
        a 47 47 0 1 1 0 94
        "
                stroke="#ddd"
                stroke-width="2"
                fill="none"
              ></path>
              <path
                d="
        M 50 50
        m 0 47
        a 47 47 0 1 1 0 -94
        a 47 47 0 1 1 0 94
        "
                stroke="orange"
                fill="none"
                stroke-linecap="round"
                stroke-width="6"
                style="
                  stroke-dasharray: 220px, 295px;
                  stroke-dashoffset: -36.9137px;
                  transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s;
                "
              ></path>
            </svg>
            <div class="text">
              <span><span class="number">5419</span>分</span>
              <br />
              <span>总分:10000分</span>
            </div>
          </div>
        </div>
        <div class="compare">
          <i class="icon"></i>
          <span>较上周 </span>
          <span class="quantity" :class="status === 'up' ? 'up' : 'down'"
            >1200<span class="char">分</span></span
          >
        </div>
      </div>

      <div class="middle" :class="level"></div>
      <div class="right-leader">
        <span class="score">9095<span class="char">分</span></span>
        <span class="textColor">全区平均认知分</span>
      </div>
    </div>
    <div class="bottom" v-if="userType === 'edu'">
      <!-- 全区排行榜 -->
      <div class="bottomItem">
        <span class="bottomTitle icon1">全区排行榜<span class="top2">TOP2</span></span>
        <div class="content">
          <span>·嘉兴市实验中学</span>
          <span>·南湖实验中学</span>
        </div>
      </div>
      <!-- 重点关注 -->
      <div class="bottomItem">
        <span class="bottomTitle icon2">全区重点关注<span class="top2">TOP2</span></span>
        <div class="content">
          <span>·海盐中学</span>
          <span>·浙师大附属嘉善实验中学</span>
        </div>
      </div>
    </div>
    <div class="bottom-leader" v-if="userType === 'leader'">
      <!-- 本校区排名 -->
      <div class="bottomItem">
        <span class="bottomTitle">本校区排名</span>
        <div class="content">
          <span class="rank">第二名</span>
        </div>
      </div>
      <!-- 全区第一名学校 -->
      <div class="bottomItem">
        <span class="bottomTitle">全区第一名学校</span>
        <div class="content">
          <span class="schoolName">浙师大附属嘉善实验中学</span>
          <span class="schoolScore textColor">9095分</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "up",
      level: "A",
      userType: "leader",
    };
  },
};
</script>

<style lang="scss" scoped>
.textColor {
  color: #a2afcc;
}
.left-Content-Box {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 400px;
  height: 308px;
  background: url(~@/assets/img/teacher/认知平均分_bg.png) center center no-repeat;
  .title {
    margin-top: 6px;
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
  }
}
.main {
  width: 80%;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  margin: 30px 0 10px 0;
  justify-content: space-around;
  .left {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 122px;
    // margin-right: -32px;
    // background: url(~@/assets/img/teacher/总量表达.png) center center no-repeat;
    .svg {
      width: 100%;
      .text {
        position: absolute;
        margin-top: -108px;
        width: 128px;
        text-align: center;
      }
    }
    .number {
      font-size: 32px;
      font-family: Oswald;
    }
  }
  .middle {
    width: 64px;
    margin-top: -90px;
  }
  .A {
    background: url(~@/assets/img/teacher/小A+.png) center center no-repeat;
  }
  .B {
    background: url(~@/assets/img/teacher/小B+.png) center center no-repeat;
  }
  .C {
    background: url(~@/assets/img/teacher/小C+.png) center center no-repeat;
  }
  .D {
    background: url(~@/assets/img/teacher/小D+.png) center center no-repeat;
  }
  .E {
    background: url(~@/assets/img/teacher/小E+.png) center center no-repeat;
  }
  .right {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 122px;
    margin-left: -32px;
    background: url(~@/assets/img/teacher/较上周底座.png) center center no-repeat;
  }
  .quantity {
    padding-left: 12px;
    font-size: 18px;
    margin-bottom: 5px;
    font-family: ArialMT;
  }
  .up {
    background: url(~@/assets/img/teacher/升.png) 0px center no-repeat;
    color: #60ff60;
  }
  .down {
    background: url(~@/assets/img/teacher/降.png) 0px center no-repeat;
    color: #ff0000;
  }
  .char {
    font-size: 12px;
  }
  .leader {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    .compare {
      .icon {
        height: 22px;
        width: 37px;
        left: 110px;
        bottom: 460px;
        background: url(~@/assets/img/eduSchool/VS.png) center center no-repeat;
        position: absolute;
      }
    }
  }
  .right-leader {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    padding-top: 40px;
    // justify-content: center;
    align-items: center;
    width: 162px;
    height: 142px;
    background: url(~@/assets/img/eduSchool/全区平均统计.png) center center no-repeat;
    .score {
      font-size: 24px;
      //   margin-bottom: 5px;
      font-family: Oswald;
    }
  }
}
.bottom {
  display: flex;
  display: -webkit-flex;
  width: 94%;
  justify-content: space-around;
  .bottomItem {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    width: 180px;
    height: 90px;
    border-radius: 4px;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0)
    );
    .content {
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      margin: 0 0 0 25px;
      span {
        width: 150px;
        height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .bottomTitle {
    margin: 10px 0 10px 10px;
    padding-left: 20px;
    font-size: 16px;
    font-family: YouSheBiaoTiHei;
    color: #00aaff;
    .top2 {
      font-size: 12px;
      color: #0088cc;
    }
  }
  .icon1 {
    background: url(~@/assets/img/eduSchool/排行榜.png) 0px center no-repeat;
  }
  .icon2 {
    background: url(~@/assets/img/eduSchool/重点关注.png) 0px center no-repeat;
  }
}
.bottom-leader {
  display: flex;
  display: -webkit-flex;
  width: 94%;
  justify-content: space-around;
  .bottomItem {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    width: 180px;
    height: 60px;
    border-radius: 4px;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0)
    );
    .content {
      display: flex;
      display: -webkit-flex;
      margin: 0 0 0 15px;
      span {
        width: 150px;
        height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-family: YouSheBiaoTiHei;
        font-size: 18px;
        line-height: 28px;
      }
      .rank {
        height: 28px;
        background: url(~@/assets/img/eduSchool/第二名.png) 0px center no-repeat;
        padding-left: 30px;
        line-height: 28px;
      }
      //   .schoolName {
      //   }
      .schoolScore {
        width: 50px;
        font-size: 12px;
        font-family: MicrosoftYaHei;
      }
    }
  }
  .bottomTitle {
    margin: 3px 0 5px 0;
    padding-left: 15px;
    font-size: 16px;
    font-family: YouSheBiaoTiHei;
    color: #00aaff;
    background: url(~@/assets/img/teacher/标题小标签.png) 0px center no-repeat;
  }
}
</style>
