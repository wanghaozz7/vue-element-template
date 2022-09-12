<template>
  <div class="container">
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="name" label="指标" width="180" header-align="center"> </el-table-column>
      <el-table-column prop="detail" label="检查内容" min-width="180" align="center">
      </el-table-column>
      <el-table-column prop="default_value" label="默认值" align="center" width="100"></el-table-column>
      <el-table-column prop="step" label="步长" align="center" width="100"></el-table-column>
      <el-table-column prop="allow" label="修改方式" align="center" width="100"></el-table-column>
      <el-table-column width="170">
        <!-- 添加一级指标 -->
        <template slot="header" slot-scope="scope">
          <el-popover placement="bottom" width="300" v-model="root_visible" @hide="clean_holder">
            <el-input v-model="item" placeholder="一级指标"></el-input>
            <div style="text-align: right; margin-top: 5px">
              <el-button size="mini" type="text"><i class="el-icon-close"></i>
              </el-button>
              <el-button type="primary" size="mini"><i class="el-icon-check"></i>
              </el-button>
            </div>
            <el-button style="margin: 0 12.5px" @click="add_target" slot="reference">添加一级指标</el-button>
          </el-popover>
        </template>
        <template slot-scope="scope">
          <div class="button_container">
            <!-- 重命名一、二级指标 -->
            <el-popover placement="left" width="300" v-model="rename_visible[scope.$index]" @hide="clean_holder"
              v-if="scope.row.level <= 2">
              <el-input v-model="item" placeholder="修改后的指标"></el-input>
              <div style="text-align: right; margin-top: 5px">
                <el-button size="mini" type="text" @click="rename_cancel(scope.$index)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="rename_confirm(scope.$index)"><i
                    class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button type="primary" size="mini" icon="el-icon-edit" slot="reference"></el-button>
            </el-popover>
            <!-- 修改三级指标 -->
            <el-popover placement="left" width="400" v-model="update_visible[scope.$index]" @hide="clean_holder" v-else>
              <el-form ref="form" :model="info" label-width="85px" label-position="left" size="small" :inline="true">
                <div class="form_style">
                  <el-form-item label="指标名称">
                    <el-input v-model="info.label" :placeholder="old_info.label" style="width: 260px;"></el-input>
                  </el-form-item>
                  <el-form-item label="检查内容">
                    <el-input v-model="info.content" :placeholder="old_info.content" style="width: 260px;"></el-input>
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
                      <el-input v-model="info.default_value" :placeholder="old_info.default_value"
                        style="float: left;width: 60px;">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="步长" label-width="50px">
                      <el-select v-model="info.step" style="float: left;width: 60px;">
                        <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                      <div style="text-align: right;float: left;margin-left:7px">
                        <el-button size="mini" type="text" @click="update_cancel(scope.$index)"><i
                            class="el-icon-close"></i>
                        </el-button>
                        <el-button type="primary" size="mini" @click="update_confirm(scope.$index)"><i
                            class="el-icon-check"></i>
                        </el-button>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
              </el-form>
              <el-button type="primary" size="mini" icon="el-icon-edit" slot="reference"></el-button>
            </el-popover>
            <!-- 添加二级指标 -->
            <el-popover placement="left" width="300" v-model="add_visible[scope.$index]" @hide="clean_holder"
              v-if="scope.row.level === 1">
              <el-input v-model="item" placeholder="二级指标"></el-input>
              <div style="text-align: right; margin-top: 5px;">
                <el-button size="mini" type="text" @click="add_cancel(scope.$index)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="add_confirm(scope.$index)"><i class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button size="mini" type="success" icon="el-icon-plus" slot="reference"></el-button>
            </el-popover>
            <!-- 添加三级指标 -->
            <el-popover placement="left" width="400" v-model="third_visible[scope.$index]" @hide="clean_holder"
              v-else-if="scope.row.level === 2">
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
                      <el-input v-model="info.default_value" :placeholder="old_info.default_value"
                        style="float: left;width: 60px;">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="步长" label-width="50px">
                      <el-select v-model="info.step" style="float: left;width: 60px;">
                        <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                      <div style="text-align: right;float: left;margin-left:7px">
                        <el-button size="mini" type="text" @click="third_cancel(scope.$index)"><i
                            class="el-icon-close"></i>
                        </el-button>
                        <el-button type="primary" size="mini" @click="third_confirm(scope.$index)"><i
                            class="el-icon-check"></i>
                        </el-button>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
              </el-form>
              <el-button size="mini" type="success" icon="el-icon-plus" slot="reference"></el-button>
            </el-popover>
            <!-- 删除指标 -->
            <el-popover placement="top" width="160" v-model="delete_visible[scope.$index]">
              <p>确认删除？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="delete_cancel(scope.$index)"><i class="el-icon-close"></i>
                </el-button>
                <el-button type="primary" size="mini" @click="delete_confirm(scope.$index)"><i
                    class="el-icon-check"></i>
                </el-button>
              </div>
              <el-button type="danger" size="mini" icon="el-icon-delete" slot="reference"></el-button>
            </el-popover>

          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-table
      :data="tableData1"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "一级指标",
          level: 1,
          detail: "",
          children: [
            {
              id: 2,
              name: "二级指标",
              level: 2,
              detail: "",
              children: [
                {
                  id: 3,
                  name: "三级指标",
                  level: 3,
                  detail: "三级指标检查内容",
                  default_value: 1,
                  step: 1,
                  allow: '加分'
                },
              ],
            },
          ],
        },
        {
          id: 4,
          name: "一级指标",
          level: 1,
          detail: "",
          children: [
            {
              id: 5,
              name: "二级指标",
              level: 2,
              detail: "",
              children: [
                {
                  id: 6,
                  name: "三级指标",
                  level: 3,
                  detail: "三级指标检查内容",
                  default_value: 1,
                  step: 1,
                  allow: '加分'
                },
                {
                  id: 7,
                  name: "三级指标",
                  level: 3,
                  detail: "三级指标检查内容",
                  default_value: 1,
                  step: 1,
                  allow: '扣分'
                },
              ],
            },
            {
              id: 8,
              name: "二级指标",
              level: 2,
              detail: "",
              children: [
                {
                  id: 9,
                  name: "三级指标",
                  level: 3,
                  detail: "三级指标检查内容",
                  default_value: 1,
                  step: 1,
                  allow: '任意'
                },
                {
                  id: 10,
                  name: "三级指标",
                  level: 3,
                  detail: "三级指标检查内容",
                  default_value: 1,
                  step: 1,
                  allow: '任意'
                },
              ],
            },
          ],
        },
      ],
      add_visible: [],
      third_visible: [],
      delete_visible: [],
      rename_visible: [],
      update_visible: [],
      root_visible: false,
      item: '',
      info: {
        label: '',
        content: '',
        default_value: 0,
        step: 1,
        allow: 'add'
      },
      old_info: {
        label: '',
        content: '',
        default_value: 0,
        step: 1,
        allow: 'add'
      }
    };
  },
  methods: {
    add_target() {
      //添加一级指标
    },
    root_confirm() {//添加一级指标
      this.$store.commit('add_root', this.item);
      this.root_visible = false;
    },
    root_cancel() {//取消添加一级指标
      this.root_visible = false;
    },
    add_confirm(idx) {//添加二级指标
      // const info = {
      //   id: data.id,
      //   level: 1,
      //   label: this.item,
      // }
      // store.commit('add_node', info);

      //添加二级指标

      this.$set(this.add_visible, idx, false);
    },
    add_cancel(idx) {//取消添加二级指标
      this.$set(this.add_visible, idx, false);
    },
    third_confirm(idx) {//添加三级指标
      // const info = {
      //   id: data.id,
      //   level: 2,
      //   label: this.info.label,
      //   content: this.info.content,
      //   default_value: this.info.default_value,
      //   step: this.info.step,
      //   allow: this.info.allow
      // }
      // store.commit('add_node', info);

      //添加三级指标

      this.$set(this.third_visible, idx, false);
    },
    third_cancel(idx) {//取消添加三级指标
      this.$set(this.third_visible, idx, false);
    },
    delete_confirm(idx) {//确认删除
      // const info = {
      //   id: data.id,
      //   level: data.level,
      //   item: this.item
      // }
      // store.commit('delete_node', info);

      // 删除节点

      this.$set(this.delete_visible, idx, false);
    },
    delete_cancel(idx) {//取消删除
      this.$set(this.delete_visible, idx, false);
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
    rename_confirm(idx) {//确认重命名

      // const info = {
      //   id: data.id,
      //   level: data.level,
      //   item: this.item
      // }
      // store.commit('rename_node', info);

      //重命名

      this.$set(this.rename_visible, idx, false);
    },
    rename_cancel(idx) {//取消重命名
      this.$set(this.rename_visible, idx, false);
    },
    update_confirm(idx) {//确认修改三级指标
      // const info = {
      //   id: data.id,
      //   label: this.info.label,
      //   content: this.info.content,
      //   default_value: this.info.default_value,
      //   step: this.info.step,
      //   allow: this.info.allow
      // };
      // store.commit('update_node', info);

      //修改三级指标

      this.$set(this.update_visible, idx, false);
    },
    update_cancel(idx) {//取消修改三级指标
      this.$set(this.update_visible, idx, false);
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
      this.table_data = [];
      this.tree_count = [];
      for (let t1 of this.data) {
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
    },
    jurisdiction_change() {//权限切换
      store.commit('jurisdiction_change');
    }
  },
  created() {
    //申请table的数据
  },
};
</script>

<style scoped>
.container {
  margin: 20px;
}

.button_container {
  flex: 1;
  display: flex;
  align-items: center;
}

.button_container span {
  margin: auto;
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
