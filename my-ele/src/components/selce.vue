<template>
<div>

<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
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
    methods: {
      handleCommand(command) {
        console.log(command)
        if(command=='manage'){
          this.$router.push('/manage')
        }else if(command=='singout'){
          this.axios.get('https://elm.cangdu.org/admin/singout').then(res=>{
            if(res.data.status==1){
              this.$message({
                message: res.data.success,
                type: "success"
              });
              this.$store.commit('singout')
               this.$router.push('/')
            }else{
              this.$message({
                message: res.data.message,
                type: "error"
              });
            }
          })
        }
      }
    }
  }
</script>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>