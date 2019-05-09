<template>
  <div>
    <header><h2>选择食品种类</h2></header>
    <div class="foo">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="食品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="食品活动">
          <el-input v-model="ruleForm.activity"></el-input>
        </el-form-item>

        <el-form-item label="食品详情">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="上传食品图片">
          <el-upload
            class="avatar-uploader"
            :action="'https://elm.cangdu.org/v1/addimg/food'"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="ruleForm.image_path"
              :src="'//elm.cangdu.org/img/' + ruleForm.image_path"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="食品特点">
          <el-select
            v-model="ruleForm.attributes"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="食品规格">
          <el-radio-group v-model="ruleForm.specs">
            <el-radio label="单规格" @change="dan1"></el-radio>
            <el-radio label="多规格" @change="duo1"></el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="dan">
          <el-form-item label="包装费">
            <el-input-number
              v-model="ruleForm.packing_fee"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="价格">
            <el-input-number
              v-model="ruleForm.price"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </div>

        <div v-show="duo" class="dan">
          <el-button type="primary" @click="der">添加规格</el-button>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="规格" width="100">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.specs }}</span>
              </template>
            </el-table-column>
            <el-table-column label="包装费" width="100">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.packing_fee
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="价格" width="100">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确认添加食品</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="规格" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="包装费">
          <el-input-number
            v-model="ruleForm.packing_fee"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="价格">
          <el-input-number
            v-model="ruleForm.price"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="que"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props:['id','category_id'],
  data() {
    return {
      dan: true,
      duo: false,
      dialogFormVisible: false,
      formLabelWidth: "50px",
      tableData: [],
      form: {
        name: ""
      },
      ruleForm: {
        name: "",
        activity: "",
        description: "",
        image_path: "",
        attributes: [],
        price: 20,
        packing_fee: 0,
        specs: "单规格"
      },
      options: ["新品", "招牌"],
      rules: {
        name: [{ required: true, message: "请输入食品名称", trigger: "blur" }],
        activity: [
          { required: true, message: "请输入食品活动", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入详情", trigger: "blur" }
        ],
        attributes: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个食品特点",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    this.gui();
    console.log(this.id)
  },
  methods: {
    // 封装函数

    gui() {
      let obj = {
        price: 20,
        packing_fee: 0,
        specs: "默认"
      };
      this.tableData.push(obj);
    },
que(){
this.dialogFormVisible = false
let obj = {
        price:this.ruleForm.price,
        packing_fee: this.ruleForm.packing_fee,
        specs:this.form.name
      };
      this.tableData.push(obj);
},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let obj = {
          activity: this.ruleForm.activity,
          attributes:this.ruleForm.attributes,
          category_id:this.category_id,
          description: this.ruleForm.description,
          image_path:this.ruleForm.image_path,
          name: this.ruleForm.name,
          restaurant_id:this.id,
          specs:this.tableData
        };
        this.axios.post('https://elm.cangdu.org/shopping/addfood',obj).then(res=>{
          console.log(res)
          if(res.data.status===1){
             this.ruleForm= {
        name: "",
        activity: "",
        description: "",
        image_path: "",
        attributes: [],
        price: 20,
        packing_fee: 0,
        specs: "单规格"
      }
          }else{
            this.$message({
          message:res.data.message,
          type: 'warning'
        });
          }
        })
      });
    },
    // 上传图片   限制大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传
    handleAvatarSuccess(res, file) {
      if (res.status == 1) {
        console.log(res);
        this.ruleForm.image_path = res.image_path;
      } else {
        this.$message.error("上传头像图片失败");
      }
    },
    // 规格   删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 单规格
    dan1() {
      this.dan = true;
      this.duo = false;
    },
    duo1() {
      this.duo = true;
      this.dan = false;
    },
    // 确认添加规格
    der() {
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.foo {
  width: 100%;
  padding: 20px;
  border: 1px solid gainsboro;
}
// 上传图片
.el-form-item__content,
.avatar-uploader {
  text-align: left;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 125px;
  height: 125px;
  line-height: 125px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.dan {
  width: 100%;
  margin-bottom: 20px;
}

.el-input-number__decrease {
  left: 68px;
}
.el-input-number--small .el-input__inner {
  padding-left: 0px;
  padding-right: 61px;
}
</style>
