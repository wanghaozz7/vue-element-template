<template>
  <div>
    <el-menu class="el-menu-vertical-demo" background-color="#304156" text-color="#fff" active-text-color="#ffd04b"
      style="height: calc(100vh - 50px);" router>
      <!-- 一级指标 -->
      <el-submenu v-for="item_1 in bar_item" :route=item_1.path :index="item_1.label">
        <template slot="title">
          <span>{{ item_1.label }}</span>
        </template>
        <div v-for="item_2 in item_1.children">
          <!-- 二级指标 -->
          <el-menu-item v-if="item_2.children.length === 0" :route=item_2.path :index="item_2.label">
            {{ item_2.label }}
          </el-menu-item>
          <!-- 三级指标 -->
          <el-submenu v-else :route="item_2.path" :index="item_2.label">
            <template slot="title">
              <span> {{ item_2.label }}</span>
            </template>
            <el-menu-item v-for="item_3 in item_2.children" :route=item_3.path :index="item_3.label">
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
  }
};
</script>

<style scoped>
</style>