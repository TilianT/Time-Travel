<template>
  <img
    class="icon"
    viewBox="0 0 24 24"
    :src="require(`@/assets/icons/${name}.svg`)"
    :style="{
      height: `${size / 10}rem`,
      width: `${size / 10}rem`,
    }"
  />
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

interface Icon {
  name: string;
  size: number;
}

withDefaults(defineProps<Icon>(), { size: 15 });
</script>

<style scoped>
.icon {
  display: block;
}
</style>
