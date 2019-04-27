<template>
  <div class="fillcontain">
    <div class="el-col-4">
      <Left></Left>
    </div>
    <div class="el-col-4">1</div>
  </div>
</template>

<script>
import Left from "../Login.vue";
export default {
  components: {
    Left
  }
};
</script>

<style  lang="scss">
.fillcontain {
  width: 100%;
  height: 670px;
  .el-col-4 {
    float: left;
    width: 200px;
    height: 100%;
  }
}
</style>
