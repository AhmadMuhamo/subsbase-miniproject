export default {
  state() {
    return {
      stocks: [1, 2]
    }
  },
  mutations: {
    setStocks(state, stocks) {
      state.stocks = stocks
    }
  },
  getters: {
    stocks(state) {
      return state.stocks
    }
  },
  actions: {}
}
