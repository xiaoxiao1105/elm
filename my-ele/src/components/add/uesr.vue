<template>
    <div id="my" :style="{ width: '93%', height: '450px' }"></div>
</template>

<script>
export default {
    data(){
        return{
            beijing:'',
            shanghai:'',
            shenzhen:'',
            hangzhou:'',
            qita:''
        }
    },
    mounted(){
        this.axios.get('https://elm.cangdu.org/v1/user/city/count').then(res=>{
            if(res.data.status==1){
                console.log(res.data.user_city)
                this.beijing=res.data.user_city.beijing 
                this.shanghai=res.data.user_city.shanghai
                this.shenzhen=res.data.user_city.shenzhen
                this.hangzhou=res.data.user_city.hangzhou
                this.qita=res.data.user_city.qita

                this.myeach()
            }
        })
        
    },
methods:{
    myeach(){
      let my = this.$echarts.init(document.getElementById("my"));

        my.setOption ({
    title : {
        text: '用户分布',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['北京','上海','深圳','杭州','其他']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:this.beijing, name:'北京'},
                {value:this.shanghai, name:'上海'},
                {value: this.shenzhen, name:'深圳'},
                {value:this.hangzhou, name:'杭州'},
                {value:this.qita, name:'其他'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
})
    }
}
}
</script>

<style>

</style>
