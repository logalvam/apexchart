<template>
    <div>
        <v-app-bar
            color="teal lighten-1"
            elevation="4"
            height="auto"
            >
            
          <v-container fluid class="white" height="auto">
            <v-row class=" d-flex flex-row pa-1 justify-end">
                <v-col class="">
                    <v-row class="teal lighten-1">
                        <span class="white--text ml-3 mt-1 text-h4">MED<span class="red--text text-h6">App</span> </span>
                        <v-btn :color="color1" class="rounded-pill mt-2 mb-2 ml-3" @click="dashboard">Dashboard</v-btn>
                        <v-btn :color="color2" class="rounded-pill mt-2 mb-2 ml-3" v-show="billEntry"   @click="bill" >Bill Entry</v-btn>
                        <v-btn :color="color3" class="rounded-pill mt-2 mb-2 ml-3" v-show="stockView"  @click="stockview" >StockView</v-btn>
                        <v-btn :color="color4" class="rounded-pill mt-2 mb-2 ml-3" v-show="stockEntry"   @click="stockentry" >stock Entry</v-btn>
                        <v-btn :color="color5" class="rounded-pill mt-2 mb-2 ml-3" v-show="salesReport"    @click="report">Sales Report</v-btn>
                        <v-btn :color="color6" class="rounded-pill mt-2 mb-2 ml-3" v-show="addUser"   @click="adduser">Adduser</v-btn>
                        <v-btn :color="color7" class="rounded-pill mt-2 mb-2 ml-3" v-show="loginHistory"    @click="loginhis">login history</v-btn>
                        <v-dialog
                        transition="dialog-bottom-transition"
                        max-width="450"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn   class="rounded-pill mt-2 mb-2 ml-3" v-bind="attrs" v-on="on" @click="logout">log out</v-btn>
                            
                       </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-card-title class="ml-14">
             <H1>ARE YOU SURE</H1>
            </v-card-title>
            <v-card-actions class="justify-center">
              <v-btn
                class="teal lighten-1 white--text"
                @click="dialog.value = false"
                >Close</v-btn>
                <v-btn
                class="teal lighten-1 white--text"
                
                @click="logoutAuthenication"
              >Yes</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
                    </v-row>


                </v-col>
            </v-row>
            </v-container>
        </v-app-bar>
        <!-- Adduser -->
        <v-card>
            <stockview v-show="viewshow"/>
        </v-card>
        <v-card>
            <bill  v-show="billshow"/>
        </v-card>
        <v-card >
            <stockentry v-show="entrystock" />
        </v-card>
        <v-card>
            <adduser v-show="useradd"/>
        </v-card>
        <v-card>
            <loginhistory v-show="loginhistory"/>
        </v-card>
        <v-card>
            <salesreport :generate="generate" v-show="salesreport"/>
        </v-card>
        <v-card v-show="billdash">
            <billerdash :val="value" />
        </v-card>



        

    </div>

</template>
<script>
import service from "../service/EventServices.js"

