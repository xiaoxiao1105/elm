<template>
  <div class="userdata">
    <div class="tab">
        <div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column property="date" label="日期" width="120">
      </el-table-column>
      <el-table-column property="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column property="address" label="地址"> </el-table-column>
    </el-table>
    </div>
    </div>
    <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      currentRow: null
    };
  },

  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.userdata {
  width: 100%;
  .tab{
      padding:20px;
      &>div{
          border:1px solid gainsboro;
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
}
</style>
