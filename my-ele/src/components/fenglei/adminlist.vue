<template>
    <div class="admi">
        <div>
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="user_name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="注册日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="city"
        label="地址">
      </el-table-column>
       <el-table-column
        prop="admin"
        label="权限">
      </el-table-column>
    </el-table>
<div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
  </div>
    </div>
    </div>
</template>

<script>
export default {
 data() {
        return {
          tableData: [],
            count:0
        }
      },
      mounted(){
          this.list()
      },
      methods:{
          handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.axios
        .get(
          " https://elm.cangdu.org/admin/all?offset=" +
            val * 20 +
            "&limit=20"
        )
        .then(res => {
             if(res.data.status===1){
  this.tableData=res.data.data
     } 
        });
      },
          list(){
 this.axios.get('https://elm.cangdu.org/admin/all?offset=0&limit=20').then(res=>{
     if(res.data.status===1){
  this.tableData=res.data.data
     }    
          })
          this.axios.get('https://elm.cangdu.org/admin/count').then(res=>{
              if(res.data.status==1){
                this.count=res.data.count
              }
            //   
          })
          }
         
      }
}
</script>

<style lang="scss">
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}
.admi{
    width: 100%;
    padding:2%;
    &>div{
        border:1px solid gainsboro;
    }
}
.block{
    padding:20px;
}
</style>
