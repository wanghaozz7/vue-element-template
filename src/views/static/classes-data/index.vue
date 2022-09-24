<template>
  <div class="container">
    <!-- 数据过滤 -->
    <div class="filter">
      <span>年级</span>
      <el-select v-model="filter.grade" filterable placeholder="请选择" style="margin: 30px 20px 30px 10px;width: 120px;">
        <el-option v-for="item in filter.grade_range" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <span>班级</span>
      <el-select v-model="filter.Class" filterable placeholder="请选择" style="margin: 30px 20px 30px 10px;width: 120px;">
        <el-option v-for="item in filter.Class_range" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <span>指标</span>
      <el-select v-model="filter.target" filterable placeholder="请选择" style="margin: 30px 20px 30px 10px;width: 250px;">
        <el-option-group v-for="group in filter.target_range" :key="group.label" :label="group.label">
          <el-option v-for="item in group.options" :key="item" :label="item" :value="item">
          </el-option>
        </el-option-group>
      </el-select>
      <span>日期</span>
      <el-select v-model="filter.date" filterable placeholder="请选择" style="margin: 30px 20px 30px 10px;width: 150px;">
        <el-option-group v-for="group in filter.date_range" :key="group.label" :label="group.label">
          <el-option v-for="item in group.options" :key="item" :label="item" :value="item">
          </el-option>
        </el-option-group>
      </el-select>
      <el-button type="primary" style="font-size: 16px;" @click="handleFilter"><i class="el-icon-search"
          style="margin-right: 10px;"></i>确定
      </el-button>
      <el-button type="info" style="font-size: 16px;" @click="refreshFilter"><i class="el-icon-refresh"
          style="margin-right: 10px;"></i>重置
      </el-button>
    </div>
    <!-- 图表 -->
    <div class="chart-container">
      <chart height="100%" width="100%" :chart_data="chart_data[0]" ref="child" />
    </div>
    <!-- 表格 -->
    <div class="table-container">
      <div style="margin:0 0 20px calc(100% - 148px);">
        <el-button :loading="downloadLoading" type="primary" icon="el-icon-document" @click="handleDownload">
          Export Excel
        </el-button>
      </div>
      <el-table :data="table_data" border v-loading="listLoading" element-loading-text="Loading..." fit
        highlight-current-row :row-style="getSelected">
        <el-table-column width="120" prop="Class" label="日期" align="center" />
        <el-table-column width="135" v-for="(item,idx) in Targets" align="center"
          :sort-method="(a, b) => {return a[item.props] - b[item.props]}" sortable>
          <template slot="header">
            <span class="header_span" :style="{float:(item.length>=6?'left':'none')}">
              {{item}}
            </span>
          </template>
          <template slot-scope="scope">
            <span>{{scope.row.targets[idx]}}</span>
          </template>
        </el-table-column>
        <el-table-column width="135" prop="total" label="总分" align="center" sortable />
        <el-table-column width="120" prop="rank" label="排名" align="center" sortable />
        <el-table-column min-width="300" prop="remark" label="备注" align="center" sortable />
      </el-table>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'
import { parseTime } from '@/utils'
export default {
  name: 'classed-data',
  components: {
    Chart
  },
  data() {
    return {
      chart_data: null,
      table_data: null,
      Targets: null,
      listLoading: false,
      downloadLoading: false,
      filename: '',
      filter: null,
    }
  },
  methods: {
    // 导出Excel
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel.js').then(excel => {
        const tHeader = ['班级', '指标', '合计', '备注', '日期']
        // tHeader.push.apply(tHeader, this.Targets);
        const filterVal = ['Class', 'targets', 'total', 'remark', 'date'];
        const list = this.table_data
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleFilter() {//过滤数据
      console.log(this.filter.grade, this.filter.Class, this.filter.target, this.filter.date);
      //更新表单数据
      //更新图表数据
    },
    refreshFilter() {//重置过滤器
      this.filter.grade = '';
      this.filter.Class = '';
      this.filter.target = '';
      this.filter.date = '';
    },
    getSelected({ row, rowIndex }) {//高亮选中列
      // if (row.label === this.filter.grade + this.filter.Class) return { 'background-color': 'red' };
      // return null;
    }
  },
  created() {
    //初始化数据
    this.table_data = [
      {
        date: '2022-9-24',
        targets: [0, 0, 1, 0, 0, 0],
        rank: 1,
        total: 1,
        remark: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
      },
      {
        date: '2022-9-24',
        targets: [0, 0, 1, 0, 0, 0],
        rank: 2,
        total: 1,
        remark: ''
      },
      {
        date: '2022-9-24',
        targets: [0, -1, 1, 0, 0, 0],
        rank: 3,
        total: 0,
        remark: ''
      },
      {
        date: '2022-9-24',
        targets: [0, -1, 1, 0, 0, 0],
        rank: 4,
        total: 0,
        remark: ''
      },
      {
        date: '2022-9-24',
        targets: [0, -1, 0, 0, 0, 0],
        rank: 5,
        total: -1,
        remark: ''
      },
      {
        date: '2022-9-24',
        targets: [0, 0, 0, 0, 0, 0],
        rank: 6,
        total: 0,
        remark: ''
      },
      {
        date: '2022-9-24',
        targets: [0, 0, 1, 0, 0, 0],
        rank: 7,
        total: 1,
        remark: ''
      },
      {
        date: '2022-9-24',
        targets: [0, 0, 0, 0, 0, 0],
        rank: 9,
        total: 0,
        remark: ''
      },
      {
        date: '2022-9-24',
        targets: [0, 0, 0, 0, 0, 0],
        rank: 8,
        total: 0,
        remark: ''
      }
    ];
    this.filter = {
      grade: '',
      Class: '',
      target: '',
      date: '',
      grade_range: ['初一', '初二', '初三'],
      Class_range: ['1班', '2班', '3班', '4班', '5班', '6班', '7班', '8班'],
      target_range: [
        {
          label: '学风纪律',
          options: ['升旗仪式', '出勤', '日常违纪、学生安全违纪', '就餐违纪、外卖违纪']
        },
        {
          label: '两操',
          options: ['课间学生出勤', '课间班主任出勤', '课间质量']
        }
      ],
      date_range: [{
        label: '一周内',
        options: ['9-22', '9-21', '9-18']
      },
      {
        label: '两周内',
        options: ['9-14', '9-12', '9-10']
      }]
    };
    this.chart_data = [
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
    ];
    this.Targets = ['讲啊实打实打算是谁少时诵诗书所所所所所所所说', '地板地板地地', '书柜', '走廊', '课桌', '窗户']
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
  padding-left: 20px;
}

.filter span {
  font-size: 18px;
}

.chart-container {
  width: 100%;
  height: calc(100vh - 253px);
  background-color: #fff;
  margin-bottom: 32px;
}

.table-container {
  width: 100%;
  background-color: #fff;
  height: auto;
  padding: 20px;
}

.header_span {
  width: auto;
  max-width: 89px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 34px;
}

.selectRow {
  background-color: red;
}
</style>