import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import RiderMain from "./views/Rider/RiderMain";
import RiderCreate from "./views/Rider/RiderCreate";
import RiderEdit from "./views/Rider/RiderEdit";
import RiderQR from "./views/Rider/RiderQR";
import OfficialMain from "./views/Official/OfficialMain";
import OfficialCreate from "./views/Official/OfficialCreate";
import OfficialScanQR from "./views/Official/OfficialScanQR";
import OfficialEdit from "./views/Official/OfficialEdit";
import OfficialViewRiders from "./views/Official/OfficialViewRiders";
import OfficialEditResults from "./views/Official/OfficialEditResults";

Vue.use(Router)

const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rider-main',
      name: 'RiderMain',
      component: RiderMain
    },
    {
      path: '/rider-create',
      name: 'RiderCreate',
      component: RiderCreate
    },
    {
      path: '/rider-edit',
      name: 'RiderEdit',
      component: RiderEdit
    },
    {
      path: '/rider-qr',
      name: 'RiderQR',
      component: RiderQR
    },
    {
      path: '/official-main',
      name: 'OfficialMain',
      component: OfficialMain
    },
    {
      path: '/official-create',
      name: 'OfficialCreate',
      component: OfficialCreate
    },
    {
      path: '/official-scanqr',
      name: 'OfficialScanQR',
      component: OfficialScanQR
    },
    {
      path: '/official-edit',
      name: 'OfficialEdit',
      component: OfficialEdit
    },
    {
      path: '/official-view-riders',
      name: 'OfficialViewRiders',
      component: OfficialViewRiders
    },
    {
      path: '/official-edit-results',
      name: 'OfficialEditResults',
      component: OfficialEditResults
    },
]

export default new Router({
    scrollBehavior() {
      return { x: 0, y: 0 }
    },
    routes
})
