<template>
  <div class="time-travel">
    <div class="time-travel__posts">
      <span class="text--title text--white">Sortable Post List</span>
      <TransitionGroup name="flip-list">
        <PostDetails
          v-for="(post, index) in historyStore.history.get(historyStore.history.size - 1)"
          :canMoveDown="index < Object.values(postStore.posts).length - 1"
          :canMoveUp="index !== 0"
          :id="post.id"
          :key="post.id"
          @moveDown="historyStore.moveDown(post.id)"
          @moveUp="historyStore.moveUp(post.id)"
        />
      </TransitionGroup>
    </div>

    <ActionHistory
      :actions="historyStore.commitedActions"
      @timeTravel="historyStore.timeTravel"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import ActionHistory from '@/components/ActionHistory.vue';
import PostDetails from '@/components/PostDetails.vue';

import usePostStore from '@/store/post';
import useHistoryStore from '@/store/history';

const postStore = usePostStore();

await postStore.fetchList();

const historyStore = useHistoryStore();

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
    historyStore.timeTravel();
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
