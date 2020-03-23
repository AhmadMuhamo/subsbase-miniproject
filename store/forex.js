export default {
  state() {
    return {
      forex: undefined
    }
  },
  mutations: {
    addForex(state, rate) {
      !state.forex
        ? (state.forex = JSON.parse(localStorage.getItem('forex')) || {})
        : (state.forex = { ...state.forex })
      state.forex[`${rate.from}-${rate.to}`] = rate
      if (process.browser) {
        localStorage.setItem('forex', JSON.stringify(state.forex))
      }
    },
    removeForex(state) {
      state.forex = undefined
      localStorage.removeItem('forex')
    }
  },
  getters: {
    forex(state) {
      if (process.browser) {
        return state.forex || JSON.parse(localStorage.getItem('forex'))
      }
    }
  },
  actions: {
    async getExchangeRate({ commit }, payload) {
      commit('setLoading', true)
      const response = await this.$api.$get(
        `query?function=CURRENCY_EXCHANGE_RATE&from_currency=${payload.from}&to_currency=${payload.to}&apikey=D9BR55WO8UNG2W47`
      )

      const exchangeRate = {
        from:
          response['Realtime Currency Exchange Rate']['1. From_Currency Code'],
        to: response['Realtime Currency Exchange Rate']['3. To_Currency Code'],
        fromFull:
          response['Realtime Currency Exchange Rate']['2. From_Currency Name'],
        toFull:
          response['Realtime Currency Exchange Rate']['4. To_Currency Name'],
        rate: response['Realtime Currency Exchange Rate']['5. Exchange Rate'],
        lastUpdated:
          response['Realtime Currency Exchange Rate']['6. Last Refreshed']
      }
      commit('addForex', exchangeRate)
      commit('setLoading', false)

      return exchangeRate
    }
  }
}
