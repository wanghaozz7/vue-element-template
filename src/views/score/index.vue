<template>
  <div style="margin: 1vh 1vw; overflow: hidden">
    <!-- 一级指标tab页 -->
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane v-for="(item, index) in target" :key="item.id" :label="item.label" :name="item.label">
        <!-- 二级指标button -->
        <el-button round v-for="(button, idx) in item.children" @click="buttonClick(index, idx)"
          :autofocus="idx === 0 && index === 0" class="button_style" :class=[hover_random(),choose_random(index,idx)]>
          {{ button.label }}
        </el-button>
        <el-divider></el-divider>
        <el-row style="width: 100%; margin-bottom: 25px" type="flex" justify="space-between">
          <!-- 年级和班级-->
          <el-col :span="8" style="padding: 0">
            <el-select v-model="selected_grade" filterable allow-create default-first-option placeholder="选择或输入年级"
              :clearable="true" @change="grade_change" style="float: left; width: calc(50% - 5px); margin-right: 10px">
              <el-option v-for="item in option_grade" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
            <el-select v-model="selected_class" filterable allow-create default-first-option placeholder="选择或输入班别"
              :clearable="true" @change="class_change" style="float: left; width: calc(50% - 5px)">
              <el-option v-for="item in option_class" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
          <!-- 备注 -->
          <el-col :span="8" style="padding: 0">
            <el-input v-model="remarks" style="float: left; width: calc(100% - 81px); margin-right: 10px"
              placeholder="备注">
            </el-input>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-col>
        </el-row>
        <!-- 二级指标下的所有三级指标(打分项) -->
        <el-table style="width: 100%" :data="tableData" :border="true" :highlight-current-row="true">
          <el-table-column prop="label" label="指标名称" width="250px" align="center">
          </el-table-column>
          <el-table-column prop="content" label="评分标准" min-width="500px">
          </el-table-column>
          <el-table-column prop="data" label="分值" width="220px" align="center">
            <template slot-scope="{ row, $index }">
              <el-input-number v-model="default_value[$index]" :min="jurisdiction === true ? -100 : min[$index]"
                :max="jurisdiction === true ? 100 : max[$index]" label="修改分值" :step="step[$index]">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="" label="打分对象" width="180px" align="center">
            <template slot-scope="{ row, $index }">
              <el-switch v-model="personal[$index]" active-text="个人" inactive-text="集体" active-color="#13ce66"
                inactive-color="#ff4949" @change="active_change">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="" label="学生" width="250px" v-for="item in column_student" align="center">
            <template slot-scope="{ row, $index }">
              <!-- <el-select
                v-model="selected_student"
                filterable
                allow-create
                default-first-option
                placeholder="选择或输入学生"
                :clearable="true"
                @change="student_change"
                v-show="personal[$index]"
              >
                <el-option
                  v-for="item in option_student"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select> -->
              <div v-show="personal[$index]">
                <!-- <h4 style="margin: 0;"></h4> -->
                <!-- <el-button type="text" @click="dialogFormVisible = true">表单</el-button> -->
                <el-button type="text" @click="dialogTransformVisible = true">已选{{list2.length}}人</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item>
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            <el-checkbox :label="'学生' + item" name="type" v-for="item in 50"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogTransformVisible" width="1100px" top="5vh">
      <div class="board">
        <KanbanShow :key="1" :list="list1" :group="group" class="kanban todo" header-text="未选中" />
        <KanbanSelect :key="2" :list="list2" :group="group" class="kanban working" header-text="已选中" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import KanbanShow from '@/components/Kanban/show'
