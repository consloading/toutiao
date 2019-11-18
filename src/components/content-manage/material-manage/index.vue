<template>
  <div class="material">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图片管理</span>
      </div>
      <!-- 左侧按钮 -->
      <el-button-group>
        <el-button type="primary">全部</el-button>
        <el-button type="primary">收藏</el-button>
      </el-button-group>
      <!-- /左侧按钮 -->
      <!-- 右侧上传图片 -->
        <el-button type="primary" @click="centerDialogVisible = true" class="uploadimg">上传图片</el-button>
          <el-dialog title="提示" :visible.sync="centerDialogVisible" width="70%" center>
            <!-- 图片上传 -->
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            <!-- /图片上传 -->
            <!-- 点击上传 -->
             <span>用户图片</span>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
                <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload">开始上传</el-button>

              </el-upload>
            <!-- /点击上传 -->
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="centerDialogVisible = false">关闭</el-button>
            </span>
          </el-dialog>
      <!-- /右侧上传图片 -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'material',
  data () {
    return {
      imageUrl: '',
      value: '',
      centerDialogVisible: false
    }
  },
  // 方法
  methods: { submitUpload () {
    this.$refs.upload.submit()
  },
  handleRemove (file, fileList) {
    console.log(file, fileList)
  },
  handlePreview (file) {
    console.log(file)
  }
  },
  handleAvatarSuccess (res, file) {
    this.imageUrl = URL.createObjectURL(file.raw)
  },
  beforeAvatarUpload (file) {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isJPG && isLt2M
  }
}
</script>

<style lang="less" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #333;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed#999;
    margin:0 0 0 230px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .uploadimg{
    float: right;
    margin-right: 20px;
  }
</style>
