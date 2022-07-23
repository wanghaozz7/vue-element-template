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
          item: '宿舍内务',
          content: '宿舍内务是否达到标准',
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