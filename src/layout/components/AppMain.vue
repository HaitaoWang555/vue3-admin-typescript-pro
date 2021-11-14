<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <div class="app-container">
        <component :is="Component" />
      </div>
    </router-view>
  </section>
</template>

<style scoped>
.app-main {
  /* 50 = navbar  */
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-color: #f0f2f5;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView .app-main {
  /* 50 = navbar  */
  min-height: 100vh;
}

.hasTagsView .fixed-header + .app-main {
  padding-top: 84px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
