
import { RouterLink } from 'vue-router';
<template>
    <div>
       <v-card width="auto" >
    <v-expansion-panels  focusable>
    <v-expansion-panel >
      <v-expansion-panel-header color="teal lighten-1" class="mt-5"><span class="text-h6 white--text">Add New User</span></v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-form >
    <v-container > 
      <v-row >
        <v-col
          cols="12"
          md="3"

        >
          <v-text-field
            v-model="newUser.userid"
            :counter="20"
            label="User Id"
            :rules="UserIdRule"
            required
            class="mt-10"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="newUser.password"
            :counter="20"
            :rules="PasswordRule"
            class="mt-10"
            label="Pass word"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
        <v-container id="dropdown-example-3">
    <v-overflow-btn
      class="mt-8"
      :items="dropdown_edit"
      label="Role"
      v-model="newUser.role"
    ></v-overflow-btn>
  </v-container>
        </v-col>
        <v-col cols="12" md="3" >
            <v-btn class="mt-11 ml-16" color="teal lighten-1" :disabled="valid" @click="add">Add</v-btn>
        </v-col>
      </v-row>  
    </v-container>
  </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</v-card>
<v-snackbar 
                  v-model="snackbar"
                  color="white black--text">
                  {{ text }}
                  <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    
    </div>
</template>
<script>
import service from "../service/EventServices.js"
export default{
    name:'',
    data(){
        return{
            dropdown_edit: [
        { text: 'Biller' },
        { text: 'Manage' },
        { text: 'System Admin' },
        { text: 'Inventry' },
      ],
      newUser:{
        userid:'',
        password:'',
        role:''
      },
      snackbar:false,
      text:'',
      valid:true,
      UserIdRule:[
        value => !!value || "Requierd",
        value => (value && value.length >= 5) || "Must be greater than 5 characters"
      ],
      PasswordRule:[
        value => !!value || "Requierd",
        value => (value && value.length >= 8) || "Must be greater than 8 characters",
        value => (value && /[a-z]/.test(value)) || 'Password must contain at least one lowercase letter',
        value => (value && /[A-Z]/.test(value)) || 'Password must contain at least one uppercase letter',
        value => (value && /\d/.test(value)) || 'Password must contain at least one number',
        value => (value && /[!@#$%^&*()_+=-~]/.test(value)) || "Password Must containe Special Character"
      ]
      
        }
    },
    methods:{
        add(){
          if(this.newUser.userid[0]==" "){
            this.snackbar= true
            this.text = "User Id must start without the space"
          } else{

           service.addUser(this.newUser).then((response)=>{
            console.log(response)
            if (response.data.status==="S"){
                this.snackbar=true
                this.text="User Added"
                this.newUser.password=""
                this.newUser.userid=""
                this.newUser.role=""
               
            }
           }).catch((error)=>{
            console.log(error)
           })
          }

        }
    },
    watch:{
      // ask doubt about here deep vs immediate
      newUser:{
        handler(){
          if (this.newUser.userid.length >0 && this.newUser.password.length >0 && this.newUser.role !==""){
            this.valid=false
          }
        },deep:true
      },
      
    }
}
</script>