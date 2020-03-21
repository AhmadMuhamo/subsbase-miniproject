import Vue from 'vue'
import Vuex from 'vuex'
import stocks from './stocks'
import forex from './forex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    stocks,
    forex
  }
})

export default () => {
  return store
}
