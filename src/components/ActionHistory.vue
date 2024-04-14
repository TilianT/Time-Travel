<template>
  <div class="history">
    <div class="history__title">
      <span class="text--title">List of actions commited</span>
      <span>
        You can also press <span class="text--detail">Ctrl/Command + Z</span> to undo the action
      </span>
    </div>

    <div class="history__list">
      <div class="history__list__wrapper">
        <BaseCard v-if="actions.length === 0">
          <span>There are no actions yet</span>
        </BaseCard>

        <template v-else>
          <BaseCard v-for="(element, index) in actions" :key="index">
            <span>
              {{
                `Move Post ${element.id} from index ${element.from} to index ${element.to}`
              }}
            </span>
            <BaseButton @click="emit('timeTravel', index + 1)">Time travel</BaseButton>
          </BaseCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';

import BaseCard from '@/components/generic/BaseCard.vue';
import BaseButton from '@/components/generic/BaseButton.vue';

import { Action } from '@/types';

const emit = defineEmits<{ (event: 'timeTravel', steps: number): void }>();

withDefaults(defineProps<{ actions: Action[] }>(), {
  actions: () => [],
});
</script>

<style lang="scss" scoped>
.history {
  border-radius: var(--border-radius);
  border: var(--primary-border);
  box-shadow: var(--box-shadow);
  overflow: hidden;

  &__title {
    background: var(--primary-light);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-md);
  }

  &__list {
    background: var(--primary-background);
    padding: var(--space-md);

    &__wrapper {
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);

      .card {
        border-radius: 0;
        border: var(--primary-border);
        box-shadow: none;
        min-height: var(--card-heigh-sm);

        &:first-child {
          border-top-left-radius: var(--border-radius);
          border-top-right-radius: var(--border-radius);
        }

        &:last-child {
          border-bottom-left-radius: var(--border-radius);
          border-bottom-right-radius: var(--border-radius);
        }

        &:not(:last-child) {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
