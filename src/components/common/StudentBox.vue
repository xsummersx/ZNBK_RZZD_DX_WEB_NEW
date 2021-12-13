<!--
 * @Author: your name
 * @Date: 2021-12-13 14:28:53
 * @LastEditTime: 2021-12-13 15:11:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\common\studentBox.vue
-->
<template>
  <div class="students-box">
    <div class="box-title">
      {{ titleStr }}<span class="small-title">TOP3</span>
    </div>
    <div class="clearfix">
      <div
        class="float-l stu-box"
        v-for="(item, index) in stulist"
        :key="index"
      >
        <span class="stu-rank">{{ item.stuRank }}</span>
        <span class="stu-name">{{ item.stuName }}</span
        ><br />
        <span class="stu-paperNum">{{ item.stuPaperNum }}<span>份</span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleStr: String,
    stulist: Array,
  },
};
</script>

<style lang="scss" scoped>
.students-box {
  width: 380px;
  height: 90px;
  padding: 13px 18px;
  background: url("../../assets/img/teacher/重点关注学生BG.png") center center
    no-repeat;
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
        line-height: 1.5;
        border-radius: 100%;
        font-size: 12px;
        color: #666666;
        margin-right: 5px;
        background-image: linear-gradient(180deg, #dbdbdb 0%, #bababa 100%);
          vertical-align: middle;
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
        margin-left: 13px;
        display: inline-block;
        span {
          font-size: 12px;
          font-family: "MicrosoftYaHei";
          vertical-align: middle;
        }
      }
    }
  }
}
</style>