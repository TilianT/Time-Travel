import { ref, computed, ComputedRef, Ref } from 'vue';

import { Action, PostList } from '@/types';

interface IUseHistory {
  commitedActions: ComputedRef<Action[]>;
  history: Ref<Action[]>;
  swap(indexFrom: number, indexTo: number): void;
  timeTravel(steps?: number): void;
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
    const lastHistoryState = history.value[history.value.length - 1].map(({ moved, ...keepAttrs }: Action) => keepAttrs);

    const temp = {
      ...lastHistoryState[indexTo],
      from: indexTo,
      to: indexFrom,
    };
    lastHistoryState[indexTo] = {
      ...lastHistoryState[indexFrom],
      from: indexFrom,
      to: indexTo,
      moved: true,
    };
    lastHistoryState[indexFrom] = temp;

    history.value.push(lastHistoryState);
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
    commitedActions,
    history,
    swap,
    timeTravel,
  };
}
