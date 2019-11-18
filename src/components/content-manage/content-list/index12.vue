<template>
  <div class="contentList">
    <!-- 顶部筛选区域 -->
    <el-card class="box-card">
        <div slot="header">
            <span>全部图文</span>
        </div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="文章状态">
                <el-radio-group v-model="formStatus.status">
                    <el-radio :label='null'>全部</el-radio>
                    <el-radio label="0">草稿</el-radio>
                    <el-radio label="1">待审核</el-radio>
                    <el-radio label="2">审核通过</el-radio>
                    <el-radio label="3">审核失败</el-radio>
                    <el-radio label="4">已删除</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
                <el-select placeholder="请选择" v-model="formStatus.channel_id" :value="null">
                    <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间选择">
                <div class="block">
                    <el-date-picker
                     v-model="rangeDate"
                     value-format="yyyy-MM-dd"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="GetArticleList(1)">筛选</el-button>
            </el-form-item>
            </el-form>
    </el-card>
    <!-- /顶部筛选区域 -->

    <!-- 底部内容区域 -->
    <el-card class="box-footer">
        <div slot="header">
            <span>共找到{{totalCount}}条符合条件的内容</span>
        </div>
        <el-table :data="newArr" style="width: 100%">
            <el-table-column prop="cover" label="封面">
                <template slot-scope="scope">
                <!-- 打印获取数据看到每项下的type值 有图为1无图为0，如果为0显示默认的图，不为0为false隐藏，显示自带的 -->
                    <img v-show="scope.row.cover.type === 0" width="70" src="../../../assets/img/b5cabd60fe185c3b2a8ade892aa8640.jpg" alt="">
                    <img :src="scope.row.cover.images" alt=""  width="70">
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="status" label="文章状态">
                <template slot-scope="scope">
        <!-- 找到data定义的数组，scope.row为每一项下的status状态值为一个数字，依据这个数字从下面的data中找到对应的按钮效果 渲染到页面上 -->
                    <el-tag :type="status[scope.row.status].type">
                        <!-- 找到对应的文字渲染到页面上 -->
                        {{ status[scope.row.status].label }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="pubdate" label="发布时间">
            </el-table-column>
            <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                    <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="onDel(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- /底部内容区域 -->

    <!-- 分页 -->
    <el-pagination
        @current-change="OnChangePage"
        background
        layout="prev, pager, next"
        :total="totalCount">
    </el-pagination>
    <!-- /分页 -->
  </div>
</template>

<script>
export default {
  name: 'contentList',
  data () {
    return {
      newArr: [], // 文章列表
      totalCount: 0, // 文章总条数
      page: 0, // 当前页数
      channels: [], // 当前频道列表
      // 文章状态
      status: [
        { label: '草稿', type: '' },
        { label: '审核通过', type: 'success' },
        { label: '待审核', type: 'info' },
        { label: '审核失败', type: 'warning' },
        { label: '已删除', type: 'danger' }
      ],
      // 筛选数据的表单
      formStatus: {
        status: null, // 文章状态 没有值 为null接口数据不发送
        channel_id: null // 频道id
      },
      rangeDate: [], // 起止日期 ,获取到的是一个数组形式的数据
      content: [{
        time: '2016-05-02',
        title: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  created () {
    // 获取文章列表
    this.GetArticleList()
    // 获取当前频道列表
    this.GetChannelLoad()
  },
  methods: {
    // 获取当前频道列表
    GetChannelLoad () {
      this.$axios({
        method: 'GET',
        url: 'channels'
      }).then(res => {
        this.channels = res.data.data.channels
        // console.log(res.data.data, '获取成功')
      })
    },
    // 获取文章列表
    GetArticleList (page = 1) {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          page, // 当前页
          per_page: 10, // 每页默认为10条数据
          channel_id: this.formStatus.channel_id,
          status: this.formStatus.status,
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始时间
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 结束时间
        }
      }).then(res => {
        // console.log(res.data.data)
        this.totalCount = res.data.data.total_count // 文章总条数
        this.newArr = res.data.data.results
      })
    },
    // 点击分页器获取当前页数
    OnChangePage (page) {
      //   console.log(page) // 当前页
      this.page = page
      this.GetArticleList(page) // 调用获取数据，将当前页做为实参传入
    },
    // 删除
    onDel (id) {
    //   console.log(id)
      this.$axios({
        method: 'DELETE',
        url: '/articles/' + id
      }).then(res => {
        // console.log(res, '删除成功')
        this.GetArticleList(this.page) // 传入当前页面数值，让数据在当前页面刷新
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err, '删除失败,请稍后重试')
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .box-footer{
        margin-top: 20px;
    }
</style>
