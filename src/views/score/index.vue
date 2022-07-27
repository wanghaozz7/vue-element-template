<template>
  <div>
    <el-container style="height: calc(100vh - 50px);">
      <el-aside style="height: calc(100vh - 50px);">
        <AsideBar :bar_item="target" @func="change_active"></AsideBar>
      </el-aside>
      <el-main>
        <Score :tableData="table_data"></Score>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Score from '@/components/Score'
import AsideBar from '@/components/Asidebar'
export default {
  components: {
    AsideBar,
    Score
  },
  data() {
    const target = this.$store.state.target.target;
    let mark_target = [];
    for (let t1 of target) {
      if (Array.isArray(t1.children) && t1.children.length) {
        for (let t2 of t1.children) {
          if (Array.isArray(t2.children) && t2.children.length) {
            for (let t3 of t2.children) mark_target.push(t3);
          } else mark_target.push(t2);
        }
      } else mark_target.push(t1);
    }
    return {
      target,
      active_idx: '',
      table_data: [{
        id: 9,
        label: '出勤',
        level: 2,
        content: '学生是否出勤',
        children: []
      }],
      mark_target
    }
  },
  methods: {
    change_active(data) {
      this.active_idx = data;
      for (let item of this.mark_target) {
        if (item.label === this.active_idx) {
          this.$set(this.table_data, 0, item);
          console.log(this.mark_target);

          break;
        }
      }

    }
  }
};
</script>

<style scoped>
</style>