<template>
  <div style="margin: 1vh 1vw;">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="(item, index) in target" :key="item.id" :label="item.label" :name="item.label">
        <el-button round v-for="(button, idx) in item.children" @click="buttonClick(index, idx)" :autofocus="idx === 0">
          {{ button.label }}
        </el-button>
      </el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" style="width: 80vw;margin: 30px 30px;" :border="true" :highlight-current-row="true">
      <el-table-column prop="label" label="项目内容" min-width="15%">
      </el-table-column>
      <el-table-column prop="content" label="评分标准" min-width="30%">
      </el-table-column>
      <el-table-column prop="data" label="对象" min-width="55%">
        <!-- 表头 -->
        <template slot-scope="scope" slot="header">
          <el-row :gutter="25">
            <el-col :span="7" :push="1">
              <!-- 年级 -->
              <el-select v-model="selected_grade" filterable allow-create default-first-option placeholder="选择或输入年级"
                :clearable="true" @change="grade_change">
                <el-option v-for="item in option_grade" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="7" :push="1">
              <!-- 班级 -->
              <el-select v-model="selected_class" filterable allow-create default-first-option placeholder="选择或输入班别"
                :clearable="true" @change="class_change">
                <el-option v-for="item in option_class" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="7" :push="1">
              <!-- 学生 -->
              <el-select v-model="selected_student" filterable allow-create default-first-option placeholder="学生"
                :clearable="true" @change="student_change">
                <el-option v-for="item in option_student" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </template>
        <!-- 表体 -->
        <template slot-scope="{row, $index}">
          <el-row>
            <el-col :span="10" :push="1" style="display: flex;align-items: center;height: 40px;">
              <span>{{ text_content }}{{ current_score[$index] }}</span>
            </el-col>
            <el-col :span="12">
              <el-input-number v-model="row.score" :min="-10" :max="10" label="描述文字">
              </el-input-number>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    let target = this.$store.state.target.target;
    let school = this.$store.state.school.data;
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
      tableData: target[0].children[0].children,
      selected_grade: '',
      selected_class: '',
      selected_student: '',
      option_grade,
      option_class,
      option_student,
      school,
      first: 0,
      second: 0,
      current_score: ['暂无', '暂无', '暂无'],
      text_content: '分值:'
    };
  },
  methods: {
    buttonClick(index, idx) {//选择二级指标
      this.tableData = this.target[index].children[idx].children;
      this.first = index;
      this.second = idx;
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


    }
  }
};
</script>

<style scoped>
</style>