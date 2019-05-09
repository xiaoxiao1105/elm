<template>
  <div class="fillcontain">
    <div class="left">
      <Left
        v-on:on-add="add"
        @on-home="home"
      ></Left>
    </div>
    <div class="right">
      <div>
        <Hea></Hea>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Hea from '../header/heade.vue';
import Left from "../Login.vue";
export default {
  components: {
    Left,Hea
  },
  data() {
    return {
      xian: true,
      xian1: false
    };
  },
  // 路由守卫写登录拦截
  // beforeRouteEnter :(to,from,next)=>{
  //   // let islogin=getCookie
  //   // next((vm)=>{
  //   //   var data=vm.$store.state.adminInfo
  //   //   if(data.login===true){
  //   //     next(true)
  //   //   }else{
  //   //     next('/')
  //   //   }
  //   // })
  // },
 
  methods: {
    //添加商品
    add() {
      this.$router.push({ path: "/manage/list" });
      this.$confirm("添加食品需要选择一个商铺，先去就去选择商铺吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
        });
    },

    //首页
    home() {
      this.$router.push({ path: "/manage" });
    },
  }
};
</script>

<style  lang="scss">
body {
  margin: 0;
}
.fillcontain {
  width: 100%;
  height: 670px;
  display: flex;
  .left {
    width: 20%;
    height: 100%;
  }
  .right {
    flex: 1;
    overflow: auto;
  }
}
</style>
