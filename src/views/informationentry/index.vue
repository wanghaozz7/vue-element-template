<template>
  <div>
    <el-table :data="tableData" style="width: 100%;margin: 30px 30px;" :border="true" :highlight-current-row="true">

      <el-table-column prop="item" label="加减分项目" width="180">
      </el-table-column>
      <el-table-column prop="content" label="检查内容" width="360">
      </el-table-column>

      <el-table-column prop="date" label="年级和班级" width="720">
        <!-- 表头 -->
        <template slot-scope="scope" slot="header">
          <el-row :gutter="25" style="margin-left: 10px;">
            <el-col :span="7" :push="1">
              <!-- 年级 -->
              <el-select v-model="selected_grade" filterable allow-create default-first-option placeholder="选择或输入年级"
                :clearable="true">
                <el-option v-for="item in option_grade" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="7" :push="1">
              <!-- 班级 -->
              <el-select v-model="selected_class" filterable allow-create default-first-option placeholder="选择或输入班别"
                :clearable="true">
                <el-option v-for="item in option_class" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="7" :push="1">
              <!-- 学生 -->
              <el-select v-model="selected_student" filterable allow-create default-first-option placeholder="学生"
                :clearable="true">
                <el-option v-for="item in option_student" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </template>
        <!-- 表内 -->
        <template slot-scope="{row}">
          <el-row :gutter="5" style="margin-left: 20px;">
            <el-col :span="5" :push="1">
              <!-- 加减分开关 -->
              <el-switch v-model="row.judge" active-color="#ff4949 " inactive-color="#13ce66" active-text="减分"
                inactive-text="加分" style="margin-top: 10px;">
              </el-switch>
            </el-col>
            <el-col :span="4" :push="1">
              <!-- 分值 -->
              <el-select v-model="row.score" filterable allow-create default-first-option placeholder="分值">
                <el-option v-for="item in item_score" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="12" :push="1">
              <!-- 备注 -->
              <el-input v-model="row.remark" placeholder="备注"></el-input>
            </el-col>
          </el-row>



        </template>
      </el-table-column>



    </el-table>
  </div>
</template> 

<script>
export default {
  name: 'Informationentry',
  components: {

  },
  data() {
    return {
      tableData: [
        {
          idx: 0,
          item: '行为规范方面',
          content: '发型、校服、校卡、首饰',
          judge: false,
          score: '',
          remark: '',
        },
        {
          idx: 1,
          item: '品行方面',
          content: '课间操表现、眼保健操表现',
          judge: false,
          score: '',
          remark: '',
        },
        {
          idx: 2,
          item: '卫生方面',
          content: '个人卫生、乱丢乱抛、边走边吃、11111111111111111111111111111111111111111111111111111111111111111111111',
          judge: false,
          score: '',
          remark: '',
        },
        {
          idx: 3,
          item: '纪律方面',
          content: '早读纪律、自习课纪律',
          judge: false,
          score: '',
          remark: '',
        },
        {
          idx: 4,
          item: '学习方面',
          content: '课堂表现、作业情况、考风表现',
          judge: false,
          score: '',
          remark: '',
        },
        {
          idx: 5,
          item: '参与班级自治方面',
          content: '参与学校、年纪互动',
          judge: false,
          score: '',
          remark: '',
        },
        {
          idx: 6,
          item: '公德方面',
          content: '尊敬师长、团结同学',
          judge: false,
          score: '',
          remark: '',
        }
      ],
      selected_grade: '',
      selected_class: '',
      selected_student: '',
      option_grade: [{//年级范围
        value: '初一',
        label: '初一'
      }, {
        value: '初二',
        label: '初二'
      }, {
        value: '初三',
        label: '初三'
      }, {
        value: '高一',
        label: '高一'
      }, {
        value: '高二',
        label: '高二'
      }, {
        value: '高三',
        label: '高三'
      }],
      option_class: [{//班级范围
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }, {
        value: '6',
        label: '6'
      }],
      option_student: [{//学生范围
        value: '王小虎',
        label: '王小虎'
      }, {
        value: '张三',
        label: '张三'
      }, {
        value: '李四',
        label: '李四'
      }, {
        value: '王五',
        label: '王五'
      }, {
        value: '赵钱孙',
        label: '赵钱孙'
      }, {
        value: '张大锤',
        label: '张大锤'
      }, {
        value: '小明',
        label: '小明'
      }],
      item_score: [{//分值范围
        value: '1',
        label: '1',
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }, {
        value: '6',
        label: '6'
      }, {
        value: '7',
        label: '7'
      }, {
        value: '8',
        label: '8'
      }, {
        value: '9',
        label: '9'
      }, {
        value: '10',
        label: '10'
      }]
    }
  }
};
</script>

<style scoped>
</style>