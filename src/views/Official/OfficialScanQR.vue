<template>
    <div class="mainContainer">
        <div class="w-100" id="qrCodeContainer" v-if="info === null">
            <qrcode-stream @decode="onDecode" @init="onInit" />
        </div>
        <div class="w-100" id="qrCodeContainer" v-if="info !== null && alreadyExist === false">
            <mdb-card class="mt-3 mb-3 pt-3 pb-3 text-left">
                <mdb-container>
                    <mdb-row>
                        <mdb-col class="xs">
                            <div>
                                <font style="font-size: 10pt"> {{info.firstName}} {{info.lastName}}</font><br/>
                            </div>
                            <div><font style="font-size: 10pt"> {{info.phoneNumber}}</font><br/></div>
                            <div><font style="font-size: 10pt"> {{info.teamName}}</font><br/></div>
                            <div><font style="font-size: 10pt"> {{info.licenseOrg}}</font><br/></div>
                            <div><font style="font-size: 10pt"> {{info.licenseNumber}}</font><br/></div>
                            <br/>
                            <font>Emergency Contact:</font><br/>
                            <div><font style="font-size: 10pt"> {{info.emergencyName}}</font><br/></div>
                            <div><font style="font-size: 10pt"> {{info.emergencyNumber}}</font><br/></div>
                        </mdb-col>
                        <mdb-col class="xs text-right">
                            
                            <mdb-row>
                                <mdb-col class="p-1">
                                    <mdb-btn outline="info" class="p-1 m-0 w-100" @click="onAssign()"><big>Assign {{event.nextRace + skip}} </big><mdb-icon icon="check" /></mdb-btn>
                                </mdb-col>
                            </mdb-row>
                            <mdb-row>
                                <mdb-col class="p-1">
                                    <mdb-btn outline="orange" class="p-1 m-0 w-100" v-if="!skip" @click="onSkip()">
                                        <small>Skip <mdb-icon icon="forward" /></small>
                                    </mdb-btn>
                                </mdb-col>
                                <mdb-col class="p-1">
                                    <mdb-btn outline="orange" class="p-1 m-0 w-100" v-if="skip" @click="onUnSkip()">
                                        <small>UnSkip <mdb-icon icon="backward" /></small>
                                    </mdb-btn>
                                </mdb-col>
                            </mdb-row>
                            <br>
                            <br>
                            <mdb-row>
                                <mdb-col class="p-1">
                                    <mdb-btn outline="danger" class="p-1 m-0 w-100" @click="onReject()">
                                        <big>Reject </big>
                                        <mdb-icon icon="ban" />
                                    </mdb-btn>
                                </mdb-col>
                            </mdb-row>
                        </mdb-col>
                    </mdb-row>
                </mdb-container>
            </mdb-card>
        </div>
        <div class="w-100" id="qrCodeContainer" v-if="info !== null && alreadyExist === true">
            <mdb-card class="mt-3 mb-3 pt-3 pb-3 text-left">
                <mdb-container>
                    <h3>ALREADY SCANNED</h3><br/>
                    <h3>RACE NUMBER:{{info.raceNumber}}</h3><br/>
                    <mdb-btn outline="info" class="p-1 m-0 w-100" @click="info = null">
                        <big>OK</big>
                    </mdb-btn>
                </mdb-container>
            </mdb-card>
        </div>

        <mdb-card class="mt-3 mb-3 pt-3 pb-3">
            <mdb-container class="text-left">
                <font> {{event.eventName}}</font><br/>
                <font> {{event.eventDate}} </font>
                <font> Total Competitors: {{event.competitors}}</font>
            </mdb-container>
        </mdb-card>
        <mdb-row>
            <mdb-col>
                <h5>Next race number to issue:</h5>
                <mdb-btn outline="success" class="p-1 m-0 w-100" @click="onFinish">Finish <mdb-icon icon="external-link-alt" /></mdb-btn>
            </mdb-col>
            <mdb-col>
                <h1 style="font-size: 80px; font-family: Arial">{{event.nextRace + skip}}</h1>
            </mdb-col>
            <mdb-col>
                <mdb-btn outline="orange" class="p-1 mb-3 w-100" v-if="!skip" @click="onSkip">
                    Skip
                    <mdb-icon icon="forward" />
                </mdb-btn>
                <br/><br/>
                <mdb-btn outline="orange" class="p-1 mt-3 w-100" v-if="skip" @click="onUnSkip">Unskip<mdb-icon icon="backward" /></mdb-btn>
            </mdb-col>
        </mdb-row>
        <mdb-modal direction="down" :show="error != ''" @close="error = ''">
            <mdb-modal-header>
                <mdb-modal-title>Error occured while scanning the QR code</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>
                <p>{{error}}</p>
            </mdb-modal-body>
            <mdb-modal-footer>
                <div class="w-100 p-2 m-0 text-center">
                    <mdb-btn outline="info" class="p-1 m-0 w-75" @click="onBack()">OK</mdb-btn>
                </div>
            </mdb-modal-footer>
        </mdb-modal>
        <embed src="../../assets/beep.mp3" autostart="false" width="0" height="0" id="sound1" enablejavascript="true">
        <!-- <audio id="chatAudio" style="display: none;"> 
          <source src="../../assets/beep.mp3" type="audio/mpeg"> 
        </audio> -->
    </div>
