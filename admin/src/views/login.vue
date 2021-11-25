<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img src="../assets/logo.jpg" />
      </div>
      <!-- 登录表单区 -->
      <el-form
        label-width="0px"
        class="login-form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        @submit.prevent="login"
      >
        <!-- 用户名 -->
        <!-- prop传入用户名的受限规则 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <!-- prop传入密码的受限规则 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.loginForm);
      console.log(res);
      if (res.status == 200) {
        this.$message.success("登录成功");
      } else {
        return this.$message.error("登录失败");
      }
      //2.登陆成功之后的token 保存在客户端的sessionStorage
      window.sessionStorage.setItem("token", res.data.token);
      //3.导航跳转到后台主页
      this.$router.push("/main");
    },
  },
  created(){
    console.log(this.getAuthHeaders())
  }
};
</script>

<style lang="less" scoped>
.login-container {
  background-color: #2b5b6b;
  height: 100%;
}
.login-box {
  //登录框
  width: 450px;
  height: 300px;
  background-color: #eee;
  border-radius: 3px;
  position: absolute; //父元素没有设置定位，所以相对于html元素来定位
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar-box {
    //头像框
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px; //设置了圆环的效果
    box-shadow: 0 0 10px #ddd; //边框阴影
    position: absolute; //父元素设置了绝对定位，相对于.login-box定位
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      //头像框图片
      width: 100%; //图片占满.avatar-box
      height: 100%; //图片占满.avatar-box
      border-radius: 50%;
      background-color: #ddd;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}

.login-form {
  //头像框脱标，登录表单往上顶，所以设置绝对定位，让其靠下显示
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box; //不加这个 登录表单会超出登录框
}
</style>