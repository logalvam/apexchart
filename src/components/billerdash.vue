<template>
    <div>
        <v-card width="100vw" height="100vh">
            <v-container class="teal lighten-1 mt-12" v-show="system_inventry">
                <v-row class="mt-12">
                    <v-col cols="12" md="12" >
                        <h1 class="white--text">Welcome{{ userid }}</h1>
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="teal lighten-1 mt-12" v-show="manager">
                <v-row class="mt-12">
                    <v-col cols="12" md="12" >
                        <h1 class="white--text">Welcome{{ userid }}</h1>
                        <h1 class="white--text">TodaySales</h1>
                        <span class="white--text text_h1">{{ managertodaysales    }} </span>
                    </v-col>
                    <v-col>
                        
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="teal lighten-1 mt-12" v-show="sales">
                <v-row class="mt-12">
                    <v-col cols="12" md="12" >
                        <h1 class="white--text">Welcome: {{ userid }}</h1>

                        <h1 class="white--text">TodaySales</h1>
                        <div v-if="yesterday> todays">
                            <span class="red--text text-h5">{{ todays }} </span><v-icon color="red">mdi-arrow-down</v-icon>
                        </div>

                        <div v-if="yesterday<todays">
                            <span class="white--text text-h5">{{ todays }} </span><v-icon color="white">mdi-arrow-up</v-icon>
                        </div>
                        <div v-if="todays===0">
                            <span class="red--text text-h6">Not Yet Started</span><v-icon color="white">mdi-arrow-down</v-icon>
                        </div>
                        <span class="white--text text-h6">Yesterday Sales:{{ yesterday }} </span>
                    </v-col>
                </v-row>
                <v-row class="md-12">
                    <v-col cols="12" md="5">
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="teal lighten-1 mt-12" v-show="stockprices">
                <v-row class="mt-12">
                    <v-col cols="12" md="12" >
                        <h1 class="white--text">Current Inventry Value</h1>
                        <h1 class="white--text">{{ stockvalue }} </h1>
                    </v-col>
                    <v-col>
                        <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
                    </v-col>
                    <v-col>
                        <apexchart type="donut" :options="chartOptions1" :series="series1"></apexchart>

                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <div>
        </div>
    </div>
</template>
<script>
import apexchart from "vue-apexcharts"
import service from "../service/EventServices.js"
export default{
    name:'billerdashboard',
    data(){
        return{
            system_inventry:false,
            currentrole:'',
            currentuser:'',
            sales:false,
            stockprices:false,
            manager:false,
            useramount:0,
            salesdata:[],
            todays:0,
            yesterday:0,
            stockvalue:0,
            userid:'',
            managertodaysales:0,
            // apexchart pie
            series1: [], // amount 
          chartOptions1: {
            chart: {
              type: 'donut',
            },
            labels: [], // biler name
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },

            //apexchart line
            chartOptions: {
        // Your chart options
        chart: {
               id: 'basic-bar'
        },  
        xaxis: {
          categories: [],
        }
      },
      series: [{
        name: 'Sales',
        data: []
      }]
              
        }
    },
    props:{
        val : Number
    },
    components:{
        apexchart
    },
    methods:{
     
    },
    watch:{
        currentrole:{
            handler(){               
                if(this.currentrole === 'Admin'){
                    this.system_inventry = true
                    this.sales = false
                    this.manager = false
                    this.stockprices = false
                    }
                else if(this.currentrole === 'Inventry'){
                    this.system_inventry = true
                    this.sales = false
                    this.stockprices = false
                    this.manager = false

                    }
                else if(this.currentrole === 'Manager'){
                    this.manager = true
                    this.stockprices = true
                    this.system_inventry = false
                    this.sales = false

                    }
                else if(this.currentrole === 'Biller'){
                    this.sales = true
                    this.stockprices = false
                    this.system_inventry = false
                    this.manager = false

                    } 
            },immediate:true
        },  
        val:{
            handler(){
                if (this.val >0){
                    service.getUserRole().then((response)=>{
                console.log(response.data)
                this.userid=response.data.userid
                this.currentrole = response.data.role
                // Today Sales
                service.TodaySalesReport(this.userid).then((response)=>{
                console.log(response ,"dfsfs")
                    this.todays = response.data.sales
            }).catch((error)=>{
                console.log(error)
            })

             // yesterday

             let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            let daybefore = yesterday.toLocaleDateString('en-GB');
            let compare ={
                yesterday : daybefore,
                userid : this.userid
            }
            console.log(compare,"compare")
            service.CompareSalesReport(compare).then((response)=>{
                this.yesterday = response.data.amount
            }).catch((error)=>{
                console.log(error)
            })

            }).catch((error)=>{
                console.log(error)
            }) 
            //MANAGER TODAY SALES
            service.TodaySalesReportManager().then((response)=>{
                console.log(response ,"dfsfs")
                    this.managertodaysales = response.data.sales
            }).catch((error)=>{
                console.log(error)
            })
            
           
            //StockValue

            service.StockPricesDetails().then((response)=>{
                console.log(response)
                this.stockvalue = response.data.Total
            }).catch((error)=>{
                console.log(error)
            })

                }
            },immediate:true
        }
        
    },
    computed:{
        
    },
    mounted(){
        service.getUserRole().then((response)=>{
                console.log(response.data)
                this.userid=response.data.userid
                this.currentrole = response.data.role
                // Today Sales
                service.TodaySalesReport(this.userid).then((response)=>{
                console.log(response ,"dfsfs")
                    this.todays = response.data.sales
            }).catch((error)=>{
                console.log(error)
            })

             // yesterday

             let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            let daybefore = yesterday.toLocaleDateString('en-GB');
            let compare ={
                yesterday : daybefore,
                userid : this.userid
            }
            console.log(compare,"compare")
            service.CompareSalesReport(compare).then((response)=>{
                this.yesterday = response.data.amount
            }).catch((error)=>{
                console.log(error)
            })

            }).catch((error)=>{
                console.log(error)
            }) 
            //MANAGER TODAY SALES
            service.TodaySalesReportManager().then((response)=>{
                console.log(response ,"dfsfs")
                    this.managertodaysales = response.data.sales
            }).catch((error)=>{
                console.log(error)
            })
            
           
            //StockValue

            service.StockPricesDetails().then((response)=>{
                console.log(response)

                this.stockvalue = response.data.Total
            }).catch((error)=>{
                console.log(error)
            })

            //Montly sales

            service.MonthSales().then((response)=>{
                console.log(response)
                console.log(response.data.monthList)

                console.log("-----------")
                
                let data  = response.data.monthList
                for (let i in data){
                    console.log(data[i])
                    this.chartOptions.xaxis.categories.push(data[i])
                }
                // console.log(this.chartOptions.xaxis.categories)
                this.series[0].data = response.data.salesList
                
            }).catch((error)=>{
                console.log(error)
            })
            service.BillerSales().then((response)=>{    
                console.log(response)
                let data = response.data.billerlist
                for (let i in data){
                    console.log(data[i])
                    this.chartOptions1.labels.push(data[i])
                }
                this.series1 = response.data.amountlist
                console.log(this.chartOptions1.labels)
            }).catch((error)=>{ console.log(error) })
    },
   
}

</script>
