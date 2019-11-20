<template>

    <!-- 最大的大容器 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="home-aside">
        <!-- 侧边栏顶部logo -->
        <div class="home-aside-top">
          <img src="../../assets/img/logo_admin.png" alt="">
        </div>
        <!-- el-muen侧边栏最大的盒子 -->
        <el-menu router class="home-aside-menu"  background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
          <!-- el-menu-item单项 -->

          <!-- 首页 -->
          <el-menu-item index="/">首页</el-menu-item>
          <!-- 内容管理 -->
          <el-submenu index="1">
            <template slot="title">内容管理</template>
            <el-menu-item index="/home/publish">发布文章</el-menu-item>
            <el-menu-item index="/home/contentlist">内容列表</el-menu-item>
            <el-menu-item index="/home/commentlist">评论列表</el-menu-item>
            <el-menu-item index="/home/materialmanage">素材管理</el-menu-item>
          </el-submenu>
          <!-- 粉丝管理 -->
          <el-submenu index="2">
            <template slot="title">粉丝管理</template>
            <el-menu-item index="/home/imgdata">图文数据</el-menu-item>
            <el-menu-item index="/home/fanssituation">粉丝概况</el-menu-item>
            <el-menu-item index="/home/fansportrayal">粉丝画像</el-menu-item>
            <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
          </el-submenu>
          <!-- 账户信息 -->
          <el-menu-item index="/home/userinfo">账户信息</el-menu-item>
          <!-- 测试 -->
          <el-menu-item index="/demo">测试组件</el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 头部与内容区域的容器 -->
      <el-container>
        <!-- 头部区域 -->
        <el-header>Header</el-header>
        <!-- 内容区域 -->
        <el-main>
          <!-- 二级路由容器，子路由会渲染到这里 -->
           <!-- :key="$route.path" 解决编辑与发布访问同一个组件，会出现复用问题，禁用路由缓存解决复用问题 -->
         <router-view :key="$route.path">
         </router-view>
        </el-main>
      </el-container>
    </el-container>

</template>

<script>
import layoutHeader from '../layout/layoutHeader/index.vue'

export default {
  components: {
    'el-header': layoutHeader
  }
}
</script>
<style lang="less" scoped>
//侧边栏
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
