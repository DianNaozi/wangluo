<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <col-header @toggle-menu="handleMenuToggle"></col-header>
      </el-header>
      <el-container>
        <el-aside
            :style="{ width: menuWidth + 'px' }"
        >
          <my-menu></my-menu>
        </el-aside>
        <div class="dragBar" @mousedown="handleMouseDown"></div>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MyMenu from "@/components/ElementUI/Menu.vue";
import ColHeader from "@/components/ColHeader.vue";
import {ref} from "vue";

// let menuWidth = ref<string>("800px")
// 响应式变量，用于存储菜单的宽度
const menuWidth = ref(600); // 初始宽度设为200px
const beforeCloseMenuWidth = ref()

// 鼠标按下时的处理函数
const handleMouseDown = (event: MouseEvent) => {
  // 记录初始位置和宽度
  const startX = event.clientX;
  const startWidth = menuWidth.value;

  // 定义拖拽时的处理函数
  const handleMouseMove = (moveEvent: MouseEvent) => {
    // console.log("开始" + startX)
    // 计算新的菜单宽度
    const newWidth = startWidth + moveEvent.clientX - startX;
    // console.log(newWidth)

    if (newWidth <= 240) {
      // 最小宽度
      menuWidth.value = 0;
    } else if (newWidth > 240 && newWidth <= 260) {
      // 关闭阶段
      menuWidth.value = 260
    } else if (newWidth >= 600) {
      // 最大宽度
      menuWidth.value = 600;
    } else {
      menuWidth.value = newWidth;
    }
  };

  // 定义鼠标松开时的处理函数
  const handleMouseUp = () => {
    // 移除事件监听器
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // 添加事件监听器
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

// 左侧菜单开关
const handleMenuToggle = () => {
  if (menuWidth.value == 0) {
    menuWidth.value = beforeCloseMenuWidth.value
  } else {
    beforeCloseMenuWidth.value = menuWidth.value
    menuWidth.value = 0
  }

}
</script>

<style lang="scss" scoped>
.dragBar {
  height: 100%;
  width: 4px;
  cursor: col-resize;

  &:hover {
    background-color: #6495ED;
  }
}

.common-layout {
  height: 100vh;
  margin: 0;

  .el-header {
    z-index: 99;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 8px;
  }

}


</style>
