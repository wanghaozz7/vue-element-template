<template>
  <div>
    <el-table :data="tableData" style="width: 60vw;margin: 30px 30px;" :border="true" :highlight-current-row="true">
      <el-table-column prop="label" label="加减分项目" min-width="15%">
      </el-table-column>
      <el-table-column prop="content" label="检查内容" min-width="25%">
      </el-table-column>
      <el-table-column prop="data" label="年级和班级" min-width="60%">
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
          <!-- 计数器 -->
          <el-row :gutter="5" style="margin-left: 20px;">
            <el-col :span="8" :push="1">
              <el-input-number v-model="row.score" :min="-10" :max="10" label="描述文字">
              </el-input-number>
            </el-col>
            <el-col :span="13" :push="1">
              <!-- 备注 -->
              <el-input v-model="row.remark" placeholder="备注"></el-input>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template> 

<script>
export default {
  name: 'Score',
  components: {

  },
  props: {
    tableData: {
      type: Array,
      default() {
        return [
          {
            idx: 0,
            label: '行为规范方面',
            content: '发型、校服、校卡、首饰',
            score: 0,
            remark: '',
          },
          {
            idx: 1,
            label: '品行方面',
            content: '课间操表现、眼保健操表现',
            score: 0,
            remark: '',
          },
          {
            idx: 2,
            label: '卫生方面',
            content: '个人卫生、乱丢乱抛、边走边吃、11111111111111111111111111111111111111111111111111111111111111111111111',
            score: 0,
            remark: '',
          },
          {
            idx: 3,
            label: '纪律方面',
            content: '早读纪律、自习课纪律',
            score: 0,
            remark: '',
          },
          {
            idx: 4,
            label: '学习方面',
            content: '课堂表现、作业情况、考风表现',
            score: 0,
            remark: '',
          },
          {
            idx: 5,
            label: '参与班级自治方面',
            content: '参与学校、年纪互动',
            score: 0,
            remark: '',
          },
          {
            idx: 6,
            label: '公德方面',
            content: '尊敬师长、团结同学',
            score: 0,
            remark: '',
          }
        ]
      }
    },
    option_grade: {
      type: Array,
      default() {
        return [
          {//年级范围
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
          }]
      }
    },
    option_class: {
      type: Array,
      default() {
        return [
          {//班级范围
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
          }]
      }
    },
    option_student: {
      type: Array,
      default() {
        return [
          {//学生范围
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
          }]
      }
    },
    selected_grade: {
      type: String,
      default: ''
    },
    selected_class: {
      type: String,
      default: ''
    },
    selected_student: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
};
</script>

<style scoped>
</style>