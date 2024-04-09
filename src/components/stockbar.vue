<template>

  <div  fluid>
    <v-sheet height="100vh" class="d-flex mt-16 justify-center">

    <v-card  height="400" class="" >
        <v-dialog width="400"  v-model="dialog" persistent> 
            <template v-slot:activator="{ on, attrs }">
              
        <v-btn dark v-bind="attrs" v-on="on" class="teal lighten-1 ml-6  mt-12 " >
          New Medicine
        </v-btn>
      </template>
      <v-card width="400" height="300">
        <v-card-title  class="text-h5 teal lighten-2">
          <span class="text-h5 pl-7 pr-16 white--text" >Add Stock</span>
        </v-card-title>
        <v-row>
            <v-col class="ml-12" cols="9" md="8">
                <v-text-field label="Brand Name" v-model="newMed.medbrand"></v-text-field>
            </v-col>
            <v-col class="ml-12" cols="9" md="8">
                <v-text-field label="Medicine" v-model="newMed.medname"></v-text-field>
            </v-col>
            <v-col cols="12" align-self-center>
                <v-btn cols="12" md="12" class="teal lighten-1 white--text ml-12 " @click="add">Add New Brand</v-btn>
          <v-btn class=" ml-16 white--text  teal  lighten-1" @click="dialog=false" >Close</v-btn>

            </v-col>
        </v-row>
      </v-card>
        </v-dialog>
    <v-container> 
      <v-row >
        <v-col
          cols="12"
          md="3"

        >
        <v-container id="dropdown-example-3">
              <v-overflow-btn
                class="mt-8  ml-1"
                :items="medicinemaster"
                label="Medicine name"
                item-text="medname"
                
                v-model="AddMedicine.medname"
                @change="FetchmedineBrand"
              ></v-overflow-btn>
            </v-container>
        </v-col>
        
        <v-col
          cols="12"
          md="3"
        >
        <v-container id="dropdown-example-3">
              <v-text-field
              v-model="brand"
              label="Brand"
              :counter="20"
              class="mt-9"
              required
              disabled
            ></v-text-field>
            </v-container>
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
        <v-text-field
              v-model.number="AddMedicine.quantity"
              :counter="20"
              class="mt-12"
              label="medQuantity"
              required
            ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
        <v-text-field
              v-model.number="AddMedicine.unitprice"
              :counter="20"
              class="mt-12"
              label="unitprice"
              required
            ></v-text-field>
        </v-col>

        <v-col cols="12" class="md-12" >
            <v-btn fluid class="mt-5 ml-4 white--text  teal  lighten-1" @click="update">update</v-btn>
        </v-col>
      </v-row>
      <!-- {{ medicinemaster }} {{ stock }} -->
    </v-container>
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
</v-card>
</v-sheet>
</div>


</template>

<script>
import service from "../service/EventServices.js"
export default {
  name: "",
  data() {
    return {
      newMed:{
        medbrand: "",
        medname: "",
      },
      AddMedicine:{
        unitprice:null,
        quantity:null,
        medname:null
      },
      brand:null,
      newarray:[],
      dialog: false,
      medicinemaster: [],
      top:false,
          bottom:false,
          right:false,
          color:'',
          text:'',
          snackbar:false
    };
  },
  methods: {
    add() {

      if (this.newMed.medbrand === "" || this.newMed.medname === ""){
        this.snackbar = true
        this.right = true
            this.top = true
            this.color = "error"
        this.text = "Please Select the Medicine Name"
      }else if (this.newMed.medname[0] === " " || this.newMed.medbrand[0] ===" "){
        this.snackbar = true
        this.right = true
            this.top = true
            this.color = "error"
        this.text = "Please inset the Medicine Qty and Price"
      } 
      else{
        

      service.AddNewMedicineBrand(this.newMed).then((response)=>{
        console.log(response)
        if (response.data.status ==="s"){
          this.right = true
            this.top = true
            this.color = "success"
            this.text = "inserted"

            this.snackbar = true
          } else{
            this.text = "Not inserted"
          this.right = true
            this.top = true
            this.color = "error"
            this.snackbar = true
        }
      }).catch((error)=>{
        console.log(error)})
      }
      this.dialog = false
        this.newMed.medbrand =""
        this.newMed.medname =""
    
    },
    update(){
      if (this.AddMedicine.medname === null || this.AddMedicine.quantity <=0 || this.AddMedicine.unitprice<=0 || !Number.isInteger(this.AddMedicine.quantity ,this.AddMedicine.quantity=== null || this.AddMedicine.unitprice === null )){
        this.snackbar = true
        this.right = true
            this.top = true
            this.color = "error"
        this.text = "Please Fill up the Field with Correct Value"
      } 
      
      else{

      service.AddnewMedicine(this.AddMedicine).then((response)=>{
        console.log(response.data)
        console.log('***')
        if (response.data.status === "S"){
            this.snackbar = true
            this.right = true
            this.top = true
            this.color = "success"
        this.text = "Stock  Updated"
        this.AddMedicine.medname =null
        this.AddMedicine.quantity =null
        this.AddMedicine.unitprice =null
        this.brand=null

        }
        else{
          this.snackbar = true
          this.color = "error"
            this.right = true
            this.top = true
          this.text ="not updated"
        }
      })
    }

      
    },
    FetchmedineBrand(){
      service.GetBrandMedicine(this.AddMedicine.medname).then((response)=>{
        console.log(response.data)
        this.brand = response.data
      }).catch((error)=>{
        console.log(error)
      })
    }
  },
  created(){
    service.getBrandStock().then((response)=>{
            console.log(response.data.medlist)
            this.medicinemaster=response.data.medlist
          }).catch((error)=>{
            console.log(error)
          })  
  }
};
</script>