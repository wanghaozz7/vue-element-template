<template>
  <div>
    <el-menu class="el-menu-vertical-demo" background-color="#304156" text-color="#fff" active-text-color="#ffd04b"
      style="height: calc(100vh - 50px);" router>
      <el-submenu v-for="item in bar_item" :index=item.idx>
        <template slot="title">
          <span>{{ item.title }}</span>
        </template>
        <!-- 二级指标继续扩展 -->
        <el-menu-item v-if="item.idx !== '2'" v-for="child in item.children" :index=child.idx>{{ child.title }}
        </el-menu-item>
        <el-submenu v-else v-for="child in item.children" :index="child.idx">
          <template slot="title">
            <span> {{ child.title }}</span>
          </template>
          <el-menu-item v-for="grandson in child.children" :index="grandson.idx">{{ grandson.title }}</el-menu-item>
        </el-submenu>
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
                idx: '/score/index/discipline/flagraising',
                children: []
              }, {
                title: '出勤',
                idx: '/score/index/discipline/attendance',
                children: []
              }, {
                title: '日常违纪、学生安全检查',
                idx: '/score/index/discipline/daily',
                children: []
              }, {
                title: '交心里委员晴雨表',
                idx: '/score/index/discipline/psychology',
                children: []
              }, {
                title: '学生检查晚修纪律',
                idx: '/score/index/discipline/late',
                children: []
              }, {
                title: '就餐违纪、外卖违纪',
                idx: '/score/index/discipline/dining',
                children: []
              }, {
                title: '接受处分',
                idx: '/score/index/discipline/punishment',
                children: []
              }, {
                title: '课堂班务日志上交',
                idx: '/score/index/discipline/record',
                children: []
              }
            ]
          }, {
            title: '仪容仪表',
            idx: '2',
            children: [
              {
                title: '发型、校服、校卡、首饰',
                idx: '/score/index/appearance',
                children: [
                  {
                    title: '发型',
                    idx: '/score/index/appearance/normal/hairstyle',
                    children: []
                  },
                  {
                    title: '校服',
                    idx: '/score/index/appearance/normal/uniform',
                    children: []
                  },
                  {
                    title: '装扮',
                    idx: '/score/index/appearance/normal/dress',
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
                idx: '/score/index/exercises/breakattendance',
                children: []
              }, {
                title: '课间班主任出勤',
                idx: '/score/index/exercises/headmaster',
                children: []
              }, {
                title: '课间质量',
                idx: '/score/index/exercises/breakquality',
                children: []
              }, {
                title: '眼保健操',
                idx: '/score/index/exercises/eyeexercises',
                children: []
              }
            ]
          }, {
            title: '宿舍检查',
            idx: '4',
            children: [
              {
                title: '纪律',
                idx: '/score/index/dormitory/dormitorydiscipline',
                children: []
              }, {
                title: '内务',
                idx: '/score/index/dormitory/interiro',
                children: []
              }
            ]
          }, {
            title: '环境卫生',
            idx: '5',
            children: [
              {
                title: '公共卫生',
                idx: '/score/index/environment/public',
                children: []
              }, {
                title: '常规卫生',
                idx: '/score/index/environment/routine',
                children: []
              }, {
                title: '教学楼卫生',
                idx: '/score/index/environment/academicbuilding',
                children: []
              }, {
                title: '垃圾分类',
                idx: '/score/index/environment/garbage',
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