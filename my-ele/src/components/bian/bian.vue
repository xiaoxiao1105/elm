<template>
  <div>
    <div class="wbjj">
    <quill-editor v-model="content" ref="myQuillEditor"></quill-editor>
    <div class="tjjs">
      <el-button type="primary" @click="tj">提交</el-button>
    </div>
  </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      content: "<h2>文本编辑</h2>",
    };
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    tj(){
      console.log(this.content)
    }
  },
  computed: {
    // editor() {
    //   return this.$refs.myQuillEditor.quill;
    // }
  }
};
</script>


<style >
.wbjj {
  margin-top: 20px;
  margin-left: 5%;
  width: 90%;
  display: inline-block;
}
.tjjs {
  margin-top: 30px;
  margin-left: 45%;
}
.ql-editor{
  height: 500px;
}
</style>
