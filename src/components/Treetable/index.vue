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
        return [
          // {
          //   target1: '学风纪律',
          //   target2: '升旗仪式',
          //   target3: ''
          // }, {
          //   target1: '学风纪律',
          //   target2: '出勤',
          //   target3: ''
          // }, {
          //   target1: '学风纪律',
          //   target2: '日常违纪、学生安全违纪',
          //   target3: ''
          // }, {
          //   target1: '学风纪律',
          //   target2: '就餐违纪、外卖违纪',
          //   target3: ''
          // }, {
          //   target1: '学风纪律',
          //   target2: '交心里委员晴雨表',
          //   target3: ''
          // }, {
          //   target1: '学风纪律',
          //   target2: '学生检查晚修纪律',
          //   target3: ''
          // }, {
          //   target1: '学风纪律',
          //   target2: '接受处分',
          //   target3: ''
          // },
          // {
          //   target1: '学风纪律',
          //   target2: '课堂班务日志上交',
          //   target3: ''
          // },
          // //学风纪律
          // {
          //   target1: '仪容仪表',
          //   target2: '发型、校服、校卡、首饰',
          //   target3: '发型'
          // }, {
          //   target1: '仪容仪表',
          //   target2: '发型、校服、校卡、首饰',
          //   target3: '校服'
          // }, {
          //   target1: '仪容仪表',
          //   target2: '发型、校服、校卡、首饰',
          //   target3: '装扮'
          // },
          // //仪容仪表
          // {
          //   target1: '两操',
          //   target2: '课间学生出勤',
          //   target3: ''
          // }, {
          //   target1: '两操',
          //   target2: '课间班主任出勤',
          //   target3: ''
          // }, {
          //   target1: '两操',
          //   target2: '课间质量',
          //   target3: ''
          // }, {
          //   target1: '两操',
          //   target2: '眼保健操',
          //   target3: ''
          // },
          // //两操
          // {
          //   target1: '宿舍检查',
          //   target2: '纪律',
          //   target3: ''
          // },
          // {
          //   target1: '宿舍检查',
          //   target2: '内务',
          //   target3: ''
          // },
          // //宿舍检查
          // {
          //   target1: '环境卫生',
          //   target2: '公共卫生',
          //   target3: ''
          // },
          // {
          //   target1: '环境卫生',
          //   target2: '常规卫生(学生会检查)',
          //   target3: ''
          // },
          // {
          //   target1: '环境卫生',
          //   target2: '教学楼日常卫生检查',
          //   target3: ''
          // },
          // {
          //   target1: '环境卫生',
          //   target2: '垃圾分类',
          //   target3: ''
          // }
        ]
      }
    },
    treeCount: {
      type: Array,
      default() {
        return [
          {
            col_1: 8,
            col_2: -1
          }, {
            col_1: 3,
            col_2: 3
          }, {
            col_1: 4,
            col_2: -1
          }, {
            col_1: 2,
            col_2: -1
          }, {
            col_1: 4,
            col_2: -1
          }]
      }
    }
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {//一级指标
        if (rowIndex === 0) {
          return [this.treeCount[0].col_1, 1];
        } else if (rowIndex === this.treeCount[0].col_1) {
          return [this.treeCount[1].col_1, 1];
        } else if (rowIndex === (this.treeCount[0].col_1 + this.treeCount[1].col_1)) {
          return [this.treeCount[2].col_1, 1];
        } else if (rowIndex === (this.treeCount[0].col_1 + this.treeCount[1].col_1 + this.treeCount[2].col_1)) {
          return [this.treeCount[3].col_1, 1];
        } else if (rowIndex === (this.treeCount[0].col_1 + this.treeCount[1].col_1 + this.treeCount[2].col_1 + this.treeCount[3].col_1)) {
          return [this.treeCount[4].col_1, 1];
        } else {
          return [0, 0];
        }
      } else if (columnIndex === 1) {//二级指标
        if (rowIndex === this.treeCount[0].col_1) {
          return [this.treeCount[1].col_2, 1]
        }
        else if (rowIndex === this.treeCount[0].col_1 + 1 || rowIndex === this.treeCount[0].col_1 + 2) {
          return [0, 0];
        }
      }
    }
  }
};
</script>

<style scoped>
</style>