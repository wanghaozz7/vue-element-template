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
        <!-- 功能栏 -->
        <el-row style="width: 100%; margin-bottom: 25px" type="flex" justify="space-between">
          <!-- 年级和班级-->
          <el-col :span="6" style="padding: 0">
            <el-select v-model="form.selected_grade" filterable allow-create default-first-option placeholder="选择或输入年级"
              :clearable="true" @change="grade_change" style="float: left; width: calc(50% - 5px); margin-right: 10px">
              <el-option v-for="item in option_grade" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
            <el-select v-model="form.selected_class" filterable allow-create default-first-option placeholder="选择或输入班别"
              :clearable="true" @change="class_change" style="float: left; width: calc(50% - 5px)">
              <el-option v-for="item in option_class" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
          <!-- 备注和提交 -->
          <el-col :span="11" style="padding: 0">
            <el-input v-model="form.remark" style="float: left; width: calc(100% - 81px); margin-right: 10px"
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
          <el-table-column label="分值" width="220px" align="center">
            <template slot-scope="scope">
              <el-input-number v-model="form.data[scope.$index].score"
                :min="jurisdiction === true ? -100 : form.data[scope.$index].min"
                :max="jurisdiction === true ? 100 :  form.data[scope.$index].max" :step="tableData[scope.$index].step">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="打分对象" width="180px" align="center">
            <template slot-scope="scope">
              <el-switch v-model="form.data[scope.$index].extend" active-text="个人" inactive-text="集体"
                active-color="#FF770F" inactive-color="#80D1C8" @change="active_change">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="学生" width="250px" v-for="item in column_student" align="center">
            <template slot-scope="scope">
              <div v-show="form.data[scope.$index].extend">
                <el-button type="text" @click="dialogVisible = true;selectedRow = scope.$index">
                  已选{{form.data[scope.$index].studentSelected.length}}人
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 选择学生 -->
    <el-dialog :visible.sync="dialogVisible" width="1100px" top="5vh">
      <div class="board">
        <KanbanShow :key="1" :list="form.data[selectedRow].studentList" :group="group" class="kanban todo"
          header-text="未选中" />
        <KanbanSelect :key="2" :list="form.data[selectedRow].studentSelected" :group="group" class="kanban working"
          header-text="已选中" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import KanbanShow from '@/components/Kanban/show'
