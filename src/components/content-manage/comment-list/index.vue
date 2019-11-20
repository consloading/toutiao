<template>
  <div class="commentList">
    <el-card class="box-card">
        <el-table
        :data="newArr"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          width='300'>
        </el-table-column>

        <el-table-column prop="status" label="评论状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              @change="onChangeStatus(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数">
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="$router.push(`/home/commentedit/${scope.row.id}`)">修改<i></i></el-button>
          <el-button type="danger" icon='el-icon-document-checked' size="mini" @click="onClickStatus(scope.row)">{{scope.row.comment_status?'关闭':'打开'}}评论<i></i>
          </el-button>
        </template>
        </el-table-column>
      </el-table>
        <el-pagination
          class="paging"
          @current-change="onChangePage"
          background
          layout="prev, pager, next"
          :total="total_count">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'commentList',
  data () {
    return {
      page: 0, // 记录当前分页器的页数
      total_count: 0, // 记录当前文章的总页数
      newArr: [],
      currentStatus: null // 文章当前的评论状态
    }
  },
  // 生命周期
  created () {
    this.GetListDate()
  },
  // 方法
  methods: {
    // 获取数据
    GetListDate (page) {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          page,
          response_type: 'comment'
        }
      }).then(res => {
        // console.log(res)
        console.log(res.data.data.results)
        // console.log(res.data.data.total_count)
        this.newArr = res.data.data.results
        this.total_count = res.data.data.total_count // 总条数
        // console.log(this.newArr)
      }).catch(err => {
        console.log('获取数据失败', err)
      })
    },
    // 状态改变
    onChangeStatus (key) {
      // console.log(key)
      this.currentStatus = key.comment_status
      this.$axios({
        method: 'PUT',
        url: 'comments/status',
        params: {
          article_id: key.id.toString()
        },
        data: {
          allow_comment: key.comment_status
        }
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: `${key.comment_status ? '开启' : '关闭'}成功`
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'warning',
          message: '修改失败，请稍后重试'
        })
      })
    },
    // 点击改变
    onClickStatus (key) {
      // console.log(key)
      key.comment_status ? key.comment_status = false : key.comment_status = true
    },
    // 分页器改变
    onChangePage (page) {
      console.log(page)
      this.GetListDate(page)
      this.page = page
    }
  }
}
</script>

<style lang="less" scoped>
.box-card{
  padding: 0 0 200px 0;
  text-align: center;
  .paging{
    margin-top: 30px;
  }
}
</style>
