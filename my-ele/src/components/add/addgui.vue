<template>
    <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-input v-model="gui" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装费" :label-width="formLabelWidth">
          <el-input-number
            v-model="num1"
            @change="handleChange"
            :min="0"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input-number
            v-model="num"
            @change="handleChange"
            :min="0"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="tru">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
    props:["xian"],
data(){
    return{
      specs: [{ specs: "默认", packing_fee: 0, price: 15 }],
      gui: "",
      formLabelWidth: "120px",
      num1: 0,
      num: 20,
      dialogFormVisible: false,
    }
},
methods:{
tru() {
      let obj = { specs: this.gui, price: this.num, packing_fee: this.num1 };
      this.specs.push(obj);
      this.dialogFormVisible = false;
    },
    handleChange(value) {
      // console.log(value);
    },
}

}
</script>

<style>

</style>
