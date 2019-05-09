<template>
  <div class="header_container">
    <p>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="title">{{ title }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="name">{{ name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </p>

    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <img :src="'//elm.cangdu.org/img/' + image" class="avator" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="manage">首页</el-dropdown-item>
        <el-dropdown-item command="singout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: ""
    };
  },
  created() {
    if (this.$store.state.adminInfo.login == false) {
      this.$router.push("/");
    }
  },
  mounted() {},
  computed: {
    name() {
      return this.$route.meta.name;
    },
    title() {
      return this.$route.meta.title;
    }
  },
  methods: {
    handleCommand(command) {
      console.log(command);
      if (command == "manage") {
        this.$router.push("/manage");
      } else if (command == "singout") {
        this.axios.get("https://elm.cangdu.org/admin/singout").then(res => {
          if (res.data.status == 1) {
            this.$message({
              message: res.data.success,
              type: "success"
            });
            this.$store.commit("singout");
            this.$router.push("/");
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        });
      }
    }
  }
};
</script>

<style  lang="scss" scoped>
.header_container {
  width: 100%;
  height: 60px;
  background: #eff2f7;
  display: flex;
  p {
    flex: 1;
    padding-left: 20px;
    color: #48576a;
    & > div {
      width: 100%;
      height: 100%;
      // line-height: 40px;
    }
  }
  div {
    width: 40px;
    padding-right: 37px;
    padding-top: 10px;
    img {
      width: 36px;
      border-radius: 50%;
    }
  }
}
.sy {
  width: 80px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin: 0;
}
</style>
