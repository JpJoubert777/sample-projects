<template>
    <div v-if="!this.registerGetPassed" class = "backdrop" >
        <div class = "modal-overlay">
            <p>{{this.registerGetCurrentError}}</p>
            <md-button class = "md-elevation-24" @click="registerErrorReset"> ok </md-button>
        </div>
    </div>
    <div v-else>
        <md-card class ="md-layout-item" >
            <form @submit.prevent="registerPressed({email, password})">
                <md-card-header>
                    <span class="md-display-3">Register</span>
                </md-card-header>
                <md-card-content>
                    <div class="email">
                        <md-field>
                            <md-input type = "email" v-model="email" placeholder="email"/>
                        </md-field>
                    </div>
                    <div class = "password">
                        <md-field>
                            <md-input type = "password" v-model="password" placeholder="password"/>
                        </md-field>
                    </div>
                    <md-button class = "md-elevation-24" type="submit">Register</md-button>
                </md-card-content>
            </form >
        </md-card>
        <div v-if = "error" class="error">{{error.message}} </div>
    </div>
</template>

<script>
import { mapActions, mapGetters} from "vuex";
export default {
    data() {
        return {
            email: "",
            password: '',
            error: ''
        }
    },
    computed: {
        ...mapGetters([
            'registerGetPassed',
            'registerGetCurrentError'
            ])
    },
    methods: {
        ...mapActions([
            'registerPressed',
            'registerErrorReset'
        ])
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>