<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    dataToDraw: {
      type: Object,
      default: null
    },
    options: { type: Object, default: null },
    label: { type: String, default: 'Chart Label' }
  },
  computed: {
    chartData() {
      return {
        labels: this.dataToDraw.labels,
        datasets: [
          {
            label: this.label,
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
