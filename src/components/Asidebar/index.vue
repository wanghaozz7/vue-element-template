<template>
  <div>
    <el-menu class="el-menu-vertical-demo" background-color="#304156" text-color="#fff" active-text-color="#ffd04b"
      style="height: calc(100vh - 50px);" @open="handleOpen" @close="handleClose" router>
      <el-submenu v-for="item in bar_item" :index=item.idx>
        <template slot="title">
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :index=child.idx>{{ child.title }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AsideBar',
  components: {

  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  props: {
    bar_item: {
      type: Array,
      default() {
        return [
          {
            title: '学分纪律',
            idx: '1',
            children: [
              {
                title: '升旗仪式',
                idx: '1-1',
                children: []
              }, {
                title: '出勤',
                idx: '/discipline/attendance',
                children: []
              }, {
                title: '日常违纪、学生安全检查',
                idx: '1-3',
                children: []
              }, {
                title: '交心里委员晴雨表',
                idx: '1-4',
                children: []
              }, {
                title: '学生检查晚修纪律',
                idx: '1-5',
                children: []
              }, {
                title: '就餐违纪、外卖违纪',
                idx: '1-6',
                children: []
              }, {
                title: '接受处分',
                idx: '1-7',
                children: []
              }, {
                title: '课堂班务日志上交',
                idx: '1-8',
                children: []
              }
            ]
          }, {
            title: '仪容仪表',
            idx: '2',
            children: [
              {
                title: '发型、校服、校卡、首饰',
                idx: '2-1',
                children: [
                  {
                    title: '发型',
                    idx: '2-1-1',
                    children: []
                  },
                  {
                    title: '校服',
                    idx: '2-1-2',
                    children: []
                  },
                  {
                    title: '装扮',
                    idx: '2-1-3',
                    children: []
                  }
                ]
              }
            ]
          }, {
            title: '两操',
            idx: '3',
            children: [
              {
                title: '课间学生出勤',
                idx: '3-1',
                children: []
              }, {
                title: '课间班主任出勤',
                idx: '3-2',
                children: []
              }, {
                title: '课间质量',
                idx: '3-3',
                children: []
              }, {
                title: '眼保健操',
                idx: '3-4',
                children: []
              }
            ]
          }, {
            title: '宿舍检查',
            idx: '4',
            children: [
              {
                title: '纪律',
                idx: '4-1',
                children: []
              }, {
                title: '内务',
                idx: '4-2',
                children: []
              }
            ]
          }, {
            title: '环境卫生',
            idx: '5',
            children: [
              {
                title: '公共卫生',
                idx: '5-1',
                children: []
              }, {
                title: '常规卫生',
                idx: '5-2',
                children: []
              }, {
                title: '教学楼卫生',
                idx: '5-3',
                children: []
              }, {
                title: '垃圾分类',
                idx: '5-4',
                children: []
              }
            ]
          }
        ];
      }
    }
  }
};
</script>

<style scoped>
</style>