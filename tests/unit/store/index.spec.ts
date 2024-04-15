import { setActivePinia, createPinia } from 'pinia';

import api from '@/api';

import useStore from '@/store';

import { posts } from '../../variables';

describe('Store', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    setActivePinia(createPinia());

    spy = jest.spyOn(api, 'getList');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchList - fetchs the list of posts', async () => {
    const parsedPosts = {
      1: {
        id: 1,
        userId: 1,
        body: 'body 1',
        title: 'title 1',
      },
      2: {
        id: 2,
        userId: 2,
        body: 'body 2',
        title: 'title 2',
      },
      3: {
        id: 3,
        userId: 3,
        body: 'body 3',
        title: 'title 3',
      },
      4: {
        id: 4,
        userId: 4,
        body: 'body 4',
        title: 'title 4',
      },
      5: {
        id: 5,
        userId: 5,
        body: 'body 5',
        title: 'title 5',
      },
    };

    spy.mockResolvedValue(posts);

    await useStore().fetchList();

    expect(useStore().list).toEqual(parsedPosts);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('fetchList - sets an error on failed request', async () => {
    spy.mockRejectedValue({});

    await useStore().fetchList();

    expect(useStore().error).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
