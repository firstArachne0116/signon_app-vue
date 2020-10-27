<template>
    <div class="mainContainer vertical-middle">
        <h1>SignOn <mdb-icon far icon="edit" /></h1>
        <p class="mt-4 text-left h5">Are you a competitor, or an official?</p>
        <mdb-btn class="homeButton" outline="primary" darkWaves size="lg" @click="onCompetitor()">I'm a competitor</mdb-btn>
        <mdb-btn class="homeButton" outline="primary" darkWaves size="lg" @click="onEventOfficial()">I am an event official</mdb-btn>
    </div>
</template>


<script>
import { mdbIcon, mdbBtn } from 'mdbvue'

export default {
    components: {
        mdbIcon,
        mdbBtn
    },
    methods: {
        onCompetitor: function() {
            this.$router.push({name: 'RiderMain'});
        },
        onEventOfficial: function() {
            this.$router.push({name: 'OfficialMain'});
        }
    }
}
</script>
