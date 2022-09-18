<template>
  <div>
    <div class="components-container">
      <!-- <aside><strong>SplitPane</strong> If you've used
      <a href="https://codepen.io/" target="_blank"> codepen</a>,
      <a href="https://jsfiddle.net/" target="_blank"> jsfiddle </a>will not be unfamiliar.
      <a href="https://github.com/PanJiaChen/vue-split-pane" target="_blank"> Github repository</a>
    </aside> -->
      <split-pane split="vertical" @resize="resize" :default-percent="70" :min-percent="25">
        <template slot="paneL">
          <div class="chart-container">
            <chart height="100%" width="100%" :female_data=female_data :male_data=male_data :avg_data=avg_data
              ref="child" />
          </div>
        </template>
        <template slot="paneR">
          <split-pane split="horizontal">
            <template slot="paneL">
              <div class="top-container">
                <div class="tab-container">
                  <div class="tab-icon">
                    <i class="el-icon-user" style="font-size: 64px;"></i>
                  </div>
                  <div class="tab-icon">
                    <i class="el-icon-user" style="font-size: 64px;"></i>
                  </div>
                  <div class="tab-icon">
                    <i class="el-icon-user" style="font-size: 64px;"></i>
                  </div>
                </div>
                <div class="data-filter">
                  <el-collapse accordion>
                    <el-collapse-item>
                      <template slot="title">
                        <h2>年级<i class="header-icon el-icon-info"></i></h2>
                        <el-tag style="margin-left: 10px;color: black;background-color: #fff;">标签二</el-tag>
                      </template>
                      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                    </el-collapse-item>
                    <el-collapse-item>
                      <template slot="title">
                        <h2>班级<i class="header-icon el-icon-info"></i></h2>
                        <el-tag type="success">标签二</el-tag>
                      </template>
                      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                    </el-collapse-item>
                    <el-collapse-item>
                      <template slot="title">
                        <h2>指标<i class="header-icon el-icon-info"></i></h2>
                        <el-tag type="success">标签二</el-tag>
                      </template>
                      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                    </el-collapse-item>
                  </el-collapse>

                </div>
              </div>
            </template>
            <template slot="paneR">
              <div class="bottom-container" />
            </template>
          </split-pane>
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

      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>
        <el-table-column align="center" label="" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级" width="95">
          <template slot-scope="scope">
            {{ scope.row.class }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="总得分" width="95">
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
export default {
  name: 'MixChart',
  components: { Chart, splitPane },
  data() {
    return {
      female_data: [
        709,
        1917,
        2455,
        2610,
        1719,
        1433,
        1544,
        3285,
        5208,
        3372,
        2484,
        4078
      ],
      male_data: [
        327,
        1776,
        507,
        1200,
        800,
        482,
        204,
        1390,
        1001,
        951,
        381,
        220
      ],
      avg_data: [
        1036,
        3693,
        2962,
        3810,
        2519,
        1915,
        1748,
        4675,
        6209,
        4323,
        2865,
        4298
      ],
      list: null,
      listLoading: false,
      downloadLoading: false,
      filename: '',
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
          total: 99,
          rate: 3.7,
          title: '1111111111111111111111111111111111111111111111111111'
        },
        {
          class: '初一1班',
          total: 99,
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
    }
  },
  created() {
    this.fetchData()
  },
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 89px);
}

.components-container {
  position: relative;
  height: calc(100vh - 90px);
  margin: 20px;
}

.table-container {
  margin: 20px;
}

.left-container {
  background-color: #F38181;
  height: 100%;
}

.right-container {
  background-color: #FCE38A;
  height: 200px;
}

.top-container {
  background-color: #FCE38A;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95E1D3;
  height: 100%;
}


.tab-container {
  width: 100%;
  height: 20%;
  background-color: #fff;
}

.data-filter {
  width: 100%;
  height: 80%;
  background-color: #F38181;
}

.tab-icon {
  width: 100px;
  height: 100%;
  display: flex;
  background-color: #ac9c5f;
  color: white;
  float: left;
  transition: all .7s;
}

.tab-icon i {
  margin: auto;
}

.tab-icon:hover {
  transform-style: preserve-3d;
  transition: all .7s;
  transform: rotateY(-180deg);
  background-color: white;
  color: #ac9c5f;
}
</style>

