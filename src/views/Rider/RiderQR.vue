<template>
    <div class="mainContainer">
        <mdb-btn outline="primary" class="navButton left" darkWaves size="sm" @click="onBack()"><mdb-icon  icon="chevron-left" /> Back</mdb-btn>
        <p class="h5 pt-3">Show this code at sign on</p>
        <div class="w-100" id="qrCodeContainer">
            <vue-qrcode :margin="1" :width="200" v-if="qrcode !== ''" :value="qrcode" class="w-100"/>
        </div>
        
        <mdb-card class="mt-3 mb-3 pt-3 pb-3">
            <mdb-container class="text-left">
                <div v-if="info.firstName != '' && info.lastName != ''"><font>{{info.firstName}} {{info.lastName}}</font><br/></div>
                <div v-if="info.phoneNumber != ''"><font> {{info.phoneNumber}}</font><br/></div>
                <div v-if="info.teamName != ''"><font> {{info.teamName}}</font><br/></div>
                <div v-if="info.licenseOrg != ''"><font> {{info.licenseOrg}}</font><br/></div>
                <div v-if="info.licenseNumber != ''"><font> {{info.licenseNumber}}</font><br/></div>
                <br/>
                <font>Emergency Contact:</font><br/>
                <div v-if="info.emergencyName != ''"><font> {{info.emergencyName}}</font><br/></div>
                <div v-if="info.emergencyNumber != ''"><font> {{info.emergencyNumber}}</font><br/></div>
            </mdb-container>
        </mdb-card>
    </div>
</template>


<script>
import { mdbIcon, mdbBtn, mdbCard, mdbContainer } from 'mdbvue'
import VueQrcode from 'vue-qrcode'
 

export default {
    data: () => ({
        qrcode: '',
        info: {}
    }),
    components: {
        mdbIcon,
        mdbBtn,
        VueQrcode,
        mdbCard,
        mdbContainer
    },
    methods: {
        onBack: function() {
            this.$router.push({name: 'RiderMain'})
        },
    },
    mounted() {
        if (!this.$route.params.info) {
            this.onBack()
            return
        }
        let string = this.$route.params.info.firstName
                    + '/' + this.$route.params.info.lastName
                    + '/' + this.$route.params.info.phoneNumber
                    + '/' + this.$route.params.info.emergencyName
                    + '/' + this.$route.params.info.emergencyNumber
                    + '/' + this.$route.params.info.teamName
                    + '/' + this.$route.params.info.licenseOrg
                    + '/' + this.$route.params.info.licenseNumber
        this.qrcode = [{data: string, mode: 'alphanumeric'}]
        // this.qrcode = JSON.stringify(this.$route.params.info)
        console.log(this.qrcode)
        this.info = this.$route.params.info
    }
}
</script>
