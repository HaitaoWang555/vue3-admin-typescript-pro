<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  ref,
  toRaw,
  watch,
  watchEffect,
  Ref,
} from 'vue'
import { useStore } from 'vuex'
import path from 'path'
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const tagAndTagSpacing = 4

const tagsView = ref()
const refScrollPane = ref()

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag: Ref<RouteLocationNormalizedLoaded | Record<string, never>> =
  ref({})
const affixTags: Ref<RouteLocationNormalizedLoaded[]> = ref([])

const store = useStore()
const route = useRoute()
const router = useRouter()

const visitedViews = computed(() => store.state.tagsView.visitedViews)

function isActive(_route: RouteLocationNormalizedLoaded) {
  return _route.path === route.path
}
function isAffix(tag: RouteLocationNormalizedLoaded) {
  return tag.meta && tag.meta.affix
}
function refreshSelectedTag(view: RouteLocationNormalizedLoaded) {
  store.dispatch('tagsView/delCachedView', view).then(() => {
    const { fullPath } = view
    nextTick().then(() => {
      router.replace({
        path: '/redirect' + fullPath,
      })
    })
  })
}
function closeSelectedTag(view: RouteLocationNormalizedLoaded) {
  store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}
function closeOthersTags() {
  router.push(selectedTag.value)
  store.dispatch('tagsView/delOthersViews', selectedTag.value).then(() => {
    moveToCurrentTag()
  })
}
function closeAllTags(view: RouteLocationNormalizedLoaded) {
  store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
    if (affixTags.value.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}
function toLastView(
  visitedViews: RouteLocationNormalizedLoaded[],
  view: RouteLocationNormalizedLoaded
) {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}
function openMenu(tag: RouteLocationNormalizedLoaded, e: MouseEvent) {
  const menuMinWidth = 105
  const offsetLeft = tagsView.value.getBoundingClientRect().left // container margin left
  const offsetWidth = tagsView.value.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const eleft = e.clientX - offsetLeft + 15 // 15: margin right

  if (eleft > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = eleft
  }

  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}
function closeMenu() {
  visible.value = false
}
function handleScroll() {
  closeMenu()
}
function filterAffixTags(routes: RouteRecordRaw[], basePath = '/') {
  let tags: RouteLocationNormalizedLoaded[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        query: {},
        hash: '',
        params: {},
        redirectedFrom: undefined,
        matched: [],
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}
function initTags() {
  const routes = toRaw(store.state.permission.routes)
  const AffixTags = (affixTags.value = filterAffixTags(routes))
  for (const tag of AffixTags) {
    // Must have tag name
    if (tag.name) {
      store.dispatch('tagsView/addVisitedView', tag)
    }
  }
}
function addTags() {
  const { name } = route
  if (name) {
    store.dispatch('tagsView/addView', route)
  }
  return false
}
function moveToCurrentTag() {
  nextTick().then(() => {
    if (!refScrollPane.value) return
    const itemRefs = document.querySelectorAll('#tags-view-container a')
    const $containerWidth = refScrollPane.value.$el.offsetWidth
    const $scrollWrapper = refScrollPane.value.wrap
    Array.prototype.forEach.call(itemRefs, function (item, index) {
      if (item.dataset.path === route.path) {
        //  go to currentTag
        if (index === 0) {
          refScrollPane.value.setScrollLeft(0)
        } else if (index === itemRefs.length - 1) {
          refScrollPane.value.setScrollLeft(
            $scrollWrapper.scrollWidth - $containerWidth
          )
        } else {
          // find preTag and nextTag
          const prevTag = itemRefs[index - 1] as HTMLElement
          const nextTag = itemRefs[index + 1] as HTMLElement
          // the tag's offsetLeft after of nextTag
          const afterNextTagOffsetLeft =
            nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing

          // the tag's offsetLeft before of prevTag
          const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing
          if (
            afterNextTagOffsetLeft >
            $scrollWrapper.scrollLeft + $containerWidth
          ) {
            $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
          } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
            $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
          }
        }
        // when query is different then update
        if (item.dataset.fullPath !== route.fullPath) {
          store.dispatch('tagsView/updateVisitedView', route)
        }
      }
    })
  })
}
onMounted(() => {
  initTags()
  addTags()
})
watch(
  () => route.path,
  () => {
    addTags()
    moveToCurrentTag()
  }
)
watchEffect(() => {
  if (visible.value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<template>
  <div id="tags-view-container" ref="tagsView" class="tags-view-container">
    <el-scrollbar
      ref="refScrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query }"
        tag="span"
        :data-path="tag.path"
        :data-fullPath="tag.fullPath"
        class="tags-view-item"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.name }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </el-scrollbar>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li
        @click="refreshSelectedTag(selectedTag as RouteLocationNormalizedLoaded)"
      >
        Refresh
      </li>
      <li
        v-if="!isAffix(selectedTag as RouteLocationNormalizedLoaded)"
        @click="closeSelectedTag(selectedTag as RouteLocationNormalizedLoaded)"
      >
        Close
      </li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag as RouteLocationNormalizedLoaded)">
        Close All
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
