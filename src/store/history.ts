import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import usePostStore from '@/store/post';

import { Action } from '@/types';

export default defineStore('history', () => {
  const postStore = usePostStore();

  const posts = computed(() => postStore.posts);
  const history = ref(new Map());

  // Sets the default posts order in the first history position
  history.value.set(
    0,
    Object.keys(posts.value).map((key, index) => ({
      from: index,
      to: index,
      id: key,
    }))
  );

  // List of commited actions based on a history elements with the moved property
  const commitedActions = computed(() =>
    Array.from(history.value.values())
      .reduce<Action[]>((movedPosts, currentPosts) => {
        const movedPost = currentPosts.find(({ moved }: Action) => moved);

        if (!movedPost) {
          return movedPosts;
        }

        return [...movedPosts, movedPost];
      }, [])
      .reverse()
  );

  /**
   * Gets the last positions in history and finds the post index by id to swap with the post above if possible
   *
   * @param {String} postId - Id of the moving post
   *
   */
  const moveUp = (postId: string) => {
    const actualPostsPositions = [
      ...history.value.get(history.value.size - 1),
    ].map(({ moved, ...keepAttrs }) => keepAttrs);

    const postIndex = actualPostsPositions.map(({ id }) => id).indexOf(postId);

    if (postIndex === 0) {
      return;
    }

    const temp = {
      id: actualPostsPositions[postIndex - 1].id,
      from: postIndex - 1,
      to: postIndex,
    };
    actualPostsPositions[postIndex - 1] = {
      id: actualPostsPositions[postIndex].id,
      from: postIndex,
      to: postIndex - 1,
      moved: true,
    };
    actualPostsPositions[postIndex] = temp;

    history.value.set(history.value.size, actualPostsPositions);
  };

  /**
   * Gets the last history position and finds the post index by id to swap with the post below if possible
   *
   * @param {String} postId - Id of the moving post
   *
   */
  const moveDown = (postId: string) => {
    const actualPostsPositions = [
      ...history.value.get(history.value.size - 1),
    ].map(({ moved, ...keepAttrs }) => keepAttrs);

    const postIndex = actualPostsPositions.map(({ id }) => id).indexOf(postId);

    if (postIndex === actualPostsPositions.length - 1) {
      return;
    }

    const temp = {
      id: actualPostsPositions[postIndex + 1].id,
      from: postIndex + 1,
      to: postIndex,
    };
    actualPostsPositions[postIndex + 1] = {
      id: actualPostsPositions[postIndex].id,
      from: postIndex,
      to: postIndex + 1,
      moved: true,
    };
    actualPostsPositions[postIndex] = temp;

    history.value.set(history.value.size, actualPostsPositions);
  };

  /**
   * Removes elements from the history from the end of the list
   *
   * @param {Number} [steps = 1] - Count of elements to remove
   *
   */
  const timeTravel = (steps = 1) => {
    if (history.value.size < 2) {
      return;
    }

    for (let i = 0; i < steps; i++) {
      history.value.delete(history.value.size - 1);
    }
  };

  return {
    history,
    commitedActions,
    moveDown,
    moveUp,
    timeTravel,
  };
});
