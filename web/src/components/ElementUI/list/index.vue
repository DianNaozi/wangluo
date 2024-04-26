<template>
  <div class="list-tabs__item">
    <el-tabs>
      <el-tab-pane v-for="(item,index) in list"
                   :key="index"
                   :label="item.title"
      >
        <el-scrollbar max-height="300px">
          <div class="container" v-for="(item1,index1) in item.content" :key="index1">
            <div class="avatar" v-if="item.content.avtar">
              <el-avatar size="small" :src="item.content.avtar"></el-avatar>
            </div>
            <div class="content">
              <div class="title" v-if="item.title">
                <div> {{ item1.title }}</div>
                <el-tag v-if="item1.tag" size="mini" :type="item1.tagType">{{item1.tag}}</el-tag>
              </div>
              <div v-if="item.desc">{{ item.desc }}</div>
              <div class="time" v-if="item.time">{{ item.time }}</div>
            </div>
          </div>
          <div class="actions">
            <div class="a-item" v-for="(action,i) in actions" :key="i">
              <div class="a-icon"></div>
              div.a-text
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {ListOptions, ActionOptions} from "@/components/ElementUI/list/types.ts";

let props = defineProps({
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true
  },
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => []
  }
})

</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;

  .avtor {
    flex: 1;
  }

  .content {
    flex: 3;

    .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}

</style>
