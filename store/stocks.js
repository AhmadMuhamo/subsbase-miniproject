export default {
  state() {
    return {
      stocks: undefined
    }
  },
  mutations: {
    addStock(state, stock) {
      state.stocks = { ...state.stocks }
      state.stocks[stock.symbol] = stock
      if (process.browser) {
        localStorage.setItem('stocks', JSON.stringify(state.stocks))
      }
    }
  },
  getters: {
    stocks(state) {
      if (process.browser) {
        return state.stocks || JSON.parse(localStorage.getItem('stocks'))
      }
    }
  },
  actions: {
    async searchSymbols({ commit }, searchQuery) {
      const response = await this.$api.$get(
        `query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=D9BR55WO8UNG2W47`
      )

      return response.bestMatches
    },
    async fetchStocks({ commit }, symbol) {
      commit('setLoading', true)

      const response = await this.$api.$get(
        `query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=D9BR55WO8UNG2W47`
      )

      const stock = {
        symbol: response['Global Quote']['01. symbol'],
        open: response['Global Quote']['02. open'],
        prevClose: response['Global Quote']['08. previous close'],
        high: response['Global Quote']['03. high'],
        low: response['Global Quote']['04. low'],
        volume: response['Global Quote']['06. volume']
      }

      commit('addStock', stock)
      commit('setLoading', false)
      return stock
    }
  }
}
