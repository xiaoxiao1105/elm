<template>
  <div class="fillcontain">
    <div class="left">
      <Left
        v-on:on-add="add"
        @on-home="home"
        @on-foodslist="foodslist"
        @on-userlist="userlist"
        @on-merchant="merchant"
      ></Left>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Left from "../Login.vue";
export default {
  components: {
    Left
  },
  data() {
    return {
      xian: true,
      xian1: false
    };
  },
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
      this.$router.push({ path: "/manage/home" });
    },
    //食品列表
    foodslist() {
      this.$router.push({ path: "/manage/foodslist" });
    },
    //用户列表
    userlist() {
      this.$router.push({ path: "/manage/userlist" });
    },
    //商家列表
    merchant() {
      this.$router.push({ path: "/manage/merchant" });
    }
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
