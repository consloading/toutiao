<template>
  <div class="userInfo">
    <el-card class="box-card">
      <div slot="header">
        <span>账号信息</span>
      </div>
      <div class="userimg">
        <img :src="userInfo.photo" alt="">
        <div>
          <h2>{{userInfo.name}}</h2>
          <span>{{userInfo.intro}}</span>
        </div>
        <a href="#" style="float:right">修改</a>
      </div>
       <div class="userFotter">
          <span>头条号类型:</span> <span>个人</span>
          <el-divider content-position="left">账号信息</el-divider>
          <span>头条号ID:</span> <strong>{{userInfo.id}} </strong>
          <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
          <span>登录方式:绑定手机:<i>{{userInfo.mobile}}</i></span>
          <el-divider content-position="right">邮箱<span>{{userInfo.email}}</span></el-divider>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'userInfo',
  // 数据
  data () {
    return {
      userInfo: []
    }
  },
  // 创建
  created () {
    this.getUserInfoData()
  },
  // 方法
  methods: {
    getUserInfoData () {
      this.$axios({
        url: '/user/profile'
        // get 请求可以省略
      }).then(res => {
        // console.log(res.data.data)
        this.userInfo = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .userimg{
    margin-bottom: 20px;
  }
  .userFotter{
    padding-top: 50px;
  }
</style>
