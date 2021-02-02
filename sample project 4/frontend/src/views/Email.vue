<template>
    <div>
        <md-card class ="md-layout-item" >
            <form @submit.prevent="sendPressed({name,major,email,start_date})">
                <md-card-header>
                    <span class="md-display-3">Email</span>
                </md-card-header>
                <md-card-content>
                    <div class="Name">
                        <md-field>
                            <md-input type = "text" placeholder = "name" v-model="name"/>
                        </md-field>
                    </div>  
                    <div class="Major">
                        <md-field>
                            <md-input type = "text" placeholder = "major" v-model="major"/>
                        </md-field>
                    </div>  
                    <div class="Email">
                        <md-field>
                            <md-input type = "email" placeholder = "email" v-model="email"/>
                        </md-field>
                    </div>  
                    <div class = "start-date">
                        <span> Please enter your start date below:</span>
                        <md-field>
                            <md-input type = "date" placeholder="start_date" v-model="start_date"/>
                        </md-field>
                    </div>
                    <md-button class = "md-elevation-24" type="submit">Submit</md-button>
                </md-card-content>
            </form>
        </md-card>
        <md-dialog :md-active.sync="!this.emailGetPassed"> 
            <md-dialog-title>Error</md-dialog-title>
                <p>{{this.emailGetCurrentError}}</p>  
                <md-dialog-actions>  
                    <md-button class="md-primary" @click="emailErrorReset">Close</md-button>
                </md-dialog-actions>
        </md-dialog>  
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data(){
        return {
            name : "",
            major : "",
            email : "",
            start_date : null
        }
    },
    computed: {
        ...mapGetters([
            'emailGetPassed',
            'emailGetCurrentError'
            ])
    },
    methods: {  
        ...mapActions([
            'sendPressed',
            'emailErrorReset'
        ])
    },
}
</script>

<style lang="scss" scoped>

</style>