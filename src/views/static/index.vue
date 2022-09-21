<template>
  <div>
    <div class="components-container">
      <split-pane split="vertical" @resize="resize" :default-percent="75" :min-percent="25">
        <template slot="paneL">
          <div class="chart-container">
            <chart height="100%" width="100%" :chart_data="chart_data[data_idx]" ref="child" v-if="type==='0'" />
          </div>
        </template>
        <template slot="paneR">
          <!-- <split-pane split="horizontal" @resize="resize" :default-percent="80" :min-percent="15">
            <template slot="paneL">
              <div class="top-container">
                <div class="tab-container">
                  <tabIcon icon="el-icon-user" content="个人"></tabIcon>
                  <tabIcon icon="el-icon-school" content="班级"></tabIcon>
                  <tabIcon icon="el-icon-school" content="学校"></tabIcon>
                </div>
                <div class="data-filter">
                  <el-collapse accordion>
                    <el-collapse-item>
                      <template slot="title">
                        <h2 style="margin-left: 20px;">年级</h2>
                        <el-tag style="margin-left: 10px;color: #01847F;background-color: #F9D2E4;">{{checked_grade}}
                        </el-tag>
                      </template>
                      <selector :list=grade @checkedChange="handleGrade"></selector>
                    </el-collapse-item>
                    <el-collapse-item>
                      <template slot="title">
                        <h2 style="margin-left: 20px;">班级</h2>
                        <el-tag style="margin-left: 10px;color: #F8F5D6;background-color: #80D1C8;">{{checked_classed}}
                        </el-tag>
                      </template>
                      <selector :list=classes @checkedChange="handleClasses"></selector>
                    </el-collapse-item>
                    <el-collapse-item>
                      <template slot="title">
                        <h2 style="margin-left: 20px;">指标</h2>
                        <el-tag style="margin-left: 10px;color: #492D22;background-color: #D8C7B5;">{{checked_target}}
                        </el-tag>
                      </template>
                      <selector :list=target @checkedChange="handleTarget"></selector>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>
            </template>
             <template slot="paneR">
              <div class="bottom-container" />
            </template> -->
          <!-- </split-pane> -->
          <div class="top-container">
            <div class="tab-container">
              <tabIcon icon="el-icon-s-home" content="班级" id=0 @tabChange="tabChange"></tabIcon>
              <tabIcon icon="el-icon-user-solid" content="个人" id=1 @tabChange="tabChange"></tabIcon>
              <tabIcon icon="el-icon-school" content="学校" id=2 @tabChange="tabChange"></tabIcon>
            </div>
            <div class="data-filter">
              <el-collapse accordion>
                <el-collapse-item>
                  <template slot="title">
                    <h2 style="margin-left: 20px;">年级</h2>
                    <el-tag style="margin-left: 10px;color: #01847F;background-color: #F9D2E4;">{{checked_grade}}
                    </el-tag>
                  </template>
                  <selector :list=grade @checkedChange="handleGrade"></selector>
                </el-collapse-item>
                <el-collapse-item>
                  <template slot="title">
                    <h2 style="margin-left: 20px;">班级</h2>
                    <el-tag style="margin-left: 10px;color: #F8F5D6;background-color: #80D1C8;">{{checked_classed}}
                    </el-tag>
                  </template>
                  <selector :list=classes @checkedChange="handleClasses"></selector>
                </el-collapse-item>
                <el-collapse-item>
                  <template slot="title">
                    <h2 style="margin-left: 20px;">指标</h2>
                    <el-tag style="margin-left: 10px;color: #492D22;background-color: #D8C7B5;">{{checked_target}}
                    </el-tag>
                  </template>
                  <selector :list=target @checkedChange="handleTarget"></selector>
                </el-collapse-item>
                <el-collapse-item v-if="type==='1'">
                  <template slot="title">
                    <h2 style="margin-left: 20px;">学生</h2>
                    <el-tag style="margin-left: 10px;color: #492D22;background-color: #D8C7B5;">{{checked_target}}
                    </el-tag>
                  </template>
                  <selector :list=target @checkedChange="handleTarget"></selector>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </template>
      </split-pane>
    </div>
    <div class="table-container">
      <div>
        <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document"
          @click="handleDownload">
          Export Excel
        </el-button>
      </div>

      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row
        :default-sort="{prop: 'class', order: 'descending'}">
        <el-table-column align="center" label="" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级" width="95" sortable>
          <template slot-scope="scope">
            {{ scope.row.class }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="总得分" width="95" sortable>
          <template slot-scope="scope">
            {{ scope.row.total }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="评级" width="395">
          <template slot-scope="scope">
            <el-rate v-model=scope.row.rate disabled show-score text-color="#ff9900" score-template="3.7">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="Title">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>


</template>

<script>
import splitPane from 'vue-splitpane'
import Chart from '@/components/Charts/MixChart'
import { parseTime } from '@/utils'
import tabIcon from './component/tab-icon'
import selector from './component/selector'


const female_data = [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078];
const male_data = [327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220];
const avg_data = [1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298]
export default {
  name: 'MixChart',
  components: { Chart, splitPane, tabIcon, selector },

  data() {
    return {
      list: null,
      listLoading: false,
      downloadLoading: false,
      filename: '',
      checked: false,
      grade: ['初一', '初二', '初三'],
      classes: ['初一(1)班', '初一(2)班', '初一(3)班', '初一(4)班', '初一(5)班', '初一(6)班', '初一(7)班', '初一(8)班', '初一(9)班', '初一(10)班', '初一(11)班', '初一(12)班', '初一(13)班'],
      target: ['指标1', '指标2', '指标3', '指标4', '指标5'],
      checked_grade: '初一',
      checked_classed: '初一(1)班',
      checked_target: '指标1',
      chart_data: [
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
      ],
      data_idx: 0,
      type: '0'
    }
  },
  methods: {
    resize() {
      console.log('resize')
      this.$refs.child.resize()
    },
    fetchData() {
      this.list = [
        {
          class: '初一1班',
          total: 99,
          rate: 3.7,
          title: '1111111111111111111111111111111111111111111111111111'
        },
        {
          class: '初一1班',
          total: 98,
          rate: 3.7,
          title: '1111111111111111111111111111111111111111111111111111'
        },
        {
          class: '初一1班',
          total: 91,
          rate: 3.7,
          title: '1111111111111111111111111111111111111111111111111111'
        }
      ]
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel.js').then(excel => {
        const tHeader = ['Id', 'total', 'rate', 'title']
        const filterVal = ['Id', 'total', 'rate', 'title']
        const list = this.list
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
    handleGrade(e) {
      this.checked_grade = this.grade[e];
      this.data_idx = e;
    },
    handleClasses(e) {
      this.checked_classed = this.classes[e];
    },
    handleTarget(e) {
      this.checked_target = this.target[e];
    },
    formatter(row, column) {
      return row.address;
    },
    tabChange(idx) {
      console.log(idx);
      this.type = idx;
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      },
      immediate: true
    }
  }
}
</script>


<style scoped>
/* 图表容器 */
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 89px);
}

/* split-pane的固定容器 */
.components-container {
  position: relative;
  height: calc(100vh - 90px);
  margin: 20px;
}

/* 表格的容器 */
.table-container {
  margin: 20px;
}

/* 左侧 */
.left-container {
  height: 100%;
}

/* 右侧 */
.right-container {
  height: 200px;
}

/* 右侧顶部 */
.top-container {
  width: 100%;
  height: 100%;
}

/* 右侧底部 */
.bottom-container {
  width: 100%;
  background-color: #95E1D3;
  height: 100%;
}

.tab-container {
  width: 100%;
  height: 100px;
  background-color: #fff;
  display: flex;
  margin-bottom: 14px;
}

.tab-container div {
  margin: auto;
}

.data-filter {
  width: 100%;
  height: 80%;
  /* background-color: #F0F2F5; */
}
</style>

