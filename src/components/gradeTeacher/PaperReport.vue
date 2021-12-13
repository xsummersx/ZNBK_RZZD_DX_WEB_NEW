<!--
 * @Author: 柳欢
 * @Date: 2021-12-10 15:21:45
 * @LastEditTime: 2021-12-13 16:02:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\gradeTeacher\PaperReport.vue
-->
<template>
  <div class="schoolReport">
    <ArrowTitle titleStr="学生认知成绩单">
      <div class="rightOption float-r">
        <div
          class="exportScore float-r"
          style="margin-right: 0px"
          @click="GetScoreReport()"
        >
          <span class="exportIcon"></span>
          导出成绩单
        </div>
        <div class="float-r splitLine"></div>
        <input
          class="float-r stuInput"
          type="text"
          placeholder="请输入班级名称搜索..."
          v-model="ClassSearchText"
          @input="showDelateIcon2()"
          v-on:keyup.enter="searchStu()"
        />
        <span
          class="searchIcon"
          style="right: 146px"
          @click="searchStu()"
        ></span>
      </div>
    </ArrowTitle>

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
      <el-table-column prop="Index" label="累计作答试卷" width="70">
        <template slot-scope="scope">
          <span class="gray">
            {{ scope.row.Index }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="Index" label="试卷平均得分率" width="80">
        <template slot-scope="scope">
          <span class="gray">
            {{ scope.row.Index }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="Index" label="预估成绩" width="80">
        <template slot-scope="scope">
          <span class="gray">
            {{ scope.row.Index }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="Index" label="班级排名" width="80">
        <template slot-scope="scope">
          <span class="gray">
            {{ scope.row.Index }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="Index" label="年级排名" width="80">
        <template slot-scope="scope">
          <span class="gray">
            {{ scope.row.Index }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="认知分">
        <el-table-column
          prop="VocabularyScore"
          :render-header="renderHeader"
          :label="'词汇认知分 (满分' + resInfo.VocalFullIndex + '分)'"
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
          :label="'语法认知分 (满分' + resInfo.GrammerFullIndex + '分)'"
          width="100"
        >
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.GrammerScore }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="CurrentIndex"
          :render-header="renderHeader"
          :label="'综合认知分 (满分' + resInfo.FullIndex + '分)'"
          width="100"
        >
          <template slot-scope="scope">
            <span class="yellow">
              {{ scope.row.CurrentIndex }}
            </span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="语言能力">
        <el-table-column prop="TL" label="听力" width="60">
          <template slot-scope="scope">
            <span class="gray">
              <!-- <span
                  :class="
                    scope.row.TL == '较好'
                      ? 'goodWord'
                      : scope.row.TL == '一般'
                      ? 'generalWord'
                      : scope.row.TL == '较差'
                      ? 'badWord'
                      : 'noWord'
                  "
                > -->
              {{ scope.row.TL }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="YD" label="阅读" width="60">
          <template slot-scope="scope">
            <span class="gray">
              <!-- <span
                  :class="
                    scope.row.YD == '较好'
                      ? 'goodWord'
                      : scope.row.YD == '一般'
                      ? 'generalWord'
                      : scope.row.YD == '较差'
                      ? 'badWord'
                      : 'noWord'
                  "
                > -->
              {{ scope.row.YD }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="XZ" label="写作" width="60">
          <template slot-scope="scope">
            <span class="gray">
              <!-- <span
                  :class="
                    scope.row.XZ == '较好'
                      ? 'goodWord'
                      : scope.row.XZ == '一般'
                      ? 'generalWord'
                      : scope.row.XZ == '较差'
                      ? 'badWord'
                      : 'noWord'
                  "
                > -->
              {{ scope.row.XZ }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="KY" label="口语" width="60">
          <template slot-scope="scope">
            <span class="gray">
              <!-- <span
                  :class="
                    scope.row.KY == '较好'
                      ? 'goodWord'
                      : scope.row.KY == '一般'
                      ? 'generalWord'
                      : scope.row.KY == '较差'
                      ? 'badWord'
                      : 'noWord'
                  "
                > -->
              {{ scope.row.KY }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="ZH" label="综合" width="60">
          <template slot-scope="scope">
            <!-- <span class="gray"> -->
            <span
              :class="
                scope.row.ZH == '较好'
                  ? 'goodWord'
                  : scope.row.ZH == '一般'
                  ? 'generalWord'
                  : scope.row.ZH == '较差'
                  ? 'badWord'
                  : 'noWord'
              "
            >
              {{ scope.row.ZH }}
            </span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="查看详情" width="98">
        <template slot-scope="scope">
          <span
            class="checkDetail"
            @click="
              toStudentRZZD2(
                scope.row.StuID,
                scope.row.StuName,
                scope.row.CourseClassID
              )
            "
          >
            {{ scope.row.GenreName || scope.row.TypeName }}
          </span>
        </template>
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
      emptyText: "暂无数据",
      resInfo: {
        VocalFullIndex: 1000,
        GrammerFullIndex: 1000,
        FullIndex: 1000,
        FullScore: 1000,
      },
      ClassSearchText:"",
      StuCount: 7,
      // 默认显示第几页
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      showList: [{}],
    };
  },
  methods: {
    handleSizeChange(val) {
      // 改变每页显示的条数
      if (this.$route.query.str == "gradeLeader") {
        this.PageSize2 = val;
      }
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      this.emptyText = "加载中...";
    },
    // 搜索学生
    searchStu() {
      this.emptyText = "加载中...";
      this.currentPage = 1;
    },
    renderHeader(h, { column }) {
      let header = column.label.split(" ");
      return [h("p", [h("p", {}, header[0]), h("span", {}, header[1])])];
    }, // 文本分别添加到p,span标签中
  },
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
  },
};
</script>

<style>
.rightOption {
  position: relative;
}
</style>