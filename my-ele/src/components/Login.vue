<template>
  <div class="hello">
    <el-row class="tac">
      <el-col :span="8">
        <el-menu
          :default-active="this.$route.path"
          :router="true"
          class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="home"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2" >
            <template slot="title"><i class="el-icon-document"></i>数据管理</template>
              <el-menu-item index="2-1" :index="'/userlist'" >用户列表</el-menu-item>
              <el-menu-item index="2-2" :index="'/merchant'">商家列表</el-menu-item>
              <el-menu-item index="2-2" :index="'/foodslist'">食品列表</el-menu-item>
              <el-menu-item index="2-2" :index="'/orderlist'">订单列表</el-menu-item>
              <el-menu-item index="2-2" :index="'/adminlist'">管理员列表</el-menu-item>
            </el-submenu>
          </el-submenu>
         <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
              <el-menu-item index="3-1" :index="'/addmer'">添加商铺</el-menu-item>
              <el-menu-item index="3-2" :index="'/list'">添加商品</el-menu-item>
            </el-submenu>
          </el-submenu>
        <!-- </el-menu> -->
        <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i>图表</template>
              <el-menu-item index="4-1" :index="'/user'">用户分布</el-menu-item>
            </el-submenu>
          </el-submenu>
        <el-submenu index="5">
            <template slot="title"><i class="el-icon-edit"></i>编辑</template>
              <el-menu-item index="5-1" :index="'/bian'">文本编辑</el-menu-item>
            </el-submenu>
          </el-submenu>
        <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>设置</template>
              <el-menu-item index="6-1" :index="'/adminset'">管理员设置</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title"><i class="el-icon-warning"></i>说明</template>
              <el-menu-item index="2-1">说明</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    add(e){
      this.$emit('on-add')
    },
    home(){
      this.$emit('on-home')
    }
  },

};
</script>

<style lang="scss">
.el-menu-item{
  color:whitesmoke;
  &:hover{
    background: rgb(29, 32, 37);
  }
}
.hello {
  height: 100%;
  .el-row {
    height: 100%;
    background-color: rgb(50, 64, 87);
    .el-col-8 {
      width: 100%;
      height: 100%;
      .el-menu {
        background-color: rgb(50, 64, 87);
        .el-submenu__title {
          color: #bfcbd9;
        }
        .el-submenu__title:hover{
          background: rgb(29, 32, 37);
        }
      }
    }
  }
}
</style>