import stockview from "../components/stockview.vue"
import bill from "../components/bill.vue"
import stockentry from "../components/stockbar.vue"
import adduser from "../components/useraddbar.vue"
import loginhistory from "../components/loginhistory.vue"
import salesreport from "../components/salesreport.vue"
import billerdash from "../components/billerdash.vue"
export default{
    name:'mainpage',
    data(){
        return{
            addUser:false,
            stockEntry:false,
            stockView:false,
            billEntry:false,
            salesReport:false,
            loginHistory:false,
            Values:true,
            biller:false,
            manager:false,
            admin:false,
            inventry:false,
            viewshow:false,
            billshow:false,
            entrystock:false,
            useradd:false,
            billdash:true,
            loginhistory:false,
            salesreport:false,
            logoudate:'',
            value:0,
         
            newarr:[],
            currentuserid:'',
            currentrole:'',
            generate:false,
            color1:"blue-grey lighten-3",
            color2:"blue-grey lighten-5",
            color3:"blue-grey lighten-5",
            color4:"blue-grey lighten-5",
            color5:"blue-grey lighten-5",
            color6:"blue-grey lighten-5",
            color7:"blue-grey lighten-5",
           
        }
    },
    components:{
        stockview,
        bill,
        stockentry,
        adduser,
        loginhistory,
        salesreport,
        billerdash
    },
    methods:{
        logoutAuthenication(){
            service.logoutHistory().then((response)=>{
                console.log(response)
                if (response.data.status == "S"){
                    // this.currentrole = response.data.role
                   
                        this.$router.push({name: "HomePage"})
                    
                } 
            }).catch((error)=>{
                console.log(error)
            })
        },
        logout(){
          
            
        },
      

        adduser(){
            this.useradd=true
            this.billshow=false
            this.viewshow=false
            this.entrystock=false
            this.loginhistory=false
            this.salesreport=false
            this.billdash=false

            // this.$router.push('/adduser')
            this.color1="blue-grey lighten-5"
            this.color2="blue-grey lighten-5"
            this.color3="blue-grey lighten-5"
            this.color4="blue-grey lighten-5"
            this.color5="blue-grey lighten-5"
            this.color6="blue-grey lighten-3"
            this.color7="blue-grey lighten-5"
        },
        bill(){
            this.billshow=true
            this.viewshow=false
            this.entrystock=false
            this.useradd=false
            this.loginhistory=false
            this.salesreport=false
            this.billdash=false

            this.color1="blue-grey lighten-5"
            this.color2="blue-grey lighten-3"
            this.color3="blue-grey lighten-5"
            this.color4="blue-grey lighten-5"
            this.color5="blue-grey lighten-5"
            this.color6="blue-grey lighten-5"
            this.color7="blue-grey lighten-5"
            // this.$router.push('/bill')
        },
        dashboard(){
            this.billdash=true
            this.billshow=false
            this.viewshow=false
            this.entrystock=false
            this.useradd=false
            this.loginhistory=false
            this.salesreport=false
            this.value += 1

            // if(this.currentrole==='Biller'){

            // }
        }
        ,
        stockview() {
            this.viewshow=true
            this.billshow=false
            this.entrystock=false
            this.useradd=false
            this.loginhistory=false
            this.salesreport=false
            // this.$emit('stockarr')
            // this.$router.push("/stockView1");
            this.billdash=false

            this.color1="blue-grey lighten-5"
            this.color2="blue-grey lighten-5"
            this.color3="blue-grey lighten-3"
            this.color4="blue-grey lighten-5"
            this.color5="blue-grey lighten-5"
            this.color6="blue-grey lighten-5"
            this.color7="blue-grey lighten-5"

        },
        stockentry() {
            this.entrystock=true
            this.viewshow=false
            this.billshow=false
            this.useradd=false
            this.loginhistory=false
            this.salesreport=false
            this.billdash=false
            // this.$router.push("/stockentry")
            this.color1="blue-grey lighten-5"
            this.color2="blue-grey lighten-5"
            this.color3="blue-grey lighten-5"
            this.color4="blue-grey lighten-3"
            this.color5="blue-grey lighten-5"
            this.color6="blue-grey lighten-5"
            this.color7="blue-grey lighten-5"
        },
        loginhis(){
            this.loginhistory=true
            this.entrystock=false
            this.viewshow=false
            this.billshow=false
            this.useradd=false
            this.salesreport=false
            this.billdash=false

            this.color1="blue-grey lighten-5"
            this.color2="blue-grey lighten-5"
            this.color3="blue-grey lighten-5"
            this.color4="blue-grey lighten-5"
            this.color5="blue-grey lighten-5"
            this.color6="blue-grey lighten-5"
            this.color7="blue-grey lighten-3"

        },
        report(){
            this.salesreport=true
            this.loginhistory=false
            this.entrystock=false
            this.viewshow=false
            this.billshow=false
            this.useradd=false
            this.billdash=false
            this.generate=true
            setTimeout(() => {
                this.generate=false
            }, 2000);
            // this.$router.push('/salesreport')
            this.color1="blue-grey lighten-5"
            this.color2="blue-grey lighten-5"
            this.color3="blue-grey lighten-5"
            this.color4="blue-grey lighten-5"
            this.color5="blue-grey lighten-3"
            this.color6="blue-grey lighten-5"
            this.color7="blue-grey lighten-5"
        },
        
        
    },
    created(){
        service.getUserRole().then((response)=>{
                console.log(response.data,"role")
                this.currentrole = response.data.role
            }).catch((error)=>{
                console.log(error)
            })    
    
    },
    watch:{
    currentrole:{
        handler(){
            if(this.currentrole==='Biller'){
                this.stockView=true
                this.billEntry=true
            }
            else if(this.currentrole === 'Manager'){
                this.stockEntry=true
                this.stockView=true
                this.salesReport=true
            }
            else if(this.currentrole === 'Admin'){
                this.addUser=true
                this.loginHistory=true
            }
            else if(this.currentrole === 'Inventry'){
                this.stockEntry=true
                this.stockView=true
            }
        },immediate:true
    }
},

    
}
</script>

