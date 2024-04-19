<template>
  <main class="container">
    <BaseCard v-if="error" class="error-message">
      <span>Something went wrong, please refresh the page.</span>

      <BaseButton icon @click="refresh">
        <BaseIcon name="refresh" />
      </BaseButton>
    </BaseCard>

    <Suspense v-else>
      <TimeTravel />

      <template #fallback>
        <TimeTravelSkeleton />
      </template>
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import BaseCard from '@/components/generic/BaseCard.vue';
import BaseButton from '@/components/generic/BaseButton.vue';
import BaseIcon from '@/components/generic/BaseIcon.vue';

import TimeTravel from './TimeTravel.vue';
import TimeTravelSkeleton from './TimeTravelSkeleton.vue';

import usePostStore from '@/store/post';

const error = computed(() => usePostStore().error);

const refresh = () => window.location.reload();
</script>

<style lang="scss">
@import 'styles.scss';
</style>
