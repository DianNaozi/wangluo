<template>
  <el-popover
      placement="bottom"
      :width="300"
      trigger="click"
  >
    <template #default>
      <slot></slot>
    </template>
    <template #reference>
      <el-badge :value="value" :max="max" :is-dot="isDot">
        <el-icon :size="20">
          <component :is="icon"></component>
        </el-icon>
      </el-badge>
    </template>
  </el-popover>

</template>


<script setup lang="ts">
// TODO 导入假数据 list，actions


let props = defineProps({
  icon: {
    type: String,
    default: "Bell"
  },
  value: {
    type: [String, Number],
    default: ''
  },
  max: {
    type: Number
  },
  isDot: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped lang="scss">

</style>
