<template>
    <div v-if="registerGetPassed && loginGetPassed && networkGetPassed">
        <div>
            <md-card>
            <div v-if="loggedIn">
                Logged in 
            </div>
            <div v-else>Logged out </div>
            
            <div v-if="loggedIn">
                <md-button class = "md-raised" @click="signOutPressed">Sign out</md-button>
            </div>   
            </md-card> 
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions, mapGetters} from "vuex";
export default {
    created(){
        firebase.auth().onAuthStateChanged(user=> {
        this.loggedIn = !!user;
    })
    },
    data() {
        return {
            loggedIn: false
        }
    },
    computed: {
        ...mapGetters([
            'loginGetPassed',
            'registerGetPassed',
            'networkGetPassed'
            ])
    },
    methods: {
        async signOut(){
            try {
                const data = await firebase.auth().signOut();
                this.$router.replace({name:"login"})
                console.log(data);
            }catch(err){
                console.log(err)
            }          
        },
        ...mapActions([
            'signOutPressed',
        ])
    }
}
</script>
<style lang="scss" scoped>
  .md-card {
    margin: 4px;
  }
  
</style>
