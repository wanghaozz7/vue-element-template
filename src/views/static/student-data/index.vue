<template>
  <div class="container">
    <!-- 数据过滤 -->
    <div class="filter">
      <span>年级</span>
      <el-select v-model="filter.grade" filterable placeholder="请选择" style="margin: 30px 20px 30px 10px;width: 150px;"
        @change="refreshClass">
        <el-option v-for="item in filter.grade_range" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <span>班级</span>
      <el-select v-model="filter.Class" filterable placeholder="请选择" style="margin: 30px 20px 30px 10px;width: 150px;"
        @change="refreshStudent">
        <el-option v-for="item in filter.Class_range" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <span>学生</span>
      <el-select v-model="filter.student" filterable placeholder="请选择"
        style="margin: 30px 20px 30px 10px;width: 150px;">
        <el-option v-for="item in filter.student_range" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <span>一级指标</span>
      <el-select v-model="filter.target1" filterable placeholder="请选择" style="margin: 30px 20px 30px 10px;width: 300px;"
        @change="refreshSecond">
        <el-option v-for="item in filter.target1_range" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <span>二级指标</span>
      <el-select v-model="filter.target2" filterable placeholder="请选择"
        style="margin: 30px 20px 30px 10px;width: 300px;">
        <el-option-group v-for="group in filter.target2_range" :key="group.label" :label="group.label"
          v-show="group.label===selectedFirst||selectedFirst===''">
          <el-option v-for="item in group.options" :key="item" :label="item" :value="item">
          </el-option>
        </el-option-group>
      </el-select>
    </div>
    <div class="filter">
      <span>日期</span>
      <el-date-picker v-model="filter.date" type="daterange" align="center" unlink-panels range-separator="至"
        start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
        style="margin: 30px 10px 30px 10px;width: 500px;">
      </el-date-picker>
      <el-button type="primary" style="font-size: 16px;margin: 30px 10px;" @click="handleFilter"><i
          class="el-icon-search" style="margin-right: 10px;"></i>确定
      </el-button>
      <el-button type="info" style="font-size: 16px;margin: 30px 10px;" @click="refreshFilter"><i
          class="el-icon-refresh" style="margin-right: 10px;"></i>重置
      </el-button>
    </div>
    <!-- 图表 -->
    <div class="chart-container">
      <chart height="100%" width="100%" :chart_data="chart_data" ref="child" />
    </div>
    <!-- 表格 -->
    <div class="table-container">
      <div style="margin:0 0 20px calc(100% - 148px);">
        <el-button :loading="downloadLoading" type="primary" icon="el-icon-document" @click="handleDownload">
          Export Excel
        </el-button>
      </div>
      <el-table :data="table_data" border v-loading="listLoading" element-loading-text="Loading..." fit
        highlight-current-row :row-style="getSelected" :default-sort="{}">
        <el-table-column width="100" prop="date" label="日期" align="center" sortable />
        <el-table-column width="100" :label="item" v-for="(item,idx) in Targets" align="center"
          :sort-method="(a, b) => {return a[item.props] - b[item.props]}" sortable>
          <!-- <template slot="header">
            <span class="header_span" :style="{float:(item.length>=6?'left':'none')}">
              {{item}}
            </span>
          </template> -->
          <template slot-scope="scope">
            <span>{{scope.row.targets[idx]}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" prop="total" label="总分" align="center" sortable />
        <!-- <el-table-column width="100" prop="rank" label="排名" align="center" sortable /> -->
        <el-table-column min-width="300" prop="remark" label="备注" align="center" sortable />
      </el-table>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/DataFilter'
import { parseTime } from '@/utils'
export default {
  name: 'student-data',
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
      pickerOptions: null,
      selectedFirst: ''
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
      console.log(this.filter);
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
    },
    refreshSecond(obj) {//更新二级指标
      console.log(obj);
      this.selectedFirst = obj;
    },
    refreshClass(grade) {
      console.log(grade);
    },
    refreshStudent(Class) {
      console.log(Class);
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
        date: '2021-9-23',
        targets: [0, 0, 1, 0, 0, 0],
        rank: 2,
        total: 1,
        remark: ''
      },
      {
        date: '2020-9-22',
        targets: [0, -1, 1, 0, 0, 0],
        rank: 3,
        total: 0,
        remark: ''
      },
      {
        date: '1922-9-21',
        targets: [0, -1, 1, 0, 0, 0],
        rank: 4,
        total: 0,
        remark: ''
      },
      {
        date: '2000-9-20',
        targets: [0, -1, 0, 0, 0, 0],
        rank: 5,
        total: -1,
        remark: ''
      },
      {
        date: '2022-6-19',
        targets: [0, 0, 0, 0, 0, 0],
        rank: 6,
        total: 0,
        remark: ''
      },
      {
        date: '2022-7-18',
        targets: [0, 0, 1, 0, 0, 0],
        rank: 7,
        total: 1,
        remark: ''
      },
      {
        date: '2022-9-1',
        targets: [0, 0, 0, 0, 0, 0],
        rank: 9,
        total: 0,
        remark: ''
      },
      {
        date: '2022-9-16',
        targets: [0, 0, 0, 0, 0, 0],
        rank: 8,
        total: 0,
        remark: ''
      }
    ];
    this.filter = {
      grade: '',
      Class: '',
      student: '',
      target1: '',
      target2: '',
      date: '',
      grade_range: ['初一', '初二', '初三'],
      Class_range: ['1班', '2班', '3班', '4班', '5班', '6班', '7班', '8班'],
      student_range: ['小明', '小红', '小王', '张三', '李四', '王五'],
      target1_range: ['学风纪律', '仪表仪容', '两操', '宿舍检查', '环境卫生'],
      target2_range: [
        {
          label: '学风纪律',
          options: ['升旗仪式', '出勤', '日常违纪、学生安全违纪', '就餐违纪、外卖违纪']
        },
        {
          label: '两操',
          options: ['课间学生出勤', '课间班主任出勤', '课间质量']
        }
      ],
    };
    this.chart_data = {
      xData: ['1922-9-21', '2000-9-20', '2000-9-22', '2021-9-23', '2022-6-19', '2022-7-18', '2022-9-1', '2022-9-16', '2022-9-18', '2022-9-24', '2033-2-11', '2098-9-21'],
      yData: {
        choose: {
          label: '学生得分',
          data: [327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220]
        },
        avg: {
          label: '年级平均分',
          data: [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078]
        },
        max: {
          label: '年级最高分',
          data: [1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298]
        }
      },
      text: '小明',
      subText: '教室卫生',
      xLabel: '日期',
      yLabel: '得分'
    };
    this.Targets = ['讲啊实打实打算是谁少时诵诗书所所所所所所所说', '地板地板地地', '书柜', '走廊', '课桌', '窗户']
    this.pickerOptions = {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近两周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7 * 2);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7 * 3);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近两个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 2);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '半年内',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 6);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '一年内',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 12);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '两年内',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 12 * 2);
          picker.$emit('pick', [start, end]);
        }
      }]
    };
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
  height: auto;
  background-color: #fff;
  margin-bottom: 20px;
  padding-left: 20px;
}

.filter span {
  font-size: 18px;
}

.chart-container {
  width: 100%;
  height: 100vh;
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