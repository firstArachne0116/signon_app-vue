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
                                <mdb-icon  icon="long-arrow-alt-up" v-if="sortField  == 'raceNumber' && sortType == 1"/>
                            </th>
                            <th @click="headerClick('nameAndTeam')">
                                Name/Team
                                <mdb-icon  icon="long-arrow-alt-down" v-if="sortField == 'nameAndTeam' && sortType == 0"/>
                                <mdb-icon  icon="long-arrow-alt-up" v-if="sortField == 'nameAndTeam' && sortType == 1"/>
                            </th>
                            <th @click="headerClick('position')">
                                Position
                                <mdb-icon  icon="long-arrow-alt-down" v-if="sortField == 'position' && sortType == 0"/>
                                <mdb-icon  icon="long-arrow-alt-up" v-if="sortField == 'position' && sortType == 1"/>
                            </th>
                        </tr>
                    </mdb-tbl-head>
                    <mdb-tbl-body>
                        <tr v-for="c in sortedCompetitors" :key="c.id">
                            <td class="p-2">{{c.raceNumber}}</td>
                            <td class="p-2">
                                {{c.firstName + ' ' + c.lastName}}<br>
                                {{c.teamName}}
                            </td>
                            <td class="p-2 text-center">
                                {{c.position}}
                                <mdb-btn v-if="c.position != ''" outline="info" darkWaves class="m-0 ml-4 p-0 pl-1 pr-1" style="line-height: 1" @click="onUndo(c.id)">Undo</mdb-btn>
                                <div v-if="c.position == ''">
                                    <mdb-btn outline="info" darkWaves class="m-0 ml-2 p-0 pl-1 pr-1" style="line-height: 1" @click="onAdd(c.id)">+</mdb-btn>
                                    <mdb-btn outline="info" darkWaves class="m-0 ml-2 p-0 pl-1 pr-1" style="line-height: 1" @click="onDQ(c.id)">DQ</mdb-btn>
                                    <mdb-btn outline="info" darkWaves class="m-0 ml-2 p-0 pl-1 pr-1" style="line-height: 1" @click="onDNF(c.id)">DNF</mdb-btn>
                                    <mdb-btn outline="info" darkWaves class="m-0 ml-2 p-0 pl-1 pr-1" style="line-height: 1" @click="onDNS(c.id)">DNS</mdb-btn>
                                </div>
                            </td>
                        </tr>
                    </mdb-tbl-body>
                </mdb-tbl>
            </mdb-container>
        </mdb-card>
        <mdb-modal direction="down" v-show="info" @close="info = null">
            <mdb-modal-header>
                <mdb-container v-if="info" class="text-left">
                    <font style="font-size: 10pt"> {{info.nameAndTeam}}</font><br/>
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
        sortType: 1,
        finishNumber: 1,
        latest: -1
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
                if (a[app.sortField] !== '' && b[app.sortField] == '') r[0][app.sortType];
                return r[a[app.sortField] < b[app.sortField] ? 1 : 0][app.sortType]
            })
            return result
        }
    },
    methods: {
        ...mapActions([
            'getCompetitorsByEventID',
            'getCompetitors',
            'updateCompetitor',
            'getEvents'
        ]),
        onBack: function() {
            this.$router.push({name: 'OfficialMain'})
        },
        headerClick: function(field) {
            if (this.sortField == field) this.sortType = 1 - this.sortType
            this.sortField = field
        },
        onAdd: function(cid) {
            this.latest = cid
            this.competitors = this.competitors.map(c => c.id == cid ? {...c, position: this.finishNumber + ''}: c)
            this.finishNumber ++
            this.updateCompetitor(this.competitors.find(c => c.id == cid))
        },
        onDQ: function(cid) {
            this.latest = cid
            this.competitors = this.competitors.map(c => c.id == cid ? {...c, position: 'DQ'}: c)
            this.updateCompetitor(this.competitors.find(c => c.id == cid))
        },
        onDNF: function(cid) {
            this.latest = cid
            this.competitors = this.competitors.map(c => c.id == cid ? {...c, position: 'DNF'}: c)
            this.updateCompetitor(this.competitors.find(c => c.id == cid))
        },
        onDNS: function(cid) {
            this.latest = cid
            this.competitors = this.competitors.map(c => c.id == cid ? {...c, position: 'DNS'}: c)
            this.updateCompetitor(this.competitors.find(c => c.id == cid))
        },
        onUndo: function(cid) {
            this.latest = cid
            const com = this.competitors.find(c => c.id == cid)
            if (com.position.slice(0, 1) !== 'D') {
                this.competitors = this.competitors.map(c => {
                    if (c.position > com.position && c.position.slice(0,1) !== 'D') {
                        c.position = ( parseInt(c.position) - 1 ) + ''
                        this.updateCompetitor(c)
                    }
                    return c
                })
                this.finishNumber --
            }
            this.competitors = this.competitors.map(c => c.id == cid ? {...c, position: ''}: c)
            this.updateCompetitor(this.competitors.find(c => c.id == cid))
        },
    },
    mounted() {
        if (!this.$route.params.event) {
            this.getEvents().then(() => {
                this.onBack()
            })
            return
        }
        this.event = this.$route.params.event
        this.getCompetitors().then(() => {
            this.getCompetitorsByEventID(this.event.id).then((resp)=>{
                this.competitors = resp.map(it => ({...it, nameAndTeam: it.firstName + ' ' + it.lastName + ' ' + it.teamName}))
                resp.map(it => {
                    if ((it.position + '').match(/[0-9]/g)){
                        if (parseInt(it.position) >= this.finishNumber) {
                            this.finishNumber = parseInt(it.position) + 1
                        }
                    }
                })
            })
        })
    }
}
</script>
