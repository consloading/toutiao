<template>
  <el-card class="publish">
    <!-- 顶部文字区域 -->
      <div slot="header" class="clearfix">
        <!-- 如果有id为编辑文章，如果没有为发布文章 -->
        <span>{{$route.params.id ? '编辑文章' : '发布文章'}}</span>
      </div>
      <!-- /顶部文字区域 -->

      <!-- 底部表单区域 -->
      <el-form ref="form" :model="publishArticle" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="publishArticle.title" placeholder="文章名称"></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <quill-editor v-model="publishArticle.content"
              ref="myQuillEditor">
            </quill-editor>
        </el-form-item>
        <!-- <el-form-item label="封面">
          <el-radio-group v-model="form.resource">
            <el-radio label="单图"></el-radio>
            <el-radio label="三图"></el-radio>
            <el-radio label="无图"></el-radio>
            <el-radio label="自动"></el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- 自己封装的组件 -->
        <channel-selete v-model="publishArticle.channel_id"></channel-selete>
        <!-- <el-form-item label="频道">
          <el-select placeholder="请选择"
           v-model="publishArticle.channel_id"
             :value='null'>
            <el-option :label="item.name" :value="item.id" v-for= "item in channels" :key="item.id"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="success" @click="onSubmit(false)">发表</el-button>
          <el-button type="primary" @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
      <!-- /底部表单区域 -->
  </el-card>
</template>

<script>
// require styles 富文本编辑的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入富文本编辑器
import { quillEditor } from 'vue-quill-editor'
// 封装的频道组件
import channelSelete from '../../../views/channel/channel'
export default {
  name: 'publish',
  // 注册富文本编辑器组件
  components: {
    quillEditor,
    channelSelete
  },
  data () {
    return {
      // 接口 内容体
      publishArticle: {
        title: '', // 标题
        content: '', // 内容区域
        cover: { // 封面
          type: 0,
          images: []
        },
        channel_id: '' // 频道
      },
      channels: [] // 频道列表，渲染到页面上
    }
  },
  created () {
    this.GetChannelList()// 获取到频道列表
    // 如果带有id进来 在调接口加载页面
    if (this.$route.params.id) {
      this.GetEditingLoad()// 获取指定编辑数据
    }
  },
  methods: {
    // 发布+编辑的使用流程
    onSubmit (status) {
      // 如果携带id说明是编辑
      if (this.$route.params.id) {
        // 请求编辑文章
        this.edidAcitcle(status)
      } else {
        // 请求添加文章
        this.addAcitcle(status)
      }
    },
    // 编辑文章
    edidAcitcle (status) {
      this.$axios({
        method: 'PUT',
        url: 'articles/' + this.$route.params.id,
        params: {
          draft: status
        },
        data: this.publishArticle
      }).then(res => {
        console.log(res)
        // 成功之后跳转去内容页
        this.$router.push('/home/contentlist')
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('更新失败')
      })
    },
    // 添加文章
    addAcitcle (status) {
      console.log(status)
      this.$axios({
        method: 'POST',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('wmy-token')}`
        // },
        params: {
          draft: status
        },
        data: this.publishArticle
      }).then(res => {
        console.log(res, '保存成功')
        // 成功之后跳转去内容页
        this.$router.push('/home/contentlist')
      }).catch(err => {
        console.log(err, '保存失败')
      })
    },
    // 获取频道列表
    GetChannelList () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '没有获取到数据')
      })
    },
    // 获取指定编辑数据
    GetEditingLoad () {
      var id = this.$route.params.id
      // 调接口
      this.$axios({
        url: '/articles/' + id,
        method: 'GET'
      }).then(res => {
        // console.log(res.data.data)
        this.publishArticle = res.data.data
      })
    }
  }
}

</script>

<style>

</style>
