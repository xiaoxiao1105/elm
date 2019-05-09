<template>
  <div>
    <div class="list">
      <div>
        <el-table :data="tableData" style="width: 100%"  @expand-change="chang">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="店铺名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="店铺介绍">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="联系电话">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="评分">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="销售量">
                  <span>{{ props.row.recent_order_num }}</span>
                </el-form-item>
                <el-form-item label="分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="店铺名称" prop="name"> </el-table-column>
          <el-table-column label="店铺地址" prop="address">
          </el-table-column>
          <el-table-column label="店铺介绍" prop="description"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                @click="addftoods(scope.$index, scope.row)"
                >添加食品</el-button
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
      <el-pagination background layout="total,prev, pager, next" :total="tota" :page-size="20" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

<!-- 编辑 -->

  <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="店铺名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="详细地址" :label-width="formLabelWidth">
      <!-- <el-input v-model="form.address" autocomplete="off"></el-input> -->
      <el-autocomplete
          v-model="form.address"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入地址"
          style="width: 100%;"
        ></el-autocomplete>
      <p>当前城市：{{city}}</p>
    </el-form-item>

<el-form-item label="店铺介绍" :label-width="formLabelWidth">
      <el-input v-model="form.description" autocomplete="off"></el-input>
    </el-form-item>

<el-form-item label="联系电话" :label-width="formLabelWidth">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>

<el-form-item label="店铺分类" :label-width="formLabelWidth">
						<el-cascader
						  :options="options"
						  v-model="form.category"
						  change-on-select
						></el-cascader>
</el-form-item>

<el-form-item label="商铺图片" :label-width="formLabelWidth">
       <el-upload
          class="avatar-uploader"
          :action="'https://elm.cangdu.org/v1/addimg/shop'"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="form.image_path"
            :src="'//elm.cangdu.org/img/' + form.image_path"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="que">确 定</el-button>
  </div>
</el-dialog>













  </div>
</template>

<script>
export default {
  data() {
    return {
      val:1,
      tableData: [],
      cityListlist:[],
      tota:0,
      longitude:'',
      latitude:'',
       dialogFormVisible: false,
        form: {
          name: '',
          address:'',
          description:'',
          category:[],
          phone:'',
          image_path:'',
          recent_order_num:'',
          latitude:'',
          longitude:'',
          rating:'',
          id:'',
        },
        options:[],
        city:'',
        formLabelWidth: '120px'
    };
  },
  mounted() {
    //获取城市经纬度 列表
    this.axios.get('https://elm.cangdu.org/v1/cities?type=guess').then(res=>{
       this.latitude=res.data.latitude
      this.longitude=res.data.longitude
    })
this.list(this.val)
// 请求分
this.fenlei()
// 请求城市
this.city1()
    //数据总条数
  this.axios.get('https://elm.cangdu.org/shopping/restaurants/count').then(res=>{
    this.tota=res.data.count
  })
},

  methods: {
// 分类
async fenlei(){
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
              let obj1 = {
                value: i.name,
                label: i.name
              };
              obj.children.push(obj1);
              cc.push(obj);
              cc = [...new Set(cc)];
            });
          });
          this.options = cc;
        });
},

// 请求城市接口
city1(){
  this.axios.get('https://elm.cangdu.org/v1/cities?type=guess').then(res=>{
    this.city=res.data.name
    this.id=res.data.id
  })
},
// 获取列表

list(val){
  if(this.latitude||this.longitude){
this.axios
      .get('https://elm.cangdu.org/shopping/restaurants?latitude='+this.latitude+'&longitude='+this.longitude+'&offset='+(val-1)*20+'&limit=20')
      .then(res => {
        this.tableData = res.data
      });
      }else{
        this.axios
      .get('https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=0&limit=20')
      .then(res => {
        this.tableData = res.data
      });
      }
},



    // 上传图片
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
     handleAvatarSuccess(res, file) {
      if (res.status == 1) {
        this.imageUrl = res.image_path;
      } else {
        this.$message.error("上传头像图片失败");
      }
    },

    // 点击添加店铺
    addfoods(index,row){
    this.$router.push({path:'/list?restaurant_id='+row.id})
    },
    // 点击编辑
    handleEdit(index, row) {
      this.dialogFormVisible=true
      this.form={
          name:row.name,
          address:row.address,
          description:row.description,
          category:row.category.split('/'),
          phone:row.phone,
          image_path:row.image_path,
          recent_order_num:row.recent_order_num,
          latitude:row.latitude,
          longitude:row.longitude,
          rating:row.rating,
          id:row.id,
      }
    },

    handleDelete(index, row) {},
    chang(row){},
    // 确定
    que(){
        let obj={...this.form}
        console.log(obj)
        this.axios.post('https://elm.cangdu.org/shopping/updateshop',obj).then(res=>{
          console.log(res)
          if(res.data.status==1){
            this.$message({
          message: res.data.success,
          type: 'success'
        });
         this.dialogFormVisible=false
this.list(this.val)
          }
        })
    },
// 地址分类
 
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





    // 点击分页
    handleCurrentChange(val) {
      this.list(val)
this.val=val
//       if(this.latitude||this.longitude){
// this.axios
//       .get('https://elm.cangdu.org/shopping/restaurants?latitude='+this.latitude+'&longitude='+this.longitude+'&offset='+val*20+'&limit=20')
//       .then(res => {
//         console.log(res)
//         this.tableData = res.data
//       });
//       }else{
//         this.axios
//       .get('https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset='+val*20+'&limit=20')
//       .then(res => {
//         console.log(res)
//         this.tableData = res.data
//       });
//       }
      
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
</style>
