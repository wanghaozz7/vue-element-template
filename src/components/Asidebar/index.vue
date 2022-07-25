<template>
  <div>
    <el-menu class="el-menu-vertical-demo" background-color="#304156" text-color="#fff" active-text-color="#ffd04b"
      style="height: calc(100vh - 50px);" @select="handleSelect" default-active="出勤">
      <!-- 一级指标 -->
      <el-submenu v-for="item_1 in bar_item" :index="item_1.label">
        <template slot="title">
          <span>{{ item_1.label }}</span>
        </template>
        <div v-for="item_2 in item_1.children">
          <!-- 二级指标 -->
          <el-menu-item v-if="item_2.children.length === 0" :index="item_2.label">
            {{ item_2.label }}
          </el-menu-item>
          <!-- 三级指标 -->
          <el-submenu v-else :index="item_2.label">
            <template slot="title">
              <span> {{ item_2.label }}</span>
            </template>
            <el-menu-item v-for="item_3 in item_2.children" :index="item_3.label">
              {{ item_3.label }}</el-menu-item>
          </el-submenu>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AsideBar',
  props: {
    bar_item: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      active_index: ''
    }
  },
  methods: {
    handleSelect(key) {
      this.active_index = key;
      this.$emit('func', this.active_index);
    }
  },

};
</script>

<style scoped>
</style>