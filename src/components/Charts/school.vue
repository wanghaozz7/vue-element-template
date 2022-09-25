


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
    setOption({ xData, yData, text, subText } = {}) {
      const data1 = [];//第一层数据
      const data2 = [];//第二层数据
      for (let idx in yData) {//数据处理
        const obj1 = {
          value: yData[idx].value,
          groupId: xData[idx],
          itemStyle: {
            color: 'yellowgreen'
          }
        };
        data1.push(obj1);
        const group = [];
        for (let item of yData[idx].group) {
          const tmp = [];
          tmp.push(item.label);
          tmp.push(item.value);
          group.push(tmp);
        }
        const obj2 = {
          dataGroupId: xData[idx],
          data: group
        }
        data2.push(obj2);
      }
      const option = {
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
        xAxis: {
          data: xData
        },
        yAxis: {},
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
            color: 'green'
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
              }
            },
            graphic: [
              {
                type: 'text',
                left: '180',
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
