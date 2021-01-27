<template>
    <div class = "backdrop" v-if="!this.getPassed" >
        <div class = "modal-overlay">
            <p>{{this.getCurrentError}}</p>
        </div>
    </div>
    <div v-else>
        <section id="report-container" class="embed-container" >
        </section>
    </div>
</template>
<script>

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
    name:'secret', 
    data() {
        return { 
        }
    },
    computed: {
        ...mapGetters([
            'getPassed',
            'getCurrentError'
            ])
    },
    methods: {
        ...mapActions([
            'getResponse'
        ]),  
        ...mapMutations([
            'setCurrentError',
            'setPassed'  
        ]),
    },
    mounted(){
        if (this.getPassed) {
            try{
                this.getResponse();  
            }
            catch(e) {
                this.setCurrentError(e.message);
                this.setPassed(false);
            }
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

