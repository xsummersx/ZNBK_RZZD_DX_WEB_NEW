<!--
 * @Author: your name
 * @Date: 2022-02-22 19:44:50
 * @LastEditTime: 2022-02-22 20:31:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\eduSchool\SchoolInfoTable.vue
-->
<template>
  <div style="padding: 20px">
    <div class="exportScore float-r" style="margin-bottom: 10px; margin-right: 0px; color: #fff">
      <span class="exportIcon"></span>
      导出成绩单
    </div>
    <el-table
      :empty-text="emptyText"
      :data="showList"
      height="278"
      style="width: 100%; height: 305px"
      class="bueatyScroll"
    >
      <el-table-column prop="SchoolName" label="学校名称" width="218">
        <template slot-scope="scope">
          <span class="gray noWrap">
            {{ scope.row.SchoolName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="AnsweredPaperNum" label="累计作答试卷" width="140">
        <template slot-scope="scope">
          <span class="gray">
            {{ scope.row.AnsweredPaperNum }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="PaperScoreRate" label="平均正确率" width="140">
        <template slot-scope="scope">
          <span class="gray">
            {{ scope.row.PaperScoreRate }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="CurrentIndex" label="认知平均分" width="140">
        <template slot-scope="scope">
          <span class="gray"> {{ scope.row.CurrentIndex }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="PredictedScore" label="高考预估成绩" width="140">
        <template slot-scope="scope">
          <span class="gray">
            {{ scope.row.PredictedScore }}
          </span>
        </template>
      </el-table-column>
      <template slot="empty" v-if="emptyText == '加载中...'">
        <div class="table-loading-block">加载中...</div>
      </template>
      <template slot="empty" v-else>
        <div class="table-empty-block">暂无认知情况数据噢~</div>
      </template>
    </el-table>
    <div class="paginationBox">
      <!--v-if="StuCount > 5"-->
      <el-pagination
        class="pagination"
        style="margin-top: 10px"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="PageSize"
        layout=" prev, pager, next,total,  jumper"
        :total="StuCount"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    TabList: Array,
  },
  data() {
    return {
      emptyText: "暂无数据",
      showList: [],
      //总数
      StuCount: 0,
      // 默认显示第几页
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 5,
    };
  },

  mounted() {
    let List = this.TabList;
    this.showList = List.slice(0, 5);
    this.StuCount = List.length;
  },

  methods: {
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      this.emptyText = "加载中...";
      this.getTable(val, 5, "");
    },
    getTable(nowNum, isAll) {
      this.showList = this.TabList.slice((nowNum - 1) * isAll, nowNum * isAll);
    },
  },
};
</script>
<style scoped>
.el-table ::v-deep .el-table__cell {
  padding: 11px 0 !important;
}
.noWrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
