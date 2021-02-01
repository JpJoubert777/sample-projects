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
        <md-button @click="setPageNum(0)">Page 1</md-button>
        <md-button @click="setPageNum(1)">Page 2</md-button>
        <md-button @click="removeFilters">remove filters</md-button>
        <md-field  class = "filter-field">
            <md-select v-if="this.getPageNum == 0" v-model="selectedInstitution" @input="setFilter({table: 'num_students_by_institution',column:'institution_name',filter:selectedInstitution,pageNum:0})">
                <md-option v-for="(institution, index) in this.getDropdown.institutions" :key="index" :value="institution">Only show {{institution}} </md-option>   
            </md-select>
            <md-select v-else v-model="selectedIndustry" @input="setFilter({table: 'numClients',column:'industry',filter:selectedIndustry,pageNum:1})">
                <md-option v-for="(industry, index) in this.getDropdown.industries" :key="index" :value="industry">Only show {{industry}} </md-option>   
            </md-select>
        </md-field>
    </div>
    
</template>
<script>

import { mapActions, mapGetters } from "vuex";
export default {
    name:'secret', 
    data() {
        return { 
            selectedInstitution: null,
            selectedIndustry: null
        }
    },
    computed: {
        ...mapGetters([
            'networkGetPassed',
            'networkGetCurrentError',
            'reportIsLoaded',
            'getPageNum',
            'getDropdown'
            ])
    },
    methods: {  
        ...mapActions([
            'getPowerBiReports',
            'networkErrorReset',
            'setFilter',
            'removeFilters',
            'setPageNum',
            'setDropdown'
        ])
    },
    mounted(){
        if (this.networkGetPassed) {
            this.getPowerBiReports();   
        }
        this.setDropdown();
    }
}
</script>
<style lang="scss" >
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
.filter-field {
    max-width: 300px;
  }
</style>

