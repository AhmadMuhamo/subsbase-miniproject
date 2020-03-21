export default {
  state() {
    return {
      forex: [1, 2]
    }
  },
  mutations: {
    setForex(state, forex) {
      state.forex = forex
    }
  },
  getters: {
    forex(state) {
      return state.forex
    }
  },
  actions: {}
}
