<template>
  <div>
    <el-container style="height: calc(100vh - 50px);">
      <el-aside style="height: calc(100vh - 50px);" width="230px">
        <AsideBar></AsideBar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import AsideBar from '@/components/Asidebar'
export default {
  name: 'Score',
  components: {
    AsideBar
  }
};
</script>

<style scoped>
</style>