<template>
    <div class="mainContainer text-left">
        <mdb-btn outline="primary" class="navButton" darkWaves size="sm" @click="onBack()"><mdb-icon  icon="chevron-left" /> Back</mdb-btn>
        <mdb-btn outline="primary" class="navButton right" darkWaves size="sm" @click="onNew()">Create New Event <mdb-icon far icon="calendar-plus" /></mdb-btn>
        <p class="pt-3 pb-1 h3">Events:</p>
        <template>
            <div v-for="event in events" :key="event.id">
                <template>
                    <div @click="onEventClick(event)">
                        <mdb-card class="mt-3 mb-3 pt-3 pb-3 button">
                            <mdb-container>
                                <h1 class="right pt-3"><mdb-icon far icon="edit" /></h1>
                                <font> {{event.eventName}}</font><br/>
                                <font> {{(new Date(event.eventDate)).getDate()}}/{{(new Date(event.eventDate)).getMonth() + 1}}/{{(new Date(event.eventDate)).getFullYear()}}</font><br/>
                                <font> Competitors: {{event.competitors}}</font><br/>
                                <font> Results: {{event.results}}</font><br/>
                            </mdb-container>
                        </mdb-card>
                    </div>
                </template>
            </div>
        </template>
        
        <mdb-modal direction="down" :show="showModal" @close="showModal = false">
            <mdb-modal-header>
                <mdb-modal-title>
                    <mdb-container>
                        <font> {{event.eventName}}</font><br/>
                        <font> {{(new Date(event.eventDate)).getDate()}}/{{(new Date(event.eventDate)).getMonth() + 1}}/{{(new Date(event.eventDate)).getFullYear()}}</font><br/>
                        <font> Competitors: {{event.competitors}}</font><br/>
                        <font> Results: {{event.results}}</font><br/>
                    </mdb-container>
                </mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-footer>
                <div class="w-50 p-2 m-0">
                    <mdb-btn outline="info" class="p-1 m-0 w-100" @click="onSignOn()">
                        SignOn
                        <mdb-icon icon="sign-in-alt" />
                    </mdb-btn>
                </div>
                <div class="w-50 p-2 m-0">
                    <mdb-btn outline="primary" class="p-1 m-0 w-100" @click="onViewRiders()">
                        View Entrants
                        <mdb-icon icon="table" />
                    </mdb-btn>
                </div>
                <div class="w-50 p-2 m-0">
                    <mdb-btn outline="warning" class="p-1 m-0 w-100" @click="onEdit()">
                        Edit Event
                        <mdb-icon icon="edit" />
                    </mdb-btn>
                </div>
                <div class="w-50 p-2 m-0">
                    <mdb-btn outline="warning" class="p-1 m-0 w-100" @click="onEditResults()">
                        Edit Results
                        <mdb-icon icon="edit" />
                    </mdb-btn>
                </div>
                <div class="w-50 p-2 m-0">
                    
                    <mdb-btn outline="success" class="p-1 m-0 w-100" @click="showModal = false">
                        <download-csv
                            :data   = "json_data"
                            :name = "event.eventName + '.csv'">
                            Download
                            <mdb-icon icon="download" />
                        </download-csv>
                    </mdb-btn>
                </div>
                <div class="w-50 p-2 m-0">
                    <mdb-btn outline="danger" class="p-1 m-0 w-100" @click="showDeleteModal = true">
                        Delete
                        <mdb-icon icon="trash-alt" />
                    </mdb-btn>
                </div>
                
            </mdb-modal-footer>
        </mdb-modal>
        <mdb-modal direction="down" :show="showDeleteModal" @close="showDeleteModal = false">
            <mdb-modal-header>
                <mdb-modal-title>Delete License</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>
                <p>
                    Are you sure?
                </p>
            </mdb-modal-body>
            <mdb-modal-footer>
                <div class="w-50 p-2 m-0">
                    <mdb-btn outline="danger" class="p-1 m-0 w-100" @click="confirmDelete()">Delete</mdb-btn>
                </div>
                <div class="w-50 p-2 m-0">
                    <mdb-btn outline="info" class="p-1 m-0 w-100" @click.native="showDeleteModal = false">Keep</mdb-btn>
                </div>
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
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter
} from 'mdbvue'
import Vue from 'vue'
import JsonCSV from 'vue-json-csv'
 
Vue.component('downloadCsv', JsonCSV)

import { mapGetters, mapActions } from 'vuex'

export default {
    data: function() {
        return {
            showModal: false,
            showDeleteModal: false,
            event: {},
            json_data: [
                {
                    'name': 'Tony Peña',
                    'city': 'New York',
                    'country': 'United States',
                    'birthdate': '1978-03-15',
                    'phone': {
                        'mobile': '1-541-754-3010',
                        'landline': '(541) 754-3010'
                    }
                },
                {
                    'name': 'Thessaloniki',
                    'city': 'Athens',
                    'country': 'Greece',
                    'birthdate': '1987-11-23',
                    'phone': {
                        'mobile': '+1 855 275 5071',
                        'landline': '(2741) 2621-244'
                    }
                }
            ],
        }
    },
    components: {
        mdbBtn,
        mdbIcon,
        mdbCard,
        mdbContainer,
        mdbModal,
        mdbModalHeader,
        mdbModalTitle,
        mdbModalBody,
        mdbModalFooter,
    },
    computed: {
        ...mapGetters([
            'events',
        ])
    },
    methods: {
        ...mapActions([
            'getEvents',
            'deleteEvent',
            'getCompetitorsByEventID'
        ]),
        signOn: function(event) {
            this.$router.push({name: "RiderQR", params: {event}})
        },
        editEvent: function(event) {
            this.$router.push({name: "RiderEdit", params: {event}})
        },
        deleteModal: function(event) {
            let app = this
            app.event = event
            app.showModal = true
        },
        confirmDelete: async function() {
            let app = this
            app.showModal = false
            app.showDeleteModal = false
            await app.deleteEvent(app.event)
            await app.getEvents()
        },
        onBack: function() {
            this.$router.push({name: 'home'})
        },
        onNew: function() {
            this.$router.push({name: 'OfficialCreate'})
        },
        onEventClick: function(event) {
            this.event = event
            this.getCompetitorsByEventID(event.id).then(resp => {
                this.json_data = resp.map(c => ({
                    'ID'                        : c.id,
                    'EventID'                   : c.eventID,
                    'First Name'                : c.firstName,
                    'Last Name'                 : c.lastName,
                    'Phone Number'              : c.phoneNumber,
                    'Emergency Contact Name'    : c.emergencyName,
                    'Emergency Contact Number'  : c.emergencyNumber,
                    'Team Name'                 : c.teamName,
                    'License Body'              : c.licenseOrg,
                    'License Number'            : c.licenseNumber,
                    'Race Number'               : c.raceNumber,
                    'Position'                  : c.position
                }))
                this.showModal = true
            })
        },
        onSignOn: function() {
            this.showModal = false
            this.$router.push({name: 'OfficialScanQR', params: {event: this.event}})
        },
        onEdit: function() {
            this.$router.push({name: 'OfficialEdit', params: {event: this.event}})
        },
        onViewRiders: function() {
            this.$router.push({name: 'OfficialViewRiders', params: {event: this.event}})
        },
        onEditResults: function() {
            this.$router.push({name: 'OfficialEditResults', params: {event: this.event}})
        }
    },
    mounted: function () {
        this.getEvents()
    }
}
</script>