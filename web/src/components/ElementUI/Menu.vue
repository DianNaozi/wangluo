<template>
  <!--  左侧菜单-->
  <div class="menu">
    <el-menu default-openeds="['1', '2']">
      <draggable v-model="menuItems" group="menu-group" @end="onDragEnd">
        <el-submenu v-for="group in menuItems" :key="group.id" :index="group.id.toString()">
          <template #title>
            <span>{{ group.title }}</span>
          </template>
          <el-menu-item
              v-for="item in group.items"
              :key="item.id"
              :index="item.id.toString()"
              @click="handleMenuItemSelected(item)"
          >
            {{ item.name }}
          </el-menu-item>
        </el-submenu>
      </draggable>
    </el-menu>

  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';

const menuItems = [
  {
    id: 1,
    title: 'Group 1',
    items: [
      {id: '1-1', name: 'Item 1'},
      {id: '1-2', name: 'Item 2'}
    ]
  },
  {
    id: 2,
    title: 'Group 2',
    items: [
      {id: '2-1', name: 'Item 3'},
      {id: '2-2', name: 'Item 4'}
    ]
  }
];

const handleMenuItemSelected = (item: { id: string; name: string }) => {
  console.log(`Menu item ${item.name} selected`);
};

const onDragEnd = (event: Event) => {
  console.log('拖拽结束', event);
};

interface Tree {
  id: string
  label: string
  children?: Tree[]
}

const getKey = (prefix: string, id: number) => {
  return `${prefix}-${id}`
}

const createData = (
    maxDeep: number,
    maxChildren: number,
    minNodesNumber: number,
    deep = 1,
    key = 'node'
): Tree[] => {
  let id = 0
  return Array.from({length: minNodesNumber})
      .fill(deep)
      .map(() => {
        const childrenNumber =
            deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
        const nodeKey = getKey(key, ++id)
        return {
          id: nodeKey,
          label: nodeKey,
          children: childrenNumber
              ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
              : undefined,
        }
      })
}

const props = {
  value: 'id',
  label: 'label',
  children: 'children',
}
const data = createData(4, 30, 40)
</script>

<style lang="scss" scoped>
.menu {
  box-sizing: border-box;
  padding: 7px;
  height: 100%;
}

.prefix {
  color: var(--el-color-primary);
  margin-right: 10px;
}

.prefix.is-leaf {
  color: var(--el-color-success);
}

</style>
