<template>
  <div class="hello">
    <el-row class="tac">
      <el-col :span="8">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>数据管理</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-submenu>
          </el-submenu>
         <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
              <el-menu-item index="3-1">添加商铺</el-menu-item>
              <el-menu-item index="3-2">添加商品</el-menu-item>
            </el-submenu>
          </el-submenu>
        <!-- </el-menu> -->
        <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i>图表</template>
              <el-menu-item index="4-1">选项1</el-menu-item>
              <el-menu-item index="4-2">选项2</el-menu-item>
            </el-submenu>
          </el-submenu>
        <el-submenu index="5">
            <template slot="title"><i class="el-icon-edit"></i>编辑</template>
              <el-menu-item index="5-1">选项1</el-menu-item>
              <el-menu-item index="5-2">选项2</el-menu-item>
            </el-submenu>
          </el-submenu>
        <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>设置</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title"><i class="el-icon-warning"></i>说明</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss">
.el-menu-item{
  color:whitesmoke;
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
      }
    }
  }
}
</style>