</template>


<script>
import {
    mdbIcon,
    mdbBtn,
    mdbCard,
    mdbRow,
    mdbCol,
    mdbContainer,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter
} from 'mdbvue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { mapActions } from 'vuex'

export default {
    components: {
        mdbIcon,
        mdbBtn,
        QrcodeStream,
        mdbCard,
        mdbRow,
        mdbCol,
        mdbContainer,
        mdbModal,
        mdbModalHeader,
        mdbModalTitle,
        mdbModalBody,
        mdbModalFooter
    },
    data: () => ({
        qrcode: '',
        event: {},
        result: '',
        error: '',
        info:
        // {
        //     emergencyName: "PPP",
        //     emergencyNumber: "0234",
        //     firstName: "FIRST",
        //     lastName: "ARACHNE",
        //     licenseNumber: "",
        //     licenseOrg: "",
        //     phoneNumber: "01234",
        //     teamName: "",
        // },
        // {
        //     emergencyName: "JANE SMITH",
        //     emergencyNumber: "07987654321",
        //     firstName: "JOHN",
        //     lastName: "SMITH",
        //     licenseNumber: "237237232",
        //     licenseOrg: "BRITISH CYCLING",
        //     phoneNumber: "07123456789",
        //     teamName: "CYCLING CLUB",
        // },
        null,
        skip: 0,
        competitors: [],
        alreadyExist: false,
    }),
    methods: {
        ...mapActions([
            "updateEvent",
            "saveCompetitor",
            "getEvents",
            'getCompetitorsByEventID'
        ]),
        onBack: function() {
            this.$router.push({name: 'OfficialMain'})
        },
        onFinish: function() {
            this.getEvents()
            this.$router.go(-1)
        },
        onSkip: function() {
            this.skip ++
        },
        onUnSkip: function() {
            this.skip --
        },
        onAssign: async function() {
            this.event.competitors ++
            this.event.nextRace += this.skip + 1
            this.skip = 0
            this.updateEvent(this.event)
            this.info.eventID = this.event.id
            this.info.raceNumber = this.event.nextRace - 1
            this.info.position = ''
            this.info.key = undefined
            console.log(this.info)
            const res = await this.saveCompetitor(this.info)
            console.log(res)
            this.competitors.push(this.info)
            this.info = null
        },
        onReject: function() {
            this.info = null
        },
        onDecode (result) {
            const attrs = result.split('/')
            this.info = {
                firstName       : attrs[0],
                lastName        : attrs[1],
                phoneNumber     : attrs[2],
                emergencyName   : attrs[3],
                emergencyNumber : attrs[4],
                teamName        : attrs[5],
                licenseOrg      : attrs[6],
                licenseNumber   : attrs[7],
            }
            const com = this.competitors.find(it => it.licenseNumber === this.info.licenseNumber)
            if (com) {
                this.alreadyExist = true
                this.info = com
            }
            else {
                this.alreadyExist = false
            }
            
            var audio = document.getElementById('chatAudio') 
            audio.play() 
        },

        async onInit (promise) {
            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.error = "You need to grant camera access permisson"
                } else if (error.name === 'NotFoundError') {
                    this.error = "No camera on this device"
                } else if (error.name === 'NotSupportedError') {
                    this.error = "Secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                    this.error = "Is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                    this.error = "Installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = "Stream API is not supported in this browser"
                }
            }
        }
    
    },
    mounted() {
        if (!this.$route.params.event) {
            this.onBack()
            return
        }
        this.qrcode = JSON.stringify(this.$route.params.event)
        this.event = this.$route.params.event
        this.getCompetitorsByEventID(this.event.id).then((resp)=>{
            this.competitors = resp.map(it => ({...it, fullName: it.firstName + ' ' + it.lastName}))
        })
    }
}
</script>
