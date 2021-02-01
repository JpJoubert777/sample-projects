<template>
  <div id="app">
    <top-header></top-header>
    <div v-if="registerGetPassed && loginGetPassed && networkGetPassed" id="nav">
      <md-card>
      <md-tabs md-sync-route>
      <md-tab  id="Login" md-label="Login" to="/Login" exact></md-tab>
      <md-tab  id="Register" md-label="Register" to="/Register" exact></md-tab>
      <md-tab  id="Report" md-label="Report" to="/secret" exact></md-tab>
      </md-tabs>
      </md-card> 

 
      <md-dialog :md-active.sync="isIdle"> 
          <md-dialog-title>timed out</md-dialog-title>
              <p>The session has expired due to inactivity</p>  
              <md-dialog-actions>  
                  <md-button class="md-primary" @click="signOutPressed">Close</md-button>
              </md-dialog-actions>
      </md-dialog> 
   
    </div>
    <router-view/>
  </div>
</template>

<script>
import TopHeader from "./components/Top-Header";
import { mapActions, mapGetters} from "vuex";
export default {
  components: {'top-header' : TopHeader},
  computed: {
    ...mapGetters([
        'loginGetPassed',
        'registerGetPassed',
        'networkGetPassed',
        'isLoggedIn'
    ]),
    isIdle() {
        return this.$store.state.idleVue.isIdle;
    }
  },
  methods: {
    ...mapActions([
          'signOutPressed',
          'setLoggedIn'
        ])
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
