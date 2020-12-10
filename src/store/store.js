// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//     state: {
//         Sidebar_drawer: null,
//         Customizer_drawer: false,
//         SidebarColor: 'white',
//         SidebarBg: '',
//     },
//     mutations: {
//         SET_SIDEBAR_DRAWER(state, payload) {
//             state.Sidebar_drawer = payload
//         },
//         SET_CUSTOMIZER_DRAWER(state, payload) {
//             state.Customizer_drawer = payload
//         },
//         SET_SIDEBAR_COLOR(state, payload) {
//             state.SidebarColor = payload
//         },
//     },
//     actions: {
//     },
//     getters: {
//     }
// })

import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        Sidebar_drawer: null,
        Customizer_drawer: false,
        SidebarColor: 'white',
        SidebarBg: '',
    },
    mutations: {
        SET_SIDEBAR_DRAWER(state, payload) {
            state.Sidebar_drawer = payload
        },
        SET_CUSTOMIZER_DRAWER(state, payload) {
            state.Customizer_drawer = payload
        },
        SET_SIDEBAR_COLOR(state, payload) {
            state.SidebarColor = payload
        },
    },
    actions: {
    },
    getters: {
    },
    modules,
    // Enable strict mode in development to get a warning
    // when mutating state outside of a mutation.
    // https://vuex.vuejs.org/guide/strict.html
    strict: process.env.NODE_ENV !== 'production',
})

export default store
