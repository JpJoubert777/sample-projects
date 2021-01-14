<template>
    <div>
        Login
        <form @submit.prevent="pressed">
            <div class="login">
                <input type = "email" placeholder = "login" v-model="email">
            </div>
            <div class = "password">
                <input type = "password" v-model="password" placeholder="password">
            </div>
            <button class = "md-raised" type="submit">Login</button>
        </form>
        <div v-if = "error" class="error">{{error.message}} </div>

    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    data(){
        return {
            email : '',
            password: '',
            error: ''
        }
    },
    methods: {
        async pressed() {
            try{
            const val = await firebase.auth().signInWithEmailAndPassword(this.email,this.password)
            console.log(val);
            this.$router.replace({name: "secret"})
            }catch(err){
                console.log(err)
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

</style>