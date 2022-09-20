<template>
  <div id="selector" :style="{height:is_extend?getHeight():'50px'}" v-click-outside="handleClickOutside">
    <div class="default_demo">
      <el-button type="text" icon="el-icon-arrow-left" :disabled="checked===0" @click="shift_left"></el-button>
      <el-button type="text" @click="is_extend = !is_extend">{{list[checked]}}</el-button>
      <el-button type="text" icon="el-icon-arrow-right" :disabled="checked+1===list.length" @click="shift_right">
      </el-button>
    </div>
    <div class="hidden_demo">
      <div style="margin: 0 auto;background-color: #fff;width:160px">
        <h3 @click="handleClick(idx)" v-for="(item,idx) in list" class="normal-cursor">
          <el-button circle class="check-button" :style="{color:idx!==checked?'#fff':'#2EC7C9'}"><i
              class="el-icon-check"></i>
          </el-button>
          {{item}}
        </h3>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'selector',
  data() {
    return {
      is_extend: false,
      checked: 0,
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    getHeight() {//自适应获得下拉框长度
      let len = this.list.length + 1;
      let num = len * 45 + 10;
      num = num > 450 ? 372 : num;
      return num + 'px';
    },
    handleClickOutside() {
      this.is_extend = false
    },
    handleClick(idx) {
      this.checked = idx;
      this.is_extend = false;
      this.$emit('checkedChange', this.checked);
    },
    shift_left() {
      this.checked--;
      this.$emit('checkedChange', this.checked);
    },
    shift_right() {
      this.checked++;
      this.$emit('checkedChange', this.checked);
    }
  },
  directives: {
    'click-outside': {
      bind(el, binding, vnode) {
        console.log('bind')
        function eventHandler(e) {
          if (el.contains(e.target)) {
            return false
          }
          // 如果绑定的参数是函数，正常情况也应该是函数，执行
          if (binding.value && typeof binding.value === 'function') {
            binding.value(e)
          }
        }
        // 用于销毁前注销事件监听
        el.__click_outside__ = eventHandler
        // 添加事件监听
        document.addEventListener('click', eventHandler)
      },

      unbind(el, binding, vnode) {
        console.log('unbind')

        // 移除事件监听
        document.removeEventListener('click', el.__click_outside__)
        // 删除无用属性
        delete el.__click_outside__
      },
    },
  },
  created() {
  }
};
</script>

<style scoped>
#selector {
  height: 50px;
  margin: 14px;
  overflow: hidden;
  transition: all .8s;

  z-index: 99;
}

#selector:hover {
  height: 100px;
  transition: all .8s;
}

.default_demo {
  height: 50px;
  text-align: center;
  background-color: #F0F2F5;
}

.default_demo button {
  font-size: 24px;
}

.hidden_demo {
  background-color: #fff;
  margin-bottom: 10px;
  overflow: auto;
  overflow-x: hidden;
  height: 320px;
  line-height: 30px;
}

.hidden_demo h3 {
  padding: 7px 0 7px 0;
  margin: 0;
  border-bottom: 0.5px solid #F0F2F5;
  border-left: 0.5px solid #F0F2F5;
  border-right: 0.5px solid #F0F2F5;
}

.check-button {
  padding: 6px;
  font-size: 15px;
  margin: 0 10px 0 10px;
}

.hidden_demo h3:hover .check-button {
  background-color: greenyellow;
}


.normal-cursor:hover {
  cursor: default;
}
</style>