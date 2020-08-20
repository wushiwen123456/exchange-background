<template>
  <div class="container" ref="main" :style="{width:width,height:height}"></div>
</template>

<script>
import echarts from 'echarts'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/dataZoom'
// import 'echarts/lib/component/dataZoomInside'
// import 'echarts/lib/component/dataZoomSlider'

export default {
  props: {
    autoSize: {
      type: Boolean,
      default() {
        return true
      },
    },
    width: {
      type: String,
      default() {
        return '100%'
      },
    },
    height: {
      type: String,
      default() {
        return '100%'
      },
    },
  },
  data() {
    return {
      myChart: '',
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.main)
  },
  methods: {
    setOptions(options) {
      this.myChart.setOption(options)
    },
  },
}
</script>

<style scoped>
</style>