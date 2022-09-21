<template>
  <el-tooltip :content=content placement="top" effect="light">
    <div class="tab-icon" @click="tabChange">
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
    },
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    tabChange() {
      this.$emit('tabChange', this.id)

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

}

.tab-icon i {
  display: flex;
  justify-content: center;
  line-height: 100px;
}

.tab-icon:hover {
  transform-style: preserve-3d;
  transition: all .7s;
  transform: rotateY(-180deg);
  background-color: white;
  color: #ac9c5f;
  cursor: pointer;
}
</style>