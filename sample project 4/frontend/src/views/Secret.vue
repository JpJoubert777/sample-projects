
<template>
    <div class = "backdrop" v-if="!this.$store.getters.getPassed" >
        <div class = "modal-overlay">
            <p>{{this.$store.getters.getCurrentError}}</p>
        </div>
    </div>
    <div v-else>
        <section id="report-container" class="embed-container" >
        </section>
    </div>
</template>


<script>
import * as pbi from 'powerbi-client';
import axios from "axios";
import firebase from 'firebase';
const jwt = require('jsonwebtoken');
export default {
    name:'secret', 
    data() {
        return { 
        }
    },
    methods: {
    },
    mounted(){
        if (this.$store.getters.getPassed) {
            //get JWT key from firestore
            this.$store.commit('setJwtKey');

            axios.get(`http://localhost:5300/getEmbedToken`)
            .then(response => {
                try{
                    //get the JWT token and decrypt it to get the PowerBI token
                    var key = this.$store.getters.getJwtKey;
                    var verifyOptions = this.$store.getters.getVerifyOptions;
                    var legit = jwt.verify(response.data,key, verifyOptions);
                    //embed the report
                    this.$store.commit('embedFunction',legit);
                }
                catch (e){
                    this.$store.commit('setCurrentError',e.message);
                    this.$store.commit('setPassed',false);
                    this.errorMessage = this.$store.getters.getCurrentError;
                }
            })
            .catch(e => {
                this.$store.commit('setCurrentError',e.message);
                this.$store.commit('setPassed',false);
                this.errorMessage = this.$store.getters.getCurrentError;
            })
        }
    }
}
</script>
<style lang="scss">
#report-container {
    height: calc(0.5625 * 61vw); /* 16:9 aspect ratio */
}

@media only screen and (max-width: 575px) {
    #report-container {
        height: calc(0.5625 * 100vw); /* 16:9 aspect ratio */
    }
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

