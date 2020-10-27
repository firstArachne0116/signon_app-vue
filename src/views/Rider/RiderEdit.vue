<template>
    <div class="mainContainer">
        <mdb-btn outline="primary" class="navButton left" darkWaves size="sm" @click="onSave()"><mdb-icon icon="save" /> Save</mdb-btn>
        <br>
        <p class="mt-4 text-left">Please enter your license details below:</p>
        
        <mdb-card border="info" class="text-left">
            <mdb-card-header class="p-2 pl-3 text-info">Mandatory</mdb-card-header>
            <mdb-card-body class="pt-0 pb-0">
                <div>
                    <mdb-input type="text" label="First Name" v-model="firstName" @change="onFirstNameChange" @blur="checkField" required 
                    />
                    <!-- invalidFeedback="Please input first name" -->
                </div>
                <div>
                    <mdb-input type="text" label="Last Name" v-model="lastName" @change="onLastNameChange" @blur="checkField" required 
                    />
                    <!-- invalidFeedback="Please input last name" -->
                </div>
                <div>
                    <mdb-input type="number" label="Phone Number" v-model="phoneNumber" @change="onPhoneNumberChange" @blur="checkField" required 
                    />
                    <!-- invalidFeedback="Please input Your phone number" -->
                </div>
                <div>
                    <mdb-input type="text" label="Emergency Contact Name" v-model="emergencyName" @change="onEmergencyNameChange" @blur="checkField" required 
                    />
                    <!-- invalidFeedback="Please input Emergency contact name" -->
                </div>
                <div>
                    <mdb-input type="number" label="Emergency Contact Phone Number" v-model="emergencyNumber" @change="onEmergencyNumberChange" @blur="checkField" required 
                    />
                    <!-- invalidFeedback="Please input emergency contact phone number" -->
                </div>
            </mdb-card-body>
        </mdb-card>
        <mdb-card border="info" class="text-left mt-3 mb-5">
            <mdb-card-header class="p-2 pl-3 text-info">Optional</mdb-card-header>
            <mdb-card-body class="pt-0 pb-0">
                <div>
                    <mdb-input type="text" label="Team / Club Name" v-model="teamName"/>
                </div>
                <div>
                    <mdb-input type="text" label="Licensing Organisation" @change="onLicenseOrgChange" v-model="licenseOrg"/>
                </div>
                <div>
                    <mdb-input type="text" label="Licence Number" v-model="licenseNumber"/>
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
    </div>
</template>

<script>
import {
    mdbIcon,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardHeader,
    mdbInput,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
} from 'mdbvue'

import {mapActions, mapGetters} from 'vuex'

export default {
    components: {
        mdbBtn,
        mdbIcon,
        mdbCard,
        mdbCardBody,
        mdbCardHeader,
        mdbInput,
        mdbModal,
        mdbModalHeader,
        mdbModalTitle,
        mdbModalBody,
        mdbModalFooter,
    },
    data: () => ({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emergencyName: '',
        emergencyNumber: '',
        showErrorModal: false,
        fields: [],
        teamName: '',
        licenseOrg: '',
        licenseNumber: '',
        showAutocompleteDropdown: false,
        selectedIndex: 0,
    }),
    computed: {
        ...mapGetters(['licenseOrgs']),
        filtereditems: function() {
            return this.licenseOrgs.filter(it => it.includes(this.licenseOrg))
        }
    },
    methods: {
        ...mapActions([
            "updateInfo",
            "getInfos",
        ]),
        checkField: (info) => {
            info.preventDefault ();
            info.target.parentNode.classList.add('was-validated')
        },
        validateName: (str) => {
            str = str.match(/[a-zA-Z]\//g);
            if (!str)return ''
            str = str.join('').toUpperCase()
            return str.slice(0, 20)
        },
        onFirstNameChange: function () {
            this.firstName = this.validateName(this.firstName)
        },
        onLastNameChange: function () {
            this.lastName = this.validateName(this.lastName)
        },
        onPhoneNumberChange: function () {
            if (this.phoneNumber == '') return ''
            if (this.phoneNumber.slice(0,1) != '0') this.phoneNumber = '0' + this.phoneNumber
            this.phoneNumber = this.phoneNumber.slice(0,14)
        },
        onEmergencyNameChange: function () {
            this.emergencyName = this.validateName(this.emergencyName)
        },
        onEmergencyNumberChange: function () {
            if (this.emergencyNumber == '') return ''
            if (this.emergencyNumber.slice(0,1) != '0') this.emergencyNumber = '0' + this.emergencyNumber
            this.emergencyNumber = this.emergencyNumber.slice(0,11)
        },
        onTeamNameChange: function () {
            this.teamName = this.validateName(this.teamName)
        },
        onLicenseOrgChange: function () {
            this.licenseOrg = this.validateName(this.licenseOrg)
        },
        onLicenseNumberChange: function () {
            this.licenseNumber = this.licenseNumber.match(/[a-zA-Z0-9]/g)
            if (!this.licenseNumber) return ''
            this.licenseNumber = this.licenseNumber.join('').toUpperCase().slice(0, 20)
        },
        onDontSave: function() {
            this.$router.push({name: 'RiderMain'})
        },
        onSave: async function() {
            let app = this;
            app.fields = [];
            if (app.firstName == '') app.fields.push('first name');
            if (app.lastName == '') app.fields.push('last name');
            if (app.phoneNumber == '') app.fields.push('phone number');
            if (app.emergencyName == '') app.fields.push('emergency contact name');
            if (app.emergencyNumber == '') app.fields.push('emergency contact phone number');
            if (app.fields.length) {
                app.showErrorModal = true;
                return;
            }
            var info = {
                id: app.$route.params.info.id,
                firstName: app.firstName,
                lastName: app.lastName,
                phoneNumber: app.phoneNumber,
                emergencyName: app.emergencyName,
                emergencyNumber: app.emergencyNumber,
                teamName: app.teamName,
                licenseOrg: app.licenseOrg,
                licenseNumber: app.licenseNumber,
            }
            app.updateInfo(info)
            await app.getInfos()
            app.$router.push({name: 'RiderMain'})
        },
        handleBackspace: function () {
            this.showAutocompleteDropdown = true;
        },
        select: function(index) {
            this.showAutocompleteDropdown = false;
            this.value = this.filtereditems[index]
        },
        selectNext: function() {
            if (this.showAutocompleteDropdown) {
                if (this.selectedIndex < this.filtereditems.length - 1) {
                this.selectedIndex++;
            } else {
                this.selectedIndex = 0;
            }        
            } else {
                this.showAutocompleteDropdown = true;
            }
        },
        selectPrev: function() {
            if (this.selectedIndex > 0) {
                this.selectedIndex--;
            } else {
                this.selectedIndex = this.filtereditems.length - 1;
            }
        }
    },
    mounted() {
        if (!this.$route.params.info){
            this.$router.push({name: 'RiderMain'})
            return
        }
        this.firstName = this.$route.params.info.firstName;
        this.lastName = this.$route.params.info.lastName;
        this.phoneNumber = this.$route.params.info.phoneNumber;
        this.emergencyName = this.$route.params.info.emergencyName;
        this.emergencyNumber = this.$route.params.info.emergencyNumber;
        this.teamName = this.$route.params.info.teamName;
        this.licenseOrg = this.$route.params.info.licenseOrg;
        this.licenseNumber = this.$route.params.info.licenseNumber;
    }
}
</script>