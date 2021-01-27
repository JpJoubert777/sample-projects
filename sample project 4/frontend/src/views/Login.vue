<template>
    <div v-if="!this.loginGetPassed" class = "backdrop" >
        <div class = "modal-overlay">
            <p>{{this.loginGetCurrentError}}</p>
        </div>
    </div>
    <div v-else>
        Login
        <form @submit.prevent="loginPressed({email, password})">
            <div class="login">
                <input type = "email" placeholder = "login" v-model="email">
            </div>
            <div class = "password">
                <input type = "password" v-model="password" placeholder="password">
            </div>
            <button class = "md-raised" type="submit">Login</button>
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
            'loginPressed'
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
}
</style>