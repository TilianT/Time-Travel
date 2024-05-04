<template>
  <div class="time-travel">
    <div class="time-travel__posts">
      <span class="text--title text--white">Sortable Post List</span>
      <TransitionGroup name="flip-list">
        <PostDetails
          v-for="(historyAction, index) in history[history.length - 1]"
          :canMoveDown="index < Object.values(postStore.posts).length - 1"
          :canMoveUp="index !== 0"
          :id="historyAction.id"
          :key="historyAction.id"
          @moveDown="swap(index, index + 1)"
          @moveUp="swap(index, index - 1)"
        />
      </TransitionGroup>
    </div>

    <ActionHistory :actions="commitedActions" @timeTravel="timeTravel" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import ActionHistory from '@/components/ActionHistory.vue';
import PostDetails from '@/components/PostDetails.vue';

import usePostStore from '@/store/post';

import useHistory from '@/composables/useHistory';

const postStore = usePostStore();

await postStore.fetchList();

const { commitedActions, history, timeTravel, swap } = useHistory(
  postStore.posts
);

/**
 * Calls the timeTravel function when CTRL+Z or Command+Z shortcut was pressed
 *
 * @param {event} event - Standard interface that represents an observable event
 *
 */
const undoHandler = (event: KeyboardEvent) => {
  if (
    (event.ctrlKey && event.key === 'z') ||
    (event.metaKey && event.key === 'z')
  ) {
    timeTravel();
  }
};

onMounted(() => {
  document.addEventListener('keydown', undoHandler);
});

onUnmounted(() => {
  document.removeEventListener('keydown', undoHandler);
});
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.6s;
}
</style>
