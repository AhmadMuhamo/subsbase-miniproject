<template>
  <v-card color="primary" class="stock-card mx-2" raised>
    <v-card-text>
      <div class="stock-details_open">
        <span :class="stockOpenClass(stock)">
          {{ stock.prevClose }}
        </span>
      </div>
      <div class="stock-details_data">
        <span> <strong>Open:</strong> {{ stock.open }} </span>
        <span> <strong>Close:</strong> {{ stock.prevClose }} </span>
        <span> <strong>High:</strong> {{ stock.high }} </span>
        <span> <strong>Low:</strong> {{ stock.low }} </span>
        <span> <strong>Volume:</strong> {{ stock.volume }} </span>
      </div>
    </v-card-text>
    <v-spacer />
    <v-divider />
    <v-card-title class="headline">
      {{ stock.symbol }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'StockCard',
  props: {
    stock: {
      required: true,
      type: Object
    }
  },
  methods: {
    stockOpenClass(stk) {
      return stk.prevClose > stk.open
        ? 'green-text'
        : stk.prevClose < stk.open
        ? 'red-text'
        : ''
    }
  }
}
</script>

<style lang="scss">
.stock-card {
  .v-card__text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    .stock-details_open,
    .stock-details_data {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stock-details_open {
      span {
        font-size: 1.5rem;
        font-weight: 700;
        &.green-text {
          color: green;
        }
        &.red-text {
          color: red;
        }
      }
    }
    .stock-details_data {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 1rem;
    }
  }
  .v-card__title {
    justify-content: center;
  }
}
</style>
