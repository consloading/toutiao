<template>
  <div class="login">
    <el-card class="login-card">
      <div class="login-logo">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <el-form status-icon class="from-content" ref="myForm" :model="ruleForm" :rules="rules">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入您的手机号" v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入您的验证码" class="code-frame" v-model="ruleForm.code"></el-input>
          <el-button :plain="true" class="code-btn" @click="onSendCode">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox id="clause-color" v-model="ruleForm.checked">
              我已阅读并同意
                    <a href="javascript:;">用户协议</a>
                    和
                    <a href="javascript:;">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' class="login-btn" @click="onLogin">登录</el-button>
        </el-form-item>

      </el-form>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      // console.log(rule)
      // console.log(value)
      // console.log(callBack)
      value ? callBack() : callBack(new Error('请勾选条款'))// 返回布尔值
    }
    return {
      // 表单的内容
      ruleForm: {
        mobile: '',
        code: '',
        checked: false
      },
      // 制定规则
      rules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }
        ],
        checked: [
          { validator }// 布尔值
        ]
      }
    }
  },
  methods: {
    // 登录
    onLogin () {
      if (this.ruleForm.mobile.length === 0 || this.ruleForm.code.length === 0 || !this.ruleForm.checked) {
        this.$message({
          showClose: true,
          message: '请先输入手机号验证码试试',
          type: 'warning'
        })
        return
      }
      if (this.ruleForm.mobile.length !== 11 || this.ruleForm.code.length !== 6 || !this.ruleForm.checked) {
        this.$message({
          showClose: true,
          message: '请输入正确的手机号和验证码并勾选协议',
          type: 'warning'
        })
      }
      // 校验整个表单的规则
      // validata是一个方法=>方法中传入的一个函数 两个校验参数是否校验成功/未校验成功的字段
      // this.$refs//获取到html中所有设置ref的集合
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          console.log('校验成功')
          this.$axios({
            method: 'POST',
            url: 'authorizations',
            data: this.ruleForm
          }).then(res => {
            window.localStorage.setItem('wmy-token', res.data.data.token)
            // console.log(res.data.data.token)
            this.$router.push('/')// 校验成功去登录
          }).catch(() => {
            // 错误进入的函数
            this.$message({
              message: '手机号或者验证码错误，请重试',
              type: 'warning'
            })
          })
        }
      })
    },
    // 验证码
    onSendCode () {
      if (this.ruleForm.mobile.length === 0) {
        this.$message({
          showClose: true,
          message: '请先输入手机号试试',
          type: 'warning'
        })
        return
      }
      if (this.ruleForm.mobile.length !== 11) {
        this.$message({
          showClose: true,
          message: '请输入正确的手机号',
          type: 'warning'
        })
      } else {
        this.$message({
          showClose: true,
          message: '验证码发送成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login{
        background: url('../../assets/img/login_bg.jpg');
        background-size: cover;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-card{
            width: 400px;
            height: 340px;
            padding: 0 20px;
            .from-content{
                margin-top: 20px;
            }
               .login-logo{
                   text-align: center;
                img{
                    height: 40px;
                }
            }
            .code-frame{
                width: 230px;
            }
            .code-btn{
                float: right;
            }
            .login-btn{
                width: 100%;
            }
            #clause-color{
                a{
                    color: #3296FA;
                }
            }
        }

    }
</style>
