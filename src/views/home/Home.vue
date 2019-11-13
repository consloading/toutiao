<template>
  <div>
    <!-- 最大的大容器 -->
  <el-container>
    <!-- 左侧栏 -->
    <el-aside class="home-aside">
        <!-- 侧边栏顶部logo -->
        <div class="home-aside-top">
          <img src="../../assets/img/logo_admin.png" alt="">
        </div>
      <!-- el-muen侧边栏最大的盒子 -->
      <el-menu class="home-aside-menu"  background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
        <!-- el-menu-item单项 -->

        <!-- 首页 -->
        <el-menu-item index="1">首页</el-menu-item>
        <!-- 内容管理 -->
        <el-submenu index="2">
          <template slot="title">内容管理</template>
          <el-menu-item index="2-1">发布文章</el-menu-item>
          <el-menu-item index="2-2">内容列表</el-menu-item>
          <el-menu-item index="2-3">评论列表</el-menu-item>
          <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <!-- 粉丝管理 -->
        <el-submenu index="3">
          <template slot="title">粉丝管理</template>
          <el-menu-item index="3-1">图文数据</el-menu-item>
          <el-menu-item index="3-2">粉丝概况</el-menu-item>
          <el-menu-item index="3-3">粉丝画像</el-menu-item>
          <el-menu-item index="3-4">粉丝列表</el-menu-item>
        </el-submenu>
        <!-- 账户信息 -->
        <el-menu-item index="4">账户信息</el-menu-item>
        <!-- 个人测试 -->
        <el-submenu index="5">
          <template slot="title">个人测试</template>
            <el-submenu index="5-1">
              <template slot="title">一级嵌套</template>
              <el-menu-item index="5-1-1">嵌套内容1</el-menu-item>
            <el-submenu index="5-1-2" v-for="(item,index) in 2" :key="index">
              <template slot="title">二级嵌套</template>
              <el-menu-item  index="5-1-2-1">无限嵌套</el-menu-item>
              <el-menu-item  index="5-1-2-2">无限嵌套</el-menu-item>
            </el-submenu>
            </el-submenu>
          <el-menu-item index="5-2">个人测试</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 右侧大容器 -->
    <el-container>
      <!-- 头部栏 -->
      <el-header>
        头部
      </el-header>
      <!-- 主要部分 -->
      <el-main>
        主要部分
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>

export default {

}
</script>
<style lang="less" scoped>
.home-aside{
 width: 200px !important;
  .home-aside-menu{
    width: 201px !important;
    height: 100vh;
    background-color:#353b4e;
 }
    .home-aside-top{
      background: #2e2f32;
      height: 60px;
      line-height: 75px;
      text-align: center;
      img{
        height: 30px;
      }
    }
}

</style>
