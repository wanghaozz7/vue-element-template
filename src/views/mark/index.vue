<template>
  <div style="margin: 1vh 1vw;overflow: hidden;">
    <!-- 一级指标tab页 -->
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane v-for="(item, index) in target" :key="item.id" :label="item.label" :name="item.label">
        <!-- 二级指标button -->
        <el-button round v-for="(button, idx) in item.children" @click="buttonClick(index, idx)"
          :autofocus="idx === 0 && index === 0" style="margin-top: 10px;margin-left: 15px;">
          {{ button.label }}
        </el-button>
        <el-divider></el-divider>
        <el-row style="width: 100%;margin-bottom: 25px;" type="flex" justify="space-between">
          <!-- 年级和班级-->
          <el-col :span="8" style="padding: 0;">
            <el-select v-model="selected_grade" filterable allow-create default-first-option placeholder="选择或输入年级"
              :clearable="true" @change="grade_change" style="float: left;width: calc(50% - 5px);margin-right: 10px;">
              <el-option v-for="item in option_grade" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
            <el-select v-model="selected_class" filterable allow-create default-first-option placeholder="选择或输入班别"
              :clearable="true" @change="class_change" style="float: left;width: calc(50% - 5px);">
              <el-option v-for="item in option_class" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
          <!-- 备注 -->
          <el-col :span="8" style="padding: 0;">
            <el-input v-model="remarks" style="float: left;width: calc(100% - 80px);margin-right: 10px;"
              placeholder="备注">
            </el-input>
            <el-button type="primary">提交</el-button>
          </el-col>
        </el-row>
        <!-- 二级指标下的所有三级指标(打分项) -->
        <el-table style="width: 100%;" :data="tableData" :border="true" :highlight-current-row="true"
          :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
          <el-table-column prop="label" label="项目内容" width="250px">
          </el-table-column>
          <el-table-column prop="content" label="评分标准" min-width="500px">
          </el-table-column>
          <el-table-column prop="data" label="分值" width="220px">
            <template slot-scope="{row, $index}">
              <el-input-number v-model="default_value[$index]" :min="jurisdiction === true ? -100 : min[$index]"
                :max="jurisdiction === true ? 100 : max[$index]" label="修改分值" :step="step[$index]">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="" label="打分对象" width="180px">
            <template slot-scope="{row, $index}">
              <el-switch v-model="personal[$index]" active-text="个人" inactive-text="集体" active-color="#13ce66"
                inactive-color="#ff4949" @change="active_change">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="" label="学生" width="250px" v-for="item in column_student">
            <template slot-scope="{row, $index}">
              <el-select v-model="selected_student" filterable allow-create default-first-option placeholder="选择或输入学生"
                :clearable="true" @change="student_change" v-show="personal[$index]">
                <el-option v-for="item in option_student" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import store from '@/store';
export default {
  name: '',
  data() {
    let target = store.state.target.target;
    let school = store.state.school.data;
    let option_grade = [];
    let option_class = [];
    let option_student = [];
    let jurisdiction = store.state.target.jurisdiction;
    for (let item of school) {
      option_grade.push(item.label);
      for (let c of item.classes) {
        if (option_class.indexOf(c.idx) === -1) option_class.push(c.idx);
        for (let student of c.students) option_student.push(student.name);
      }
    }
    return {
      activeName: '学风纪律',
      target,
      selected_grade: '',
      selected_class: '',
      selected_student: '',
      option_grade,
      option_class,
      option_student,
      school,
      //默认数据
      tableData: target[0].children[0].children,
      first: 0,
      second: 0,
      current_score: ['暂无', '暂无', '暂无'],
      text_content: '分值:',
      step: [1, 2, 3],
      default_value: [1, 2, 3],
      min: [],
      max: [],
      personal: [false, false, false],
      column_student: [],
      remarks: '',
      jurisdiction
    };
  },
  methods: {
    buttonClick(index, idx) {//选择二级指标
      this.tableData = this.target[index].children[idx].children;
      this.first = index;
      this.second = idx;
      this.step = [];//步长
      this.default_value = [];//默认值
      this.min = [];
      this.max = [];
      //先将计数器配置清空
      for (let idx in this.tableData) {
        this.step.push(this.tableData[idx].step);
        this.default_value.push(this.tableData[idx].default_value);
        if (this.tableData[idx].allow === 'add') {
          this.min.push(this.tableData[idx].default_value);
          this.max.push(this.tableData[idx].default_value + this.tableData[idx].step);
        } else if (this.tableData[idx].allow === 'sub') {
          this.min.push(this.tableData[idx].default_value - this.tableData[idx].step);
          this.max.push(this.tableData[idx].default_value);
        } else {
          this.min.push(this.tableData[idx].default_value - this.tableData[idx].step);
          this.max.push(this.tableData[idx].default_value + this.tableData[idx].step);
        }
      }
    },
    grade_change(value) {//更新年级
      //更新选择框
      if (value === '') {//清空选择
        this.selected_class = '';
        this.option_class = [];
        this.selected_student = '';
        this.option_student = [];
        for (let item of this.school) {
          for (let c of item.classes) {
            if (this.option_class.indexOf(c.idx) === -1) this.option_class.push(c.idx);
            for (let student of c.students) this.option_student.push(student.name);
          }
        }
        return;
      }
      for (let item of this.school) {
        if (item.label !== value) continue;
        this.option_class = [];
        this.option_student = [];
        this.selected_class = '';
        this.selected_student = '';
        //重置班级和学生
        for (let c of item.classes) {
          if (this.option_class.indexOf(c.idx) === -1) this.option_class.push(c.idx);
          for (let student of c.students) this.option_student.push(student.name);
        }
        return;
      }
    },
    class_change(value) {//更新班级
      //更新选择框
      if (value === '') {//清空选择
        this.selected_class = '';
        this.selected_student = '';
        this.option_student = [];
        for (let item of this.school) {
          if (item.label !== this.selected_grade) continue;
          for (let c of item.classes) for (let student of c.students) this.option_student.push(student.name);
          return;
        }
        return;
      }
      for (let item of this.school) {
        if (item.label !== this.selected_grade) continue;
        this.option_student = [];
        this.selected_student = '';
        //重置学生
        for (let c of item.classes) {
          if (c.idx !== value) continue;
          for (let student of c.students) this.option_student.push(student.name);
        }
        break;
      }
    },
    student_change(value) {//更新学生
    },
    active_change() {//更新列的扩展
      for (let item of this.personal) {
        if (item === true) {//遇到一个需要选择学生就需要扩展列
          this.column_student = [];
          this.column_student.push(true);
          return;
        }
      }
      this.column_student = [];
    }
  }
};
</script>

<style scoped>
</style>