import KanbanSelect from '@/components/Kanban/select'
import { color } from "echarts/lib/theme/light";
export default {
  name: "Score",
  components: {
    KanbanShow,
    KanbanSelect
  },
  data() {
    const target = store.state.target.target;
    const school = store.state.school.data;
    const option_grade = [];
    const option_class = [];
    const option_student = [];
    const jurisdiction = store.state.target.jurisdiction;
    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };
    const form = {
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    };
    for (let item of school) {
      option_grade.push(item.label);
      for (let c of item.classes) {
        if (option_class.indexOf(c.idx) === -1) option_class.push(c.idx);
        for (let student of c.students) option_student.push(student.name);
      }
    }
    return {
      activeName: "学风纪律",//选中的指标
      target,//指标集合
      selected_grade: "",//被选中的年级
      selected_class: "",//被选中的班级
      option_grade,//年级集合
      option_class,//班级集合
      school,
      //默认数据
      tableData: target[0].children[0].children,
      first: 0,
      second: 0,
      current_score: ["暂无", "暂无", "暂无"],
      text_content: "分值:",
      step: [1, 2, 3],
      default_value: [1, 2, 3],
      min: [],
      max: [],
      personal: [false, false, false],
      column_student: [],
      remarks: "",
      jurisdiction,
      form,
      dialogFormVisible: false,
      dialogTransformVisible: false,
      transformData: generateData(),
      value: [1],
      value4: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      },
      group: 'mission',
      list1: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
        { name: 'Mission', id: 4 },
        { name: 'Mission', id: 5 },
        { name: 'Mission', id: 6 },
        { name: 'Mission', id: 7 },
        { name: 'Mission', id: 8 },
        { name: 'Mission', id: 9 },
        { name: 'Mission', id: 10 },
        { name: 'Mission', id: 11 },
        { name: 'Mission', id: 12 },
        { name: 'Mission', id: 13 },
        { name: 'Mission', id: 14 },
        { name: 'Mission', id: 15 },
        { name: 'Mission', id: 16 },
        { name: 'Mission', id: 17 },
        { name: 'Mission', id: 18 },
        { name: 'Mission', id: 19 },
        { name: 'Mission', id: 20 },
        { name: 'Mission', id: 21 },
        { name: 'Mission', id: 22 },
        { name: 'Mission', id: 23 },
        { name: 'Mission', id: 24 },
        { name: 'Mission', id: 25 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 27 },
        { name: 'Mission', id: 28 },
        { name: 'Mission', id: 29 },
        { name: 'Mission', id: 30 },
        { name: 'Mission', id: 31 },
        { name: 'Mission', id: 32 },
        { name: 'Mission', id: 33 },
        { name: 'Mission', id: 34 },
        { name: 'Mission', id: 35 },
        { name: 'Mission', id: 36 },
        { name: 'Mission', id: 37 },
        { name: 'Mission', id: 38 },
        { name: 'Mission', id: 39 },
        { name: 'Mission', id: 40 },
        { name: 'Mission', id: 41 },
        { name: 'Mission', id: 42 },
        { name: 'Mission', id: 43 },
        { name: 'Mission', id: 44 },
        { name: 'Mission', id: 45 },
        { name: 'Mission', id: 46 },
        { name: 'Mission', id: 47 },
        { name: 'Mission', id: 48 },
        { name: 'Mission', id: 49 },
        { name: 'Mission', id: 50 },
      ],
      list2: [],
      studentList: [],
      studentSelected: []
    };
  },
  methods: {
    buttonClick(index, idx) {
      //选择二级指标
      this.tableData = this.target[index].children[idx].children;
      this.first = index;
      this.second = idx;
      this.step = []; //步长
      this.default_value = []; //默认值
      this.min = [];
      this.max = [];
      //先将计数器配置清空
      for (let idx in this.tableData) {
        this.step.push(this.tableData[idx].step);
        this.default_value.push(this.tableData[idx].default_value);
        if (this.tableData[idx].allow === "add") {
          this.min.push(this.tableData[idx].default_value);
          this.max.push(
            this.tableData[idx].default_value + this.tableData[idx].step
          );
        } else if (this.tableData[idx].allow === "sub") {
          this.min.push(
            this.tableData[idx].default_value - this.tableData[idx].step
          );
          this.max.push(this.tableData[idx].default_value);
        } else {
          this.min.push(
            this.tableData[idx].default_value - this.tableData[idx].step
          );
          this.max.push(
            this.tableData[idx].default_value + this.tableData[idx].step
          );
        }
      }
      for (let idx in this.personal) this.personal[idx] = false
    },
    grade_change(value) {
      //更新年级
      //更新选择框
      if (value === "") {
        //清空选择
        this.selected_class = "";
        this.option_class = [];
        this.selected_student = "";
        this.option_student = [];
        for (let item of this.school) {
          for (let c of item.classes) {
            if (this.option_class.indexOf(c.idx) === -1)
              this.option_class.push(c.idx);
            for (let student of c.students)
              this.option_student.push(student.name);
          }
        }
        return;
      }
      for (let item of this.school) {
        if (item.label !== value) continue;
        this.option_class = [];
        this.option_student = [];
        this.selected_class = "";
        this.selected_student = "";
        //重置班级和学生
        for (let c of item.classes) {
          if (this.option_class.indexOf(c.idx) === -1)
            this.option_class.push(c.idx);
          for (let student of c.students)
            this.option_student.push(student.name);
        }
        return;
      }
    },
    class_change(value) {
      //更新班级
      //更新选择框
      if (value === "") {
        //清空选择
        this.selected_class = "";
        this.selected_student = "";
        this.option_student = [];
        for (let item of this.school) {
          if (item.label !== this.selected_grade) continue;
          for (let c of item.classes)
            for (let student of c.students)
              this.option_student.push(student.name);
          return;
        }
        return;
      }
      for (let item of this.school) {
        if (item.label !== this.selected_grade) continue;
        this.option_student = [];
        this.selected_student = "";
        //重置学生
        for (let c of item.classes) {
          if (c.idx !== value) continue;
          for (let student of c.students)
            this.option_student.push(student.name);
        }
        break;
      }
    },
    student_change(value) {
      //更新学生
    },
    active_change() {
      //更新列的扩展
      for (let item of this.personal) {
        if (item === true) {
          //遇到一个需要选择学生就需要扩展列
          this.column_student = [];
          this.column_student.push(true);
          return;
        }
      }
      this.column_student = [];
    },
    submit() {
      //提交数据
    },
    hover_random() {
      const color_card = ['button_color1', 'button_color2', 'button_color3', 'button_color4', 'button_color5', 'button_color6', 'button_color7']
      let num = Math.floor(Math.random() * 7);
      return color_card[num];
    },
    handleChange() {
      console.log('11');
    },
    choose_random(index, idx) {
      const color_card = ['button_color1_chosen', 'button_color2_chosen', 'button_color3_chosen', 'button_color4_chosen', 'button_color5_chosen', 'button_color6_chosen', 'button_color7_chosen']
      let num = Math.floor(Math.random() * 7);
      if (index === this.first && idx === this.second) return color_card[num];
      return '';
    }
  },
  created() {
  },
};
</script>

