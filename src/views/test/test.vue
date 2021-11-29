<!--
 * @Author: 柳欢
 * @Date: 2021-07-30 14:36:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-29 14:56:38
 * @Description: 
-->
<template>
  <div></div>
</template>
<script>
import { getUserInfo } from "./../../api/head/getUserInfo.js";
import { saveInfo } from "./../../api/head/getUserInfo.js";
export default {
  data() {
    return {};
  },
  mounted() {
    //get 接口
    let params = {
      Token: "402cf056-f4e2-4ca1-9b6b-0949a57b8787",
      UserID: "J112602",
    };
    getUserInfo(params).then((res) => {
      console.log(res);
    });
    let data = {
      CourseClassID: "A2F60AAA-9D61-4F32-A33C-A8D09ADA699F",
      ImagePath: "",
      Layer: "7",
      PaperID: "Paperf8d44e14f3994329bcb6f23dc8659b23",
      QuesID: "b86f031214b44aa7b85e5cb082970ae1",
      SchoolID: "S2-000040-0E73",
      SolutionContent: "",
      State: 1,
      TID: "J112602",
    };
    //post接口
    saveInfo(params, data).then((res) => {
      console.log(res);
    });
  },
};
</script>
