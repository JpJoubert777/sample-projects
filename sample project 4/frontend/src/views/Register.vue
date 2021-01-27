
<template>
    <div v-if="!this.$store.getters.getPassed" class = "backdrop" >
        <div class = "modal-overlay">
            <p>{{this.$store.getters.getCurrentError}}</p>
        </div>
    </div>
    <div v-else>
        <div v-if = "error" class="error">{{error.message}} </div>
        <form @submit.prevent="pressed">
            Register
            <div class="email">
                <input type = "email" v-model="email" placeholder="email">
            </div>
            <div class = "password">
                <input type = "password" v-model="password" placeholder="password">
            </div>
            <button class = "md-raised" type="submit">Register</button>
        </form >
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            email: "",
            password: '',
            error: ''
        }
    },
    methods: {
        ...mapActions([
            'registerPressed',
        ]),
        ...mapMutations([
            'setCurrentError',
            'setPassed'  
       ]),
        async pressed() {
            try {
                var email = this.email;
                var password = this.password
                this.registerPressed({email, password});
            }
            catch (e){
                this.setCurrentError(e.message);
                this.setPassed(false);
            }
        }
    }    
}
</script>

<style lang="scss" scoped>
.error{
    color: red;
    font-size: 18px;
}
input {
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