<template>
    <div>
        <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
          
        <v-data-table 
        :headers="headers"
        :items="medlist"
        :search="search" 
        :items-per-page="-1"
        height="400"
        ></v-data-table>
    </v-card>
    <!-- {{ newarr }}
     -->
    <!-- <v-btn @click="click">click</v-btn> -->
    </div>
</template>
<script>
import service from "../service/EventServices.js"
  export default {
    name:'',
    components:{
    },
    data () {
      return {
        search:'',
        
        medicine:this.$store.state.medicinemaster,
        stock:this.$store.state.stock,
        // mergedArray:this.$store.state.stock.concat(this.$store.state.medicinemaster),
        headers: [ 
          // {text:'Medicine Name'}, {text:'Brand Name'},{text:'Qty'},{text:'Unit Price'}
          {
          text: "Medicine Name",
          align: "start",
          sortable: false,
          value: "medname",
        },
        { text: "Brand Name", value: "brand" },
        { text: "Qty", value: "quantity" },
        { text: "Unit Price", value: "unitprice" }, 
        ],
        medlist:[]
        
      }
    },
    props:{
      // sendvalue:String
    },
    
    watch:{
    },
   
    mounted(){
      service.getStock().then((response)=>{
            // console.log(response.data.medlist)
            this.medlist=response.data.medlist
            
          }).catch((error)=>{
            console.log(error)
          })  
    }

  }
</script>

