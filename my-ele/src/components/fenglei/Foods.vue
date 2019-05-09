<template>
  <div>
    <div class="list">
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          @expand-change="expan"
          :expand-row-keys="expands"
          :row-key="row => row.index"
          :row-class-name="tableRowClassName"
        >

          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="食品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="餐馆名称">
                  <span>{{ props.row.name1 }}</span>
                </el-form-item>
                <el-form-item label="食品 ID">
                  <span>{{ props.row.item_id }}</span>
                </el-form-item>
                <el-form-item label="餐馆 ID">
                  <span>{{ props.row.restaurant_id }}</span>
                </el-form-item>
                <el-form-item label="食品介绍">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="餐馆地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="食品评分">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="食品分类">
                  <span>{{ props.row.name2 }}</span>
                </el-form-item>
                <el-form-item label="月销量">
                  <span>{{ props.row.month_sales }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="食品名称" prop="name"> </el-table-column>
          <el-table-column label="食品介绍" prop="description">
          </el-table-column>
          <el-table-column label="评分" prop="rating"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
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
    </div>
    <div class="pag">
      <el-pagination
        background
        layout="total,prev, pager, next"
        :total="total"
        :page-size="20"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="食品介绍" :label-width="formLabelWidth">
          <el-input v-model="form.jie" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="食品分类" :label-width="formLabelWidth">
          <el-select v-model="fenlei[0]" placeholder="请选择活动区域">
            <el-option v-for="i in fenlei" :value="i">{{ i }}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="食品图片" :label-width="formLabelWidth">
          <el-upload
  class="avatar-uploader"
  :action="'https://elm.cangdu.org/v1/addimg/food'"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="'//elm.cangdu.org/img/'+imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item>

        <el-table :data="specfoods" style="width: 100%">
          <el-table-column label="规格" prop="specs_name"> </el-table-column>
          <el-table-column label="包装费" prop="packing_fee"> </el-table-column>
          <el-table-column label="价格" prop="price"> </el-table-column>
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
        <div class="su">
          <el-button type="primary" @click="addguge">添加规格</el-button>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="der">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加规格 -->
    <el-dialog title="添加规格" :visible.sync="dialogFormVisible1">
      <el-form>
        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-input v-model="gui" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装费" :label-width="formLabelWidth">
          <el-input-number
            v-model="num1"
            :min="0"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input-number
            v-model="num"
            :min="0"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="tru">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expands: [],
      val:1,
      specfoods: [],
      spec:[],
      tableData: [],
      total: 0,
      imageUrl: "",
      gui: "",
      num1: 0,
      num: 20,
      form: {
        name: "",
        jie: "",
        region: "",
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      fenlei: [],


      category_id:'',
      category_name:'',
      index: 0,
      id: "",
      item_id: "",
      month_sales: "",
      nm: "",
      rating: "",
      restaurant_address:'',
      restaurant_id: "",
      restaurant_name:'',
    };
  },
  mounted() {
    this.getdat(this.val)
  },
  
  methods: {
    //获取最先的数据
    getdat(val){
this.axios.get("https://elm.cangdu.org/shopping/v2/foods?offset=" +(val-1) * 20 +"&limit=20&restaurant_id=undefined").then(res => {
        this.tableData = res.data;
      });
    //分页
    this.axios
      .get(
        "https://elm.cangdu.org/shopping/v2/foods/count?restaurant_id="
      )
      .then(res => {
        this.total = res.data.count;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      //把index放到row里
      row.index = rowIndex;
    },
    //展开行
    expan(row) {
      console.log(row)
      //食品分类
      this.axios
        .get("https://elm.cangdu.org/shopping/v2/menu/" + row.category_id)
        .then(res => {
         this.tableData[row.index].name2 = res.data.name;
        });
        //餐馆名称
      this.axios
        .get("https://elm.cangdu.org/shopping/restaurant/" + row.restaurant_id)
        .then(res => {
            this.tableData[row.index].address=res.data.address
            this.tableData[row.index].name1=res.data.name
            let objlist=this.tableData[row.index]
            this.tableData.splice(row.index,1,objlist)
        });
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      if(res.status==1){
        this.imageUrl=res.image_path
      }else{
        this.$message.error('上传头像图片失败');
      }
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg')||(file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    //编辑
    handleEdit(index, row) {
      // this.expan(row)
    this.category_id=this.tableData[index].category_id
    this.category_name=this.tableData[index].name2
    this.index=index
    this.item_id=this.tableData[index].item_id
    this.month_sales=this.tableData[index].month_sales
    this.rating=this.tableData[index].rating
    this.restaurant_address=this.tableData[index].address
    this.restaurant_id=this.tableData[index].restaurant_id
    this.restaurant_name=this.tableData[index].name1
    this.specfoods=this.tableData[index].specfoods
      this.imageUrl = row.image_path;
      this.form.name = row.name;
      this.form.jie = row.description;
      this.axios
        .get(
          "https://elm.cangdu.org/shopping/v2/menu?restaurant_id=" +
            row.restaurant_id +
            "&allMenu=true"
        )
        .then(res => {
          for (let i in res.data) {
            this.fenlei.push(res.data[i].name);
          }
        });
      this.dialogFormVisible = true;
    },
    //确定商品
   async der() {
      let obj={
        category_id:this.category_id,
        category_name:this.category_name,
        description:this.form.jie,
        image_path:this.imageUrl,
        index:this.index,
        item_id:this.item_id,
        month_sales:this.month_sales,
        name:this.form.name,
        new_category_id:this.category_id,
        rating:this.rating,
        restaurant_address:this.restaurant_address,
        restaurant_id:this.restaurant_id,
        restaurant_name:this.restaurant_name,
        specfoods:this.specfoods,
        specs:this.spec
      }
      this.axios.post('https://elm.cangdu.org/shopping/v2/updatefood',obj).then(res=>{
        if(res.data.status===1){
          this.dialogFormVisible = false;
           this.getdat(this.val)
        }
      })
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    //删除添加规格
    handleDelete1(index, row) {
      console.log(index, row);
    },
    //添加规格
    addguge() {
      this.dialogFormVisible1 = true;
    },
    //规格添加确定
    tru() {
      let obj = { specs_name: this.gui, price: this.num, packing_fee: this.num1 };
      this.specfoods.push(obj);
      this.spec.push(obj)
      this.dialogFormVisible1 = false;
    },
    //分页
    handleCurrentChange(val) {
       this.val=val
      this.getdat(val)
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
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
.pag {
  width: 100%;
  .el-pagination {
    padding-left: 20px;
  }
}
.list {
  padding: 20px;
  & > div {
    border: 1px solid gainsboro;
  }
}
// 遮罩层
.zhezhao {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
//上传图片
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
.su {
  text-align: center;
  padding-top: 20px;
}
//价格
</style>
