<template>
    <div >
       <v-app-bar
 color="teal lighten-1"
 elevation="4"
 >
   <v-container fluid class="teal darken-1">
     <v-row class="d-flex flex-row pa-3 justify-end">
<div>
 <v-dialog
       transition="dialog-top-transition"
       width="400"
     >
       <template v-slot:activator="{ on, attrs }">
         <v-btn 
           color="teal lighten-1 white--text"
           class="mb-3"
           v-bind="attrs"
           v-on="on"
           
         >Login</v-btn>
       </template>
       <!-- <template > -->
        <v-card color="#83c5be" class="rounded-xxl"> 
        <v-card-title>
          <span class="text-h5 ">User Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="11"
              >
                <v-text-field
                  label="User name"
                  v-model="loginValidate.userid"
                  color="white"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="11"
              >
                <v-text-field
                v-model="loginValidate.password" 
                  label="Password"
                  type="password"
                  color="white"

                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          
       
          <v-btn
            color="white"
            text
            @click="login"
            :disabled="valid"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
<!-- </template> -->
</v-dialog>
</div>
</v-row>

</v-container>
</v-app-bar>      

        <!-- <div> -->
            <v-card fluid class="teal lighten-1 rounded-0"  min-height="90vh"  height="auto">
              <v-row >
                <v-col>
                  <v-row>
                    <v-col cols="4" md="4" sm="4">
                      <span class="white--text text-h1">M</span>
                      <span class="white--text text-h4">edical</span>
                    </v-col>
                    <v-col cols="4" md="4" sm="4">
                      <span class="white--text text-h1">E</span>
                      <span class="white--text text-h4">mergency</span>
                    </v-col>
                    <v-col cols="4" md="4" sm="4">
                      <span class="white--text text-h1">D</span>
                      <span class="white--text text-h4">epartment</span>
                    </v-col>
                  </v-row>
                <v-row>
                  
                    <v-col cols="4" md="4" sm="4">
                      <span class="white--text text-h1">A</span>
                    </v-col>
                    <v-col cols="4" md="4" sm="4">
                      <span class="white--text text-h1">P</span>
                    </v-col >
                    <v-col cols="4" md="4" sm="4">
                      <h1 class="white--text text-h1">P</h1>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
                <v-container>
                  
                 
        <v-snackbar 
                  v-model="snackbar"
                  :top = "top"
                  :bottom = "bottom"
                  :right ="right"
                  :color="colors"
                  
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
    
                </v-container>
            </v-card>
        <!-- </div> -->
   </div>
</template>
<script>

import service from "../service/EventServices.js"

// import medlogin1 from "../components/medlogin.vue"
export default{
   name: 'loginpage',
   data() {
       return {
        loginValidate:{
          userid:"",
          password:"",
        },
          valid:true,
          snackbar: false,
          text: ``,
          top:false,
          bottom:false,
          right:false,
          colors:''
       };
   },
   methods: {
       logoutdate(value){
           this.logout=value
       },
       login() {
        if (this.loginValidate.userid.length<=0 || this.loginValidate.password.length<=0){

            this.snackbar=true
            this.right = true
            this.top = true
            this.colors = "error"
            this.text="Please fill all the fields"

        } 
        else{

        console.log(this.loginValidate)
        service.LoginValidation(this.loginValidate).then((response)=>{
          if (response.data.role !== ""){
            // let role =response.data.role
            console.log("User login as " + response.data.role)
            console.log(this.loginValidate.userid)
            service.loginHistory(this.loginValidate.userid).then((response)=>{
                console.log(response.data)
                this.$router.push('/medlogin');
            }).catch((error)=>{
              console.log(error)
            })
          } else{
            this.snackbar=true
            this.right = true
            this.top = true
            this.colors = "error"
            this.text="wrong user id and password"
          } 
        }).catch((error)=>{
          console.log(error)})
       }
      }

   },
  
    
    watch:{
        loginValidate:{
          handler(values){
            if (values.userid.length>0 && values.password.length>0){
              this.valid=false
            }
          },deep:true
        }           
    },
    computed:{

    }
}
</script>