<template>
    <div>

    <v-card width="100vw" class="mt-6" height="auto">
        <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-dialog
          ref="menu"
          v-model="menu"
          :return-value.sync="date.date1"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date.date1"
              label="Start date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date.date1"
            :max="today"
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(date.date1)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
      <v-spacer></v-spacer>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-dialog
          ref="modal"
          v-model="modal"
          :return-value.sync="date.date2"

          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date.date2"
              label="End date"
              prepend-icon="mdi-calendar"
              max=""
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date.date2"
            :max="today"
            :min="date.date1"
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="modal = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.modal.save(date.date2)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-btn class="white--text  teal  lighten-1" @click="search">Search</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      
    </v-row>
    </v-card>
    <template>
  <v-data-table
    :headers="headers"
    :items="report"
    height="300px"
    :items-per-page="-1"
    class="elevation-1"

    v-show="visible"
  ></v-data-table>
</template>
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
import services from "../service/EventServices.js"
  export default {
    data () {
      return {
        date:{
          date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

        },
    menu: false,
    modal: false,
    headers: [
          {
            text: 'Billno',
            align: 'start',
            sortable: false,
            value: 'billno',
          },
          { text: 'Billdate', value: 'billdate' },
          { text: 'Medicine Name', value: 'medname' },
          { text: 'Quantity', value: 'quantity' },
          { text: 'amount', value: 'amount' },
        ],
        top:false,
          bottom:false,
          right:false,
          color:'', 
        visible:false,
        billno:0,
        billdate:'',
        qty:0,
        medicinename:'',
        amount:0,
        report:[],
        snackbar: false,
        text: '',
        today:''
      }
    },
    props:{
        generate:Boolean
    },
   methods:{
    search(){
      if (this.date.date1>this.date.date2){
        this.snackbar=true
        this.right = true
            this.top = true
            this.color = "error"
        this.text="Enter the start date less then then end date"
      } else{

      this.report = []
      services.SalesReportDetails(this.date).then((response)=>{
        console.log(response.data.salesarr)
        this.visible = true
        // this.report =response.data.salesarr
        let medlist = response.data.salesarr
        for (let i in medlist){
              if (medlist[i].medname !== ""){
                console.log(medlist[i].medname,medlist[i].medname.length)
                 this.report.push(medlist[i])
              }
            }

      }).catch((error)=>{
        console.log(error)
      })
    }

    },
    
  },

   beforeMount(){
    // console.log('before mounted')
    this.today=(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    console.log(this.today)
    },
    
  }
</script>

