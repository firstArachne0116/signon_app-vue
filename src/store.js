import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        infos: [],
        events: [],
        competitors: []
    },
    mutations: {
    },
    getters: {
      infos: (state) => {
        return state.infos
      },
      events: (state) => {
        return state.events.sort((a,b)=> {
          if (a.eventDate < b.eventDate) return 1
          else if (a.eventDate == b.eventDate) return 0
          return -1
        })
      },
      licenseOrgs: (state) => {
        let orgs = []
        state.events.map(e => {
          if (!orgs.includes(e.licenseOrg)){
            orgs.push(e.licenseOrg)
          }
        })
        orgs.sort()
        return orgs
      }
    },
    actions: actions
})
