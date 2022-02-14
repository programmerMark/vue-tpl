<template>
  <div id="home">
    <div>header</div>
    <router-view></router-view>
    <div>value: {{ store.counter }}</div>
    <div>double value: {{ store.doubleCount }}</div>
    <el-button type="primary" @click="handleAddClick">add</el-button>
    <div>footer</div>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();

const handleAddClick = () => {
  store.increment();
};
</script>

<style lang="scss" scoped></style>
