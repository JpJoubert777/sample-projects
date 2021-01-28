<template>
    <div v-if="!this.loginGetPassed" class = "backdrop" >
        <div class = "modal-overlay">
            <p>{{this.loginGetCurrentError}}</p>
            <md-button class = "md-elevation-24" @click="loginErrorReset"> ok </md-button>
        </div>
    </div>
    <div v-else>
        <md-card>
            <md-card-header>
                <span class="md-display-3">Login</span>
            </md-card-header>
        </md-card>
        <form @submit.prevent="loginPressed({email, password})">
            <md-card md-with-hover>
                <div class="login">
                    <md-field>
                        <md-input type = "email" placeholder = "email" v-model="email"/>
                    </md-field>
                </div>
            </md-card>
            <md-card md-with-hover>
                <div class = "password">
                    <md-field>
                        <md-input type = "password" v-model="password" placeholder="password"/>
                    </md-field>
                </div>
            </md-card>
            <md-button class = "md-elevation-24" type="submit">Login</md-button>
        </form>
        <div v-if = "error" class="error">{{error}} </div>
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