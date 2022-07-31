<template>
  <div>
    <!-- 指标树 -->
    <div class="custom-tree-container">
      <!-- 过滤器 -->
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <!-- header -->
      <div style="height: 6vh;position: relative;">
        <!-- span -->
        <span
          style="margin-top: 20px;height: 40px;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: bolder;position: absolute;left:10px;">德育量化指标</span>
        <!-- 添加一级指标 -->
        <span style="position: absolute;right:10px;margin-top: 10px;">
          <el-popover placement="bottom" width="300" v-model="root_visible" @hide="clean_holder">
            <el-input v-model="item" placeholder="新添加的指标"></el-input>
            <div style="text-align: right; margin-top: 5px;">
              <el-button size="mini" type="text" @click="root_cancel(data)"><i class="el-icon-close"></i>
              </el-button>
              <el-button type="primary" size="mini" @click="root_confirm(data)"><i class="el-icon-check"></i>
              </el-button>
            </div>
            <el-button type="text" slot="reference" style="font-size: 16px;">添加一级指标</el-button>
          </el-popover>
        </span>
      </div>
      <!-- 树体 -->
      <!-- <el-tree :data="data" :show-checkbox="false" node-key="id" default-expand-all :expand-on-click-node="false"
        class="filter-tree" :props="defaultProps" :filter-node-method="filterNode" ref="tree"
        style="margin-top: 5px;height: auto;">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            {{ node.label }}
            <span v-if="data.level === 3">
              content:{{ data.content }}
              default_value:{{ data.default_value }}
              step:{{ data.step }}
              allow:{{ data.allow }}
            </span>
          </span>
          <span> -->
      <!-- 添加二级指标 -->
      <!-- <el-popover placement="bottom" width="300" v-model="add_visible[data.id]" @hide="clean_holder"
              v-if="node.level === 1">
              <el-input v-model="item" placeholder="二级指标"></el-input>
              <div style="text-align: right; margin-top: 5px;">
                <el-button size="mini" type="text" @click="add_cancel(data)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="add_item(data)"><i class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button type="text" slot="reference" class="node-function"><i class="el-icon-circle-plus-outline"></i>
              </el-button>
            </el-popover> -->

      <!-- 添加三级指标 -->
      <!-- <el-popover placement="bottom" width="400" v-model="third_visible[data.id]" @hide="clean_holder"
              v-else-if="node.level === 2">
              <el-input v-model="info.label" placeholder="三级指标"></el-input>
              <el-input v-model="info.content" placeholder="检查内容"></el-input>
              <el-radio-group v-model="info.allow">
                <el-radio label="add">仅加分</el-radio>
                <el-radio label="sub">仅减分</el-radio>
                <el-radio label="all">都可以</el-radio>
              </el-radio-group>
              <el-select v-model="info.step">
                <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-input v-model="info.default_value" placeholder="初始值"></el-input>
              <div style="text-align: right; margin-top: 5px;">
                <el-button size="mini" type="text" @click="third_cancel(data)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="third_confirm(data)"><i class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button type="text" slot="reference" class="node-function"><i class="el-icon-circle-plus-outline"></i>
              </el-button>
            </el-popover> -->

      <!-- 删除 -->
      <!-- <el-popover placement="top" width="160" v-model="delete_visible[data.id]">
              <p>确认删除？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="delete_cancel(data)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="delete_item(node, data)"><i class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button type="text" slot="reference" class="node-function"><i class="el-icon-remove-outline"></i>
              </el-button>
            </el-popover> -->

      <!--重命名一级二级指标-->
      <!-- <el-popover placement="bottom" width="300" v-model="rename_visible[data.id]" @hide="clean_holder">
              <el-input v-model="item" placeholder="修改后的指标"></el-input>
              <div style="text-align: right; margin-top: 5px">
                <el-button size="mini" type="text" @click="rename_cancel(data)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="rename_item(data)"><i class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button type="text" slot="reference" class="node-function"><i class="el-icon-edit-outline"></i>
              </el-button>
            </el-popover> -->

      <!-- </span>
        </span>
      </el-tree> -->

      <el-tree :data="data" :props="defaultProps" node-key="id" default-expand-all class="filter-tree"
        :filter-node-method="filterNode" ref="tree" :expand-on-click-node="false">
        <div slot-scope="{ node, data }" class="custom-tree-node">
          <el-tooltip placement="right" effect="light" :open-delay="300">
            <div slot="content">
              <p>指标名称:{{ data.label }}</p>
              <p>{{ data.level }}级指标</p>
              <p v-if="data.level === 3">检查内容:{{ data.content }}</p>
              <p v-if="data.level === 3">default_value:{{ data.default_value }}</p>
              <p v-if="data.level === 3">5</p>
            </div>
            <span>{{ node.label }}</span>
          </el-tooltip>
          <span>
            <!-- 添加二级指标 -->
            <el-popover placement="bottom" width="300" v-model="add_visible[data.id]" @hide="clean_holder"
              v-if="node.level === 1">
              <el-input v-model="item" placeholder="二级指标"></el-input>
              <div style="text-align: right; margin-top: 5px;">
                <el-button size="mini" type="text" @click="add_cancel(data)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="add_confirm(data)"><i class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button type="text" slot="reference" class="node-function" icon="el-icon-circle-plus-outline">
              </el-button>
            </el-popover>

            <!-- 添加三级指标 -->
            <el-popover placement="bottom" width="400" v-model="third_visible[data.id]" @hide="clean_holder"
              v-else-if="node.level === 2">
              <el-input v-model="info.label" placeholder="三级指标"></el-input>
              <el-input v-model="info.content" placeholder="检查内容"></el-input>
              <el-radio-group v-model="info.allow">
                <el-radio label="add">仅加分</el-radio>
                <el-radio label="sub">仅减分</el-radio>
                <el-radio label="all">都可以</el-radio>
              </el-radio-group>
              <el-select v-model="info.step">
                <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-input v-model="info.default_value" placeholder="初始值"></el-input>
              <div style="text-align: right; margin-top: 5px;">
                <el-button size="mini" type="text" @click="third_cancel(data)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="third_confirm(data)"><i class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button type="text" slot="reference" class="node-function" icon="el-icon-circle-plus-outline">
              </el-button>
            </el-popover>

            <!-- 删除指标 -->
            <el-popover placement="top" width="160" v-model="delete_visible[data.id]">
              <p>确认删除？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="delete_cancel(data)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="delete_confirm(node, data)"><i class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button type="text" slot="reference" class="node-function" icon="el-icon-remove-outline"></el-button>
            </el-popover>

            <!-- 重命名一、二级指标 -->
            <el-popover placement="bottom" width="300" v-model="rename_visible[data.id]" @hide="clean_holder"
              v-if="data.level <= 2">
              <el-input v-model="item" placeholder="修改后的指标"></el-input>
              <div style="text-align: right; margin-top: 5px">
                <el-button size="mini" type="text" @click="rename_cancel(data)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="rename_cinfirm(data)"><i class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button type="text" slot="reference" class="node-function" icon="el-icon-edit-outline">
              </el-button>
            </el-popover>

            <!-- 修改三级指标 -->
            <el-popover placement="bottom" width="400" v-model="update_visible[data.id]" @hide="clean_holder" v-else>
              <el-input v-model="info.label" placeholder="三级指标"></el-input>
              <el-input v-model="info.content" placeholder="检查内容"></el-input>
              <el-radio-group v-model="info.allow">
                <el-radio label="add">仅加分</el-radio>
                <el-radio label="sub">仅减分</el-radio>
                <el-radio label="all">都可以</el-radio>
              </el-radio-group>
              <el-select v-model="info.step">
                <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-input v-model="info.default_value" placeholder="初始值"></el-input>
              <div style="text-align: right; margin-top: 5px;">
                <el-button size="mini" type="text" @click="update_cancel(data)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="update_confirm(data)"><i class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button type="text" slot="reference" class="node-function" icon="el-icon-circle-plus-outline">
              </el-button>
            </el-popover>
          </span>
        </div>
      </el-tree>
    </div>

    <!-- 预览 -->
    <el-button type="text" @click="handle_click" style="margin: 2vh 1vw;" :loading="isloading">
      预览<i class="el-icon-notebook-2"></i>
    </el-button>
    <el-dialog :visible.sync="dialogTableVisible" @open="isloading = false" top="5vh">
      <div class="tree-table">
        <TreeTable :tableData="table_data" :treeCount="tree_count"></TreeTable>
      </div>
    </el-dialog>

    <!-- 权限 -->
    <el-tooltip :content="'开放自由打分权限: ' + jurisdiction" placement="top">
      <el-switch v-model="jurisdiction" active-color="#13ce66" inactive-color="#ff4949" active-value="是"
        inactive-value="否" @change="jurisdiction_change">
      </el-switch>
    </el-tooltip>

  </div>
