<!--
 * @Author: your name
 * @Date: 2022-03-14 09:57:04
 * @LastEditTime: 2022-03-14 14:39:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 认知成绩分布详情
-->
<template>
  <div class="main">
    <vuescroll :ops="$global_Ops.ops">
      <div class="content">
        <ul class="schoolBox">
          <li class="schoolItem" v-for="(item, index) in List" :key="index">
            <i v-if="typeNum != 2" class="schoolIcon" :class="{ classIcon: typeNum == 1 }"></i>
            <img class="studentIcon" v-if="typeNum == 2" :src="item.PhotoPath" />
            <span v-if="typeNum == 0" class="schoolText">{{ item.SchoolName }}</span>
            <span v-if="typeNum == 1" class="schoolText">{{ item.CourseClassName }}</span>
            <span v-if="typeNum == 2" class="schoolText">{{ item.StudentName }}</span>
          </li>
        </ul>
      </div>
    </vuescroll>
  </div>
</template>
<script>
import {
  GetDisDetailStudent,
  GetDisDetailSchool,
  GetDisDetailClass,
  GetDisDetailStudent2,
} from "@/api/eduSchool/right";
import vuescroll from "vuescroll";
export default {
  name: "DisDetail",
  props: {
    params: Object,
    openType: Array,
  },
  data() {
    return {
      typeNum: 0, //0-学校，1-班级，2-学生
      List: [],
    };
  },
  components: {
    vuescroll,
  },
  mounted() {
    if (this.openType[0] == "educationRZZD") {
      //教育局
      if (this.openType[1] == "school") {
        //学校
        GetDisDetailSchool(this.params).then((res) => {
          this.typeNum = 0;
          this.List = res.Data;
        });
      } else if (this.openType[1] == "student") {
        //学生
        GetDisDetailStudent(this.params).then((res) => {
          this.typeNum = 2;
          this.List = res.Data;
        });
      }
    } else if (this.openType[0] == "schoolRZZD") {
      //学校
      if (this.openType[1] == "class") {
        //班级
        GetDisDetailClass(this.params).then((res) => {
          this.typeNum = 1;
          this.List = res.Data;
        });
      } else if (this.openType[1] == "student") {
        //学生
        GetDisDetailStudent2(this.params).then((res) => {
          this.typeNum = 2;
          this.List = res.Data;
        });
      }
    }
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.main {
  width: 420px;
  height: 378px;
  margin: 20px auto;
  background: rgba(0, 0, 51, 0.2) !important;
  padding: 20px 0 20px 20px;

  .content {
    width: 400px;
    margin: 0 auto;
    min-height: 300px;
  }
}
.schoolBox {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  .schoolItem {
    padding: 0 12px;
    background: rgba(87, 166, 255, 0.3);
    overflow: hidden;
    border-radius: 3px;
    margin-right: 10px;
    margin-top: 10px;
    .schoolIcon {
      float: left;
      width: 20px;
      height: 22px;
      background: url("~@/assets/img/head/schoolIcon3.png") no-repeat center center;
      margin-right: 2px;
      margin-top: 9px;
    }
    .schoolText {
      float: left;
      line-height: 36px;
      color: #fff;
      font-size: 13px;
    }
    .classIcon {
      width: 26px;
      height: 26px;
      margin-top: 5px;
      background: url("~@/assets/img/head/classcheckIcon.png") no-repeat center center;
    }
    .studentIcon {
      float: left;
      width: 24px;
      height: 24px;
      margin-right: 2px;
      border-radius: 12px;
      margin-top: 6px;
      margin-right: 4px;
    }
  }
}
</style>
