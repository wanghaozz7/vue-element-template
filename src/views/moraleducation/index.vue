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
            <el-input v-model="item" placeholder="一级指标"></el-input>
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
      <el-tree :data="data" :props="defaultProps" ref="tree" node-key="id" default-expand-all class="filter-tree"
        :filter-node-method="filterNode" :expand-on-click-node="false">
        <div slot-scope="{ node, data }" class="custom-tree-node">
          <!-- 节点名 -->
          <el-tooltip placement="right-start" :open-delay="300" :offset="10" popper-class="atooltip"
            :visible-arrow="false">
            <div slot="content">
              <p>指标名称:{{ data.label }}</p>
              <p>指标级别:{{ data.level }}</p>
              <p v-if="data.level === 3">检查内容:{{ data.content }}</p>
              <p v-if="data.level === 3">默认值:{{ data.default_value }}</p>
              <p v-if="data.level === 3">步长:{{ data.step }}</p>
            </div>
            <span>{{ node.label }}</span>
          </el-tooltip>
          <!-- 功能按钮 -->
          <span>
            <!-- 添加二级指标 -->
            <el-popover placement="left" width="300" v-model="add_visible[data.id]" @hide="clean_holder"
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
            <el-popover placement="left" width="400" v-model="third_visible[data.id]" @hide="clean_holder"
              v-else-if="node.level === 2">
              <!-- 填写数据的表单 -->
              <el-form ref="form" :model="info" label-width="85px" label-position="left" size="small" :inline="true">
                <div class="form_style">
                  <el-form-item label="指标名称">
                    <el-input v-model="info.label" style="width: 260px;"></el-input>
                  </el-form-item>
                  <el-form-item label="检查内容">
                    <el-input v-model="info.content" style="width: 260px;"></el-input>
                  </el-form-item>
                  <el-form-item label="加减分权限">
                    <el-radio-group v-model="info.allow">
                      <el-radio label="add">仅加分</el-radio>
                      <el-radio label="sub">仅减分</el-radio>
                      <el-radio label="all">都可以</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form ref="form" :model="info" size="small" :inline="true" style="width: 100%;">
                    <el-form-item label="初始值" label-width="85px">
                      <el-input v-model="info.default_value" :placeholder="data.default_value"
                        style="float: left;width: 60px;">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="步长" label-width="50px">
                      <el-select v-model="info.step" style="float: left;width: 60px;">
                        <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                      <div style="text-align: right;float: left;margin-left:7px">
                        <el-button size="mini" type="text" @click="third_cancel(data)"><i class="el-icon-close"></i>
                        </el-button>
                        <el-button type="primary" size="mini" @click="third_confirm(data)"><i class="el-icon-check"></i>
                        </el-button>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
              </el-form>
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
            <el-popover placement="left" width="300" v-model="rename_visible[data.id]" @hide="clean_holder"
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
            <el-popover placement="left" width="400" v-model="update_visible[data.id]" @hide="clean_holder" v-else>
              <el-form ref="form" :model="info" label-width="85px" label-position="left" size="small" :inline="true">
                <div class="form_style">
                  <el-form-item label="指标名称">
                    <el-input v-model="info.label" :placeholder="data.label" style="width: 260px;"></el-input>
                  </el-form-item>
                  <el-form-item label="检查内容">
                    <el-input v-model="info.content" :placeholder="data.content" style="width: 260px;"></el-input>
                  </el-form-item>
                  <el-form-item label="加减分权限">
                    <el-radio-group v-model="info.allow">
                      <el-radio label="add">仅加分</el-radio>
                      <el-radio label="sub">仅减分</el-radio>
                      <el-radio label="all">都可以</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form ref="form" :model="info" size="small" :inline="true" style="width: 100%;">
                    <el-form-item label="初始值" label-width="85px">
                      <el-input v-model="info.default_value" :placeholder="data.default_value"
                        style="float: left;width: 60px;">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="步长" label-width="50px">
                      <el-select v-model="info.step" style="float: left;width: 60px;">
                        <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                      <div style="text-align: right;float: left;margin-left:7px">
                        <el-button size="mini" type="text" @click="update_cancel(data)"><i class="el-icon-close"></i>
                        </el-button>
                        <el-button type="primary" size="mini" @click="update_confirm(data)"><i
                            class="el-icon-check"></i>
                        </el-button>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
              </el-form>
              <el-button type="text" slot="reference" class="node-function" icon="el-icon-edit-outline"
                @click="show_old_data(data)">
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

<script scoped>
import store from '@/store';
import TreeTable from '@/components/Treetable'
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
        allow: 'add'
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
    third_cancel(data) {//取消添加三级指标
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
        label: '',
        content: '',
        default_value: 0,
        step: 1,
        allow: 'add'
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
    update_confirm(data) {//确认修改三级指标
      const info = {
        id: data.id,
        label: this.info.label,
        content: this.info.content,
        default_value: this.info.default_value,
        step: this.info.step,
        allow: this.info.allow
      };
      store.commit('update_node', info);
      this.$set(this.update_visible, data.id, false);
    },
    update_cancel(data) {//取消修改三级指标
      this.$set(this.update_visible, data.id, false);
    },
    show_old_data(data) {//修改时输入框是旧数据
      this.info = {
        label: data.label,
        content: data.content,
        default_value: data.default_value,
        step: data.step,
        allow: data.allow
      }
    },
    handle_click() {//处理预览按钮的加载
      this.dialogTableVisible = true;
      this.isloading = true;
    },
    jurisdiction_change() {//权限切换
      store.commit('jurisdiction_change');
    }
  }
};
</script>

<style scoped>
/* 树的容器 */
.custom-tree-container {
  width: 70vw;
  margin: 2vh 0 0 7vw;
  float: left;
}

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

.tree-table {

  width: 47vw;
  margin: 2vh 1vw;
  height: 75vh;

}

/* 表单样式 */
.form_style /deep/ .el-input__inner {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #303133;
  font-weight: 500;
  font-size: 13px;
}

.form_style /deep/ .el-form-item__label {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #606266 !important;
  font-weight: 700;
  font-size: 14px;
}

.form_style /deep/ .el-form-item {
  margin: 5px 15px 5px 5px;
}
</style>

<style>
/* tooltip样式 */
.atooltip.el-tooltip__popper[x-placement^="right"] .popper__arrow {
  border-top-color: #72777b;
}

.atooltip.el-tooltip__popper[x-placement^="right"] .popper__arrow:after {
  border-top-color: #72777b;
}

.atooltip {
  background: #72777b !important;
  color: #ffc20e !important;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
}
</style>
