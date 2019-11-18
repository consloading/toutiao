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
            <el-tag :type="commentStatus[scope.row.status].s">
              {{commentStatus[scope.row.status].label}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="__ob__.vmCount"
          label="总评论数">
        </el-table-column>
        <el-table-column
          prop="__ob__.vmCount"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          label="操作">
          <el-button type="warning" icon="el-icon-edit" size="mini">修改<i></i></el-button>
          <el-button type="danger" icon="el-icon-folder-delete" size="mini">关闭评论<i></i></el-button>
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
      commentStatus: [
        { type: '0', label: '关闭', s: 'info' },
        { val: '测试数据占位置用的' },
        { type: '1', label: '正常', s: 'success' }
      ],
      newArr: []
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
          page
        }
      }).then(res => {
        // console.log(res.data.data.total_count)
        this.newArr = res.data.data.results
        this.total_count = res.data.data.total_count
        // console.log(this.newArr)
      }).catch(err => {
        console.log('获取数据失败', err)
      })
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
