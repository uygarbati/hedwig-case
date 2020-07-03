<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    props: {
      dataLabel: {
        required: true,
        type: Array,
      },
      dataVal: {
        required: true,
        type: Array,
      },
    },
    data () {
      return {
        gradient: null,
        datacollection: {
          labels: [],
          datasets: [
            {
              label: 'Data One',
              borderColor: "#be55ee",
              borderDash: [0, 0],
              backgroundColor: '',
              pointBackgroundColor: '#be55ee',
              borderWidth: 1,
              pointBorderColor: '#be55ee',
              data: [],
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.yLabel;
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      this.gradient.addColorStop(0, 'rgba(190, 85, 238, 0.45)')
      this.gradient.addColorStop(0.5, 'rgba(190, 85, 238, 0.10)');
      this.gradient.addColorStop(1, 'rgba(190, 85, 238, 0.05)');

      this.datacollection.datasets[0].backgroundColor = this.gradient
      this.datacollection.labels = this.dataLabel
      this.datacollection.datasets[0].data = this.dataVal
      this.renderChart(this.datacollection, this.options)
    }
  }
</script>
