<template>
  <div class="time-travel">
    <div class="time-travel__posts">
      <span class="text--title text--white">Sortable Post List</span>
      <TransitionGroup name="flip-list">
        <PostDetails
          v-for="(postDetails, index) in (history[history.length - 1] as unknown as Action[])"
          :canMoveDown="index < Object.values(postStore.posts).length - 1"
          :canMoveUp="index !== 0"
          :id="postDetails.id"
          :key="postDetails.id"
          @moveDown="swap(index, index + 1)"
          @moveUp="swap(index, index - 1)"
        />
      </TransitionGroup>
    </div>

    <ActionHistory :actions="commitedActions" @timeTravel="timeTravel" />
  </div>
</template>

<script setup lang="ts">
import ActionHistory from '@/components/ActionHistory.vue';
import PostDetails from '@/components/PostDetails.vue';

import usePostStore from '@/store/post';

import useHistory from '@/composables/useHistory';
import useUndo from '@/composables/useUndo';

import { Action } from '@/types';

const postStore = usePostStore();

await postStore.fetchList();

const { commitedActions, history, timeTravel, swap } = useHistory(
  postStore.posts
);

useUndo(timeTravel);
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.6s;
}
</style>
