<template>
  <div class="login">
    <h3>elm后台管理系统</h3>
    <div class="form_contianer">
      <div>
        <el-input
          type="text"
          v-model="inp"
          placeholder="用户名"
          class="el-input"
          v-show="iss"
        ></el-input>
      </div>
      <div class="h" v-show="isshow">
        <el-input
          type="text"
          v-model="inp"
          placeholder="用户名"
          class="el-input"
        ></el-input>
        <p>
          请输入正确的用户名
        </p>
      </div>
      <div>
        <el-input
          type="password"
          v-model="psw"
          placeholder="密码"
          class="el-input"
          v-show="iss"
        ></el-input>
      </div>
      <div class="h" v-show="isshow">
        <el-input
          type="password"
          v-model="psw"
          placeholder="密码"
          class="el-input"
        ></el-input>
        <p>
          请输入正确的密码格式
        </p>
      </div>
      <el-button
      class="el-button"
    plain
    @click="sub">
    登录
  </el-button>
      <!-- <button class="el-button" v-on:click="sub">登录</button> -->
      <div class="hh">温馨提示：</div>
      <div class="hh">未登录过的用户，自动注册</div>
      <div class="hh">注册过的新用户可凭账号密码登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inp: "",
      psw: "",
      isshow: false,
      iss: true
    };
  },
  methods: {
    sub() {
     if(this.inp==''||this.psw==''){
         const h = this.$createElement;
this.$notify({
          title: '错误',
          message: h('i', { style: 'color: teal'}, '请输入正确的用户名密码')
        });
     }
      let reguname = /^1(3|4|5|7|8)\d{9}$/.test(this.inp);
      let regpsd = /^[A-z][0-9]{5,10}$/.test(this.psw);
      if (reguname === false) {
        this.isshow = true;
        this.iss = false;
      } else {
        this.isshow = false;
        this.iss = true;
      }
      if (regpsd === false) {
        this.isshow = true;
        this.iss = false;
      } else {
        this.isshow = false;
        this.iss = true;
      }
      if (reguname && regpsd) {
        let obj = { user_name: this.inp, password: this.psw };
        this.axios.post("https://elm.cangdu.org/admin/login", obj).then(res => {
         console.log(res.data)
         if (res.data.status === 1) {
            this.$router.push({ name: "Manage" });
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 650px;
  background: #324057;
  text-align: center;
  h3 {
    color: white;
    font-size: 34px;
    position: absolute;
    top: 100px;
    left: 300px;
  }
  .form_contianer {
    width: 370px;
    height: 310px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -105px;
    margin-left: -160px;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .el-input {
      margin-bottom: 20px;
    }
    .h {
      & > .el-input {
        border: 1px solid red;
        border-radius: 5px;
        margin-bottom: 0px;
      }
      p {
        color: red;
        text-align: left;
        font-size: 12px;
      }
    }
    .el-button {
      width: 100%;
      background: #20a0ff;
      color: white;
      margin-bottom: 30px;
    }
    .hh {
      color: red;
      font-size: 12px;
    }
  }
}
</style>


