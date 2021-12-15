<!--
 * @Author: your name
 * @Date: 2021-12-14 13:56:07
 * @LastEditTime: 2021-12-14 14:04:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\dialog\StuReport.vue
-->
<template>
  <div class="bottom-box">
    <div class="exportBtn float-r">
      <span class="exportIcon"></span>
      导出班级成绩对比分析
    </div>
    <el-table
      :empty-text="emptyText"
      :data="showList"
      height="305"
      style="width: 100%; height: 305px"
    >
      <el-table-column prop="Index" label="序号" width="80">
        <template slot-scope="scope">
          <span class="gray">
            {{ scope.row.Index }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="StuName" label="姓名" width="100">
        <template slot-scope="scope">
          <div>
            <img class="stuPhoto" :src="scope.row.PhotoPath" alt="" />
            <span class="stuname" :title="scope.row.StuName">{{
              scope.row.StuName
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="StuName" label="班级" width="80">
        <template slot-scope="scope">
          <div>
            <img class="stuPhoto" :src="scope.row.PhotoPath" alt="" />
            <span class="stuname" :title="scope.row.StuName">{{
              scope.row.StuName
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="StuName" label="总分" width="80">
        <template slot-scope="scope">
          <div>
            <img class="stuPhoto" :src="scope.row.PhotoPath" alt="" />
            <span class="stuname" :title="scope.row.StuName">{{
              scope.row.StuName
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="StuName" label="年级排名" width="80">
        <template slot-scope="scope">
          <div>
            <img class="stuPhoto" :src="scope.row.PhotoPath" alt="" />
            <span class="stuname" :title="scope.row.StuName">{{
              scope.row.StuName
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Index" label="班级排名" width="80">
        <template slot-scope="scope">
          <span class="gray">
            {{ scope.row.Index }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="客观题">
        <el-table-column
          prop="VocabularyScore"
          :render-header="renderHeader"
          label="得分率"
          width="100"
        >
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.VocabularyScore }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="GrammerScore"
          :render-header="renderHeader"
          label="年级排名/班级排名"
          width="100"
        >
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.GrammerScore }}
            </span>
          </template>
        </el-table-column>
      </el-table-column>
      <template slot="empty" v-if="emptyText == '加载中...'">
        <div class="table-loading-block">加载中...</div>
      </template>
      <template slot="empty" v-else>
        <div class="table-empty-block">暂无学生认知成绩单数据噢</div>
      </template>
    </el-table>
    <div class="paginationBox" v-if="StuCount > 5">
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
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
    data() {
        return {
            StuCount:8
        }
    },
};
</script>
<style lang="scss" scoped>
.bottom-box {
  padding: 10px 20px;
  .exportBtn {
    width: 182px;
    height: 28px;
    line-height: 28px;
    margin-bottom: 10px;
    background: url("../../assets/img/viewImg/导出试卷题型得分分析.png") -0px -28px
      no-repeat;
    border-radius: 4px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    .exportIcon {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url("../../assets/img/common/exportIcon.png") center center
        no-repeat;
      position: relative;
      top: 2px;
    }
    &:active {
      background: url("../../assets/img/viewImg/导出试卷题型得分分析.png") -0px -0px
        no-repeat;
    }
    &:hover {
      background: url("../../assets/img/viewImg/导出试卷题型得分分析.png") -0px -56px
        no-repeat;
    }
  }
}
</style>