<template>
  <div class="dashboard-view">
    <div class="top-bar">
      <div class="float-left logo">
        <img src="../assets/hedwig-logo.png" alt="">
      </div>
      <div class="float-right">
        <div class="dropdown float-right">
          <a class="btn btn-secondary btn-sm dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="../assets/icons/user-icon-pink.svg" style="width:20px;" alt="">
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
            <h6 class="dropdown-header">{{getUser}}</h6>
            <button class="dropdown-item" @click="signOut">Log Out</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <top-state title="Active Users" cardClass="card-icon user" footerTitle="Live user count" :value="activeUserData"
                 icon="user-icon.svg"></top-state>
      <top-state title="Downloads" cardClass="card-icon download" footerTitle="Total install count"
                 :value="downloadsData"
                 icon="download-icon.svg"></top-state>
      <top-state title="Avg. Session Duration" cardClass="card-icon watch" footerTitle="Total view count"
                 :value="sessionDurationsData"
                 icon="eye-icon.svg"></top-state>
      <top-state title="Paid Users" footerTitle="Total paying user count" cardClass="card-icon last"
                 :value="paidUsersData"
                 icon="download-icon.svg"></top-state>
    </div>
    <div class="row chart-view" v-if="chartUser">
      <line-chart-base chartTitle="Daily Active User" :dataVal="chartActiveUserData.val"
                       :dataLabel="chartActiveUserData.label"></line-chart-base>
    </div>
    <div class="row chart-view" v-if="chartInstall">
      <line-chart-base chartTitle="Daily Installs" :dataVal="chartDailyInstallsData.val"
                       :dataLabel="chartDailyInstallsData.label"></line-chart-base>
    </div>
  </div>
</template>

<script>
  import * as firebase from 'firebase/app'
  import 'firebase/auth'
  import TopState from '../components/TopState'
  import LineChartBase from '../components/LineChartBase'
  import { ActiveUserProxy } from '../proxies/ActiveUserProxy'
  import { DownloadsProxy } from '../proxies/DownloadsProxy'
  import { SessionDurationProxy } from '../proxies/SessionDurationProxy'
  import { PaidUsersProxy } from '../proxies/PaidUsersProxy'
  import { ChartDownloadsProxy } from '../proxies/ChartDownloadsProxy'
  import { ChartActiveUserProxy } from '../proxies/ChartActiveUserProxy'
  import { ChartTransformer } from '../transformers/ChartTransformer'
  import { Store, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Dashboard',
    components: {
      TopState,
      LineChartBase,
    },
    data () {
      return {
        chartActiveUserData: {},
        chartDailyInstallsData: {},
        userInterval: null,
        downloadsInterval: null,
        sessionInterval: null,
        paidUserInterval: null,
        chartUser: false,
        chartInstall: false,
        paidUsersData: '-',
        activeUserData: '-',
        sessionDurationsData: '-',
        downloadsData: '-',
        dataVal: [60, 40, 20, 50, 90, 10, 20, 40, 50, 70, 90, 100],
        dataLabel: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      }
    },
    created () {
      const getActiveUsersXhr = this.getActiveUsers()
      const getDownloadsXhr = this.getDownloads()
      const getSessionDurationXhr = this.getSessionDurations()
      const getPaidUsersXhr = this.getPaidUsers()
      const getChartActiveUsersXhr = this.getChartActiveUsers()
      const getChartDownloadsXhr = this.getChartDownloads()
      const xhrs = [
        getActiveUsersXhr,
        getDownloadsXhr,
        getSessionDurationXhr,
        getPaidUsersXhr,
        getChartActiveUsersXhr,
        getChartDownloadsXhr
      ]
      Promise.all(xhrs)
        .then(() => {
          this.userInterval = setInterval(() => {this.getActiveUsers()}, 10000)
          this.downloadsInterval = setInterval(() => {this.getDownloads()}, 10000)
          this.sessionInterval = setInterval(() => {this.getSessionDurations()}, 10000)
          this.paidUserInterval = setInterval(() => {this.getPaidUsers()}, 10000)
        })
    },
    methods: {
      ...mapActions('common', ['logOut']),
      getActiveUsers () {
        new ActiveUserProxy()
          .all()
          .then(response => {
            if (response) {
              this.activeUserData = response.payload.activeUsers.toString()
            }
          })
          .catch(_ => {
          })
      },
      getDownloads () {
        new DownloadsProxy()
          .all()
          .then(response => {
            this.downloadsData = response.payload.downloads.toString()
          })
          .catch(_ => {
          })
      },
      getSessionDurations () {
        new SessionDurationProxy()
          .all()
          .then(response => {
            this.sessionDurationsData = response.payload.avgSessionDuration.toFixed(2) + ' mins'
          })
          .catch(_ => {
          })
      },
      getPaidUsers () {
        new PaidUsersProxy()
          .all()
          .then(response => {
            this.paidUsersData = response.payload.paidUsers.toString()
          })
          .catch(_ => {
          })
      },
      getChartActiveUsers () {
        new ChartActiveUserProxy()
          .all()
          .then(response => {
            this.chartActiveUserData = ChartTransformer.fetch(response.payload.data)
            this.chartUser = true
          })
          .catch(_ => {
          })
      },
      getChartDownloads () {
        new ChartDownloadsProxy()
          .all()
          .then(response => {
            this.chartDailyInstallsData = ChartTransformer.fetch(response.payload.data)
            this.chartInstall = true
          })
          .catch(_ => {
          })
      },
      async signOut () {
        try {
          const userData = await this.logOut()
          if (userData) {
            clearInterval(this.userInterval)
            clearInterval(this.downloadsInterval)
            clearInterval(this.sessionInterval)
            clearInterval(this.paidUserInterval)
            this.$router.push({ name: 'login' })
          }
        } catch (e) {
          console.log(e.message)
        }
      }
    },
    computed: {
      ...mapGetters('common', ['getUser']),
    },
  }
</script>

<style lang="scss" src="../assets/style/Dashboard.scss"></style>

