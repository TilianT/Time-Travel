<template>
  <button class="btn" :class="icon && 'btn--icon'">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(defineProps<{ icon?: boolean }>(), { icon: false });
</script>

<style scoped lang="scss">
.btn {
  align-items: center;
  background: var(--btn-background);
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: var(--space-sm) var(--space-md);
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    --btn-background: var(--btn-background-hover);
  }

  &--icon {
    background: none;
    padding: var(--space-sm);

    &:hover {
      transform: scale(1.3);
    }
  }
}
</style>
