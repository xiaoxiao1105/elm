<template>
  <div class="data_section">
    <div class="data">
      <header>数据统计</header>
      <ul class="data-a">
        <li class="data-a-a">当日数据:</li>
        <li>
          <span>{{ data[0] }}</span>新增用户
        </li>
        <li>
          <span>{{ data[1] }}</span>新增订单
        </li>
        <li>
          <span>{{  data[2]  }}</span>新增管理员
        </li>
      </ul>
      <ul class="data-a">
        <li class="data-a-a data-b">总数据:</li>
        <li>
          <span>{{ users }}</span
          >注册用户
        </li>
        <li>
          <span>{{order}}</span
          >订单
        </li>
        <li>
          <span>{{ admin}}</span
          >管理员
        </li>
      </ul>
    </div>
    <div id="my" :style="{ width: '93%', height: '450px' }"></div>
  </div>
</template>

<script>
import dtime from "time-formater";
export default {
  data() {
    return {
      //时间
      ti: [],
      //七天数据
      sevendata:[],
      //新增
      data:[],
      users:'',
      order:'',
      admin:''
    };
  },
  mounted() {
   this.getSeven()
   this.axios.get('https://elm.cangdu.org/v1/users/count').then(res=>{
     this.users=res.data.count
   }) 
   this.axios.get('https://elm.cangdu.org/bos/orders/count').then(res=>{
     this.order=res.data.count
   }) 
   this.axios.get('https://elm.cangdu.org/admin/count').then(res=>{
     this.admin=res.data.count
   })
  },
  methods: {
    //数据获取
    getSeven(){
      const apiArr=[[],[],[]]
      let dateArr=[];
      for(var i=0;i<7;i++){
        let date=new Date();
        date.setDate(date.getDate()-i);
        const today=dtime(date).format('YYYY-MM-DD');
        dateArr.push(today)
      }
      this.ti=dateArr.reverse()
      this.ti.map((item)=>{
        apiArr[0].push(this.getData('user',item))
        apiArr[1].push(this.getData('order',item))
        apiArr[2].push(this.getData('admin',item))
      })
      let b=[...apiArr[0],...apiArr[1],...apiArr[2]];
    let resArr=[[],[],[]]
      Promise.all(b).then((res)=>{
        res.forEach((item,index)=>{
          if(item.data.status==1){
            resArr[Math.floor(index/7)].push(item.data.count)
          }
        })
  this.sevendata=resArr
   this.myeach();
   for(let i in this.sevendata){
this.data.push(this.sevendata[i][6])
   }
      })
    },
   //折线图调取接口封装
   getData(url,tody){
     return new Promise((s,e)=>{
       this.axios.get('https://elm.cangdu.org/statis/'+url+'/' +tody+ '/count').then(res=>{
         s(res)
       }).then(res=>{
         e(res)
       })
     })
   },
   //折线图
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
          data: this.ti
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
            data:this.sevendata[0],
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
            data: this.sevendata[1],
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
            data:this.sevendata[2],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          }
        ]
      });
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
.data_section {
  width: 100%;
  height: 100%;
  .data {
    // padding: 20px;
    header {
      text-align: center;
      font-size: 30px;
      margin-bottom: 10px;
    }
    .data-a {
      width: 100%;
      display: flex;
      list-style: none;
       margin-bottom:10px;
      li {
        width: 290px;
        // padding: 10px 20px;
        // margin: 0 29px 10px 0;
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
