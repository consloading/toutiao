<template>
  <el-header class="box">
    <!-- 头部组件 el-row布局 -->
      <el-row type='flex' justify="space-between" align="middle">
          <!-- 左侧 -->
          <el-col :span="6" class='left'>
              <!-- 左侧 -->
              <i class='el-icon-s-fold'></i>
              <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <!-- 右侧 -->
          <el-col :span="7" class='right'>
            <!-- input框 -->
            <el-tooltip effect="dark" content="搜索" placement="bottom" class="right-news">
            <el-input placeholder="请输入搜索文章的内容">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              </el-tooltip>
            <!-- 消息提示 -->
            <el-tooltip effect="dark" content="消息" placement="bottom" class="right-news">
                <span>消息</span>
              </el-tooltip>
              <!-- 头像 -->
              <img src="../../../assets/img/b5cabd60fe185c3b2a8ade892aa8640.jpg" alt="">
              <!-- 下拉菜单 -->
              <el-dropdown trigger="click" class="header-user" @command="onUserInfo">
                <span>蔡某人</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userinfo">账户信息</el-dropdown-item>
                    <el-dropdown-item command="userGit">git地址</el-dropdown-item>
                    <el-dropdown-item command="quit">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </el-col>
      </el-row>
  </el-header>
</template>

<script>

export default {
  methods: {
    onUserInfo (key) {
      // ---------------个人信息
      if (key === 'userinfo') {
        this.$router.push('/home/userinfo')
        this.$message({
          showClose: true,
          message: '跳转到个人信息成功',
          type: 'success'
        })
      }
      // ---------------git地址
      if (key === 'userGit') {
        this.$router.push('https://github.com/consloading')
        this.$message({
          showClose: true,
          message: '跳转到Git地址成功',
          type: 'success'
        })
      }
      // ---------------退出功能
      this.$confirm('确认退出嘛？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('wmy-token')
        this.$router.push('/login')
        this.$message({
          showClose: true,
          message: '退出成功',
          type: 'success'
        })
      }).catch(() => {
        // 取消执行这里
        this.$message({
          showClose: true,
          message: '取消退出',
          type: 'info'
        })
      })
    }
  }
}

</script>

<style lang="less" scoped>
.box{
  box-shadow: 0 0 5px rgba(0, 0, 0, .5);
  .left{
  display: flex;
  align-items: center;
  i{
    font-size: 24px;
  }
  span{
    margin-left: 4px;
  }

  }
  .right{
    display: flex;
    align-items: center;
      .el-input__icon{
        width: 50px;
      }
    .el-input__inner{
      height: 20px;
    }
    .right-news{
      margin: 0 15px;
    }
    img{
      width: 50px;
      border-radius: 50%;
      margin-right: 5px;
    }
    .header-user{
      margin-left: 10px;
    }
  }
  .el-icon-search{
    margin-left: -10px;
  }
}
</style>
