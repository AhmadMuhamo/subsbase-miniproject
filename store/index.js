import Vue from 'vue'
import Vuex from 'vuex'
import stocks from './stocks'
import forex from './forex'

Vue.use(Vuex)

const state = () => ({
  loading: false,
  error: null
})

const store = new Vuex.Store({
  state,
  mutations: {
    setLoading(state, value) {
      state.loading = value
    },
    setError(state, value) {
      state.error = value
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  },
  modules: {
    stocks,
    forex
  }
})

export default () => {
  return store
}