</template>

<script>
import store from '@/store';
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
    let data = store.state.target.target;
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
      root_visible: false,
      add_visible: [],
      third_visible: [],
      delete_visible: [],
      rename_visible: [],
      update_visible: [],
      item: '',
      table_data,
      tree_count,
      dialogTableVisible: false,
      isloading: false,
      info: {
        label: '',
        content: '',
        default_value: 0,
        step: 1,
        allow: ''
      },
      jurisdiction: "是"
    }
  },
  methods: {
    filterNode(value, data) {//过滤节点
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    root_confirm() {//添加一级指标
      this.$store.commit('add_root', this.item);
      this.root_visible = false;
    },
    root_cancel() {//取消添加一级指标
      this.root_visible = false;
    },
    add_confirm(data) {//添加二级指标
      console.log('add_item');
      const info = {
        id: data.id,
        level: 1,
        label: this.item,
      }
      store.commit('add_node', info);
      this.$set(this.add_visible, data.id, false);
      console.log(data);

    },
    add_cancel(data) {//取消添加二级指标
      this.$set(this.add_visible, data.id, false);
    },
    third_confirm(data) {//添加三级指标
      const info = {
        id: data.id,
        level: 2,
        label: this.info.label,
        content: this.info.content,
        default_value: this.info.default_value,
        step: this.info.step,
        allow: this.info.allow
      }
      store.commit('add_node', info);
      this.$set(this.third_visible, data.id, false);
    },
    third_cancel(data) {
      this.$set(this.third_visible, data.id, false);
    },
    delete_confirm(node, data) {//确认删除
      const info = {
        id: data.id,
        level: data.level,
        item: this.item
      }
      store.commit('delete_node', info);
      this.$set(this.delete_visible, data.id, false);
    },
    delete_cancel(data) {//取消删除
      this.$set(this.delete_visible, data.id, false);
    },
    clean_holder() {//重置信息输入框
      this.item = '';
      this.info = {

      };
    },
    rename_confirm(data) {//确认重命名
      this.$set(this.rename_visible, data.id, false);
      const info = {
        id: data.id,
        level: data.level,
        item: this.item
      }
      store.commit('rename_node', info);
    },
    rename_cancel(data) {//取消重命名
      this.$set(this.rename_visible, data.id, false);
    },
    update_confirm(data) {

    },
    update_cancel(data) {

    },
    handle_click() {
      this.dialogTableVisible = true;
      this.isloading = true;
    },
    jurisdiction_change() {
      store.commit('jurisdiction_change');
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
  font-size: 16px;
}

.node-function {
  padding-left: 10px;
  font-size: 18px;
}

.custom-tree-container {
  width: 70vw;
  margin: 2vh 1vw;
  float: left;
}

.tree-table {

  width: 47vw;
  margin: 2vh 1vw;
  height: 75vh;

}
</style>