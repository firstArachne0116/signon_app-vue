<template>
    <div class="mainContainer">
        <mdb-btn outline="primary" class="navButton left" darkWaves size="sm" @click="onSave()"><mdb-icon icon="save" /> Save</mdb-btn>
        <br/>
        <p class="mt-4 text-left">Please enter your license details below:</p>
        
        <mdb-card border="info" class="text-left">
            <mdb-card-header class="p-2 pl-3 text-info">Mandatory</mdb-card-header>
            <mdb-card-body class="pt-0 pb-0">
                <div class="pt-2 pb-2">
                    <font>Event Name (must be unique)</font><br/>
                    <font>example: Crit Week 4 Womens E/1/2</font><br/>
                    <input type="text" class="form-control" v-model="eventName" @input="onEventNameChange" @change="onEventNameChange" @blur="checkField" required />
                </div>
                <div v-if="eventDate != null" class="pt-2 pb-2">
                    <font>Event Date</font><br/>
                    <input type="date" class="form-control" v-model="eventDate" @blur="checkField" required />
                </div>
            </mdb-card-body>
        </mdb-card>
        <mdb-modal direction="down" :show="showErrorModal" @close="showErrorModal = false">
            <mdb-modal-header>
                <mdb-modal-title>Error</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>
                <p>
                    To Save, you must provide {{fields.join(', ')}}.
                </p>
            </mdb-modal-body>
            <mdb-modal-footer>
                <div class="w-50 p-2 m-0">
                    <mdb-btn outline="danger" class="p-1 m-0 w-100" @click="onDontSave()">Don't Save</mdb-btn>
                </div>
                <div class="w-50 p-2 m-0">
                    <mdb-btn outline="info" class="p-1 m-0 w-100" @click.native="showErrorModal = false">OK, I'll fix it</mdb-btn>
                </div>
            </mdb-modal-footer>
        </mdb-modal>
        <mdb-modal direction="down" :show="showExistModal" @close="showExistModal = false">
            <mdb-modal-header>
                <mdb-modal-title>Error</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>
                <p>
                    That event name already exists. To fix it please enter another one.
                </p>
            </mdb-modal-body>
            <mdb-modal-footer>
                <div class="w-50 p-2 m-0">
                    <mdb-btn outline="danger" class="p-1 m-0 w-100" @click="onDontSave()">Don't Save</mdb-btn>
                </div>
                <div class="w-50 p-2 m-0">
                    <mdb-btn outline="info" class="p-1 m-0 w-100" @click.native="showExistModal = false">OK, I'll fix it</mdb-btn>
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
    mdbCardBody,
    mdbCardHeader,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
} from 'mdbvue'

import {mapActions} from 'vuex'

export default {
    components: {
        mdbBtn,
        mdbIcon,
        mdbCard,
        mdbCardBody,
        mdbCardHeader,
        mdbModal,
        mdbModalHeader,
        mdbModalTitle,
        mdbModalBody,
        mdbModalFooter,
    },
    data: () => ({
        eventName: '',
        eventDate: null,
        fields: [],
        showErrorModal: false,
        showExistModal: false,
    }),
    methods: {
        ...mapActions([
            "saveEvent",
            "getEvents",
        ]),
        checkField: (event) => {
            event.preventDefault ();
            event.target.parentNode.classList.add('was-validated')
        },
        validateName: (str) => {
            return str.slice(0, 40)
        },
        onEventNameChange: function () {
            this.eventName = this.validateName(this.eventName)
        },
        onDontSave: function() {
            this.$router.push({name: 'OfficialMain'})
        },
        onSave: function() {
            let app = this;
            app.fields = [];
            if (app.eventName == '') app.fields.push('event name');
            if (app.eventDate == '') app.fields.push('event date');
            if (app.fields.length) {
                app.showErrorModal = true;
                return;
            }
            var event = {
                eventName: app.eventName,
                eventDate: app.eventDate,
                nextRace: 1,
                competitors: 0,
            }
            app.saveEvent(event).then(bSuccess => {
                if (!bSuccess){
                    this.showExistModal = true;
                    return
                }
                app.getEvents()
                app.$router.push({name: 'OfficialMain'})
            })
        },
    },
    mounted() {
        const today = new Date()
        this.eventDate = today.getFullYear() + '-' + ((today.getMonth() + 101) + '').slice(1,3) + '-' + ((today.getDate() + 100) + '').slice(1,3)
    }
}
</script>