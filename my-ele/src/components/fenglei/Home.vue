<template>
  <div class="data_section">
    <div class="header_container">
      <p>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
      </p>
      <div><img src="//elm.cangdu.org/img/default.jpg" class="avator" /></div>
    </div>
    <div class="data">
      <header>数据统计</header>
      <ul class="data-a">
        <li class="data-a-a">当日数据:</li>
        <li>
          <span>{{ adduser }}</span
          >新增用户
        </li>
        <li>
          <span>{{ addOrder }}</span
          >新增订单
        </li>
        <li>
          <span>{{ addAdministrators }}</span
          >新增管理员
        </li>
      </ul>
      <ul class="data-a">
        <li class="data-a-a data-b">总数据:</li>
        <li>
          <span>{{ register }}</span
          >注册用户
        </li>
        <li>
          <span>{{ order }}</span
          >订单
        </li>
        <li>
          <span>{{ Administrators }}</span
          >管理员
        </li>
      </ul>
    </div>
    <div id="my" :style="{ width: '93%', height: '450px' }"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //新增用户
      adduser: "",
      adduser1: "",
      adduser2: "",
      adduser3: "",
      //新增订单
      addOrder: "",
      addOrder1: "",
      addOrder2: "",
      addOrder3: "",
      //注册用户
      register: "",
      //新增管理员
      addAdministrators: "",
      //订单
      order: "",
      //管理员
      Administrators: "",
      nowTime: "",
      SxTime: "",
      FeTime: "",
      FrTime: "",
      TeTime: "",
      TwTime: "",
      OnTime: ""
    };
  },
  mounted() {
    this.nowTimes();
    //新增用户
    this.axios
      .get("https://elm.cangdu.org/statis/user/" + this.SxTime + "/count")
      .then(res => {
        this.adduser = res.data.count;
        if (this.adduser != "") {
          this.myeach();
        }
      });
    this.axios
      .get("https://elm.cangdu.org/statis/user/" + this.FrTime + "/count")
      .then(res => {
        this.adduser1 = res.data.count;
        if (this.adduser1 != "") {
          this.myeach();
        }
      });
    this.axios
      .get("https://elm.cangdu.org/statis/user/" + this.TwTime + "/count")
      .then(res => {
        this.adduser2 = res.data.count;
        if (this.adduser2 != "") {
          this.myeach();
        }
      });
    this.axios
      .get("https://elm.cangdu.org/statis/user/" + this.nowTime + "/count")
      .then(res => {
        this.adduser3 = res.data.count;
        if (this.adduser3 != "") {
          this.myeach();
        }
      });
    //注册用户
    this.axios.get("https://elm.cangdu.org/v1/users/count").then(res => {
      // console.log(res.data);
      this.register = res.data.count;
    });
    //新增管理员
    this.axios
      .get("https://elm.cangdu.org/statis/admin/"+this.SxTime+"/count")
      .then(res => {
        this.addAdministrators = res.data.count;
        if(this.addAdministrators!=''){
           this.myeach();
        }
      });
      this.axios
      .get("https://elm.cangdu.org/statis/admin/"+this.FrTime+"/count")
      .then(res => {
        this.addAdministrators1 = res.data.count;
        if(this.addAdministrators1!=''){
           this.myeach();
        }
      });
      this.axios
      .get("https://elm.cangdu.org/statis/admin/"+this.TwTime+"/count")
      .then(res => {
        this.addAdministrators2 = res.data.count;
        if(this.addAdministrators2!=''){
           this.myeach();
        }
      });
      this.axios
      .get("https://elm.cangdu.org/statis/admin/"+this.nowTime+"/count")
      .then(res => {
        this.addAdministrators3 = res.data.count;
        if(this.addAdministrators3!=''){
           this.myeach();
        }
      });
      
    //订单
    this.axios
      .get("https://elm.cangdu.org/statis/order/"+this.SxTime+"/count")
      .then(res => {
        this.addOrder = res.data.count;
        if(this.addOrder!=''){
           this.myeach();
        }
      });
    this.axios
      .get("https://elm.cangdu.org/statis/order/"+this.FrTime+"/count")
      .then(res => {
        this.addOrder1 = res.data.count;
        if(this.addOrder1!=''){
           this.myeach();
        }
      });
    this.axios
      .get("https://elm.cangdu.org/statis/order/"+this.TwTime+"/count")
      .then(res => {
        this.addOrder2 = res.data.count;
        if(this.addOrder2!=''){
           this.myeach();
        }
      });
    this.axios
      .get("https://elm.cangdu.org/statis/order/"+this.nowTime+"/count")
      .then(res => {
        this.addOrder3 = res.data.count;
        if(this.addOrder3!=''){
           this.myeach();
        }
      });
    //订单
    this.axios.get("https://elm.cangdu.org/bos/orders/count").then(res => {
      this.order = res.data.count;
    });

    //info
    this.axios.get("https://elm.cangdu.org/admin/info").then(res => {
      // console.log(res);
    });
  },
  methods: {
    myeach() {
      let my = this.$echarts.init(document.getElementById("my"));
      my.setOption({
        title: {
          text: "走势图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新注册用户", "新增订单", "新增管理员"]
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [this.SxTime, this.FrTime, this.TwTime, this.nowTime]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}"
          }
        },
        series: [
          {
            name: "新注册用户",
            type: "line",
            data: [this.adduser, this.adduser1, this.adduser2, this.adduser3],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          },
          {
            name: "新增订单",
            type: "line",
            data: [ this.addOrder, this.addOrder1,this.addOrder2,this.addOrder3],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          },
          {
            name: "新增管理员",
            type: "line",
            data: [this.addAdministrators, this.addAdministrators1, this.addAdministrators2,this.addAdministrators3],
           markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          }
        ]
      });
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      this.nowTime = year + "-" + month + "-" + date;
      this.SxTime = year + "-" + month + "-" + (date - 6);
      this.FeTime = year + "-" + month + "-" + (date - 5);
      this.FrTime = year + "-" + month + "-" + (date - 4);
      this.TeTime = year + "-" + month + "-" + (date - 3);
      this.TwTime = year + "-" + month + "-" + (date - 2);
      this.OnTime = year + "-" + month + "-" + (date - 1);
    },
    nowTimes() {
      return this.timeFormate(new Date());
    }
  }
};
</script>

<style lang="scss">
.data_section {
  width: 100%;
  height: 100%;
  .data {
    padding: 20px;
    header {
      text-align: center;
      font-size: 30px;
      margin-bottom: 10px;
    }
    .data-a {
      width: 100%;
      display: flex;
      margin-left:-20px;
      list-style: none;
      li {
        width: 290px;
        padding: 10px 20px;
        margin: 0 29px 10px 0;
        background: #e5e9f2;
        text-align: center;
        color: #666;
        border-radius: 10px;
        span {
          color: #333;
          font-size: 20px;
        }
      }
      .data-a-a {
        color: white;
        font-size: 20px;
        background: orange;
        text-align: center;
      }
      .data-b {
        background: #20a0ff;
      }
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
</style>
