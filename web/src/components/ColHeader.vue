<template>
  <div class="navHeader">
    <div class="left">
      <!--      打开菜单按钮-->
      <div class="toggleButton" @click="toggleMenu">
        <el-icon :size="25">
          <Menu/>
        </el-icon>
      </div>
      <div class="title" title="我的收藏">
        {{ selectedCol }}
      </div>

      <!--      搜索框-->
      <div class="search-input">
        <el-autocomplete
            v-model="state"
            style="width: 100%;"
            :fetch-suggestions="querySearch"
            popper-class="my-autocomplete"
            placeholder="按下tab搜索标签"
            clearable
            size="large"
            @select="handleSelect"
            @keydown.tab.prevent="checkForTab"
            @keydown.delete="deleteTag"
            ref="searchInput"
        >
          <template #prefix>
            <div>
              <el-tag
                  v-for="(tag,index) in tags"
                  :key="tag"
                  closable
                  @close="removeTag(tag)"
                  :class="{ 'tab_tags': index !== tags.length - 1 }"
              >
                {{ tag }}
              </el-tag>
            </div>
          </template>

          <template #suffix>
            <el-icon class="el-input__icon" @click="handleIconClick">
              <search/>
            </el-icon>
          </template>
          <template #default="{ item }">
            <div class="value">{{ item.value }}</div>
            <span class="link">{{ item.link }}</span>
          </template>
        </el-autocomplete>
      </div>
    </div>
    <div class="right">
      <!--      通知菜单-->
      <div class="notify">
        <my-notification :value="123" :max="99">
          <template #default>
            <my-list></my-list>
          </template>
        </my-notification>
      </div>
      <!--      添加收藏项-->
      <div class="add">
        <el-dropdown trigger="click">
          <el-icon :size="20" style="cursor: pointer">
            <Plus/>
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
              <el-dropdown-item :icon="CirclePlusFilled">
                Action 2
              </el-dropdown-item>
              <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
              <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
              <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!--      用户登录框-->
      <div class="avtor">
        <el-dropdown trigger="click">
          <div class="userLogin">
            <el-avatar class="img" shape="circle" :size="30" :src="squareUrl"/>
            <div class="logusername">godwesdass</div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
              <el-dropdown-item :icon="CirclePlusFilled">
                Action 2
              </el-dropdown-item>
              <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
              <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
              <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import MyNotification from "@/components/ElementUI/noticification/index.vue"
import MyList from "@/components/ElementUI/list/index.vue"
import {
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from '@element-plus/icons-vue'

interface LinkItem {
  value: string
  link: string
}

let selectedCol = ref<string>("我的收藏")
const state = ref('')
const links = ref<LinkItem[]>([])

const querySearch = (queryString: string, cb: any) => {
  const results = queryString
      ? links.value.filter(createFilter(queryString))
      : links.value
  // call callback function to return suggestion objects
  cb(results)
}
const createFilter = (queryString: any) => {
  return (restaurant: any) => {
    return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = () => {
  return [
    {value: 'vue', link: 'https://github.com/vuejs/vue'},
    {value: 'element', link: 'https://github.com/ElemeFE/element'},
    {value: 'cooking', link: 'https://github.com/ElemeFE/cooking'},
    {value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui'},
    {value: 'vuex', link: 'https://github.com/vuejs/vuex'},
    {value: 'vue-router', link: 'https://github.com/vuejs/vue-router'},
    {value: 'babel', link: 'https://github.com/babel/babel'},
  ]
}
const handleSelect = (item: LinkItem) => {
  console.log(item)
}
// 用于存储标签数组
const tags = ref<string[]>([]);
// 移除标签
const removeTag = (tag: string) => {
  tags.value = tags.value.filter(t => t !== tag);
};
const checkForTab = (event: KeyboardEvent) => {
  if (event.key === 'Tab' && state.value.trim() !== '') {
    event.preventDefault(); // 阻止默认的Tab行为，即焦点转移
    if (tags.value.length >= 5 || tags.value.includes(state.value)) {
      state.value = '';
      return
    }
    // 将输入值添加到tags数组中
    tags.value.push(state.value.trim());
    // 清空输入框
    state.value = '';
  }
};
const deleteTag = (event: KeyboardEvent) => {
  // event.preventDefault();
  if (state.value == '' && tags.value.length !== 0) {
    tags.value.pop();
  }
}


const handleIconClick = (ev: Event) => {
  console.log(ev)
}

onMounted(() => {
  links.value = loadAll()
})

let squareUrl = ref<string>("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")

// 定义emit, 并且限定事件及其类型
const emit = defineEmits<{
  (e: 'toggleMenu'): void
}>()
// 左侧菜单开关
const toggleMenu = () => {
  // 打开关闭菜单
  emit('toggleMenu')
}

</script>

<style scoped lang="scss">
.tab_tags {
  margin-right: 3px;
}


.el-input__icon {
  cursor: pointer;
}


.navHeader {
  display: flex;
  height: 100%;

  .left {
    display: flex;
    flex: 1 1 0;
    height: 100%;
    align-items: center;

    .toggleButton {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      margin-right: 20px;
      transition: all 0.4s ease 0s;
      color: skyblue;
    }

    .toggleButton:hover {
      background-color: rgb(245, 245, 245);
    }

    .title {
      font-size: 17px;
      padding: 0 20px;
      color: rgb(61, 75, 249);
      line-height: 30px;
      border-left: 1px solid rgb(222, 222, 222);
      display: block;
      max-width: 120px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .search-input {
      width: 900px;

      .my-autocomplete li {
        line-height: normal;
        padding: 7px;

        .name {
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .addr {
          font-size: 12px;
          color: #b4b4b4;
        }

        .highlighted .addr {
          color: #ddd;
        }
      }
    }
  }

  .right {
    margin-left: 50px;
    height: 100%;
    display: flex;
    align-items: center;

    .notify {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 100%;
    }

    .add {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
    }

    .userLogin {
      display: flex;
      align-items: center;

      .img {
        margin-right: 10px;
      }

      .logusername {
        color: rgb(61, 75, 249);
        text-align: right;
        font-size: 16px;
      }
    }


  }
}

</style>
