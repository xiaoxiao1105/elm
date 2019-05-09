<template>
  <div>
    <div class="list">
      <div>
        <el-table
         :data="tableData" 
         style="width: 100%"  
         @expand-change="chang"
         :expand-row-keys="expands"
          :row-key="row => row.index"
          :row-class-name="tableRowClassName"
         >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="用户名">
                  <span>{{ props.row.username }}</span>
                </el-form-item>
                <el-form-item label="店铺名称">
                  <span>{{ props.row.restaurant_name }}</span>
                </el-form-item>
                <el-form-item label="收货地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.restaurant_id }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address1 }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单ID" prop="id"> </el-table-column>
          <el-table-column label="总价格" prop="total_amount">
          </el-table-column>
          <el-table-column label="订单状态" prop="status_bar.title"> </el-table-column>
         
        </el-table>
      </div>
    </div>
    <div class="pag">
      <el-pagination background layout="total,prev, pager, next" :total="tota" :page-size="20" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      expands: [],
      tota:0,
    };
  },
  mounted() {
    this.axios.get("https://elm.cangdu.org/bos/orders?offset=0&limit=20&restaurant_id=undefined").then(res => {
        this.tableData = res.data;
      });
      // 页数请求接口
  this.axios.get('https://elm.cangdu.org/shopping/restaurants/count').then(res=>{
    this.tota=res.data.count
    
  })
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      //把index放到row里
      row.index = rowIndex;
    },
    //展开行的请求
    chang(row){
          this.axios.get('https://elm.cangdu.org/v1/user/'+row.user_id).then(res=>{
            this.tableData[row.index].username=res.data.username
          })
          this.axios.get('https://elm.cangdu.org/v1/addresse/'+row.address_id).then(res=>{
            this.tableData[row.index].address=res.data.address
          })
          this.axios.get('https://elm.cangdu.org/shopping/restaurant/'+row.restaurant_id).then(res=>{
            this.tableData[row.index].address1=res.data.address
            let objlist=this.tableData[row.index]
            this.tableData.splice(row.index,1,objlist)
          })
          
    },
  //点击页数请求接口
    handleCurrentChange(val) {
      this.axios
      .get("https://elm.cangdu.org/bos/orders?offset="+val*20+"&limit=20&restaurant_id=undefined")
      .then(res => {
        this.tableData = res.data;
      });
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
</style>
