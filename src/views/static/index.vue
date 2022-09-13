<template>
  <div id="myChart" :style="{ width: '800px', height: '500px' }"></div>
</template>
 
<script>
export default {
  name: "Pc2FbEcharts",

  data() {
    return {};
  },

  mounted() {
    this.drawLine();
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "全校分班人数统计",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          top: "10%",
          left: "center",
        },
        color: ['#6eb158', '#cdcdcd', '#3f8cff'],
        series: [
          {
            name: "分班情况",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "已分班人数" },
              { value: 735, name: "未分班人数" },
              { value: 580, name: "待认定人数" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}:}{c}  {per|{d}%}  ",
              backgroundColor: "",
              borderColor: "",
              borderWidth: 1,
              borderRadius: 4,
              rich: {},
            },
          },
        ],
      });
    },
  },
};
</script>