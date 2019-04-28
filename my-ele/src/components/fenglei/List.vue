<template>
  <div class="kl">
    <div class="header_container">
      <p>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>添加数据</el-breadcrumb-item>
          <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
      </p>
      <div><img src="//elm.cangdu.org/img/default.jpg" class="avator" /></div>
    </div>
    <div class="from">
      <header>选择食品种类</header>
      <div class="from-inp">
        <div>
          食品种类
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </div>
        <div v-show="shoe">
          <p>食品种类<el-input v-model="input"></el-input></p>
          <p>种类描述<el-input v-model="input1"></el-input></p>
          <el-button @click="tj">提交</el-button>
        </div>
        <div class="block" @click="hide">
          <span v-show="hh"><i class="el-icon-caret-bottom"></i></span>
          <span v-show="hhh"><i class="el-icon-caret-top"></i></span>
          添加食品种类
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      value: "",
      shoe: false,
      hh: true,
      hhh: false,
      input: "",
      input1: ""
    };
  },
  mounted() {
    this.axios
      .get("https://elm.cangdu.org/shopping/getcategory/6")
      .then(res => {
        if (res.data.status === 1) {
          this.options = res.data.category_list;
        }
      });
  },
  methods: {
    hide() {
      if (this.shoe) {
        this.hh = true;
        this.hhh = false;
        this.shoe = false;
      } else {
        this.hhh = true;
        this.hh = false;
        this.shoe = true;
      }
    },
    tj(){
      let data={description:this.input1,name:this.input,restaurant_id:4}
      this.axios.post('https://elm.cangdu.org/shopping/addcategory',data).then(res=>{
        console.log(res.data)
      })
    }
  }
};
</script>

<style lang="scss">
.kl {
  width: 100%;
}
.block {
  border-top: 1px solid gainsboro;
  height: 40px;
  line-height: 40px;
  color: gainsboro;
  i {
    color: gainsboro;
  }
  i:hover {
    color: #20a0ff;
  }
  &:hover {
    color: #20a0ff;
  }
}
.from {
  margin-left: 17%;
  margin-top: 20px;
  width: 70%;
  text-align: center;
  header {
    text-align: center;
    margin-bottom: 10px;
  }
  .from-inp {
    width: 100%;
    border: 1px solid gainsboro;
    border-radius: 10px;
    & > div:nth-of-type(1) {
      margin-bottom: 30px;
      padding: 10px 50px 0 30px;
    }
    & > div:nth-of-type(2) {
      padding-bottom: 20px;
      background: #f9fafc;
      &>p {
        padding-top:10px;
        .el-input--small {
          width: 70%;
        }
      }
      .el-button{
        background: #20a0ff;
        color:white;
        margin-left:-200px;
      }
    }
  }
}
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
.el-select {
  width: 80%;
}
</style>
