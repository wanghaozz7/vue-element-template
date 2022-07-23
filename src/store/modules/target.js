const state = {
  target: [
    {
      id: 1,
      label: '学风纪律',
      level: 1,
      children: [{
        id: 8,
        label: '升旗仪式',
        level: 2
      }, {
        id: 9,
        label: '出勤',
        level: 2
      }, {
        id: 10,
        label: '日常违纪、学生安全违纪',
        level: 2
      }, {
        id: 11,
        label: '就餐违纪、外卖违纪',
        level: 2
      }, {
        id: 12,
        label: '行李乱摆放',
        level: 2
      }, {
        id: 13,
        label: '学生检查晚修纪律',
        level: 2
      }, {
        id: 14,
        label: '接受处分',
        level: 2
      }, {
        id: 15,
        label: '课堂班务日志上交',
        level: 2
      }]
    }, {
      id: 2,
      label: '仪容仪表',
      level: 1,
      children: [{
        id: 16,
        label: '发型、校服、校卡、首饰',
        level: 2
      }]
    }, {
      id: 3,
      label: '两操',
      level: 1,
      children: [{
        id: 17,
        label: '课间学生出勤',
        level: 2
      }, {
        id: 18,
        label: '课间班主任出勤',
        level: 2
      }, {
        id: 19,
        label: '课间质量',
        level: 2
      }, {
        id: 20,
        label: '眼保健操',
        level: 2
      }]
    }, {
      id: 4,
      label: '宿舍检查',
      level: 1,
      children: [{
        id: 21,
        label: '纪律',
        level: 2
      }, {
        id: 22,
        label: '内务',
        level: 2
      }]
    }, {
      id: 5,
      label: '环境卫生',
      level: 1,
      children: [{
        id: 23,
        label: '公共卫生',
        level: 2
      }, {
        id: 24,
        label: '常规卫生（学生会检查）',
        level: 2
      }, {
        id: 25,
        label: '教学楼日常卫生检查',
        level: 2
      }, {
        id: 26,
        label: '垃圾分类',
        level: 2
      }]
    }, {
      id: 6,
      label: '行政检查',
      level: 1,
      children: [{
        id: 27,
        label: '晚修等级评价',
        level: 2
      }, {
        id: 28,
        label: '早读等级评价',
        level: 2
      }]
    }, {
      id: 7,
      label: '年级评估',
      level: 1,
      children: [{
        id: 29,
        label: '年纪安排检查、考试违纪、手机违纪、考勤、年纪活动、课堂状态、仪容仪表',
        level: 2
      }]
    }]
}
const mutations = {
  SET_TARGET: (state, data) => {
    state.target[0].label = '修改后的数据';
  }
}

const actions = {};

export default {
  state,
  mutations,
  actions
};