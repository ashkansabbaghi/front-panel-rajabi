import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";
import login from "./modules/login.module"

export default createStore({
  plugins: [createPersistedState()],
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    login,
  },
})
