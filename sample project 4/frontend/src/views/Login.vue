<template>
    <div>
        <md-card class ="md-layout-item" >
            <form @submit.prevent="loginPressed({email, password})">
                <md-card-header>
                    <span class="md-display-3">Login</span>
                </md-card-header>
                <md-card-content>
                    <div class="login">
                        <md-field>
                            <md-input type = "email" placeholder = "email" v-model="email"/>
                        </md-field>
                    </div>  
                    <div class = "password">
                        <md-field>
                            <md-input type = "password" v-model="password" placeholder="password"/>
                        </md-field>
                    </div>
                    <md-button class = "md-elevation-24" type="submit">Login</md-button>
                </md-card-content>
            </form>
        </md-card>
        <div v-if = "error" class="error">{{error.message}} </div>
        <md-dialog :md-active.sync="!this.loginGetPassed"> 
            <md-dialog-title>Preferences</md-dialog-title>
                <p>{{this.loginGetCurrentError}}</p>  
                <md-dialog-actions>  
                    <md-button class="md-primary" @click="loginErrorReset">Close</md-button>
                </md-dialog-actions>
        </md-dialog>  
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data(){
        return {
            email : "",
            password: "",
            error: ""
        }
    },
    computed: {
        ...mapGetters([
            'loginGetPassed',
            'loginGetCurrentError'
            ])
    },
    methods: {
        ...mapActions([
            'loginPressed',
            'loginErrorReset'
        ])
    }
}
</script>

<style lang="scss" scoped>
.error{
    color: red;
    font-size: 18px;
}
input  {
    width: 400px;
    padding: 30px;
    margin: 20px;
    font-size: 21px;
}
button {
    width: 400px;
    height: 75px;
    font-size: 100%;
}
.backdrop{
    top: 0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
}
.modal-overlay {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>