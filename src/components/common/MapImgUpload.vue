<!--
 * @Author: wutao
 * @Date: 2022-03-04 13:37:09
 * @LastEditTime: 2022-03-04 14:50:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 用作地图图片上传用的
-->
<template>
  <div class="boxx">
    <el-tag style="margin-right: 100px">当前区ID：{{ UserInfo.CountyID }}</el-tag>
    <!-- 图片上传 -->
    <el-upload action="" :on-change="fileChange" list-type="picture-card" :auto-upload="false">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { getUserInfo } from "@/api/head/header";
import obsFun from "@/assets/js/esdk-obs-browserjs-3.19.5.min.js";
export default {
  name: "MapImgUpload",
  data() {
    return {
      UserInfo: {},
      dialogImageUrl: "",
      dialogVisible: false,
      //OBS上传的参数
      ObsObject: {
        access_key_id: "",
        secret_access_key: "",
        server: "",
        BucketName: "",
        imgKey: "",
        videoKey: "",
        HttpPath: "",
      },
    };
  },
  mounted() {
    getUserInfo({ token: this.$route.query.token }).then((res) => {
      console.log(res);
      this.UserInfo = res.Data;
    });
    this.axios.get("/api/RZZD/GetObsInfo").then((res) => {
      console.log(res);
      let objInfo = res.Data;
      this.ObsObject.access_key_id = objInfo.AccessKeyID;
      this.ObsObject.secret_access_key = objInfo.SecretAccessKey;
      this.ObsObject.server = objInfo.ServerNoBucket;
      this.ObsObject.BucketName = objInfo.BucketName;
      this.ObsObject.imgKey = objInfo.SysOBSRelativePath + "/MapImages/";
      this.ObsObject.HttpPath = objInfo.ServerWithBucket;
    });
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传
    fileChange(file, fileList) {
      console.log(file);
      console.log(fileList);
      let obsClient = obsFun.obsN(this.ObsObject);
      var callback = function (transferredAmount, totalAmount) {
        // 获取上传进度百分比
        let ImgUploadPercent = (transferredAmount * 100.0) / totalAmount;
        console.log("上传进度：" + ImgUploadPercent);
        //进度条加载
        //that.loadLineShow = true;
        //that.loadPercent = this.ImgUploadPercent;
      };
      obsClient.putObject(
        {
          Bucket: this.ObsObject.BucketName,
          Key: this.ObsObject.imgKey + this.UserInfo.CountyID + ".png",
          SourceFile: file.raw,
          ProgressCallback: callback,
        },
        (err, result) => {
          if (err) {
            console.log(err);
            this.$message({
              message: "图片上传失败",
              duration: 2500,
              type: "warning",
              center: true,
            });
          } else {
            this.$message({
              message: "图片上成功",
              duration: 2500,
              type: "success",
              center: true,
            });
            console.log(result.CommonMsg.Status);
            console.log(this.ObsObject.imgKey + this.UserInfo.CountyID + ".png");
          }
        },
      );
    },
  },
};
</script>
<style scoped>
.boxx {
  width: 800px;
  height: 400px;
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
