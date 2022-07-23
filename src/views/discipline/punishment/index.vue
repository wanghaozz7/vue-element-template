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
          item: '接受处分',
          content: '学生是否接受过处分',
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