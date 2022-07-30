<template>
  <div style="margin: 1vh 1vw;">
    <!-- 一级指标tab页 -->
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="(item, index) in target" :key="item.id" :label="item.label" :name="item.label">
        <!-- 二级指标button -->
        <el-button round v-for="(button, idx) in item.children" @click="buttonClick(index, idx)"
          :autofocus="idx === 0 && index === 0">
          {{ button.label }}
        </el-button>
      </el-tab-pane>
    </el-tabs>
    <el-divider></el-divider>
    <!-- header -->
    <el-row :gutter="25">
      <!-- 年级 -->
      <el-col :span="3" :push="1">

        <el-select v-model="selected_grade" filterable allow-create default-first-option placeholder="选择或输入年级"
          :clearable="true" @change="grade_change">
          <el-option v-for="item in option_grade" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
      <!-- 班级 -->
      <el-col :span="3" :push="1">
        <el-select v-model="selected_class" filterable allow-create default-first-option placeholder="选择或输入班别"
          :clearable="true" @change="class_change">
          <el-option v-for="item in option_class" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
      <!-- 备注 -->
      <el-col :span="7" :push="7">
        <el-input v-model="remarks"></el-input>
      </el-col>
      <!-- 提交 -->
      <el-col :span="3" :push="7">
        <el-button type="primary">提交</el-button>
      </el-col>
    </el-row>
    <!-- 二级指标下的所有三级指标(打分项) -->
    <el-table :data="tableData" style="width: 80vw;margin: 30px 30px;" :border="true" :highlight-current-row="true"
      :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="label" label="项目内容" min-width="20%">
      </el-table-column>
      <el-table-column prop="content" label="评分标准" min-width="30%">
      </el-table-column>
      <el-table-column prop="data" label="分值" min-width="20%">
        <template slot-scope="{row, $index}">
          <el-input-number v-model="default_value[$index]" :min=min[$index] :max=max[$index] label="修改分值"
            :step="step[$index]">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="" label="打分对象" min-width="15%">
        <template slot-scope="{row, $index}">
          <el-switch v-model="personal[$index]" active-text="个人" inactive-text="集体" active-color="#13ce66"
            inactive-color="#ff4949" @change="active_change">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="" label="学生" min-width="15%" v-for="item in column_student">
        <template slot-scope="{row, $index}">
          <el-select v-model="selected_student" filterable allow-create default-first-option placeholder="选择或输入学生"
            :clearable="true" @change="student_change" v-show="personal[$index]">
            <el-option v-for="item in option_student" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
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
      min: [1, -100, -100],
      max: [100, 2, 100],
      personal: [false, false, false],
      column_student: [],
      remarks: ''
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
      this.min = [];
      //先将计数器配置清空
      for (let idx in this.tableData) {
        this.step.push(this.tableData[idx].step);
        this.default_value.push(this.tableData[idx].default_value);
        if (this.tableData[idx].allow === 'add') {
          this.min.push(this.tableData[idx].default_value);
          this.max.push(100);
        } else if (this.tableData[idx].allow === 'sub') {
          this.min.push(-100);
          this.max.push(this.tableData[idx].default_value);
        } else {
          this.min.push(-100);
          this.max.push(100);
        }
      }
    },
    grade_change(value) {//更新年级
      //更新数据
      if (value === '') {//清空
        this.text_content = '得分:';
        for (let idx in this.current_score) this.$set(this.current_score, idx, '暂无');//将所有项清空
      } else {//计算年级总得分
        this.text_content = value + '级总分值:';
        for (let item of this.school) {
          if (item.label !== value) continue;//选择年级
          let sum = [];
          for (let c of item.classes) {
            for (let student of c.students) {
              let tmp = student.target[this.first][this.second];
              for (let idx in tmp) {
                while (sum.length <= idx) sum.push(0);//装填初始值
                sum[idx] += tmp[idx];
              }
            }
          }
          this.current_score = sum;
          break;
        }
      }

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
      //更新数据
      if (value === '') {//只保留年级
        if (this.selected_grade !== '') {//计算总年级得分
          this.text_content = this.selected_grade + '级总分值:';
          for (let item of this.school) {
            if (item.label !== value) continue;//选择年级
            let sum = [];
            for (let c of item.classes) {
              for (let student of c.students) {
                let tmp = student.target[this.first][this.second];
                for (let idx in tmp) {
                  while (sum.length <= idx) sum.push(0);//装填初始值
                  sum[idx] += tmp[idx];
                }
              }
            }
            this.current_score = sum;
            break;
          }
        } else {//置空

        }
      } else {//保留了年级和班级
        if (this.selected_grade !== '') {//计算某个年级的某班总得分
          this.text_content = this.selected_grade + value + '总得分:';
          for (let item of this.school) {//年级
            if (item.label !== this.selected_grade) continue;
            for (let c of item.classes) {//班级
              if (c.idx !== value) continue;
              let sum = [];
              for (let student of c.students) {
                let tmp = student.target[this.first][this.second];
                for (let idx in tmp) {
                  while (sum.length <= idx) sum.push(0);//装填初始值
                  sum[idx] += tmp[idx];
                }
              }
              this.current_score = sum;
              break;
            }
            break;
          }
        } else {//只有班级(无效数据)

        }
      }




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
      //更新数据
      if (value === '') {//清空选择
        if (this.selected_grade !== '' && this.selected_class !== '') {//显示某个班的总得分
          this.text_content = this.selected_grade + this.selected_class + '总得分:';
          for (let item of this.school) {//年级
            if (item.label !== this.selected_grade) continue;
            for (let c of item.classes) {//班级
              if (c.idx !== this.selected_class) continue;
              let sum = [];
              for (let student of c.students) {
                let tmp = student.target[this.first][this.second];
                for (let idx in tmp) {
                  while (sum.length <= idx) sum.push(0);//装填初始值
                  sum[idx] += tmp[idx];
                }
              }
              this.current_score = sum;
              break;
            }
            break;
          }
        }
      } else {//重置选择
        this.text_content = '分值:';
        for (let item of this.school) {
          if (this.selected_grade !== '' && item.label !== this.selected_grade) continue;
          console.log('school');
          for (let c of item.classes) {
            if (this.selected_class !== '' && c.idx !== this.selected_class) continue;
            console.log('classes');

            for (let student of c.students) {
              if (student.name !== value) continue;
              console.log('students');

              this.current_score = [];
              let tmp = student.target[this.first][this.second];
              for (let score of tmp) {
                this.current_score.push(score);
                console.log('tmp');
              }
              return;
            }
          }
        }
      }
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