<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    dataToDraw: {
      type: Object,
      default: null
    },
    options: { type: Object, default: null }
  },
  computed: {
    chartData() {
      return {
        labels: this.dataToDraw.labels,
        datasets: [
          {
            label: 'Stocks',
            backgroundColor: '#1976d2',
            data: this.dataToDraw.values
          }
        ]
      }
    }
  },
  mounted() {
    const options = {
      responsive: true,
      maintainAspectRatio: false
    }
    this.renderChart(this.chartData, this.option || options)
  }
}
</script>

<style></style>
