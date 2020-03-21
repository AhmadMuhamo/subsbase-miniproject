<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          Enter the stock symbol below
        </v-card-title>
        <v-card-text>
          <!-- REMOVED DUE TO API LIMITATIONS 5 REQUESTS PER MINUTE -->
          <!-- <v-autocomplete
            v-model="symbol"
            :loading="loadingData"
            :items="autoCompleteData"
            :search-input.sync="search"
            prepend-icon="mdi-database-search"
          ></v-autocomplete> -->
          <v-text-field v-model="symbol"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="getStocks" :loading="loading" block color="primary">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <br />
    <v-flex row>
      <StockCard v-for="(stk, index) in stocks" :key="index" :stock="stk" />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import StockCard from '@/components/StockCard'

export default {
  components: {
    StockCard
  },
  data() {
    return {
      symbol: null,
      autoCompleteData: [],
      search: null,
      loadingData: false,
      stock: undefined
    }
  },
  computed: {
    ...mapGetters(['stocks', 'loading'])
  },
  watch: {
    search(val) {
      if (val) {
        this.searchStocks()
      } else {
        this.autoCompleteData = []
      }
    }
  },
  async created() {
    if (!Object.keys(this.stocks).length) {
      await this.fetchStocks('MSFT')
    }
  },
  methods: {
    ...mapActions(['searchSymbols', 'fetchStocks']),
    async searchStocks() {
      this.loadingData = true
      const response = await this.searchSymbols(this.search)
      this.loadingData = false
      this.autoCompleteData = response.map((obj) => obj['1. symbol'])
    },
    async getStocks() {
      if (this.symbol) {
        this.stock = await this.fetchStocks(this.symbol)
      }
    }
  }
}
</script>
