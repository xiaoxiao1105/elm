<template>
  <div class="add">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-autocomplete
          v-model="ruleForm.address"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入地址"
          style="width: 100%;"
          @select="addressSelect"
        >
        </el-autocomplete>
      </el-form-item>
      <p class="city">当前城市：{{ city }}</p>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model="ruleForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介">
        <el-input v-model="ruleForm.dpjj"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语">
        <el-input v-model="ruleForm.dpby"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类">
        <el-cascader
          :options="options1"
          v-model="selectedOptions"
        ></el-cascader>
      </el-form-item>
      <!-- <el-cascader :options="options" v-model="selectedOptions"></el-cascader> -->

      <el-form-item label="即时配送">
        <span>品牌保证</span
        ><el-switch v-model="ruleForm.delivery"></el-switch>
        <span>蜂鸟专送</span><el-switch v-model="ruleForm.de"></el-switch>
        <span>新开店铺</span><el-switch v-model="ruleForm.del"></el-switch>
      </el-form-item>
      <el-form-item>
        <span>外卖保</span><el-switch v-model="ruleForm.deli"></el-switch>
        <span>准时达</span><el-switch v-model="ruleForm.deliv"></el-switch>
        <span>开发票</span><el-switch v-model="ruleForm.delive"></el-switch>
      </el-form-item>

      <el-form-item label="配送费">
        <el-input-number
          v-model="num"
          @change="handleChange"
          :max="20"
          :min="5"
          label="描述文字"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="起送价">
        <el-input-number
          v-model="num1"
          @change="handleChange"
          :min="20"
          label="描述文字"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="营业时间">
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
            start: '05:30',
            step: '00:15',
            end: '23:30'
          }"
        >
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
            start: '05:30',
            step: '00:15',
            end: '23:30',
            minTime: startTime
          }"
        >
        </el-time-select>
      </el-form-item>

      <el-form-item label="上传店铺头像">
        <el-upload
          class="avatar-uploader"
          :action="'https://elm.cangdu.org/v1/addimg/shop'"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="imageUrl"
            :src="'//elm.cangdu.org/img/' + imageUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传营业执照">
        <el-upload
          class="avatar-uploader"
          :action="'https://elm.cangdu.org/v1/addimg/shop'"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess1"
        >
          <img
            v-if="imageUrl1"
            :src="'//elm.cangdu.org/img/' + imageUrl1"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传餐饮服务许可证">
        <el-upload
          class="avatar-uploader"
          :action="'https://elm.cangdu.org/v1/addimg/shop'"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess2"
        >
          <img
            v-if="imageUrl2"
            :src="'//elm.cangdu.org/img/' + imageUrl2"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="优惠活动">
        <el-select v-model="value" placeholder="请选择" @change="man">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            
          >
          </el-option>
        </el-select>
      </el-form-item>


<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="icon_name"
        label="活动标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="活动名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="活动详情">
      </el-table-column>
