<template>
  <div>
    <Score :tableData="tableData"></Score>
  </div>
</template>

<script>
import Score from '@/components/Score'
export default {
  name: '',
  components: {
    Score
  },
  data() {
    return {
      tableData: [
        {
          idx: 0,
          item: '晚修纪律',
          content: '学生晚修是否遵守纪律',
          score: 0,
          remark: '',
        }
      ],

    }
  }
};
</script>

<style scoped>
</style>