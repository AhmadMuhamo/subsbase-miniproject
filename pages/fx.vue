<template>
  <client-only>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <v-card>
          <v-card-title class="headline">
            Enter the currency pair
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="currencyFrom"
              placeholder="Currency From"
            ></v-text-field>
            <v-text-field
              v-model="currencyTo"
              placeholder="Currency To"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="addForex" :loading="loading" color="primary" block>
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <br />
      <v-simple-table v-if="forex">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">From</th>
              <th class="text-center">To</th>
              <th class="text-center">Exchange Rate</th>
              <th class="text-center">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(fx, i) in forex" :key="i">
              <td>{{ fx.from }}</td>
              <td>{{ fx.to }}</td>
              <td>{{ fx.rate }}</td>
              <td>{{ fx.lastUpdated }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-layout>
  </client-only>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {},
  data() {
    return {
      currencyFrom: null,
      currencyTo: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['forex'])
  },
  async created() {
    if (!this.forex || !Object.keys(this.forex).length) {
      this.loading = true
      await this.getExchangeRate({
        from: 'USD',
        to: 'EGP'
      })
      this.loading = false
    }
  },
  methods: {
    ...mapActions(['getExchangeRate']),
    async addForex() {
      await this.getExchangeRate({
        from: this.currencyFrom,
        to: this.currencyTo
      })
    }
  }
}
</script>
