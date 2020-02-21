<template>
    <div>
        <h1>Current Temperature</h1>
        <p v-if="temperatures.length > 0"><b>{{ temperatures[temperatures.length -1].temperature }} degrees Fahrenheit</b></p>
        <h1>Recent Temperatures</h1>
        <p v-for="(temp, index) in temperatures" :key="index+'a'"><b>{{ temp.temperature }} degrees Fahrenheit</b> {{ temp.time }}</p>
        <h1>Threshold Violations</h1>
        <p v-for="(violation, index) in violations" :key="index"><b>{{ violation.temperature }} degrees Fahrenheit</b> {{ violation.time }}</p>
        <button style="font-size: 24px;" v-on:click="clear">Clear</button><br><br>
        <router-link to="/info" class="icon-container">PROFILE PAGE</router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            temperatures: [],
            violations: [],
            axios: require('axios')
        }
    },
    mounted() {
        this.callAPI();
        this.$nextTick(function () {
            window.setInterval(() => {
                this.callAPI();
            },5000);
        })
        
    },
    methods: {
        callAPI() {
        this.axios
            .get('http://localhost:8080/sky/cloud/Mx8jiufiza7n4sMXgL43yK/temperature_store/temperatures_func')
            .then(response => {
                    this.temperatures = response.data.length > 0 ? response.data : [];
                })

        this.axios
            .get('http://localhost:8080/sky/cloud/Mx8jiufiza7n4sMXgL43yK/temperature_store/threshold_violations_func')
            .then(response => (this.violations = response.data.length > 0 ? response.data : [])) 
        },
        clear() {
        this.axios
            .get('http://localhost:8080/sky/event/Mx8jiufiza7n4sMXgL43yK/Sensor/sensor/reading_reset')
            .then(() => this.callAPI())
        }
    },

    
    
}
</script>