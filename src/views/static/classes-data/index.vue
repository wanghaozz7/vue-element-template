<template>
  <div class="container">
    <div class="filter">
      <span>年级</span>
      <el-select v-model="filter.grade" filterable placeholder="请选择" style="margin: 30px 20px 30px 10px;">
        <el-option v-for="item in filter.grade_range" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <span>班级</span>
      <el-select v-model="filter.Class" filterable placeholder="请选择" style="margin: 30px 20px 30px 10px;">
        <el-option v-for="item in filter.Class_range" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <span>指标</span>
      <el-select v-model="filter.target" filterable placeholder="请选择" style="margin: 30px 20px 30px 10px;">
        <el-option v-for="item in filter.target_range" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="chart-container">
      <chart height="100%" width="100%" :chart_data="chart_data[0]" ref="child" />
    </div>
    <div class="table-container">
      <div>
        <el-button :loading="downloadLoading" style="margin:0 0 20px 0;" type="primary" icon="el-icon-document"
          @click="handleDownload">
          Export Excel
        </el-button>
      </div>
      <el-table :data="table_data" border v-loading="listLoading" element-loading-text="Loading..." fit
        highlight-current-row>
        <el-table-column prop="Class" label="班级" width="150" align="center" />
        <el-table-column :label=item width="80" v-for="(item,idx) in Targets" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.targets[idx]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="总分" width="80" align="center" />
        <el-table-column prop="rank" label="排名" width="80" align="center" />
        <el-table-column prop="" label="备注" min-width="400" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'
import { parseTime } from '@/utils'
export default {
  name: '',
  components: {
    Chart
  },
  data() {
    return {
      chart_data: null,
      table_data: null,
      Targets: ['讲台', '地板', '书柜', '走廊', '课桌', '窗户'],
      listLoading: false,
      downloadLoading: false,
      filename: '',
      filter: null,
    }
  },
  methods: {
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
    }
  },
  created() {
    //初始化数据
    this.table_data = [
      {
        Class: '初一(1)班',
        targets: [0, 0, 1, 0, 0, 0],
        rank: 1,
        total: 1,
        remark: '',
        date: ''
      },
      {
        Class: '初一(2)班',
        targets: [0, 0, 1, 0, 0, 0],
        rank: 2,
        total: 1,
        remark: '',
        date: ''
      },
      {
        Class: '初一(3)班',
        targets: [0, -1, 1, 0, 0, 0],
        rank: 3,
        total: 0,
        remark: '',
        date: ''
      },
      {
        Class: '初一(4)班',
        targets: [0, -1, 1, 0, 0, 0],
        rank: 4,
        total: 0,
        remark: '',
        date: ''
      },
      {
        Class: '初一(5)班',
        targets: [0, -1, 0, 0, 0, 0],
        rank: 5,
        total: -1,
        remark: '',
        date: ''
      },
      {
        Class: '初一(6)班',
        targets: [0, 0, 0, 0, 0, 0],
        rank: 6,
        total: 0,
        remark: '',
        date: ''
      },
      {
        Class: '初一(7)班',
        targets: [0, 0, 1, 0, 0, 0],
        rank: 7,
        total: 1,
        remark: '',
        date: ''
      },
      {
        Class: '初一(8)班',
        targets: [0, 0, 0, 0, 0, 0],
        rank: 9,
        total: 0,
        remark: '',
        date: ''
      },
      {
        Class: '初一(9)班',
        targets: [0, 0, 0, 0, 0, 0],
        rank: 8,
        total: 0,
        remark: '',
        date: ''
      }
    ];
    this.filter = {
      grade: '',
      Class: '',
      target: '',
      grade_range: ['初一', '初二', '初三'],
      Class_range: ['1班', '2班', '3班', '4班', '5班', '6班', '7班', '8班'],
      target_range: ['仪容仪表', '教室卫生', '公共教室卫生']
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
</style>