<template>
  <div class="kl">
    <!-- -->
    <div class="from">
      <header><h2>选择食品种类</h2></header>
      <div class="from-inp">
        <div>
          食品种类
          <el-select v-model="value" placeholder="请选择" @change="food(value)">
            <el-option
              v-for="item in options"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </div>
      
          <el-form label-width="100px" class="demo-ruleForm"  :class="shoe ? 'divv' : 'aa'">
            <el-form-item label="食品种类">
              <el-input v-model="input"></el-input>
            </el-form-item>
            <el-form-item label="种类描述">
              <el-input v-model="input1"></el-input>
            </el-form-item>
            <el-button type="primary" @click="tj">提交</el-button>
          </el-form>
 
        <div class="block" @click="hide">
         <i class="el-icon-caret-top" v-if="shoe"></i>
          <i class="el-icon-caret-bottom" v-else></i>
          <span>添加食品种类</span>
        </div>
      </div>
      <listfoods :id='this.$route.query.restaurant_id' :category_id='id'></listfoods>
    </div>
  </div>
</template>

<script>
import listfoods from "./listfoods";
export default {
  components: {
    listfoods
  },
  data() {
    return {
      options: [],
      value: "",
      shoe: false,
      hh: true,
      hhh: false,
      input: "",
      input1: "",
      id:'',
      id1:''
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (to.fullPath === "/list") {
  //       vm.$confirm("添加食品需要选择一个商铺，先去就去选择商铺吗？", "提示", {
  //         confirmButtonText: "确定",
  //         cancelButtonText: "取消",
  //         type: "warning"
  //       })
  //         .then(() => {
  //           vm.$router.push({ path: "/merchant" });
  //         })
  //         .catch(() => {
  //           vm.$message({
  //             type: "info",
  //             message: "取消"
  //           });
  //         });
  //     }
  //   });
  // },
  created(){
  
  },
  mounted() {
console.log(this.$route)
if(this.$route.fullPath === "/list"){
this.$confirm("添加食品需要选择一个商铺，先去就去选择商铺吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push({ path: "/merchant" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消"
            });
          });
}











     var rand = parseInt(Math.random() * (10- 1+ 1) + 1); 
    console.log(rand)
    this.id1=rand
    let b=this.$route.query.restaurant_id;
    if(b){
       this.axios.get('https://elm.cangdu.org/shopping/getcategory/'+b).then(res=>{
         this.options = res.data.category_list;
        })
    }else{
this.axios
      .get(
        "https://elm.cangdu.org/shopping/getcategory/"+rand)
      .then(res => {
        if (res.data.status === 1) {
          this.options = res.data.category_list;
        }
      });
    }
    
  },
  methods: {
    hide() {
      this.shoe = !this.shoe;
    },
    food(v){
       this.options.map(item=>{
         if(item.name===v){
           this.id=item.id
         }
       })

    },
    tj() {
       let data = {
        description: this.input1,
        name: this.input,
      };
      if(this.$route.query.restaurant_id){
        data.restaurant_id=this.$route.query.restaurant_id
      }else if(this.id1){
        data.restaurant_id=this.id1
      }
      this.axios
        .post("https://elm.cangdu.org/shopping/addcategory", data)
        .then(res => {
          console.log(res.data);
          if(res.data.status==1){
            this.shoe=false
             this.$message({
          message:res.data.success,
          type: 'success'
        });
          }else{
             this.$message({
          message:res.data.message,
          type: 'error'
        });
          }
        });
        
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
  
  &:hover {
   
    i,span{
 color: #20a0ff;
    }
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
    margin-bottom: 20px;
    border-radius: 10px;
    & > div:nth-of-type(1) {
      margin-bottom: 30px;
      padding: 10px 50px 0 30px;
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
.aa {
  background: #f9fafc;
  height: 0;
  overflow: hidden;
  transition: all 1s;
}
.divv {
  height: 180px;
  transition: all 1s;
}
.el-select {
  width: 80%;
}
</style>
