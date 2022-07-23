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
          item: '发型',
          content: '发型是否满足学生要求',
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