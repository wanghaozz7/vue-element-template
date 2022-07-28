<template>
  <div>
    <div class="custom-tree-container">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <div style="height: 6vh;position: relative;">
        <span
          style="margin-top: 20px;height: 40px;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: bolder;position: absolute;left:10px;">德育量化指标</span>
        <span style="position: absolute;right:10px;margin-top: 10px;">
          <el-popover placement="bottom" width="300" v-model="root_visible" @hide="clean_holder">
            <el-input v-model="item" placeholder="新添加的指标"></el-input>
            <div style="text-align: right; margin-top: 5px;">
              <el-button size="mini" type="text" @click="root_cancel(data)"><i class="el-icon-close"></i>
              </el-button>
              <el-button type="primary" size="mini" @click="root_item(data)"><i class="el-icon-check"></i>
              </el-button>
            </div>
            <el-button type="text" slot="reference" class="node-function">添加一级指标</el-button>
          </el-popover>
        </span>
      </div>
      <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
        class="filter-tree" :props="defaultProps" :filter-node-method="filterNode" ref="tree" style="margin-top: 5px;">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <!-- 添加 -->
            <el-popover placement="bottom" width="300" v-model="add_visible[data.id]" @hide="clean_holder"
              v-if="node.level <= 2">
              <el-input v-model="item" placeholder="新添加的指标"></el-input>
              <div style="text-align: right; margin-top: 5px;">
                <el-button size="mini" type="text" @click="add_cancel(data)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="add_item(data)"><i class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button type="text" slot="reference" class="node-function"><i class="el-icon-circle-plus-outline"></i>
              </el-button>
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
              <el-button type="text" slot="reference" class="node-function"><i class="el-icon-remove-outline"></i>
              </el-button>
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
              <el-button type="text" slot="reference" class="node-function"><i class="el-icon-edit-outline"></i>
              </el-button>
            </el-popover>
          </span>
        </span>
      </el-tree>
    </div>
    <el-button type="text" @click="handle_click" style="margin: 2vh 1vw;" :loading="isloading">
      预览<i class="el-icon-notebook-2"></i>
    </el-button>
    <el-dialog :visible.sync="dialogTableVisible" @open="isloading = false" top="5vh">
      <div class="tree-table">
        <TreeTable :tableData="table_data" :treeCount="tree_count"></TreeTable>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import TreeTable from '@/components/Treetable';
export default {
  name: 'Moraleducation',
  components: {
    TreeTable
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    let data = this.$store.state.target.target;
    let table_data = [];
    let tree_count = [];
    for (let t1 of data) {
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
              table_data.push(table_item);
            }
          } else {
            col_1 += 1;
            col_2[idx++] = 1;
            let table_item = {
              target1,
              target2,
              target3: ''
            };
            table_data.push(table_item);
          }
        }
      } else {
        let table_item = {
          target1,
          target2: '',
          target3: ''
        };
        table_data.push(table_item);
      }
      let item = {
        col_1,
        col_2
      }
      tree_count.push(item);
    }
    return {
      data,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
      add_visible: [],
      delete_visible: [],
      rename_visible: [],
      root_visible: false,
      item: '',
      table_data,
      tree_count,
      dialogTableVisible: false,
      isloading: false
    }
  },
  methods: {
    append(data) {//在树中添加节点
      const id = this.$store.state.count;
      const newChild = { id: id, label: this.item, children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    append_root() {//添加一级指标
      const id = this.$store.state.count;
      const newChild = { id: id, label: this.item, children: [] };
      this.data.push(newChild);
      console.log('append_root');
      console.log(this.data);
    },
    remove(node, data) {//在树中删除节点
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    add_item(data) {//确认添加

      this.append(data);
      const info = {
        id: data.id,
        level: data.level,
        label: this.item,
        content: '无',
      }
      this.$store.commit('add_node', info);
      this.$set(this.add_visible, data.id, false);
    },
    add_cancel(data) {//取消添加
      this.$set(this.add_visible, data.id, false);
    },
    root_item() {
      this.append_root();
      this.$store.commit('add_root', this.item);
      this.root_visible = false;
    },
    root_cancel() {
      this.root_visible = false;
    },
    delete_item(node, data) {//确认删除

      this.remove(node, data);
      const info = {
        id: data.id,
        level: data.level,
        item: this.item
      }
      this.$store.commit('delete_node', info);
      this.$set(this.delete_visible, data.id, false);
    },
    delete_cancel(data) {//取消删除
      this.$set(this.delete_visible, data.id, false);
    },
    clean_holder() {
      this.item = '';
    },
    rename_item(data) {//确认重命名
      this.$set(this.rename_visible, data.id, false);
      data.label = this.item;
      const info = {
        id: data.id,
        level: data.level,
        item: this.item
      }
      this.$store.commit('rename_node', info);
    },
    rename_cancel(data) {//取消重命名
      this.$set(this.rename_visible, data.id, false);
    },
    handle_click() {
      this.dialogTableVisible = true;
      this.isloading = true;
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
  width: 50vw;
  margin: 2vh 1vw;
  float: left;
}

.tree-table {

  width: 47vw;
  margin: 2vh 1vw;
  height: 75vh;

}
</style>