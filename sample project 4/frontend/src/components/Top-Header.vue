<template>
    <div>
            <span v-if="loggedIn">Logged in </span>
            <span v-else>Logged out </span>
            <div>
                <button  @click="signOut">Sign out</button>
            </div>    
    </div>
</template>

<script>
import firebase from 'firebase'
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
        methods: {
            async signOut(){
                try {
                    const data = await firebase.auth().signOut();
                    this.$router.replace({name:"login"})
                    console.log(data);
                    

                }catch(err){
                    console.log(err)
                }

                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>