<template>
  <div class="container">
    <div class="filter"></div>
    <div class="chart-container"></div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'
export default {
  name: '',
  components: {
    Chart
  },
  data() {
    return {
      chart_data: [
        {
          female_data: [70, 19, 24, 26, 17, 14, 15, 32, 58, 32, 84, 48],
          male_data: [37, 76, 50, 20, 80, 42, 24, 90, 11, 51, 81, 20],
          avg_data: [36, 69, 22, 10, 29, 15, 18, 75, 29, 43, 25, 48],
          x_data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          classes: '初一(1)班'
        },
        {
          female_data: [327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220],
          male_data: [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078],
          avg_data: [1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298],
          x_data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          classes: '初一(1)班'
        },
        {
          female_data: [1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298],
          male_data: [327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220],
          avg_data: [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078],
          x_data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          classes: '初一(1)班'
        }
      ],
    }
  }
};
</script>

<style scoped>
.container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
}

.filter {
  width: 100%;
  height: 100px;
  background-color: #fff;
  margin-bottom: 32px;
}

.chart-container {
  width: 100%;
  height: calc(100vh - 253px);
  background-color: #fff;
}
</style>