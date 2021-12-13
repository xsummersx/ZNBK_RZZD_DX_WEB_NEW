<!--
 * @Author: 柳欢
 * @Date: 2021-11-30 14:51:43
 * @LastEditTime: 2021-12-13 14:53:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教师的重点学生，和认知对比分析
-->
<template>
  <div>
    <ArrowTitle titleStr="重点关注学生"></ArrowTitle>
    <div class="clearfix">
    <StudentBox class="float-l one-box" :stulist='stulist' titleStr="作答试卷较少学生"></StudentBox>
    <StudentBox class="float-l" :stulist='stulist' titleStr="认知成绩最差学生"></StudentBox>
    <StudentBox class="float-l three-box" :stulist='stulist' titleStr="退步最大学生"></StudentBox>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stulist:[
        {stuRank:1,stuName:"张三三",stuPaperNum:10},
        {stuRank:1,stuName:"张三三",stuPaperNum:10},
        {stuRank:1,stuName:"张三三",stuPaperNum:10}
      ]
    }
  },
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
    StudentBox: () => import("../common/StudentBox.vue"),
  },
};
</script>

<style lang="scss" scoped>
.one-box{
  margin: 0 25px 0 40px;
}
.three-box{
  margin: 0 40px 0 25px;
}
</style>