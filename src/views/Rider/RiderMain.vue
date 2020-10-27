<template>
    <div class="mainContainer text-left">
        <mdb-btn outline="primary" class="navButton" darkWaves size="sm" @click="onBack()"><mdb-icon  icon="chevron-left" /> Back</mdb-btn>
        <mdb-btn outline="primary" class="navButton right" darkWaves size="sm" @click="onNew()">Add New ID <mdb-icon far icon="calendar-plus" /></mdb-btn>
        <p class="pt-3 pb-1">Please choose a license to sign on with today:</p>
        <template>
            <div v-for="info in infos" :key="info.id">
                <template>
                    <mdb-card class="mt-3 mb-3 pt-3 pb-3">
                        <mdb-container>
                            <mdb-row>
                                <mdb-col class="xs">
                                    <div v-if="info.firstName != '' && info.lastName != ''"><font style="font-size: 10pt"> {{info.firstName}} {{info.lastName}}</font><br/></div>
                                    <div v-if="info.phoneNumber != ''"><font style="font-size: 10pt"> {{info.phoneNumber}}</font><br/></div>
                                    <div v-if="info.teamName != ''"><font style="font-size: 10pt"> {{info.teamName}}</font><br/></div>
                                    <div v-if="info.licenseOrg != ''"><font style="font-size: 10pt"> {{info.licenseOrg}}</font><br/></div>
                                    <div v-if="info.licenseNumber != ''"><font style="font-size: 10pt"> {{info.licenseNumber}}</font><br/></div>
                                    <br/>
                                    <font>Emergency Contact:</font><br/>
                                    <div v-if="info.emergencyName != ''"><font style="font-size: 10pt"> {{info.emergencyName}}</font><br/></div>
                                    <div v-if="info.emergencyNumber != ''"><font style="font-size: 10pt"> {{info.emergencyNumber}}</font><br/></div>
                                </mdb-col>
                                <mdb-col class="xs text-right">
                                    <mdb-btn outline="info" class="p-1 w-75" @click="signOn(info)"><small>SignOn</small> <mdb-icon icon="sign-in-alt" /></mdb-btn>
                                    <mdb-btn outline="orange" class="p-1 w-75" @click="editInfo(info)"><small>Edit</small> <mdb-icon far icon="edit" /></mdb-btn>
                                    <mdb-btn outline="danger" class="p-1 w-75" @click="deleteModal(info)"><small>Delete</small> <mdb-icon far icon="trash-alt" /></mdb-btn>
                                </mdb-col>
                            </mdb-row>
                        </mdb-container>
                    </mdb-card>
                </template>
            </div>
        </template>
        
        <mdb-modal direction="down" :show="showModal" @close="showModal = false">
            <mdb-modal-header>
                <mdb-modal-title>Delete License</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>
                <p>
                    Are you sure?
                </p>
            </mdb-modal-body>
            <mdb-modal-footer>
                <mdb-btn outline="danger" class="pt-1 pb-1" @click="confirmDelete()">Delete</mdb-btn>
                <mdb-btn outline="info" class="pt-1 pb-1" @click.native="showModal = false">Keep</mdb-btn>
            </mdb-modal-footer>
        </mdb-modal>
    </div>
</template>

<script>
import {
    mdbIcon,
    mdbBtn,
    mdbCard,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter
} from 'mdbvue'

import { mapGetters, mapActions } from 'vuex'

export default {
    data: function() {
        return {
            showModal: false,
            info: null,
        }
    },
    components: {
        mdbBtn,
        mdbIcon,
        mdbCard,
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbModal,
        mdbModalHeader,
        mdbModalTitle,
        mdbModalBody,
        mdbModalFooter
    },
    computed: {
        ...mapGetters([
            'infos',
        ])
    },
    methods: {
        ...mapActions([
            'getInfos',
            'deleteInfo'
        ]),
        signOn: function(info) {
            this.$router.push({name: "RiderQR", params: {info}})
        },
        editInfo: function(info) {
            this.$router.push({name: "RiderEdit", params: {info}})
        },
        deleteModal: function(info) {
            let app = this
            app.info = info
            app.showModal = true
        },
        confirmDelete: async function() {
            let app = this
            app.showModal = false
            await app.deleteInfo(app.info)
            await app.getInfos()
        },
        onBack: function() {
            this.$router.push({name: 'home'})
        },
        onNew: function() {
            this.$router.push({name: 'RiderCreate'})
        }
    },
    mounted: function () {
        this.getInfos()
    }
}
</script>