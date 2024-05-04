import { ref, computed, ComputedRef, Ref } from 'vue';

import { Action, PostList } from '@/types';

interface IUseHistory {
  history: Ref<Action[]>;
  commitedActions: ComputedRef<Action[]>;
  timeTravel(steps?: number): void;
  swap(indexFrom: number, indexTo: number): void;
}

export default function useHistory(posts: PostList): IUseHistory {
  const history = ref<any[]>([]);

  history.value.push(
    Object.keys(posts).map((key, index) => ({
      from: index,
      to: index,
      id: key,
    }))
  );

  const commitedActions = computed(() =>
    history.value
      .reduce((movedPosts, currentPosts): Action[] => {
        const movedPost = currentPosts.find(({ moved }: Action) => moved);

        if (!movedPost) {
          return movedPosts;
        }

        return [...movedPosts, movedPost];
      }, [])
      .reverse()
  );

  function swap(indexFrom: number, indexTo: number) {
    const actualPostsPositions = history.value[history.value.length - 1].map(({ moved, ...keepAttrs }: Action) => keepAttrs);

    const temp = {
      ...actualPostsPositions[indexTo],
      from: indexTo,
      to: indexFrom,
    };
    actualPostsPositions[indexTo] = {
      ...actualPostsPositions[indexFrom],
      from: indexFrom,
      to: indexTo,
      moved: true,
    };
    actualPostsPositions[indexFrom] = temp;

    history.value.push(actualPostsPositions);
  }

  /**
   * Removes elements from the history from the end of the list
   *
   * @param {Number} [steps = 1] - Count of elements to remove
   *
   */
  const timeTravel = (steps = 1) => {
    if (history.value.length < 2) {
      return;
    }

    for (let i = 0; i < steps; i++) {
      history.value.pop();
    }
  };

  return {
    history,
    commitedActions,
    swap,
    timeTravel,
  };
}
