<template>
  <div>
    <el-table :data="tableData" :span-method="arraySpanMethod" border style="width: 100%;" height="85vh">
      <el-table-column prop="target1" label="一级指标" width="180">
      </el-table-column>
      <el-table-column prop="target2" label="二级指标">
      </el-table-column>
      <el-table-column prop="target3" label="三级指标">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'TreeTable',
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    treeCount: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {//一级指标
        let count = 0;
        for (let item of this.treeCount) {
          let col = item.col_1;
          if (rowIndex === count) return [col, 1];//合并扩容
          for (let i = count + 1; i < count + col; i++) {//合并删除
            if (rowIndex === i) return [0, 0];
          }
          count += col;
        }
      } else if (columnIndex === 1) {//二级指标
        let count = 0;
        for (let item1 of this.treeCount) {
          for (let item2 of item1.col_2) {
            if (item2 !== 1) {
              if (rowIndex === count) return [item2, 1];
              for (let i = count + 1; i < count + item2; i++) {
                if (rowIndex === i) return [0, 0];
              }
              count += item2;
            } else {
              count += 1;
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped>
</style>