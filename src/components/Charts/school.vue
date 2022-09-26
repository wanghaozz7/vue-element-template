


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
    setOption({ xData, yData, text, subText, childLabel } = {}) {
      const data1 = [];//第一层数据
      const data2 = [];//第二层数据
      for (let idx in yData) {//数据处理
        const obj1 = {
          value: yData[idx].value,
          groupId: xData[idx],
        };
        data1.push(obj1);
        const group = [];
        for (let index in yData[idx].group) {
          const tmp = [];
          tmp.push(childLabel[index]);
          tmp.push(yData[idx].group[index]);
          group.push(tmp);
        }
        const obj2 = {
          dataGroupId: xData[idx],
          data: group
        }
        data2.push(obj2);
      }
      const option = {
        backgroundColor: '#F8F5D6',
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
            type: 'none'
          }
        },
        xAxis: {
          type: 'category',
          name: '班级',
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
            fontSize: 16
          },
          data: xData,
        },
        yAxis: {
          type: 'value',
          name: '得分',
          nameLocation: 'end',
          nameTextStyle: {
            fontSize: 16,
            color: 'brown',
            align: 'left'
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
        },
        dataGroupId: '',
        animationDurationUpdate: 500,
        series: {
          type: 'bar',
          id: 'sales',
          data: data1,
          universalTransition: {
            enabled: true,
            divideShape: 'clone'
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
        }
      };
      const drilldownData = data2;
      let c = this.chart;
      this.chart.on('click', function (event) {
        if (event.data) {
          var subData = drilldownData.find(function (data) {
            return data.dataGroupId === event.data.groupId;
          });
          if (!subData) {
            return;
          }
          c.setOption({
            xAxis: {
              data: subData.data.map(function (item) {
                return item[0];
              })
            },
            series: {
              type: 'bar',
              id: 'sales',
              dataGroupId: subData.dataGroupId,
              data: subData.data.map(function (item) {
                return item[1];
              }),
              universalTransition: {
                enabled: true,
                divideShape: 'clone'
              },
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            graphic: [
              {
                type: 'text',
                left: '200',
                top: '25',
                style: {
                  text: '返回',
                  fontSize: 24,
                },
                onclick: function () {
                  c.setOption(option);
                }
              }
            ],
            title: {
              text: event.data.groupId,
            }
          });
        }
      });
      this.chart.setOption(option)
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
