<!--
 * @Author: your name
 * @Date: 2021-12-16 15:14:38
 * @LastEditTime: 2021-12-20 08:59:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\dialog\historyDialog.vue
-->
<template>
  <div class="historyDialogBox">
    <div class="topBox">
      <div class="clearfix">
        <div class="float-l checkAll" @click="checkAll()">
          <span
            class="checkAllBtn"
            :class="checkedAll ? 'checkedAllBtn' : ''"
          ></span>
          <span>全选</span>
        </div>
        <div class="float-r" style="position: relative">
          <input
            class="stuInput"
            type="text"
            placeholder="请输入试卷名称搜索..."
            v-model="PaperSearchText"
            @input="showDelateIcon2()"
            v-on:keyup.enter="searchPaper()"
          />
          <span class="searchIcon" @click="searchPaper()"></span>
        </div>
      </div>
      <div class="paperBox">
        <ul class="clearfix">
          <li
            class="float-l PaperLi"
            :class="item.checked ? 'checkedPaperLi' : ''"
            v-for="(item, index) in paperList"
            :key="item.index"
            @click="checkPaper(index)"
          >
            <span>得分率</span><br />
            <span class="num">{{ item.scoreRate }}</span
            >%<br />
            <span class="paperName">{{ item.paperName }}</span>
          </li>
        </ul>
      </div>

      <div class="paginationBox" v-if="PaperNum1 > 5">
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="PageSize"
          layout=" prev, pager, next,total,  jumper"
          :total="PaperNum1"
        >
        </el-pagination>
      </div>
    </div>
    <div class="bottomBox">
      <div class="firstLine">
        <div>
          根据您选择的<span class="num">7</span>份试卷，系统生成如下对比分析表:
          <span class="refreshContent">
            <span class="refreshIcon"></span><span>更新试卷对比分析表</span>
          </span>
        </div>
        <div class="exportPaper">
          <span class="exportIcon"></span>
          导出试卷对比分析
        </div>
      </div>
      <div class="table">
        <table>
            <thead>
            
          <tr>
            <th>序号</th>
            <th>试卷名称</th>
            <th>总分</th>
            <th>年级平均得分</th>
            <th>主观题得分</th>
            <th v-for="(item, index) in paperList2[0].firstList" :key="index">
              {{ item.name }}
            </th>
            <th>客观题得分</th>
            <th v-for="(item, index) in paperList2[0].secondList" :key="index">
              {{ item.name }}
            </th>
          </tr>
            </thead>
          <tbody>
            <tr v-for="(item, index) in paperList2" :key="index">
              <td>{{ item.index }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.score }}</td>
              <td>{{ item.gradeScore }}</td>
              <td>{{ item.firstScore }}</td>
              <td v-for="(item2, index2) in item.firstList" :key="index2">
                {{ item2.score }}
              </td>
              <td>{{ item.secondScore }}</td>
              <td v-for="(item2, index2) in item.secondList" :key="index2">
                {{ item2.score }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="paginationBox" style="margin-top:40px" v-if="PaperNum2 > 5">
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="PageSize"
          layout=" prev, pager, next,total,  jumper"
          :total="PaperNum2"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkPaperIndex: 0,
      checkedAll: false,
      PaperSearchText: "",
      PaperNum1: 10,
      PaperNum5: 10,
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 16,
      paperList: [
        {
          scoreRate: 65,
          paperName: "2021年嘉兴市实...",
          checked: true,
        },
        {
          scoreRate: 65,
          paperName: "2021年嘉兴市实...",
          checked: true,
        },
        {
          scoreRate: 65,
          paperName: "2021年嘉兴市实...",
          checked: false,
        },
        {
          scoreRate: 65,
          paperName: "2021年嘉兴市实...",
          checked: false,
        },
        {
          scoreRate: 65,
          paperName: "2021年嘉兴市实...",
          checked: true,
        },
        {
          scoreRate: 65,
          paperName: "2021年嘉兴市实...",
          checked: true,
        },
        {
          scoreRate: 65,
          paperName: "2021年嘉兴市实...",
          checked: false,
        },
        {
          scoreRate: 65,
          paperName: "2021年嘉兴市实...",
          checked: false,
        },
        {
          scoreRate: 65,
          paperName: "2021年嘉兴市实aaaaaaaa",
          checked: false,
        },
        {
          scoreRate: 65,
          paperName: "2021年嘉兴市实...",
          checked: false,
        },
        {
          scoreRate: 65,
          paperName: "2021年嘉兴市实...",
          checked: false,
        },
      ],

      paperList2: [
        {
          index: 1,
          name: "2021年嘉兴实...",
          score: 55,
          gradeScore: 44,
          firstScore: 77,
          firstList: [
            { name: "书面表达1", score: 11 },
            { name: "书面表达2", score: 22 },
            { name: "书面表达3", score: 33 },
          ],
          secondScore: 44,
          secondList: [
            { name: "书面表达4", score: 11 },
            { name: "书面表达5", score: 44 },
            { name: "书面表达6", score: 66 },
          ],
        },{
          index: 1,
          name: "2021年嘉兴实...",
          score: 55,
          gradeScore: 44,
          firstScore: 77,
          firstList: [
            { name: "书面表达1", score: 11 },
            { name: "书面表达2", score: 22 },
            { name: "书面表达3", score: 33 },
          ],
          secondScore: 44,
          secondList: [
            { name: "书面表达4", score: 11 },
            { name: "书面表达5", score: 44 },
            { name: "书面表达6", score: 66 },
          ],
        },{
          index: 1,
          name: "2021年嘉兴实...",
          score: 55,
          gradeScore: 44,
          firstScore: 77,
          firstList: [
            { name: "书面表达1", score: 11 },
            { name: "书面表达2", score: 22 },
            { name: "书面表达3", score: 33 },
          ],
          secondScore: 44,
          secondList: [
            { name: "书面表达4", score: 11 },
            { name: "书面表达5", score: 44 },
            { name: "书面表达6", score: 66 },
          ],
        },
        {
          index: 1,
          name: "2021年嘉兴实...",
          score: 55,
          gradeScore: 44,
          firstScore: 33,
          firstList: [
            { name: "书面表达7", score: 11 },
            { name: "书面表达8", score: 34 },
            { name: "书面表达9", score: 45 },
          ],
          secondScore: 87,
          secondList: [
            { name: "书面表达1", score: 11 },
            { name: "书面表达2", score: 56 },
            { name: "书面表达3", score: 234 },
          ],
        },
        {
          index: 1,
          name: "2021年嘉兴实...",
          score: 55,
          gradeScore: 44,
          firstScore: 33,
          firstList: [
            { name: "书面表达234", score: 1232 },
            { name: "书面表达34", score: 23 },
            { name: "书面表达234", score: 113 },
          ],
          secondScore: 46,
          secondList: [
            { name: "书面表达234", score: 456 },
            { name: "书面表达234", score: 234 },
            { name: "书面表达234", score: 3432 },
          ],
        },
        {
          index: 1,
          name: "2021年嘉兴实...",
          score: 55,
          gradeScore: 44,
          firstScore: 72,
          firstList: [
            { name: "书面表达123", score: 23 },
            { name: "书面表达123", score: 2343 },
            { name: "书面表达123", score: 143441 },
          ],
          secondScore: 37,
          secondList: [
            { name: "书面表达123", score: 1561 },
            { name: "书面表达123", score: 34 },
            { name: "书面表达123", score: 56 },
          ],
        },
      ],
    };
  },
  mounted() {
    this.PaperNum1 = this.paperList.length;
    this.PaperNum2 = this.paperList2.length;
  },
  methods: {
    checkPaper(i) {
      this.checkPaperIndex = i;
      this.paperList[i].checked = !this.paperList[i].checked;
      this.checkedAll = this.paperList.every(function (item) {
        return item.checked;
      });
    },
    checkAll() {
      console.log(this.checkedAll);
      this.checkedAll = !this.checkedAll;
      for (let i = 0; i < this.paperList.length; i++) {
        if (this.checkedAll) {
          this.paperList[i].checked = true;
        } else {
          this.paperList[i].checked = false;
        }
      }
    },
    searchPaper() {
      console.log(this.PaperSearchText);
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // this.showList = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.historyDialogBox {
  width: 960px;
  height: 810px;
  background-color: rgba(0, 0, 51, 0.3);
  border-radius: 4px;
  margin: 20px auto;
  .topBox {
    padding: 20px;
    border-bottom: solid 1px #0070c6;
  }
}
.checkAll {
  color: #fff;
  cursor: pointer;
  .checkAllBtn {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #1973d5;
    border-radius: 1px;
    border: solid 1px #79d1ff;
    vertical-align: middle;
    margin-right: 10px;
  }
  .checkedAllBtn::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 16px;
    border-radius: 2px;
    border-bottom: 3px solid rgb(81, 238, 81);
    border-right: 3px solid rgb(81, 238, 81);
    transform: rotate(45deg);
    position: relative;
    top: -3px;
    left: 4px;
  }
}
.paperBox {
  margin-top: 25px;
  ul {
    li {
      cursor: pointer;
      width: 115px;
      height: 64px;
      color: #0078ff;
      font-size: 12px;
      padding-top: 18px;
      text-align: center;
      margin-bottom: 35px;
      background: url("../../assets/img/grade/试卷_未选.png") center center
        no-repeat;
      .num {
        font-family: "Oswald";
        font-size: 16px;
      }
      .paperName {
        display: inline-block;
        width: 100px;
        color: rgba(255, 255, 255, 0.7);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 5px;
      }
    }

    .checkedPaperLi {
      background: url("../../assets/img/grade/试卷_选中.png") center center
        no-repeat;
      position: relative;
      .paperName {
        color: rgba(255, 255, 255, 1);
      }
    }
    .checkedPaperLi::after {
      content: "";
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url("../../assets/img/grade/勾.png") center center no-repeat;
      position: absolute;
      top: -4px;
      right: 22px;
    }
  }
}
.searchIcon {
  right: 10px;
}
.bottomBox {
  padding: 20px;
  .firstLine {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
    .num {
      color: #ffcc00;
      text-decoration: underline;
      margin: 0 5px;
    }
    .refreshContent {
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      text-decoration: underline;
      .refreshIcon {
        display: inline-block;
        width: 18px;
        height: 16px;
        background: url("../../assets/img/grade/refreshIcon.png") -18px -0px
          no-repeat;
        vertical-align: top;
        margin-right: 5px;
      }
      &:hover {
        color: rgba(255, 255, 255, 1);
        .refreshIcon {
          background: url("../../assets/img/grade/refreshIcon.png") 0 -0px no-repeat;
        }
      }
    }
  }
  .exportPaper {
    width: 152px;
    height: 28px;
    font-size: 14px;
    cursor: pointer;
    font-weight: normal;
    line-height: 28px;
    color: #ffffff;
    text-align: center;
    background: url("../../assets/img/grade/exportPaper.png") -0px -28px
      no-repeat;
    .exportIcon {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url("../../assets/img/common/exportIcon.png") center center
        no-repeat;
      position: relative;
      top: 2px;
    }
    &:hover {
      background: url("../../assets/img/grade/exportPaper.png") -0px -0px
        no-repeat;
    }
  }
}
.table {
  overflow-x: scroll;
margin-top: 10px;
  table {
    border-collapse: collapse;
    border: solid 1px rgba(255, 255, 255, 0.2);
    width: max-content;
    tr {
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    tr:nth-of-type(even) {
      background-color: rgba(87, 166, 255, 0.08);
    }
    tr:hover {
      background-color: rgba(87, 166, 255, 0.3);
    }
    th {
      color: #fff;
      font-weight: bold;
      background-color: rgba(126, 172, 255, 0.2);
      border: solid 1px rgba(255, 255, 255, 0.1);
    }
    th:nth-child(1) {
      width: 90px;
    }
    th:nth-child(2) {
      width: 130px;
    }
    th:nth-child(3) {
      width: 80px;
    }
    th:nth-child(4) {
      width: 100px;
    }
    td:nth-child(5) {
      border-left: solid 1px rgba(255, 255, 255, 0.1);
    }

    td {
      width: 100px;
      color: rgba(255, 255, 255, 0.6);
    }
    td:nth-child(1) {
      color: rgba(255, 255, 255, 0.6);
    }
    td:nth-child(2) {
      color: rgba(255, 255, 255, 1);
    }
    td:nth-child(3) {
      color: #51f0ff;
    }
    td:nth-child(4) {
      color: #fff600;
    }
  }
}
::-webkit-scrollbar {
  width: 10px;
  background: rgba(87, 166, 255, 0.2);
  height: 10px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  width: 10px;
  height: 10px;
  border: 1px solid transparent;
}

// ::-webkit-scrollbar-track {
//   box-shadow: 1px 1px 5px rgba(55, 92, 134, 0.5) inset;
// }

::-webkit-scrollbar-thumb {
  width: 120px;
  min-height: 20px;
  background: #98c8ff;
  border-radius: 22px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px #98c8ff inset;
}

::-webkit-scrollbar-corner {
  background: red;
}
::-webkit-scrollbar-button {
  display: none;
}
</style>