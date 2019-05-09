<template>
  <div>
    <transition name="fade">
      <div class="login" v-show="isshow">
        <h3>elm后台管理系统</h3>
        <div class="form_contianer">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="name">
              <el-input
                type="text"
                v-model="ruleForm.name"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="psw">
              <el-input
                type="password"
                v-model="ruleForm.psw"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
          <div class="hh">温馨提示：</div>
          <div class="hh">未登录过的用户，自动注册</div>
          <div class="hh">注册过的新用户可凭账号密码登录</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
 import {mapMutations} from 'vuex'
export default {
 
  data() {
    return {
      isshow: false,
      ruleForm: {
        name: "",
        psw: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        psw: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.isshow = true;
  },
  methods: {
    setCookie(name, value, day) {
      var exp = new Date();
      exp.setDate(exp.getDate() + day);
      document.cookie =
        name + "=" + unescape(value) + ";expires=" + exp.toGMTString();
    },
    ...mapMutations(['saveAdminInfo']),
    submitForm(formName) {
      let reguname = /^1(3|4|5|7|8)\d{9}$/.test(this.ruleForm.name);
      let regpsd = /^[A-z][0-9]{5,10}$/.test(this.ruleForm.psw);
      this.$refs[formName].validate(async valid => {
        if (valid && reguname && regpsd) {
          let obj = {
            user_name: this.ruleForm.name,
            password: this.ruleForm.psw
          };
          this.axios.post("https://elm.cangdu.org/admin/login",obj).then(res => {
            if (res.data.status === 1) {
                this.setCookie("xxx", JSON.stringify(res.data), 7)
              this.$message({
                message: "登录成功",
                type: "success"
              });
              //this.$store.commit('',)
              this.saveAdminInfo({login:true})
              this.$router.push({ path: "/manage" });
            }else{
              this.$message.error('用户名或密码错了');
            }
          })
        } else { 
          this.$notify.error({
          title: '错误',
          message: '请输入正确的用户名密码'
        });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
.login {
  width: 100%;
  height: 100%;
  background: #324057;
  text-align: center;
  padding-top: 25%;
  padding-left: 25%;
  padding-bottom: 21%;

  h3 {
    color: white;
    font-size: 34px;
    position: absolute;
    top: 100px;
    left: 250px;
  }
  .form_contianer {
    width: 370px;
    padding: 25px;
    border-radius: 5px;
    background-color: #fff;
    .el-button {
      width: 100%;
    }
    .hh {
      color: red;
      font-size: 12px;
    }
  }
}
</style>


