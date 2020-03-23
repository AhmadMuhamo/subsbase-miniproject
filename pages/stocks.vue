<template>
  <client-only>
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
            <v-btn @click="getStocks" :loading="loading" color="primary">
              Add Stock
            </v-btn>
            <v-btn @click="clearStocks" color="red">
              Remove Stocks
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <br />
      <v-flex row>
        <StockCard
          v-if="stocks"
          v-for="(stk, index) in stocks"
          :key="index"
          :stock="stk"
        />
      </v-flex>
      <div class="chart-container">
        <line-chart
          v-if="chartData.values.length > 2"
          :dataToDraw="chartData"
        ></line-chart>
        <div v-else>
          <h2>Add more stocks to view statistics</h2>
          <p>
            Due to API limitations (5 requests per minute) decreased the chart
            points to 3
          </p>
        </div>
      </div>
    </v-layout>
  </client-only>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import StockCard from '@/components/StockCard'
import LineChart from '@/components/LineChart'

export default {
  components: {
    StockCard,
    LineChart
  },
  data() {
    return {
      symbol: null,
      autoCompleteData: [],
      search: null,
      loadingData: false,
      stock: undefined,
      loading: false,
      chartData: {
        labels: [],
        values: []
      }
    }
  },
  computed: {
    ...mapGetters(['stocks'])
  },
  watch: {
    search(val) {
      if (val) {
        this.searchStocks()
      } else {
        this.autoCompleteData = []
      }
    },
    stocks: {
      immediate: true,
      handler(obj) {
        this.chartData = {
          labels: [],
          values: []
        }
        if (obj) {
          for (const stk in obj) {
            this.chartData.labels.push(obj[stk].symbol)
            this.chartData.values.push(obj[stk].prevClose)
          }
        }
      }
    }
  },
  async created() {
    if (!this.stocks || !Object.keys(this.stocks).length) {
      this.loading = true
      await this.fetchStocks('MSFT')
      this.loading = false
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
        this.loading = true
        this.stock = await this.fetchStocks(this.symbol)
        this.loading = false
      }
    },
    clearStocks() {
      this.$store.commit('removeStocks')
    }
  }
}
</script>
<style lang="scss">
.chart-container {
  background-color: #fff;
  width: 100%;
  margin-top: 2rem;
  div {
    color: #000;
    text-align: center;
    margin: 2rem auto;
  }
}
</style>
