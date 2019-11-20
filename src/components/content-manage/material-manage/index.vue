<template>
  <div class="material">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图片管理</span>
      </div>
      <!-- 收藏筛选和上传图片 -->
      <div class="upload">
        <el-radio-group v-model="type"  @change="onFiltr">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="收藏">收藏</el-radio-button>
        </el-radio-group>
        <el-upload
        class="upload-demo"
        style="float:right"
        action = "http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers = "uploadHeaders"
        name="image"
        :on-success="onUploadSuccess"
        :show-file-list="false"
        >
          <el-button style="float: right; padding: 10px" type="primary">上传图片</el-button>
        </el-upload>

        <!-- 自己书写上传图片 -->
        <el-button style="float:right;margin-right:20px" type="success" @click="onUpload">user上传图片</el-button>
        <input type="file" hidden ref="file" @change="onFileChange">
        <!-- /自己书写上传图片 -->
      </div>
      <!-- 收藏筛选和上传图片 -->
    <!-- 中间图片区域 -->
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :sm="12"
          :md="4"
          v-for="item in userImg"
          :key="item.id">
           <el-card :body-style="{ padding: '0px' }">
            <img :src="item.url" class="image" height="220">
            <div style="padding: 14px;" class="img-icon">
              <i :class="{
                'el-icon-star-on': item.is_collected,
                'el-icon-star-off':!item.is_collected,
              }"
              @click="onChangeIcon(item)"
              ></i>
              <i class="el-icon-delete" @click="onDel(item.id)"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    <!-- /中间图片区域 -->
    </el-card>
    <div style="margin:0 auto; text-align:center;margin-top:30px;">
      <!-- 底部分页器 -->
      <el-pagination
        background
        :current-page="page"
        @current-change="onCurrentChange"
        layout="prev, pager, next"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
const token = window.localStorage.getItem('wmy-token')
export default {
  name: 'material',
  data () {
    return {
      userImg: [], // 用户的图片数据
      type: '全部', // 按钮的全部和收藏
      totalCount: 0, // 图片总条数
      page: 1, // 当前页码
      // 组件文件上传需要的请求头token
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  // 生命周期
  created () {
    this.GetUserImg() // 获取到用户的图片数据
  },
  // 方法
  methods: {
    // 如果什么都不传那么key值就为false 显示全部的，如果传值就按传的值来算
    GetUserImg (key = false, page) {
      this.$axios({
        method: 'GET',
        url: 'user/images',
        params: {
          collect: key,
          page,
          per_page: 10
        }
      }).then(res => {
        console.log(res.data)
        this.totalCount = res.data.data.total_count
        this.userImg = res.data.data.results
      }).catch(err => {
        console.log(err, '获取失败')
      })
    },
    // 全部和收藏的筛选功能
    onFiltr (key) {
      // 该函数是 radio 的 change 事件处理函数
      // 通过文档我们得知，事件函数有个回调参数：选中的 Radio label 值
      // 所以我们可以声明一个形参来接收使用
      console.log(key)
      // 判断 如果key当前的值不等于全部那么就是收藏，传过去的值true只显示收藏的
      // 如果当前key值为全部那么条件不成立传false过去，显示全部的图片
      this.GetUserImg(key !== '全部', this.page)
    },
    // 分页器改变
    onCurrentChange (page) {
      console.log(page)
      this.page = page
      // false显示为全部，如果需要实现分页
      console.log(this.type)
      this.GetUserImg(this.type === '收藏', page)
    },
    // 收藏
    onChangeIcon (key) {
      console.log(key)
      this.$axios({
        url: 'user/images/' + key.id,
        method: 'PUT',
        data: {
          collect: !key.is_collected
        }
      }).then(res => {
        console.log(res)
        this.GetUserImg()
        this.$message({
          type: 'success',
          message: '收藏成功'
        })
        // 更新视图展示
        key.is_collected = !key.is_collected
      }).catch(err => {
        console.log(err)
        this.$message.erroe('收藏失败，请稍后重试')
      })
    },
    // 删除
    onDel (id) {
      this.$axios({
        method: 'DELETE',
        url: 'user/images/' + id
      }).then(res => {
        this.GetUserImg()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('删除失败')
      })
    },
    // upload组件上传成功触发的事件
    onUploadSuccess () {
      this.GetUserImg(this.type !== '全部')
    },
    // 手动写上传图片
    onUpload () {
      // console.log(this.$refs.file) // 获取当前dom元素标签
      this.$refs.file.click() // 点击隐藏的上传文件这个按钮
    },
    // 隐藏的dom元素的文件上传 因为太丑所以隐藏
    onFileChange () {
      console.log(this.$refs.file.files)
      const fileObj = this.$refs.file.files[0] // 获取到一个数组，为上传文件的详细信息
      // console.log(fileObj)
      const formDate = new FormData()
      // 手动往formdata中添加成员
      formDate.append('image', fileObj)
      // 请求上传
      this.$axios({
        url: '/user/images',
        method: 'POST',
        // 我们常见的两种 Content-Type
        // application/json axios默认会设置
        // multipart/form-data 常用语文件上传
        // 错误的写法
        // 如果你提交的 data 是一个普通对象，axios 会自动把 Content-Type 设置为 application/json
        // data: {
        //   image: fileObj
        // }
        // 我们这里接口要求 Content-Type 为 multipart/form-data，所以需要使用 FormData 对象
        // 如果 data 提供的是一个 FormData ，那么 axios 会把  Content-Type 设置为 multipart/form-data
        data: formDate
      }).then(res => {
        this.$message({
          type: 'success',
          message: '图片上传成功'
        })
        console.log(res, '上传成功')
      }).catch(err => {
        console.log(err, '上传失败')
        this.$message.error('图片上传失败')
      })
    }
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
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
  .img-icon{
    font-size: 22px;
    display: flex;
    justify-content: space-around
  }
  .upload{
    // background: red;
    height: 70px;
  }
</style>
