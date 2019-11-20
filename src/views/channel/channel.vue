<template>
  <div class="channel">
    <el-form-item label="频道">
    <el-select placeholder="请选择"
        :value='value'
        @input="onInput"
        >
        <el-option
        :label="item.name"
        :value="item.id"
        v-for= "item in channels"
        :key="item.id"></el-option>
    </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'channel',
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      channels: [] // 用来存储频道列表
    }
  },
  // 生命周期
  created () {
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
    // 获取频道id
    onInput (data) {
      console.log(data) // 获取到选择到频道的id
      // 发布一个自定义事件，由于父组件使用的是v-model简写，所以这里的事件名称必须叫input
      this.$emit('input', data)
    }
  }
}
</script>

<style>

</style>
