<template>
  <el-tooltip :content=content placement="bottom" effect="light">
    <div class="tab-icon">
      <i :class=icon style="font-size: 64px;" />
    </div>
  </el-tooltip>

</template>

<script>
export default {
  name: 'tab-icon',
  props: {
    icon: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.tab-icon {
  width: 100px;
  height: 100px;
  background-color: #ac9c5f;
  color: white;
  float: left;
  transition: all .7s;
  display: flex;
  flex: 1;
  margin: auto;
}

.tab-icon i {
  margin: auto;
}

.tab-icon:hover {
  transform-style: preserve-3d;
  transition: all .7s;
  transform: rotateY(-180deg);
  background-color: white;
  color: #ac9c5f;
}
</style>