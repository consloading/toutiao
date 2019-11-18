<template>
  <div>
    <!-- 顶部筛选区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" label-width="100px">
        <el-form-item label="文章状态：">
        <el-radio-group v-model="filterForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select placeholder="请选择"
           v-model="filterForm.channel_id"
             :value='null'>
            <el-option :label="item.name" :value="item.id" v-for= "item in channels" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <div class="block">
            <el-date-picker
              v-model="rangeDate"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              value-format="yyyy-MM-dd"
              >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="GetData(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- /顶部筛选区域 -->
    <!-- 底部内容区域 -->
    <el-card class="footer">
       <div slot="header" class="clearfix">
        <span>共找到{{totalCount}}条符合条件的内容</span>
       <el-table
        v-loading="loading"
        :data="newArr"
        style="width: 100%">
        <el-table-column
          prop="cover"
          label="封面">
          <!-- 自定义表格列
          在 template 上声明 slot-scope="scope" ，然后就可以通过 scope.row 获取遍历项
          scope.row 就相当于我们自己 v-for 的 item
          注意：只有当你需要在自定义表格列模板中访问遍历项的时候才这么做 -->
          <template slot-scope="scope">
            <img :src="scope.row.cover.images" alt="" width="50">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="status"
          label="文章状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">
              {{ articleStatus[scope.row.status].label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作">
          <template slot-scope="scope">
              <el-button type="success" size="mini" @click="$router.push(`/home/publish/${scope.row.id}`)">编辑</el-button>
              <el-button type="danger" size="mini" @click="onDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-card>
    <!-- /底部内容区域 -->
    <!-- 分页 -->
    <el-pagination
      :disabled="loading"
      background
      layout="prev, pager, next"
      @current-change="oncurrentChange"
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
      // 过滤数据的表单
      filterForm: {
        status: null, // 文章状态
        channel_id: null // 频道id
      },
      Page: 0, // 当前页码
      totalCount: 0, // 记录总数据条数
      newArr: [], // 文章数据列表
      articleStatus: [
        { type: 'info', label: '草稿' },
        { type: 'warning', label: '待审核' },
        { type: 'success', label: '审核通过' },
        { type: 'danger', label: '审核失败' }
      ],
      rangeDate: [], // 起止日期 ,获取到的是一个数组形式的数据
      loading: true, // 为true开启
      channels: [] // 用来存储频道列表
    }
  },
  // 生命周期
  created () {
    // 初始化的时候默认加载第一页数据
    this.GetData(1)
    // 获取文章列表
    this.GetChannelList()
  },
  // 方法
  methods: {
    // 获取频道列表
    GetChannelList () {
      this.$axios({
        method: 'GET',
        url: 'channels'
      }).then(res => {
        this.channels = res.data.data.channels
        // console.log(this.channels) //获取到
      })
    },
    // 获取数据
    GetData (page = 1) {
      this.loading = true
      // const token = window.localStorage.getItem('wmy-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        params: {
          page, // 当前第几页 接收到页面数写入
          per_page: 10, // 每页多少条数据，默认为10条
          status: this.filterForm.status, // 文章状态
          channel_id: this.filterForm.channel_id, // 频道id 不传就是所有的频道
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始时间
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 结束时间
        }
      }).then(res => {
        // console.log(res.data.data)
        this.totalCount = res.data.data.total_count // 将总条数传给上面
        this.newArr = res.data.data.results // 将获取到的数据 给新定义的空对象 绑定到页面上
        for (let i = 0; i < res.data.data.results.length; i++) {
          if (res.data.data.results[i].cover.images.length === 0) {
            res.data.data.results[i].cover.images = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573837274495&di=e5371426913d5d6311357ade5c004d91&imgtype=0&src=http%3A%2F%2Fofficialwebsitestorage.blob.core.chinacloudapi.cn%2Fpublic%2Fupload%2Fphoto_db%2F2015%2F11%2F14%2F201511141249548324%2F201511141249548324.gif'
          }
        }
      }).catch(err => {
        console.log(err, '获取数据失败')
      }).finally(() => {
        // 无论成功还是失败，最终都需要执行
        this.loading = false
      })
    },
    // 删除
    onDel (id) {
      // const token = window.localStorage.getItem('wmy-token')
      this.$axios({
        method: 'DELETE',
        url: `articles/${id}`
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      }).then(res => {
        console.log('删除完成', res)
        // 删除完毕再次加载下数据
        this.GetData(this.page) // 传入当前页 在当前页面刷新
      }).catch(err => {
        console.log(err, '删除失败')
      })
    },
    // 页码改变事件
    oncurrentChange (page) {
      // console.log(page)// 获取当前页码数值
      this.GetData(page) // 将当前页面数以参数形式 传入调用数据
    }
  }
}
</script>

<style lang="less" scoped>
.footer{
  margin-top: 20px;
}

</style>
