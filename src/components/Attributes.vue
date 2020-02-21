<template>
    <div>
        <h1>Current Location</h1>
        <p> {{ location }}</p>
        <input v-model="inpLocation" placeholder="location">
        <h1>Name</h1>
        <p> {{ name }}</p>
        <input v-model="inpName" placeholder="name">

        <h1>Contact Number</h1>
        <p>{{ number }}</p>
        <input v-model="inpNumber" placeholder="number">

        <h1>Threshold</h1>
        <p>{{ threshold }}</p>
        <input v-model="inpThreshold" placeholder="threshold">

        <p><button style="font-size: 24px;" v-on:click="submitChanges">Submit Changes</button></p>
        <router-link to="/" class="icon-container">BACK HOME</router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            axios: require('axios'),
            location: '',
            name: '',
            number: '',
            threshold: '',
            inpLocation: '',
            inpName: '',
            inpNumber: '',
            inpThreshold: '',
        }
    },
    mounted() {
       this.getProfile();
    },
    methods: {
        submitChanges() {
            this.axios
                .post(`http://localhost:8080/sky/event/Mx8jiufiza7n4sMXgL43yK/Sensor/sensor/profile_updated?location=${this.inpLocation}&name=${this.inpName}&threshold=${this.inpThreshold}&number=${this.inpNumber}`)
                .then(() => {
                    this.getProfile();
                })
        },
        getProfile() {
            this.axios
            .get('http://localhost:8080/sky/cloud/Mx8jiufiza7n4sMXgL43yK/sensor_profile/get_profile')
            .then(res => {
                this.location = res.data.location;
                this.name = res.data.name;
                this.threshold = res.data.threshold;
                this.number = res.data.number;
            })
        }
    }
}
</script>