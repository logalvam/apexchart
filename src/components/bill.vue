<template>
    <div>
        <v-sheet width="100vw" >
            <v-expansion-panels >
                <v-expansion-panel class="teal lighten-1 mt-6">
                    <v-expansion-panel-header>
                        <span class="text-h6">Medicine Stock</span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card class="">
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-autocomplete
                                        v-model="newItem.medname"
                                        :items="medicinemaster"
                                        item-text="medname"
                                        dense
                                        @change="medicineStock"
                                        filled
                                        label="Filled"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field label="Quantity" v-model.number="newItem.quantity" type="number"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-btn @click="add()">Add</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-sheet>
        <v-sheet width="100vw" class="d-flex mt-4 teal lighten-1">
            <v-container fluid v-show="bills">
                <v-row class="d-flex">
                    <v-col cols="12" md="5">
                        <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
      <!-- Priview -->
        <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                        class="white black--text mr-5"
                        v-bind="attrs"
                        v-on="on"
                        >Preview</v-btn>
                        </template>
                        <template :default="valid">
          <v-card>
            <v-sheet >

<v-container class="teal lighten-1" >
    <v-row>
        <v-col cols="12" md="12">
            <h1 class="text-center black--text">Medical Shop Name</h1>
        </v-col>
        <v-divider></v-divider>
        <v-col cols="12" md="12" class="white">
            <v-row justify="space-around">

                <p>Medicine name</p>
                <p>Qty</p>
                <p>Amount</p>
            </v-row>
            <v-row  justify="space-around"  v-for="(value,i) in tempbill    " :key="i">
                <!-- {{ value }} -->
                    <p>{{ tempbill  [i].medname }}</p>
                        <p>{{ tempbill  [i].quantity }}</p>
                        <p>{{ tempbill  [i].amount }}</p>

            </v-row>
            <v-row justify=end> 
                <v-col  cols="12" md="6" >
                    <v-card class="teal lighten-1 white--text">
                        <h4 class="ml-5">Total    :{{ total }}</h4>
                        <h4 class="ml-5">GST:{{ gst.toFixed(2)  }}</h4>
                        <h4 class="ml-5">NetPrice:{{ netpay }}</h4>

                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</v-container>
</v-sheet>
<!-- print -->
              <v-btn
                text
                @click="print"
              >Print</v-btn>
          </v-card>
        </template>
    </v-dialog>

                        <v-btn class="black--text white"  @click="save">Save</v-btn> 
                        <v-btn class="ml-5" @click="download">Download</v-btn>
                    </v-col>
                    <v-col cols="12" md="12" class="d-flex justify-space-around">
                        <h4 class="white--text">Billno:{{ billno }}</h4>
                        <h4 class="white--text">Date:{{ date }}</h4>
                        <h4 class="white--text">Total:{{ total }}</h4>
                        <h4 class="white--text">GST:{{ gst.toFixed(2) }}</h4>
                        <h4 class="white--text">Netpay:{{ netpay.toFixed(2) }}</h4>
                        <!-- {{ billdetails }} -->
                    </v-col>
                </v-row>
                <v-data-table 
                    :headers="headers"
                    :items="tempbill"
                    :items-per-page="5"

                    class="elevation-1 black--text"
                >
                <template v-slot:item.actions="{item}">
                <v-icon class="mr-2" @click="deleteitem(item)"> mdi-delete</v-icon>
                </template>
                </v-data-table>
            </v-container>
        </v-sheet>
    
        <div>        
        </div>
        <div>
        </div>

        <v-snackbar 
                  v-model="snackbar"
                  :top = "top"
                  :bottom = "bottom"
                  :right ="right"
                  :color="color"
                  
                  >
                   <strong>
                       {{ text }}
                   </strong> 
                  <template v-slot:action="{ attrs }">
        <v-btn color="white--text" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    </div>
