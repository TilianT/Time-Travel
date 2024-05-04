<template>
  <BaseCard class="post">
    <span data-test="title">Post {{ id }}</span>

    <div class="post__actions">
      <BaseButton
        v-if="canMoveUp"
        icon
        data-test="button-moveUp"
        @click="emit('moveUp')"
        :aria-label="`Move Post ${id} up`"
      >
        <BaseIcon name="chevron-up" />
      </BaseButton>
      <BaseButton
        v-if="canMoveDown"
        icon
        data-test="button-moveDown"
        @click="emit('moveDown')"
        :aria-label="`Move Post ${id} down`"
      >
        <BaseIcon name="chevron-down" />
      </BaseButton>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import BaseCard from '@/components/generic/BaseCard.vue';
import BaseButton from '@/components/generic/BaseButton.vue';
import BaseIcon from '@/components/generic/BaseIcon.vue';

const emit = defineEmits<{
  (event: 'moveUp'): void;
  (event: 'moveDown'): void;
}>();

defineProps<{
  id: number | string;
  canMoveUp: boolean;
  canMoveDown: boolean;
}>();
</script>

<style scoped lang="scss">
@use '@/styles/_variables' as *;

.post {
  &__actions {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;

    @media only screen and (max-width: $brake-point) {
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
