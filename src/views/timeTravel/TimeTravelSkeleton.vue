<template>
  <div class="time-travel">
    <div class="time-travel__posts">
      <span class="text--title text--white">Loading Posts...</span>
      <BaseCard class="post" v-for="(item, index) in Array(5)" :key="index" />
    </div>

    <ActionHistory />
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/generic/BaseCard.vue';
import ActionHistory from '@/components/ActionHistory.vue';
</script>

<style lang="scss" scoped>
.post {
  animation: var(--animation-settings);
  background-image: var(--animation-gradient);
  background-size: 200% 100%;
}
</style>
