<template>
  <div id="app-content" class="flex flex-col">
    <el-scrollbar class="h-[calc(100vh-60px)] flex-1">
      <router-view />
    </el-scrollbar>
    <!--  vue-query 开发者工具 -->
    <VueQueryDevTools />
  </div>
</template>

<script setup lang="ts">
import { VueQueryDevTools } from "vue-query/devtools";
import { QueryClient, useQueryProvider } from "vue-query";

/** 初始化queryClient缓存实例，后续页面可以通过useQueryClient()获取该缓存实例 */
useQueryProvider(new QueryClient());
</script>

<style>
#app-content {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;

  :deep(.el-scrollbar__view) {
    display: flex;
    justify-content: center;
    height: 100%;
  }
}
</style>
