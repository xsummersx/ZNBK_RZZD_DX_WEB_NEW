<!--
 * @Author: your name
 * @Date: 2021-12-13 14:28:53
 * @LastEditTime: 2021-12-14 15:31:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\common\studentBox.vue
-->
<template>
  <div class="students-box">
    <div class="box-title">{{ titleStr }}<span class="small-title">TOP3</span></div>
    <div class="clearfix">
      <div class="float-l stu-box" v-for="(item, index) in stulist" :key="index">
        <span
          :class="
            item.Rank == 1
              ? 'rank1'
              : item.Rank == 2
              ? 'rank2'
              : item.Rank == 3
              ? 'rank3'
              : 'stu-rank'
          "
          class="float-l"
          >{{ item.Rank > 3 ? item.Rank : "" }}</span
        >
        <span class="float-l" style="text-align: left">
          <span class="stu-name">{{ item.Name }}</span
          ><br />
          <span
            class="stu-paperNum"
            :class="arrIndex == 3 ? (item.Num >= 0 ? 'greenNum' : 'redNum') : ''"
            >{{ item.Num }}<span v-if="arrIndex == 1">份</span
            ><span v-else-if="arrIndex == 2">分</span><span v-else>名</span></span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleStr: String,
    stulist: Array,
    arrIndex: String,
  },
  mounted() {
    console.log(this.index);
  },
};
</script>

<style lang="scss" scoped>
.students-box {
  width: 380px;
  height: 90px;
  padding: 13px 18px;
  background: url("~@/assets/img/teacher/重点关注学生BG.png") center center no-repeat;
  .box-title {
    font-family: YouSheBiaoTiHei;
    font-size: 16px;
    margin-bottom: 5px;
    color: #00aaff;
    .small-title {
      font-size: 12px;
    }
  }
  .clearfix {
    display: flex;
    .stu-box {
      flex: 1;
      text-align: center;
      .stu-rank {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 100%;
        font-size: 12px;
        color: #666666;
        margin-right: 5px;
        background: url("~@/assets/img/grade/其他名次BG.png") center center no-repeat;
        vertical-align: middle;
      }
      .rank1,
      .rank2,
      .rank3 {
        display: inline-block;
        width: 22px;
        height: 29px;
        margin-right: 5px;
        background: url("~@/assets/img/grade/第一名.png") center center no-repeat;
      }
      .rank2 {
        background: url("~@/assets/img/grade/第二名.png") center center no-repeat;
      }
      .rank3 {
        background: url("~@/assets/img/grade/第三名.png") center center no-repeat;
      }
      .stu-name {
        font-size: 14px;
        vertical-align: middle;
        color: #ffffff;
      }
      .stu-paperNum {
        color: #ffffff;
        opacity: 0.5;
        font-family: "ArialMT";
        font-size: 18px;
        margin-top: 5px;
        display: inline-block;
        letter-spacing: 0;
        span {
          font-size: 12px;
          font-family: "MicrosoftYaHei";
          vertical-align: middle;
        }
      }
      .greenNum {
        color: springgreen;
        padding-left: 10px;
        background: url("../../assets/img/common/升.png") center left no-repeat;
      }
      .redNum {
        color: #ff8080;
        padding-left: 10px;
        background: url("../../assets/img/common/升.png") center left no-repeat;
      }
    }
  }
}
</style>
