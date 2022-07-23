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
          item: '就餐违纪、外卖违纪',
          content: '学生就餐是否违纪，取、吃外卖是否合规',
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