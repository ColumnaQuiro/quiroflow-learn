<template>
  <NuxtRouteAnnouncer />
  <SiteHeader />
  <div class="shell">
    <div class="shell-inner">
      <CategorySidebar />
      <div class="shell-main">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style scoped>
.shell-inner {
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  gap: 0;
}
.shell-main {
  flex: 1;
  min-width: 0;
}

/* Sidebar is a direct child of shell-inner via CategorySidebar's <aside>,
   sticky under the fixed-height 64px header so it scrolls independently
   once the article list is taller than the viewport. */
.shell-inner :deep(> .sidebar-wrap) {
  flex-shrink: 0;
  width: 248px;
  padding: 24px 12px 24px 20px;
  position: sticky;
  top: 64px;
  max-height: calc(100vh - 64px);
  overflow-y: auto;
}

@media (max-width: 880px) {
  .shell-inner {
    display: block;
  }
  .shell-inner :deep(> .sidebar-wrap) {
    position: static;
    max-height: none;
    width: auto;
    padding: 16px 16px 0;
  }
}
</style>
