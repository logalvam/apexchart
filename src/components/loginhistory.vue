<template>
    <div>
        <v-container>
            <v-card height="auto">
              <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
                <v-data-table
                height="400px"
                :headers="headers"
                :items="history"
                 :search="search" 
                :items-per-page="-1"
                class="elevation-1"
            ></v-data-table>
            <!-- {{ history }} -->
            </v-card>
        </v-container>
        
    </div>
</template>
<script>
import service from "../service/EventServices.js"
  export default {
    data () {
      return {
        history:[],
        search:'',
        headers: [
          {
            text: 'User ID',
            align: 'start',
            sortable: false,
            value: 'userid',
          },
          {text:"Date",value:"date"},
          { text: 'LogIn', value: 'logintime' },
          { text: 'Log Out', value: 'logouttime' },
        ],
      }
    },
    created(){
      service.getLogHistory().then((response)=>{
            // console.log(response.data.hislist)
            this.history=response.data.hislist
          }).catch((error)=>{
            console.log(error)
          })  
    }
  }
</script>