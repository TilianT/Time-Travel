<template>
  <div class="head-bar"></div>
  <TimeTravel />
</template>

<script setup lang="ts">
import TimeTravel from '@/views/timeTravel/Layout.vue';
</script>

<style lang="scss">
.head-bar {
  position: absolute;
  width: 0;
  height: 0;
  z-index: -10;
  border-right: 100vw solid transparent;
  border-top: 20vw solid var(--secondary-background);
}
</style>