import KanbanSelect from '@/components/Kanban/select'
export default {
  name: "Score",
  components: {
    KanbanShow,
    KanbanSelect
  },
  data() {
    const target = [
      {
        id: 1,
        label: '学风纪律',
        level: 1,
        children: [{
          id: 8,
          label: '升旗仪式',
          level: 2,
          children: [{
            id: 30,
            label: '升旗仪式三级指标1',
            level: 3,
            content: '升旗仪式三级指标1检查内容',
            default_value: 1,
            step: 1,
            allow: 'add'
          },
          {
            id: 31,
            label: '升旗仪式三级指标2',
            level: 3,
            content: '升旗仪式三级指标2检查内容',
            default_value: 2,
            step: 2,
            allow: 'sub'
          },
          {
            id: 32,
            label: '升旗仪式三级指标3',
            level: 3,
            content: '升旗仪式三级指标3检查内容',
            default_value: 3,
            step: 3,
            allow: 'all'
          }]
        }, {
          id: 9,
          label: '出勤',
          level: 2,
          children: [{
            id: 33,
            label: '出勤三级指标',
            level: 3,
            content: '出勤三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 10,
          label: '日常违纪、学生安全违纪',
          level: 2,
          children: [{
            id: 34,
            label: '日常违纪三级指标',
            level: 3,
            content: '日常违纪三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 11,
          label: '就餐违纪、外卖违纪',
          level: 2,
          children: [{
            id: 35,
            label: '就餐违纪三级指标',
            level: 3,
            content: '就餐违纪三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 12,
          label: '交心里委员晴雨表',
          level: 2,
          children: [{
            id: 36,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 13,
          label: '学生检查晚修纪律',
          level: 2,
          children: [{
            id: 37,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 14,
          label: '接受处分',
          level: 2,
          children: [{
            id: 38,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 15,
          label: '课堂班务日志上交',
          level: 2,
          children: [{
            id: 39,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }]
      }, {
        id: 2,
        label: '仪容仪表',
        level: 1,
        children: [{
          id: 16,
          label: '发型、校服、校卡、首饰',
          level: 2,
          children: [
            {
              id: 27,
              label: '发型',
              level: 3,
              content: '发型是否满足学生要求',
              default_value: 0,
              step: 1,
              allow: 'all'

            },
            {
              id: 28,
              label: '校服',
              level: 3,
              content: '学生在校是否着装校服',
              default_value: 0,
              step: 1,
              allow: 'all'
            },
            {
              id: 29,
              label: '装扮',
              level: 3,
              content: '装扮是否合乎学生标准',
              default_value: 0,
              step: 1,
              allow: 'all'
            }
          ]
        }]
      }, {
        id: 3,
        label: '两操',
        level: 1,
        children: [{
          id: 17,
          label: '课间学生出勤',
          level: 2,
          children: [{
            id: 40,
            label: '课间学生出勤三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 18,
          label: '课间班主任出勤',
          level: 2,
          children: [{
            id: 41,
            label: '课间班主任出勤三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 19,
          label: '课间质量',
          level: 2,
          children: [{
            id: 42,
            label: '课间质量三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 20,
          label: '眼保健操',
          level: 2,
          children: [{
            id: 43,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }]
      }, {
        id: 4,
        label: '宿舍检查',
        level: 1,
        children: [{
          id: 21,
          label: '纪律',
          level: 2,
          children: [{
            id: 44,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 22,
          label: '内务',
          level: 2,
          children: [{
            id: 45,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }]
      }, {
        id: 5,
        label: '环境卫生',
        level: 1,
        children: [{
          id: 23,
          label: '公共卫生',
          level: 2,
          children: [{
            id: 46,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 24,
          label: '常规卫生（学生会检查）',
          level: 2,
          children: [{
            id: 47,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 25,
          label: '教学楼日常卫生检查',
          level: 2,
          children: [{
            id: 48,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }, {
          id: 26,
          label: '垃圾分类',
          level: 2,
          children: [{
            id: 49,
            label: '三级指标',
            level: 3,
            content: '三级指标检查内容',
            default_value: 0,
            step: 1,
            allow: 'all'
          }]
        }]
      }
    ];
    const option_grade = ['初一', '初二'];
    const option_class = ['1班', '2班'];
    const form = {
      selected_grade: '',
      selected_class: '',
      remark: '',
      data: []
    };
    const tableData = target[0].children[0].children;
    const jurisdiction = false;
    const studentList = [
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
    ];
    console.log(tableData);
    return {
      activeName: "学风纪律",//一级指标
      target,//指标树
      option_grade,//年级集合
      option_class,//班级集合
      tableData,//三级指标的常量
      first: 0,//一级指标的索引
      second: 0,//二级指标的索引
      selectedRow: 0,//当前聚焦的行
      min: [],//加分范围
      max: [],//扣分范围
      personal: [false, false, false],
      column_student: [],//学生列是否展开
      jurisdiction,//控制是否自由加减分
      form,//三级指标的变量:得分，选中学生，展开变量
      dialogVisible: false,//对话框
      group: '学生',
      studentList//班级学生列表
    };
  },
  methods: {
    buttonClick(index, idx) {//选择二级指标
      //更新高亮按钮
      this.first = index;
      this.second = idx;
      this.refreshForm(index, idx);
    },
    grade_change(value) {//更新年级
      //更新班级数据
    },
    class_change(value) {//更新班级
      //更新学生列表
    },
    active_change() {//扩展选择学生列
      for (let item of this.form.data) {
        if (item.extend === true) {
          //遇到一个需要选择学生就需要扩展列
          this.column_student = [];
          this.column_student.push(true);
          return;
        }
      }
      this.column_student = [];
    },
    submit() {//提交数据
      console.log(this.form);
    },
    hover_random() {//随机生成悬浮颜色
      const color_card = ['button_color1', 'button_color2', 'button_color3', 'button_color4', 'button_color5', 'button_color6', 'button_color7']
      let num = Math.floor(Math.random() * 7);
      return color_card[num];
    },
    choose_random(index, idx) {//随机生成选中颜色
      const color_card = ['button_color1_chosen', 'button_color2_chosen', 'button_color3_chosen', 'button_color4_chosen', 'button_color5_chosen', 'button_color6_chosen', 'button_color7_chosen']
      let num = Math.floor(Math.random() * 7);
      if (index === this.first && idx === this.second) return color_card[num];
      return '';
    },
    refreshForm(index, idx) {//更新动态变量
      this.form.selected_class = '';//重置班级年级备注
      this.form.selected_grade = '';
      this.form.remark = '';
      this.form.data = [];//重置默认值
      this.tableData = this.target[index].children[idx].children;
      for (let item of this.tableData) {
        const min = 0;
        const max = 10;
        if (item.allow === "add") {
          min = item.default_value;
          max = item.default_value + item.step;
        } else if (item.allow === "sub") {
          min = item.default_value - item.step;
          max = item.default_value;
        } else {
          min = item.default_value - item.step;
          max = item.default_value + item.step;
        }
        let obj = {
          score: item.default_value,
          studentList: this.studentList,
          studentSelected: [],
          extend: false,
          min,
          max
        }
        this.form.data.push(obj)
      }
      this.active_change();
    }
  },
  created() {
    //初始化数据
    this.refreshForm(0, 0);
  }
}
</script>

<style scoped>
.board {
  width: 1060px;
  margin: auto;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
  transition: all .8s;
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