</template>
<script>
import service from "../service/EventServices.js"
  export default {
    data (){
    return{
        newItem:{
            medname:'',
            quantity:0
        },
        snackbar: false,
        text: ``,
        billno:Math.floor(Math.random()*1000),
        date:new Date().toLocaleDateString(),
        total:0,
        gst:0,
        netpay:0,
        bname:'',
        unitprice:0,
        value: null,
        medicinemaster: [],
        qty:0,
        bills:true,
        tempbill:[],
        headers: [
            {
            text: 'Medicine Name',
            align: 'start',
            sortable: false,
            value: 'medname',
          },
          { text: 'Brand Name', value: 'brand' },
          { text: 'Qty', value: 'quantity' },
          { text: 'Amount', value: 'amount' },
          { text : "Delete", value:"actions"}],
          billmasterclone:[],
          billdetailsclone:[],
          currentuserid:"",
          tempqty:0,
          valid:true,
          top:false,
          bottom:false,
          right:false,
          color:''
    }
},

methods:{
    deleteitem(item){
        const val = this.tempbill.indexOf(item)
        // alert(val)
        if (val >-1){
            for ( let i = val; i < this.medicineStock.length; i++ ){
                if ( this.tempbill[i].medname === this.medicineStock[i].medname ){
                    this.medicineStock[i].quantity += this.tempbill[i].quantity 
                }
            }
            this.tempbill.splice(val,1)
            this.total = 0
            this.gst = 0
            this.netpay = 0
            for (var i in this.tempbill){
                console.log(this.tempbill[i].amount ,"amount",this.newItem.quantity)
                this.total +=   Number(this.tempbill[i].amount )
                this.gst = this.total * 0.18
                this.netpay = this.total + this.gst
                let len = this.tempbill.length -1
                console.log(len)
                this.tempbill[i].billgst = this.gst
                this.tempbill[i].netprice = this.netpay    
                this.tempbill[i].billno = this.billno
                this.tempbill[i].userId = this.currentuserid


            }
        }
    },
    download(){

        if (this.tempbill.length<=0){
            this.text = "Please add items"
            this.right = true
            this.top = true
            this.color = "error"
            this.snackbar = true
        } else{
            // console.log(this.tempbill)
        service.DownloadBill(this.tempbill).then((response)=>{
            // console.log(response)
            if(response.data.status =="S"){
                this.snackbar = true
                this.top = true
                this.right = true
                this.color = "success"
                this.text = "Bill Downloaded as Csv"
            }
        }).catch((error)=>{
            console.log(error)
        })
        console.log(this.billno)
        service.DownloadPdf(this.tempbill,this.billno).then((response)=>{
            // console.log(response.data)
            if(response.data.status =="S"){
                this.snackbar = true
                this.text = "Bill Downloaded As pdf"
            }
        }).catch((error)=>{
            console.log(error)
        })
        }
        
    },
    print(){
        this.valid= true
        window.print()
    },
    medicineStock(){
        service.FetchQuantity(this.newItem.medname).then((response)=>{
                console.log(response,"quantity")
                this.qty = response.data.quantity
                // console.log(response.data)
                this.unitprice = response.data.unitprice

                this.tempqty = response.data.quantity
        }).catch((error)=>{
            console.log(error)
        })
    },
    add(){
        if ( this.newItem.quantity <=0 || !Number.isInteger(this.newItem.quantity) ){
            this.text="Quantity must be a number"
            this.snackbar = true
            this.right = true
            this.top = true
            this.color = "error"

        } else if (this.newItem.medname === ""){
            this.text="Please Select the medicine"
            this.snackbar = true
            this.right = true
            this.top = true
            this.color = "error"
        }
         else if(this.newItem.quantity > this.qty){
             this.text= "Stock not there"
             this.snackbar = true
             this.right = true
            this.top = true
            this.color = "error"
        }
         else{

        service.AddPurchasedItem(this.newItem).then((response)=>{
            if (response.data.status =="S"){
                console.log(response.data.medlist)
                let medlist = response.data.medlist[0]
                console.log(medlist.medname,"LOKI")
                // this.tempbill.push(medlist)
                console.log(medlist , "bmedl")    
                for (let i in medlist){
                    
                    let medFound = false
                    for  (let j in this.tempbill) {
                        console.log( medlist.medname === this.tempbill[j].medname ,"Check" ,medlist.medname , this.tempbill[j].medname)
                        if (medlist.medname === this.tempbill[j].medname){

                            console.log(i)
                                let newQty  = this.tempbill[j].quantity + medlist.quantity
                                console.log(medlist , ":Quantity")
                                console.log(newQty<this.tempqty)
                                if (newQty<=this.tempqty){
                                    this.tempbill[j].quantity += medlist.quantity 
                                this.tempbill[j].amount = Number(this.tempbill[j].quantity) * Number(this.unitprice)
                                this.tempbill[j].billgst = this.tempbill[j].amount * (18/100)
                                this.tempbill[j].netpay = this.tempbill[j].amount + this.tempbill[j].gst
                                medFound = true
                                console.log(this.tempbill)
                                break;
                                } 
                                else{
                                this.snackbar = true
                                    this.text = "Stock not there"
                                medFound = true

                                    break;
                                }
                                
                        }
                    }
                    if (!medFound) {
                        console.log(" Trigger medlist")
                        this.tempbill.push(medlist)
                        break
                        
                    }
                    break
                }
            } else{
                this.text=response.data.ErrMsg
            }
            this.total = 0
            for (var i in this.tempbill){
                console.log(this.tempbill[i].amount ,"amount",this.newItem.quantity)
                this.total +=   Number(this.tempbill[i].amount )
                this.gst = this.total * 0.18
                this.netpay = this.total + this.gst
                let len = this.tempbill.length -1
                console.log(len)
                this.tempbill[i].billgst = this.gst
                this.tempbill[i].netprice = this.netpay    
                this.tempbill[i].billno = this.billno
                this.tempbill[i].userId = this.currentuserid


            }
            console.log(this.tempbill,"temp")
        })
        console.log(this.medicinemaster)
    }

    },
    save(){
        if (this.tempbill.length<=0){
            this.text = "Please add items"
            this.snackbar = true
            this.right = true
            this.top = true
            this.color = "error"
        } else{

        this.billno += 1
        console.log(this.tempbill)
        service.DonePurchasedItems(this.tempbill).then((response)=>{
            if (response.data.status =="S"){
            //    alert ("Purchase Done")  
            }
        }) .catch((error)=>{
            console.log(error)
        })
        service.BilldetailsInsert(this.tempbill).then((response)=>{
            if (response.data.status =="S"){
            //    alert ("Purchase Done")  
            }
        }) .catch((error)=>{
            console.log(error)
        })
        this.tempbill =[]
        this.total =0
        this.gst =0
        this.netpay = 0
        this.newItem.medname=""
        this.newItem.quantity=0
        
    }
    },
  
},
created(){
    service.getStock().then((response)=>{
            console.log(response.data.medlist)
            this.medicinemaster=response.data.medlist
          }).catch((error)=>{
            console.log(error)
          }) 
          service.getUserRole().then((response)=>{
                console.log(response.data,"role")
                this.currentuserid = response.data.userid
            }).catch((error)=>{
                console.log(error)
            })     

  },
 
   

    
  
}
</script>