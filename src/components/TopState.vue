<template>
  <div class="col-md-6 col-lg-3">
    <div class="card-stats card">
      <div class="card-body">
        <div class="row">
          <div class="col-5">
            <div :class="cardClass">
              <img :src="getImgUrl(icon)" alt="">
            </div>
          </div>
          <div class="col-7">
            <div class="numbers text-right">
              <p class="card-category">{{title}}</p>
              <h3 class="card-title">{{value}}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="stats">
          <img src="../assets/icons/refresh-icon.svg" alt="">
          {{footerTitle}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopState',
    props: {
      cardClass: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      footerTitle: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      }
    },
    methods: {
      getImgUrl (iconName) {
        let images = require.context('../assets/icons/', false, /\.svg$/)
        return images('./' + iconName)
      }
    }
  }
</script>

<style scoped>

</style>