<el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>

    </el-table>





      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      // 弹框
      dialogVisible: false,
      xing:'',
      // 地址下拉
      cityListlist:[],
      // 当前地址
      city: "",
      id: "",
      // 店铺分类
      options1: [],
      selectedOptions: [],
      //优惠下拉
      options: [
        {
          value: "满减优惠",
          label: "满减优惠"
        },
        {
          value: "优惠大酬宾",
          label: "优惠大酬宾"
        },
        {
          value: "新用户立减",
          label: "新用户立减"
        },
        {
          value: "进店领卷",
          label: "进店领卷"
        }
      ],
      //上传照片

      imageUrl: "",
      imageUrl1: "",
      imageUrl2: "",
      //起送价
      num: "",
      num1: "",
      value: "",
      startTime: "",
      endTime: "",
      ruleForm: {
        name: "",
        address: "",
        tel: "",
        dpjj: "",
        dpby: "",
        delivery: true,
        de: true,
        del: true,
        deli: true,
        deliv: true,
        delive: true
      },
      // 点击创建
      obj:{},
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入正确的地址", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入正确的电话格式", trigger: "blur" }
        ],
        dpjj: [
          { required: true, message: "请输入店铺简介", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        dpby: [
          { required: true, message: "请输入店铺标语", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.fenlei();
    this.axios.get("https://elm.cangdu.org/v1/cities?type=guess").then(res => {
      console.log(res)
      if (res.status == 200) {
        this.id = res.data.id;
        this.city = res.data.name;
      }
    });
  },
  methods: {
// 删除
 handleDelete(index, row) {
        this.tableData.splice(index,1)
      },
    //满减优惠
    man(){
        this.$prompt('请输入活动名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          let icon_name1=''
          if(this.value==='满减优惠'){
icon_name1="减"
          }else if(this.value==='优惠大酬宾'){
            icon_name1="优"
          }else if(this.value==='新用户立减'){
            icon_name1="新"
          }else if(this.value==='进店领卷'){
             icon_name1="卷"
          }
          let obj={
        icon_name:icon_name1,
        name:this.value,
        description:value,
      }
      this.tableData.push(obj)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      
      
    },
    //地址下拉
    addressSelect(i) {
      this.obj.address=i.address;
      this.obj.latitude=i.latitude;
      this.obj.longitude=i.longitude;
    },
    querySearchAsync(queryString, cb) {
      if (queryString) {
        this.axios
          .get(
            "https://elm.cangdu.org/v1/pois?type=search&city_id="+this.id+"&keyword=" +
              queryString
          )
          .then(res => {
            res.data.map((item, index) => {
              item.value = item.address;
            });
            this.cityListlist = res.data;
            cb(this.cityListlist);
          });
      }
    },
    // 地址分类
    fenlei() {
      this.axios
        .get("https://elm.cangdu.org/shopping/v2/restaurant/category")
        .then(res => {
          let cc = [];
          res.data.map(item => {
            let obj = {
              value: item.name,
              label: item.name,
              children: []
            };
            item.sub_categories.map(i => {
              this.selectedOptions = [item.name, i.name];
              let obj1 = {
                value: i.name,
                label: i.name
              };
              obj.children.push(obj1);
              cc.push(obj);
              cc = [...new Set(cc)];
            });
          });
          this.options1 = cc;
        });
    },

    submitForm() {
      let dp={
        ...this.obj,
        activities:this.tableData,
        business_license_image:this.imageUrl1,
        catering_service_license_image:this.imageUrl2,
        image_path:this.imageUrl,
        category:this.value,//分类
        description:this.ruleForm.dpjj,
        endTime:this.endTime,
        float_delivery_fee:this.num,
        float_minimum_order_amount:this.num1,
        name:this.ruleForm.name,
        phone:this.ruleForm.tel,
        promotion_info:this.ruleForm.dpby,
        startTime:this.startTime,
        is_premium:this.ruleForm.delivery,
        delivery_mode:this.ruleForm.de,
        new:this.ruleForm.del,
        bao:this.ruleForm.deli,
        zhun:this.ruleForm.deliv,
        piao:this.ruleForm.delive
        }
        this.axios.post('https://elm.cangdu.org/shopping/addShop',dp).then(res=>{
          console.log(res)
          if(res.data.status==1){
        this.$message({
          message: '添加商铺成功',
          type: 'success'
        });
        this.ruleForm= {
        name: "",
        address: "",
        tel: "",
        dpjj: "",
        dpby: "",
        delivery: true,
        de: true,
        del: true,
        deli: true,
        deliv: true,
        delive: true
      }
      this.imageUrl=''
      this.imageUrl1=''
      this.imageUrl2=''
      this.endTime=""
      this.startTime=""
          }else{
            this.$message({
          showClose: true,
          message:res.data.message,
          type: 'error'
        });
          }
            
          })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
    },
    //上传照片成功
    handleAvatarSuccess(res, file) {
      if (res.status == 1) {
        this.imageUrl = res.image_path;
      } else {
        this.$message.error("上传头像图片失败");
      }
    },
    handleAvatarSuccess1(res, file) {
      if (res.status == 1) {
        this.imageUrl1 = res.image_path;
      } else {
        this.$message.error("上传头像图片失败");
      }
    },
    handleAvatarSuccess2(res, file) {
      if (res.status == 1) {
        this.imageUrl2 = res.image_path;
      } else {
        this.$message.error("上传头像图片失败");
      }
    },
    // 上传图片大小限制
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
    }
  }
};
</script>

<style  lang="scss">
.city {
  padding-left: 100px;
}
.add {
  width: 65%;
  margin: 20px auto;
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
.el-input-number--small .el-input__inner {
  padding-left: 0px;
  padding-right: 65px;
}
.el-input-number__decrease {
  left: 64px;
}
.el-scrollbar__wrap {
  width: 330px;
}
.el-select {
  width: 100%;
}

</style>
