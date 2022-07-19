<template>
  <div>
    <div class="custom-tree-container">
      <div class="block">
        <el-tree :data="data" show-checkbox node-key="id" expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">
                Append
              </el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)">
                Delete
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>

</template>

<script>
let id = 1000;
export default {
  name: 'Moraleducation',
  components: {

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
      data: JSON.parse(JSON.stringify(data))
    }
  },

  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
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

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.append(data)}>Append</el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>Delete</el-button>
          </span>
        </span>);
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

div.custom-tree-container {
  width: 30vw;
}
</style>