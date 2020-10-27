<template>
    <div class="mainContainer">
        <div class="w-100 text-left">
            <mdb-btn outline="primary" class="navButton" darkWaves size="sm" @click="onBack()"><mdb-icon  icon="chevron-left" /> Back</mdb-btn>
        </div>
        <mdb-card class="mt-3 mb-3 pt-3 pb-3">
            <mdb-container class="text-left">
                <font> {{event.eventName}}</font><br/>
                <font> {{event.eventDate}} </font><br/>
                <font> Total Competitors: {{event.competitors}}</font>
            </mdb-container>
        </mdb-card>
        
        <mdb-card class="mt-3 mb-3 pt-3 pb-3">
            <mdb-container class="text-left">
                <mdb-tbl>
                    <mdb-tbl-head>
                        <tr>
                            <th @click="headerClick('raceNumber')">
                                #
                                <mdb-icon  icon="long-arrow-alt-down" v-if="sortField == 'raceNumber' && sortType == 0"/>
                                <mdb-icon  icon="long-arrow-alt-up" v-if="sortField == 'raceNumber' && sortType == 1"/>
                            </th>
                            <th @click="headerClick('fullName')">
                                Name
                                <mdb-icon  icon="long-arrow-alt-down" v-if="sortField == 'fullName' && sortType == 0"/>
                                <mdb-icon  icon="long-arrow-alt-up" v-if="sortField == 'fullName' && sortType == 1"/>
                            </th>
                            <th @click="headerClick('teamName')">
                                Team
                                <mdb-icon  icon="long-arrow-alt-down" v-if="sortField == 'teamName' && sortType == 0"/>
                                <mdb-icon  icon="long-arrow-alt-up" v-if="sortField == 'teamName' && sortType == 1"/>
                            </th>
                        </tr>
                    </mdb-tbl-head>
                    <mdb-tbl-body>
                        <tr v-for="c in sortedCompetitors" :key="c.id" @click="rowClick(c)">
                            <td class="p-2 pt-4 pb-4">{{c.raceNumber}}</td>
                            <td class="p-2 pt-4 pb-4">{{c.fullName}}</td>
                            <td class="p-2 pt-4 pb-4">{{c.teamName}}</td>
                        </tr>
                    </mdb-tbl-body>
                </mdb-tbl>
            </mdb-container>
        </mdb-card>
        <mdb-modal direction="down" v-show="info" @close="info = null">
            <mdb-modal-header>
                <mdb-container v-if="info" class="text-left">
                    <font style="font-size: 10pt"> {{info.fullName}}</font><br/>
                    <font style="font-size: 10pt"> {{info.phoneNumber}}</font><br/>
                    <font style="font-size: 10pt"> {{info.licenseOrg}}</font><br/>
                    <font style="font-size: 10pt"> {{info.licenseNumber}}</font><br/>
                    <br/>
                    <font>Emergency Contact:</font><br/>
                    <font style="font-size: 10pt"> {{info.emergencyName}}</font><br/>
                    <font style="font-size: 10pt"> {{info.emergencyNumber}}</font><br/>
                </mdb-container>
            </mdb-modal-header>
        </mdb-modal>
    </div>
</template>


<script>
import { mdbIcon, mdbBtn, mdbCard, mdbContainer, mdbTbl, mdbTblHead, mdbTblBody, mdbModal, mdbModalHeader } from 'mdbvue'
import { mapActions } from 'vuex'

export default {
    components: {
        mdbIcon,
        mdbBtn,
        mdbCard,
        mdbContainer,
        mdbModal,
        mdbModalHeader,
        mdbTbl,
        mdbTblHead,
        mdbTblBody
    },
    data: () => ({
        qrcode: '',
        event: {},
        competitors: [],
        info: false,
        sortField: 'raceNumber',
        sortType: 0,
    }),
    computed: {
        sortedCompetitors: function() {
            let result = this.competitors
            let app = this
            const r = [
                [1, -1],
                [-1, 1]
            ]
            result = result.sort( (a, b) => {
                if (a[app.sortField] == b[app.sortField]) return 0
                return r[a[app.sortField] < b[app.sortField] ? 1 : 0][app.sortType]
            })
            return result
        }
    },
    methods: {
        ...mapActions([
            'getCompetitorsByEventID',
        ]),
        onBack: function() {
            this.$router.push({name: 'OfficialMain'})
        },
        rowClick: function(c) {
            this.info = c
        },
        headerClick: function(field) {
            if (this.sortField == field) this.sortType = 1 - this.sortType
            this.sortField = field
        }
    },
    mounted() {
        if (!this.$route.params.event) {
            this.onBack()
            return
        }
        this.event = this.$route.params.event
        this.getCompetitorsByEventID(this.event.id).then((resp)=>{
            this.competitors = resp.map(it => ({...it, fullName: it.firstName + ' ' + it.lastName}))
        })
    }
}
</script>
