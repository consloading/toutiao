<template>
  <div class="login">

      <el-card class="login-card">
          <!-- 中部白色区域顶部的logo -->
        <div class="login-logo">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 中部白色区域顶部的logo -->

        <!-- 一个表单域就是一个el-form-item -->
        <el-form class="from-content" :model="ruleForm" ref="myForm" :rules="loginRules">
                <!-- 手机号码框 -->
                <!-- form-item  prop属性 绑定 下面表单组件的 字段名 -->
            <el-form-item  prop="mobile">
                <el-input placeholder="请输入您的手机号" v-model="ruleForm.mobile"></el-input>
            </el-form-item>
        <!-- 手机号码框 -->

        <!-- 验证码框 -->
            <el-form-item  prop="code">
                <el-input class="code-frame" placeholder="请输入您的验证码"  v-model="ruleForm.code"></el-input>
                <el-button :plain='true' class="code-btn" @click="open3">发送验证码</el-button>
            </el-form-item>
        <!-- 验证码框 -->

        <!-- 勾选同意框 -->
            <el-form-item prop="agree">
                <el-checkbox id="clause-color" v-model="ruleForm.agree">
                    我已阅读并同意
                    <a href="javascript:;">用户协议</a>
                    和
                    <a href="javascript:;">隐私条款</a>
                </el-checkbox>
            </el-form-item>
        <!-- 勾选同意框 -->

        <!-- 登录按钮 -->
            <el-form-item>
                <el-button type='primary' class="login-btn" @click="onLogin">
                    登录
                </el-button>
            </el-form-item>
        <!-- 登录按钮 -->
        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      // rule当前的规则
      //   value当前表单项的值
      //   callback回调函数
    //   if (value) {
    //     // 正确 勾选了协议
    //     callBack()// 请继续
    //   } else {
    //     // 不正确没有勾选协议
    //     callBack(new Error('您必须无条件同意'))
    //   }

      // 三元
      value ? callBack() : callBack(new Error('您必须无条件同意'))
    }

    return {
      ruleForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false// 协议的同意与否
      },
      loginRules: {
        //   决定着校验规则  key(字段名):value(对象数组) => 一个对象就是一个校验规则
        // required 为true 就表示该字段必填 如果不填 就会提示消息
        mobile: [
          { required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }
        ],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    // 点击登录
    onLogin () {
      if (this.ruleForm.mobile.length === 0 || this.ruleForm.code === 0 || this.ruleForm.agree === false) {
        this.$message({
          showClose: true,
          message: '请先输入手机号验证码试试',
          type: 'warning'
        })
        return
      }
      if (this.ruleForm.mobile.length !== 11 || this.ruleForm.code.length !== 6 || this.ruleForm.agree === false) {
        this.$message({
          showClose: true,
          message: '请输入正确的手机号或者验证码',
          type: 'warning'
        })
      }
      // 校验整个表单的规则
      // validata是一个方法=>方法中传入的一个函数 两个校验参数是否校验成功/未校验成功的字段

      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          this.$message({
            showClose: true,
            message: '恭喜校验成功',
            type: 'success'
          })
          this.$axios({
            method: 'POST',
            url: 'authorizations',
            data: this.ruleForm
          }).then(res => {
            this.$router.push('/home')// 校验完毕登录去首页
            window.localStorage.setItem('wmy-token', res.data.data.token)
          }).catch(() => {
            // 校验错误进入的判断
            this.$message({
              message: '手机号或者验证码错误',
              type: 'warning'
            })
          })
        }
      })
    },

    //   点击发送验证码
    open3 () {
      if (this.ruleForm.mobile.length === 0) {
        this.$message({
          showClose: true,
          message: '请先输入手机号再试试',
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
        return
      }

      console.log(`向手机号：${this.ruleForm.mobile}发送验证码`)// 获取输入的手机号 进行判断
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
