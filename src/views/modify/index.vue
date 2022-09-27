<template>
  <div id="container">
    <!-- 操作栏 -->
    <div style="margin-bottom: 20px;">
      <!-- 权限开关 -->
      <!-- <el-tooltip :content="'开放自由打分权限: ' + jurisdiction" placement="top">
        <el-switch v-model="jurisdiction" active-color="#FF770F" inactive-color="#80D1C8" active-value="是"
          inactive-value="否">
        </el-switch>
      </el-tooltip> -->
      <!-- 恢复 -->
      <el-button type="info" style="font-size: 16px;margin-left: calc(100% - 211px);" @click="recovery"><i
          class="el-icon-refresh" style="margin-right: 10px;"></i>恢复
      </el-button>
      <!-- 提交 -->
      <el-button type="primary" style="font-size: 16px;" @click="submit"><i class="el-icon-search"
          style="margin-right: 10px;"></i>提交
      </el-button>
    </div>
    <!-- 修改表格 -->
    <el-table :data="tableData" row-key="id" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      default-expand-all>
      <!-- 指标名 -->
      <el-table-column label="指标" width="250" header-align="center">
        <template slot-scope="scope">
          <el-popover placement="right" width="350" trigger="click" :ref="`popover1-${scope.row.id}`">
            <div style="float: left;width: 250px;">
              <el-input v-model="label_edit" placeholder="修改后"
                @keyup.enter.native="scope._self.$refs[`popover1-${scope.row.id}`].doClose();handleEdit(scope.row.level,scope.row.id,0)">
              </el-input>
            </div>
            <div style="float: left;">
              <el-button type="primary" icon="el-icon-check" style="margin-left: 14px;"
                @click="scope._self.$refs[`popover1-${scope.row.id}`].doClose();handleEdit(scope.row.level,scope.row.id,0)">
              </el-button>
            </div>
            <span class="edit_span" slot="reference" @click="clean_edit">{{scope.row.label}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 检查内容 -->
      <el-table-column label="检查内容" min-width="180" align="center">
        <template slot-scope="scope">
          <el-popover placement="top" width="750" trigger="click" :ref="`popover2-${scope.row.id}`">
            <div style="float: left;width: 652px;">
              <el-input v-model="content_edit" placeholder="修改后"
                @keyup.enter.native="scope._self.$refs[`popover2-${scope.row.id}`].doClose();handleEdit(scope.row.level,scope.row.id,1)">
              </el-input>
            </div>
            <div style="float: left;">
              <el-button type="primary" icon="el-icon-check" style="margin-left: 14px;"
                @click="scope._self.$refs[`popover2-${scope.row.id}`].doClose();handleEdit(scope.row.level,scope.row.id,1)">
              </el-button>
            </div>
            <span class="edit_span" slot="reference" @click="clean_edit()">{{scope.row.content}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 默认值 -->
      <el-table-column label="默认值" align="center" width="70">
        <template slot-scope="scope">
          <el-popover placement="top" width="280" trigger="click" :ref="`popover3-${scope.row.id}`">
            <div style="float: left;width: 180px;">
              <el-input-number v-model="default_edit">
              </el-input-number>
            </div>
            <div style="float: left;">
              <el-button type="primary" icon="el-icon-check" style="margin-left: 14px;"
                @click="scope._self.$refs[`popover3-${scope.row.id}`].doClose();handleEdit(scope.row.level,scope.row.id,2)">
              </el-button>
            </div>
            <span class="edit_span" slot="reference" @click="clean_edit">{{scope.row.default_value}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 步长 -->
      <el-table-column label="步长" align="center" width="70">
        <template slot-scope="scope">
          <el-popover placement="top" width="280" trigger="click" :ref="`popover4-${scope.row.id}`">
            <div style="float: left;width: 180px;">
              <el-input-number v-model="step_edit">
              </el-input-number>
            </div>
            <div style="float: left;">
              <el-button type="primary" icon="el-icon-check" style="margin-left: 14px;"
                @click="scope._self.$refs[`popover4-${scope.row.id}`].doClose();handleEdit(scope.row.level,scope.row.id,3)">
              </el-button>
            </div>
            <span class="edit_span" slot="reference" @click="clean_edit">{{scope.row.step}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 最大值 -->
      <el-table-column label="最大值" align="center" width="70">
        <template slot-scope="scope">
          <el-popover placement="top" width="280" trigger="click" :ref="`popover5-${scope.row.id}`">
            <div style="float: left;width: 180px;">
              <el-input-number v-model="max_edit"></el-input-number>
            </div>
            <div style="float: left;">
              <el-button type="primary" icon="el-icon-check" style="margin-left: 14px;"
                @click="scope._self.$refs[`popover5-${scope.row.id}`].doClose();handleEdit(scope.row.level,scope.row.id,4)">
              </el-button>
            </div>
            <span class="edit_span" slot="reference" @click="clean_edit">{{scope.row.max}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 最小值 -->
      <el-table-column label="最小值" align="center" width="70">
        <template slot-scope="scope">
          <el-popover placement="top" width="280" trigger="click" :ref="`popover6-${scope.row.id}`">
            <div style="float: left;width: 180px;">
              <el-input-number v-model="min_edit"></el-input-number>
            </div>
            <div style="float: left;">
              <el-button type="primary" icon="el-icon-check" style="margin-left: 14px;"
                @click="scope._self.$refs[`popover6-${scope.row.id}`].doClose();handleEdit(scope.row.level,scope.row.id,5)">
              </el-button>
            </div>
            <span class="edit_span" slot="reference" @click="clean_edit">{{scope.row.min}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 修改方式 -->
      <!-- <el-table-column prop="allow" label="修改方式" align="center" width="90">
        <template slot-scope="scope">
          <el-popover placement="top" width="240" trigger="click" :ref="`popover5-${scope.row.id}`">
            <div style="float: left;width: 200px;">
              <el-radio-group v-model="allow_edit">
                <el-radio label="仅加分" style="margin-bottom: 20px;"></el-radio>
                <el-radio label="仅减分" style="margin-bottom: 20px;"></el-radio>
                <el-radio label="加减分"></el-radio>
                <el-button type="primary" icon="el-icon-check" size="mini" style="margin-left: 14px;"
                  @click="scope._self.$refs[`popover5-${scope.row.id}`].doClose();handleEdit(scope.row.level,scope.row.id,scope.$index)">
                </el-button>
              </el-radio-group>
            </div>
            <span v-if="scope.row.allow==='仅加分'" class="edit_span" slot="reference" @click="clean_edit">仅加分</span>
            <span v-else-if="scope.row.allow==='仅减分'" class="edit_span" slot="reference" @click="clean_edit">仅减分</span>
            <span v-else-if="scope.row.allow==='加减分'" class="edit_span" slot="reference" @click="clean_edit">加减分</span>
          </el-popover>

        </template>
      </el-table-column> -->
      <!-- 操作按钮 -->
      <el-table-column width="170">
        <!-- 添加一级指标 -->
        <template slot="header" slot-scope="scope">
          <el-button style="margin: 0 12.5px;" @click="add_node(0,0)">添加一级指标</el-button>
        </template>
        <template slot-scope="scope">
          <div class="buttonContainer">
            <!-- 添加二三级指标 -->
            <el-button size="mini" type="success" icon="el-icon-plus" v-if="scope.row.level!==3"
              @click="add_node(scope.row.level,scope.row.id,scope.row.label)"></el-button>
            <!-- 删除指标 -->
            <el-button size="mini" type="danger" icon="el-icon-delete"
              @click="delete_node(scope.row.level,scope.row.id)"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 展示表格 -->
    <div style="margin: 40px 0;">
      <TreeTable :tableData="table_data" :treeCount="tree_count"></TreeTable>
    </div>
  </div>
</template>

<script>
import TreeTable from '@/components/Treetable'

export default {
  name: 'modify',
  components: {
    TreeTable
  },
  data() {
    return {
      tableData: [],//树形表格(修改)
      count: 50,//当前id计数
      label_edit: '',//修改后的指标名
      content_edit: '',//修改后的内容
      default_edit: 0,//修改后的默认值
      step_edit: 0,//修改后步长
      max_edit: 0,//修改后的最大值
      min_edit: 0,//修改后的最小值
      table_data: [],//树形表格(展示)
      tree_count: [],
      // jurisdiction: '否'
    }
  },
  created() {
    //初始化数据
    this.tableData = [
      {
        id: 1,
        label: '学风纪律',
        level: 1,
        children: [{
          id: 8,
          label: '升旗仪式',
          level: 2,
          children: [{
            id: 30,
            label: '升旗仪式三级指标1',
            level: 3,
            content: '升旗仪式三级指标1检查内容',
            default_value: 1,
            step: 1,
            min: 0,
            max: 1
          },
          {
            id: 31,
            label: '升旗仪式三级指标2',
            level: 3,
            content: '升旗仪式三级指标2检查内容',
            default_value: 2,
            step: 1,
            min: -1,
            max: 3
          },
          {
            id: 32,
            label: '升旗仪式三级指标3',
            level: 3,
            content: '升旗仪式三级指标3检查内容',
            default_value: 3,
            step: 2,
            min: 2,
            max: 4
          }]
        }, {
          id: 9,
          label: '出勤',
          level: 2,
          children: [{
            id: 33,
            label: '出勤三级指标',
            level: 3,
            content: '出勤三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 10,
          label: '日常违纪、学生安全违纪',
          level: 2,
          children: [{
            id: 34,
            label: '日常违纪三级指标',
            level: 3,
            content: '日常违纪三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 11,
          label: '就餐违纪、外卖违纪',
          level: 2,
          children: [{
            id: 35,
            label: '就餐违纪三级指标',
            level: 3,
            content: '就餐违纪三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 12,
          label: '交心里委员晴雨表',
          level: 2,
          children: [{
            id: 36,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 13,
          label: '学生检查晚修纪律',
          level: 2,
          children: [{
            id: 37,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 14,
          label: '接受处分',
          level: 2,
          children: [{
            id: 38,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 15,
          label: '课堂班务日志上交',
          level: 2,
          children: [{
            id: 39,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }]
      }, {
        id: 2,
        label: '仪容仪表',
        level: 1,
        children: [{
          id: 16,
          label: '发型、校服、校卡、首饰',
          level: 2,
          children: [
            {
              id: 27,
              label: '发型',
              level: 3,
              content: '发型是否满足学生要求',
              default_value: 0,
              step: 1,
              min: 0,
              max: 1

            },
            {
              id: 28,
              label: '校服',
              level: 3,
              content: '学生在校是否着装校服',
              default_value: 0,
              step: 1,
              min: 0,
              max: 1
            },
            {
              id: 29,
              label: '装扮',
              level: 3,
              content: '装扮是否合乎学生标准',
              default_value: 0,
              step: 1,
              min: 0,
              max: 1
            }
          ]
        }]
      }, {
        id: 3,
        label: '两操',
        level: 1,
        children: [{
          id: 17,
          label: '课间学生出勤',
          level: 2,
          children: [{
            id: 40,
            label: '课间学生出勤三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 18,
          label: '课间班主任出勤',
          level: 2,
          children: [{
            id: 41,
            label: '课间班主任出勤三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 19,
          label: '课间质量',
          level: 2,
          children: [{
            id: 42,
            label: '课间质量三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 20,
          label: '眼保健操',
          level: 2,
          children: [{
            id: 43,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }]
      }, {
        id: 4,
        label: '宿舍检查',
        level: 1,
        children: [{
          id: 21,
          label: '纪律',
          level: 2,
          children: [{
            id: 44,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 22,
          label: '内务',
          level: 2,
          children: [{
            id: 45,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }]
      }, {
        id: 5,
        label: '环境卫生',
        level: 1,
        children: [{
          id: 23,
          label: '公共卫生',
          level: 2,
          children: [{
            id: 46,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 24,
          label: '常规卫生（学生会检查）',
          level: 2,
          children: [{
            id: 47,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 25,
          label: '教学楼日常卫生检查',
          level: 2,
          children: [{
            id: 48,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }, {
          id: 26,
          label: '垃圾分类',
          level: 2,
          children: [{
            id: 49,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            min: 0,
            max: 1
          }]
        }]
      }
    ];
    this.renderTree();
  },
  methods: {
    add_node(level, id, label) {//添加节点
      if (level === 0) {//添加一级指标
        const node = {
          id: this.count++,
          label: '一级指标',
          level: 1,
          children: []
        }
        this.tableData.push(node);
      } else if (level === 1) {//添加二级指标
        const node = {
          id: this.count++,
          label: label + '的二级指标',
          level: 2,
          children: []
        };
        for (let idx1 in this.tableData) {
          if (this.tableData[idx1].id === id) {
            this.tableData[idx1].children.push(node);
          }
        }
      } else {//添加三级指标
        const node = {
          id: this.count++,
          label: label + '的三级指标',
          level: 3,
          content: '三级指标检查内容',
          default_value: 0,
          step: 1,
          min: 0,
          max: 1
        };
        for (let idx1 in this.tableData) {
          for (let idx2 in this.tableData[idx1].children) {
            if (this.tableData[idx1].children[idx2].id === id) {
              this.tableData[idx1].children[idx2].children.push(node);
            }
          }
        }
      }
      this.renderTree();//重新渲染表格
    },
    delete_node(level, id) {//删除节点
      if (level === 1) {
        for (let idx in this.tableData) {
          if (this.tableData[idx].id === id) this.tableData.splice(idx, 1);
        }
      } else if (level === 2) {
        for (let idx1 in this.tableData) {
          for (let idx2 in this.tableData[idx1].children) {
            if (this.tableData[idx1].children[idx2].id === id) this.tableData[idx1].children.splice(idx2, 1)
          }
        }
      } else {
        for (let idx1 in this.tableData) {
          for (let idx2 in this.tableData[idx1].children) {
            for (let idx3 in this.tableData[idx1].children[idx2].children) {
              if (this.tableData[idx1].children[idx2].children[idx3].id === id) {
                this.tableData[idx1].children[idx2].children.splice(idx3, 1);
              }
            }
          }
        }
      };
      this.renderTree();
    },
    handleEdit(level, id, type) {//修改节点
      if (level === 1) {//一级指标
        for (let idx in this.tableData) {
          if (this.tableData[idx].id === id) {
            const node = {
              id: this.tableData[idx].id,
              label: type === 0 ? this.tableData[idx].label : this.label_edit,
              level: 1,
              children: this.tableData[idx].children
            }
            this.$set(this.tableData, idx, node);
          }
        }
      } else if (level === 2) {//二级指标
        for (let idx1 in this.tableData) {
          for (let idx2 in this.tableData[idx1].children) {
            if (this.tableData[idx1].children[idx2].id === id) {
              const node = {
                id: this.tableData[idx1].children[idx2].id,
                label: type === 0 ? this.tableData[idx1].children[idx2].label : this.label_edit,
                level: 2,
                children: this.tableData[idx1].children[idx2].children
              }
              this.$set(this.tableData[idx1].children, idx2, node);
            }
          }
        }
      } else {//三级指标
        for (let idx1 in this.tableData) {
          for (let idx2 in this.tableData[idx1].children) {
            for (let idx3 in this.tableData[idx1].children[idx2].children) {
              if (this.tableData[idx1].children[idx2].children[idx3].id === id) {
                const node = {
                  id: this.tableData[idx1].children[idx2].children[idx3].id,
                  label: type !== 0 ? this.tableData[idx1].children[idx2].children[idx3].label : this.label_edit,
                  level: 3,
                  content: type !== 1 ? this.tableData[idx1].children[idx2].children[idx3].content : this.content_edit,
                  default_value: type !== 2 ? this.tableData[idx1].children[idx2].children[idx3].default_value : this.default_edit,
                  step: type !== 3 ? this.tableData[idx1].children[idx2].children[idx3].step : this.step_edit,
                  max: type !== 4 ? this.tableData[idx1].children[idx2].children[idx3].max : this.max_edit,
                  min: type !== 5 ? this.tableData[idx1].children[idx2].children[idx3].min : this.min_edit
                }
                this.$set(this.tableData[idx1].children[idx2].children, idx3, node);
              }
            }
          }
        }
      }
      this.renderTree();//重新渲染表格
    },
    clean_edit() {//每次先清理内容
      this.label_edit = '';
      this.content_edit = '';
      this.default_edit = 0;
      this.step_edit = 0;
      this.max_edit = 0;
      this.min_edit = 0;
    },
    recovery() {//恢复修改前
      //重新申请数据
      console.log('recovery');
    },
    submit() {//提交修改
      //提交修改
      console.log('submit');
    },
    renderTree() {//重新渲染树形表格
      this.table_data = [];
      this.tree_count = [];
      for (let t1 of this.tableData) {
        let target1 = t1.label;
        let col_1 = 0;
        let col_2 = []
        if (t1.children.length !== 0) {
          let idx = 0;
          for (let t2 of t1.children) {
            let target2 = t2.label;
            if (t2.children.length !== 0) {
              col_1 += t2.children.length;
              col_2[idx++] = t2.children.length;
              for (let t3 of t2.children) {
                let target3 = t3.label;
                let table_item = {
                  target1,
                  target2,
                  target3
                };
                this.table_data.push(table_item);
              }
            } else {
              col_1 += 1;
              col_2[idx++] = 1;
              let table_item = {
                target1,
                target2,
                target3: ''
              };
              this.table_data.push(table_item);
            }
          }
        } else {
          let table_item = {
            target1,
            target2: '',
            target3: ''
          };
          this.table_data.push(table_item);
        }
        let item = {
          col_1,
          col_2
        }
        this.tree_count.push(item);
      }
    }
  }
};
</script>

<style scoped>
/* 总容器 */
#container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
}

/* 操作按钮容器 */
.buttonContainer {
  flex: 1;
  display: flex;
  align-items: center;
}

.buttonContainer button {
  margin: auto;
}

/* 表内数据 */
.edit_span {
  cursor: pointer;
}
</style>