<style scoped>
.board {
  width: 1060px;
  margin: auto;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}


.button_style {
  transition: all .8s;
  margin-top: 10px;
  margin-left: 15px;
  font-weight: 900;
}

/* 克莱因蓝 + 松花黄 */
.button_color1_chosen {
  background-color: #FFE76F;
  color: #002EA6;
}

.button_color1:hover {
  background-color: #002EA6;
  color: #FFE76F;
}

/* 马尔斯绿 + 玫瑰粉 */
.button_color2_chosen {
  background-color: #F9D2E4;
  color: #01847F;
}

.button_color2:hover {
  background-color: #01847F;
  color: #F9D2E4;
}

/* 爱马仕橙 + 深蓝色 */
.button_color3_chosen {
  background-color: #FF770F;
  color: #000026;
}

.button_color3:hover {
  background-color: #FF770F;
  color: #000026;
}

/* 奶酪色 + 蒂尼芙蓝 */
.button_color4_chosen {
  background-color: #F8F5D6;
  color: #80D1C8;
}

.button_color4:hover {
  background-color: #F8F5D6;
  color: #80D1C8;
}

/* 中国红 + 淡黄色 */
.button_color5_chosen {
  background-color: #FF0000;
  color: #FAEAD3;
}

.button_color5:hover {
  background-color: #FF0000;
  color: #FAEAD3;
}

/* 范戴克棕 + 浅卡其色 */
.button_color6_chosen {
  background-color: #492D22;
  color: #D8C7B5;
}

.button_color6:hover {
  background-color: #D8C7B5;
  color: #492D22;
}

/* 普鲁士蓝 + 雾灰色 */
.button_color7_chosen {
  background-color: #E5DDD7;
  color: #003153;
}

.button_color7:hover {
  background-color: #003153;
  color: #E5DDD7;
}
</style>
