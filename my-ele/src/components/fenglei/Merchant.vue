<template>
  <div>
    <div class="header_container">
      <p>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/manage/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据管理</el-breadcrumb-item>
          <el-breadcrumb-item>商家列表</el-breadcrumb-item>
        </el-breadcrumb>
      </p>
      <div><img src="//elm.cangdu.org/img/default.jpg" class="avator" /></div>
    </div>
    <div class="list">
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="食品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="餐馆名称">
                  <!-- <span>{{ props.row.description }}</span> -->
                  <span>{{ props.row.name }}</span>
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
                  <span>{{ props.row.desc }}</span>
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
      <el-pagination background layout="total,prev, pager, next" :total="1035" :page-size="20" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.axios
      .get(
        "https://elm.cangdu.org/shopping/v2/foods?offset=0&limit=20&restaurant_id=undefined"
      )
      .then(res => {
        this.tableData = res.data;
      });
    //    this.axios
    //         .get("https://elm.cangdu.org/shopping/restaurant/"+res.data[i].restaurant_id)
    //         .then(res => {

    //         });
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.axios
      .get("https://elm.cangdu.org/shopping/v2/foods?offset="+val*20+"&limit=20&restaurant_id=undefined")
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
