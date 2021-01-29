<template>
    <div class = "backdrop" v-if="!this.networkGetPassed" >
        <div class = "modal-overlay">
            <p>{{this.networkGetCurrentError}}</p>
            <md-button class = "md-elevation-24" @click="networkErrorReset"> ok </md-button>
        </div>
    </div>
    <div v-else-if="!reportIsLoaded">
         <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div v-else>
        <section id="report-container" class="embed-container" ></section>
        
      <md-menu md-direction="bottom-start">
      <md-button md-menu-trigger>Page 1</md-button>

      <md-menu-content>
        <md-menu-item @click="setFilter({table: 'num_students_by_institution',column:'institution_name',filter:'Microcert',pageNum:0})">Microcert</md-menu-item>
        <md-menu-item @click="setFilter({table: 'num_students_by_institution',column:'institution_name',filter:'Boston College',pageNum:0})">Boston College</md-menu-item>
        <md-menu-item @click="setFilter({table: 'num_students_by_institution',column:'institution_name',filter:'University of Johannesburg',pageNum:0})">University of Johannesburg</md-menu-item>
        <md-menu-item @click="setFilter({table: 'num_students_by_institution',column:'institution_name',filter:'University of Pretoria',pageNum:0})">University of Pretoria</md-menu-item>
        <md-menu-item @click="setFilter({table: 'num_students_by_institution',column:'institution_name',filter:'University of South Africa',pageNum:0})">University of South Africa</md-menu-item>
        <md-menu-item @click="removeFilters">None</md-menu-item>
      </md-menu-content>
    </md-menu>

    <md-menu md-direction="bottom-end">
      <md-button md-menu-trigger>Page 2</md-button>

      <md-menu-content>
        <md-menu-item @click="setFilter({table: 'numClients',column:'industry',filter:'commerce',pageNum:1})">commerce</md-menu-item>
        <md-menu-item @click="setFilter({table: 'numClients',column:'industry',filter:'finances',pageNum:1})">finances</md-menu-item>
        <md-menu-item @click="setFilter({table: 'numClients',column:'industry',filter:'insurance',pageNum:1})">insurance</md-menu-item>
        <md-menu-item @click="setFilter({table: 'numClients',column:'industry',filter:'security',pageNum:1})">security</md-menu-item>
        <md-menu-item @click="removeFilters">None</md-menu-item>
      </md-menu-content>
    </md-menu>
    </div>
    
</template>
<script>

import { mapActions, mapGetters } from "vuex";

export default {
    name:'secret', 
    data() {
        return { 
        }
    },
    computed: {
        ...mapGetters([
            'networkGetPassed',
            'networkGetCurrentError',
            'reportIsLoaded'
            ])
    },
    methods: {  
        ...mapActions([
            'getPowerBiReports',
            'networkErrorReset',
            'setFilter',
            'removeFilters'
        ])
    },
    mounted(){
        if (this.networkGetPassed) {
            this.getPowerBiReports();   
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

