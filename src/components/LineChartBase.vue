<template>
  <div class="col-md-6 col-lg-12">
    <div class="card-stats card">
      <div class="card-body">
        <div class="row">
          <div class="col-2">
            <div class="row chart-top">
              <div class="card-icon">
                <img src="../assets/icons/chart-bar-regular.svg" alt="">
              </div>
              <div class="chart-title text-left">
                <span class="card-title">{{chartTitle}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <line-chart :dataVal="dataVal" :dataLabel="dataLabel"></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
  import LineChart from './LineChart'

  export default {
    name: 'LineChartBase',
    components: { LineChart },
    comments: {
      LineChart
    },
    props: {
      chartTitle: {
        required: true,
        type: String,
      },
      dataLabel: {
        required: true,
        type: Array,
      },
      dataVal: {
        required: true,
        type: Array,
      },
    },
  }
</script>

<style scoped>

</style>
