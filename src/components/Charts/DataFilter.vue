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
    setOption({ xData, yData, text, subText, xLabel, yLabel } = {}) {
      const option = {
        backgroundColor: ' #E5DDD7',
        title: {
          text: text,
          subtext: subText,
          x: '20',
          top: '20',
          textStyle: {
            color: 'black',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '18'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            },
            type: 'shadow'
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '7%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: [yData.choose.label, yData.avg.label, yData.max.label]
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          name: xLabel,
          nameLocation: 'end',
          nameTextStyle: {
            fontSize: 16,
            color: 'brown'
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            },
            type: 'shadow'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0,
            fontSize: 14
          },
          data: xData
        }],
        yAxis: [{
          type: 'value',
          name: yLabel,
          nameLocation: 'end',
          nameTextStyle: {
            fontSize: 16,
            color: 'brown',
            align: 'right'
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            fontSize: 16
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'
          },
          textStyle: {
            color: 'black'
          },
          borderColor: '#90979c'

        },
        {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: yData.choose.label,
          type: 'bar',
          // stack: 'total',
          barMaxWidth: 50,
          barGap: '12%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: yData.choose.data
        },
        {
          name: yData.avg.label,
          type: 'bar',
          // stack: 'total',
          barMaxWidth: 50,
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: yData.avg.data
        },
        {
          name: yData.max.label,
          type: 'line',
          // stack: 'total',
          symbolSize: 10,
          symbol: 'pin',
          itemStyle: {
            normal: {
              color: '#003153',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: yData.max.data
        }
        ]
      }
      const op = {
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
      }
      this.chart.setOption(option);
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
