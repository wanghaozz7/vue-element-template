<template>
  <div>
    <el-col>
      <div class="custom-tree-container">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
        <el-tree :data="data" show-checkbox node-key="id" :default-expand-all="false" :expand-on-click-node="false"
          class="filter-tree" :props="defaultProps" :filter-node-method="filterNode" ref="tree"
          style="margin-top: 5px;">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <!-- 添加 -->
              <el-popover placement="bottom" width="300" v-model="add_visible[data.id]" @hide="clean_holder">
                <el-input v-model="item" placeholder="新添加的指标"></el-input>
                <div style="text-align: right; margin-top: 5px;">
                  <el-button size="mini" type="text" @click="add_cancel(data)"><i class="el-icon-close"></i>
                  </el-button>
                  <el-button type="primary" size="mini" @click="add_item(data)"><i class="el-icon-check"></i>
                  </el-button>
                </div>
                <el-button type="text" slot="reference" class="node-function"><i class="el-icon-plus"></i></el-button>
              </el-popover>
              <!-- 删除 -->
              <el-popover placement="top" width="160" v-model="delete_visible[data.id]">
                <p>确认删除？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="delete_cancel(data)"><i class="el-icon-close"></i>
                  </el-button>
                  <el-button type="primary" size="mini" @click="delete_item(node, data)"><i class="el-icon-check"></i>
                  </el-button>
                </div>
                <el-button type="text" slot="reference" class="node-function"><i class="el-icon-minus"></i></el-button>
              </el-popover>
              <!--重命名-->
              <el-popover placement="bottom" width="300" v-model="rename_visible[data.id]" @hide="clean_holder">
                <el-input v-model="item" placeholder="修改后的指标"></el-input>
                <div style="text-align: right; margin-top: 5px">
                  <el-button size="mini" type="text" @click="rename_cancel(data)"><i class="el-icon-close"></i>
                  </el-button>
                  <el-button type="primary" size="mini" @click="rename_item(data)"><i class="el-icon-check"></i>
                  </el-button>
                </div>
                <el-button type="text" slot="reference" class="node-function">rename</el-button>
              </el-popover>
            </span>
          </span>
        </el-tree>
      </div>
    </el-col>
  </div>
</template>

<script>
let id = 29;
export default {
  name: 'Moraleducation',
  components: {

  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    const data = [{
      id: 1,
      label: '学风纪律',
      children: [{
        id: 8,
        label: '升旗仪式',
      }, {
        id: 9,
        label: '出勤',
      }, {
        id: 10,
        label: '日常违纪、学生安全违纪'
      }, {
        id: 11,
        label: '就餐违纪、外卖违纪'
      }, {
        id: 12,
        label: '行李乱摆放'
      }, {
        id: 13,
        label: '学生检查晚修纪律'
      }, {
        id: 14,
        label: '接受处分'
      }, {
        id: 15,
        label: '课堂班务日志上交'
      }]
    }, {
      id: 2,
      label: '仪容仪表',
      children: [{
        id: 16,
        label: '发型、校服、校卡、首饰',
      }]
    }, {
      id: 3,
      label: '两操',
      children: [{
        id: 17,
        label: '课间学生出勤'
      }, {
        id: 18,
        label: '课间班主任出勤'
      }, {
        id: 19,
        label: '课间质量'
      }, {
        id: 20,
        label: '眼保健操'
      }]
    }, {
      id: 4,
      label: '宿舍检查',
      children: [{
        id: 21,
        label: '纪律'
      }, {
        id: 22,
        label: '内务'
      }]
    }, {
      id: 5,
      label: '环境卫生',
      children: [{
        id: 23,
        label: '公共卫生'
      }, {
        id: 24,
        label: '常规卫生（学生会检查）'
      }, {
        id: 25,
        label: '教学楼日常卫生检查'
      }, {
        id: 26,
        label: '垃圾分类'
      }]
    }, {
      id: 6,
      label: '行政检查',
      children: [{
        id: 27,
        label: '晚修等级评价'
      }, {
        id: 28,
        label: '早读等级评价'
      }]
    }, {
      id: 7,
      label: '年级评估',
      children: [{
        id: 29,
        label: '年纪安排检查、考试违纪、手机违纪、考勤、年纪活动、课堂状态、仪容仪表'
      }]
    }];
    return {
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data)),
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
      add_visible: [],
      delete_visible: [],
      rename_visible: [],
      item: ''
    }
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: this.item, children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    add_item(data) {
      this.$set(this.add_visible, data.id, false);
      this.append(data);
    },
    add_cancel(data) {
      this.$set(this.add_visible, data.id, false);
    },
    delete_item(node, data) {
      this.$set(this.delete_visible, data.id, false);
      this.remove(node, data);
    },
    delete_cancel(data) {
      this.$set(this.delete_visible, data.id, false);
    },
    clean_holder() {
      this.item = '';
    },
    rename_item(data) {
      this.$set(this.rename_visible, data.id, false);
      data.label = this.item;
    },
    rename_cancel(data) {
      this.$set(this.rename_visible, data.id, false);
    }
  }
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.node-function {
  padding-left: 5px;
}

.custom-tree-container {
  width: 40vw;
  margin: 30px 30px;
}
</style>