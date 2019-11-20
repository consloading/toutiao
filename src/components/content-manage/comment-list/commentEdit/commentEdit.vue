<template>
  <div class="commentEdit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
          <a href="#">返回全部图文</a>
      </div>
      <div style="margin-bottom:50px;">
          <h1>{{CommentsTitle.art_title}}</h1>
          <p>{{CommentsTitle.art_pubdate}}</p>
      </div>
      <!-- 内容区域 -->
        <el-table
        :data="Comments"
        style="width: 100%">
        <el-table-column
          prop="pubdate"
          label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.aut_photo" alt="" height="80">
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容">
        </el-table-column>
        <el-table-column
          label="点赞">
          <template slot-scope="scope">
            {{ scope.row.is_liking === 1 ? '已赞' : '未赞' }}
          </template>
        </el-table-column>
        <el-table-column
          label="置顶">
          <template slot-scope="scope">
            {{ scope.row.is_top !== 0 ? '已置顶' : '未置顶' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="like_count"
          label="点赞数量">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="评论日期">
        </el-table-column>
        <el-table-column
          prop="reply_count"
          label="回复数量">
        </el-table-column>
      </el-table>
      <!-- /内容区域 -->
    </el-card>
  </div>
</template>

<script>
import moment from 'moment' // 处理时间格式问题的包
export default {
  name: 'commentEdit',
  // 通过映射获取到id
  // 需要在路由表里写入props true 这边才可以拿到
  props: {
    id: {
      type: String,
      required: true
    }
  },
  // 数据
  data () {
    return {
      Comments: [], // 获取评论文章
      CommentsTitle: [] // 获取评论文章标题
    }
  },
  // 生命周期
  created () {
    this.getArticleComment() // 获取文章
  },
  // 方法
  methods: {
    // 获取文章评论
    getArticleComment () {
      this.$axios({
        method: 'GET',
        url: '/comments',
        params: {
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          // source: this.$route.params.id
          source: this.id // 通过映射获取到id
        }
      }).then(res => {
        console.log(res.data.data)
        this.CommentsTitle = res.data.data // 文章的标题内容
        const Comments = res.data.data.results // 主要内容
        Comments.forEach(item => {
          // moment(指定时间).format(格式)
          item.pubdate = moment(item.pubdate).format('YYYY-MM-DD HH:mm:ss')
        })
        // 处理表头的时间
        this.CommentsTitle.art_pubdate = moment(this.CommentsTitle.art_pubdate).format('YYYY-MM-DD HH:mm:ss') // 处理完成
        // 将处理过得数据更新到组件中  处理内容中的时间
        this.Comments = Comments // 处理完成
      }).catch(err => {
        console.log(err)
        this.$message.error('获取数据失败')
      })
    }
  }
}
</script>

<style>

</style>
