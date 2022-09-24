<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    chart_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.setOption(this.chart_data)
    },
    setOption({ _rawData } = {}) {
      this.chart.setOption({
        backgroudColor: '#fff',
        global: {
          show: true
        },
        title: {
          x: '20%',
          top: '20%',
          textStyle: {
            color: 'rgb(240, 242, 245)',
            fontSize: '22'
          },
          text: '年级数据',
          subtext: '111'
        },
        xAxis: {
          type: 'category',
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        series: [
          {
            name: '初一一班',
            data: [70, 19, 24, 26, 17, 14, 15, 32, 58, 32, 84, 48],
            type: 'line',
            smooth: true
          },
          {
            name: '年级平均分',
            data: [37, 76, 50, 20, 80, 42, 24, 90, 11, 51, 81, 20],
            type: 'line',
            smooth: true
          },
          {
            name: '年级最高分',
            data: [36, 69, 22, 10, 29, 15, 18, 75, 29, 43, 25, 48],
            type: 'line',
            smooth: true
          }
        ],
        legend: {
          x: '15%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['初一一班', '年级平均分', '年级最高分']
        }
      })
    }
  },
  watch: {
    chart_data: {
      deep: true,
      handler(val) {
        console.log(val);
        this.setOption(val);
      }
    }
  }
}
</script>
