import Vue from "vue";
const state = {
  target: [
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
          content: '升旗仪式三级指标1检查内容'
        },
        {
          id: 31,
          label: '升旗仪式三级指标2',
          level: 3,
          content: '升旗仪式三级指标2检查内容'
        },
        {
          id: 32,
          label: '升旗仪式三级指标3',
          level: 3,
          content: '升旗仪式三级指标3检查内容'
        }]
      }, {
        id: 9,
        label: '出勤',
        level: 2,
        children: [{
          id: 33,
          label: '出勤三级指标',
          level: 3,
          content: '出勤三级指标检查内容'
        }]
      }, {
        id: 10,
        label: '日常违纪、学生安全违纪',
        level: 2,
        children: [{
          id: 34,
          label: '日常违纪三级指标',
          level: 3,
          content: '日常违纪三级指标检查内容'
        }]
      }, {
        id: 11,
        label: '就餐违纪、外卖违纪',
        level: 2,
        children: [{
          id: 35,
          label: '就餐违纪三级指标',
          level: 3,
          content: '就餐违纪三级指标检查内容'
        }]
      }, {
        id: 12,
        label: '交心里委员晴雨表',
        level: 2,
        children: [{
          id: 36,
          label: '三级指标',
          level: 3,
          content: '三级指标检查内容'
        }]
      }, {
        id: 13,
        label: '学生检查晚修纪律',
        level: 2,
        children: [{
          id: 37,
          label: '三级指标',
          level: 3,
          content: '三级指标检查内容'
        }]
      }, {
        id: 14,
        label: '接受处分',
        level: 2,
        children: [{
          id: 38,
          label: '三级指标',
          level: 3,
          content: '三级指标检查内容'
        }]
      }, {
        id: 15,
        label: '课堂班务日志上交',
        level: 2,
        children: [{
          id: 39,
          label: '三级指标',
          level: 3,
          content: '三级指标检查内容'
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
            children: []
          },
          {
            id: 28,
            label: '校服',
            level: 3,
            content: '学生在校是否着装校服',
            children: []
          },
          {
            id: 29,
            label: '装扮',
            level: 3,
            content: '装扮是否合乎学生标准',
            children: []
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
          content: '三级指标检查内容'
        }]
      }, {
        id: 18,
        label: '课间班主任出勤',
        level: 2,
        children: [{
          id: 41,
          label: '课间班主任出勤三级指标',
          level: 3,
          content: '三级指标检查内容'
        }]
      }, {
        id: 19,
        label: '课间质量',
        level: 2,
        children: [{
          id: 42,
          label: '课间质量三级指标',
          level: 3,
          content: '三级指标检查内容'
        }]
      }, {
        id: 20,
        label: '眼保健操',
        level: 2,
        children: [{
          id: 43,
          label: '三级指标',
          level: 3,
          content: '三级指标检查内容'
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
          content: '三级指标检查内容'
        }]
      }, {
        id: 22,
        label: '内务',
        level: 2,
        children: [{
          id: 45,
          label: '三级指标',
          level: 3,
          content: '三级指标检查内容'
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
          content: '三级指标检查内容'
        }]
      }, {
        id: 24,
        label: '常规卫生（学生会检查）',
        level: 2,
        children: [{
          id: 47,
          label: '三级指标',
          level: 3,
          content: '三级指标检查内容'
        }]
      }, {
        id: 25,
        label: '教学楼日常卫生检查',
        level: 2,
        children: [{
          id: 48,
          label: '三级指标',
          level: 3,
          content: '三级指标检查内容'
        }]
      }, {
        id: 26,
        label: '垃圾分类',
        level: 2,
        children: [{
          id: 49,
          label: '三级指标',
          level: 3,
          content: '三级指标检查内容'
        }]
      }]
    }
  ],
  count: 49
}
const mutations = {
  SET_TARGET: (state) => {
    state.flag = '修改后';
    Vue.set(state.target[0], 'label', '修改后的数据');
  },
  add_node: (state, info) => {//添加指标
    if (info.level === 1) {//添加二级指标
      for (let item of state.target) {
        if (item.id === info.id) {
          state.count++;
          const children = {
            id: state.count,
            label: info.label,
            level: 2,
            content: info.content,
            children: []
          }
          item.children.push(children);
          console.log(item);
          return;
        }
      }
    } else if (info.level === 2) {//添加三级指标
      for (let item of state.target) {
        for (let child of item.children) {
          if (child.id === info.id) {
            state.count++;
            const children = {
              id: state.count,
              label: info.label,
              level: 3,
              content: info.content,
              children: []
            }
            child.children.push(children);
            console.log(child);
            return;
          }
        }
      }
    }
  },
  add_root: (state, item) => {
    state.count++;
    const node = {
      id: state.count,
      label: item,
      level: 1,
      content: '无',
      children: []
    };
    state.target.push(node);
    console.log(state.target);

  },
  delete_node: (state, info) => {//删除指标
    if (info.level === 1) {//删除一级指标
      for (let idx in state.target) {
        if (state.target[idx].id === info.id) {
          state.target.splice(idx, 1);
          console.log(state.target);
          return;
        }
      }
    } else if (info.level === 2) {//删除二级指标
      for (let item of state.target) {
        for (let idx in item.children) {
          if (item.children[idx].id === info.id) {
            item.children.splice(idx, 1);
            console.log(state.target);
            return;
          }
        }
      }
    } else {//删除三级指标
      for (let item of state.target) {
        for (let child of item.children) {
          if (child.children.length !== 0) {
            for (let idx in child.children) {
              if (child.children[idx].id === info.id) {
                child.children.splice(idx, 1);
                console.log(state.target);
                return;
              }
            }
          }
        }
      }
    }
  },
  rename_node: (state, info) => {//重命名指标
    if (info.level === 1) {//重命名一级指标
      for (let item of state.target) {
        if (item.id === info.id) {
          item.label = info.item;
          console.log(item);
          return;
        }
      }
    } else if (info.level === 2) {//重命名二级指标
      for (let item of state.target) {
        for (let child of item.children) {
          if (child.id === info.id) {
            child.label = info.item;
            console.log(child);
            return;
          }
        }
      }
    } else {
      for (let item of state.target) {
        for (let child of item.children) {
          for (let gradeson of child.children) {
            if (gradeson.id === info.id) {
              gradeson.label = info.item;
              console.log(gradeson);
              return;
            }
          }
        }
      }
    }
  }
}

const actions = {};

export default {
  state,
  mutations,
  actions
};