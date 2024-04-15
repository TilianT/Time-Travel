import { setActivePinia, createPinia } from 'pinia';
import { mount, flushPromises, VueWrapper } from '@vue/test-utils';

import api from '@/api';

import Layout from '@/views/timeTravel/Layout.vue';

import { posts } from '../../variables';

describe('TimeTravel page component', () => {
  let spy: jest.SpyInstance;
  let wrapper: VueWrapper;

  beforeEach(() => {
    setActivePinia(createPinia());

    spy = jest.spyOn(api, 'getList');

    spy.mockResolvedValue(posts);

    wrapper = mount(Layout);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders the ActionHistory component', async () => {
    await flushPromises();

    const timeTravel = wrapper.findComponent({ name: 'TimeTravel' });
    const historyComponent = timeTravel.findComponent({ name: 'ActionHistory' });

    expect(historyComponent.exists()).toBe(true);
  });

  it('Renders the PostDetails components correctly', async () => {
    await flushPromises();

    const timeTravel = wrapper.findComponent({ name: 'TimeTravel' });
    const postDetails = timeTravel.findAllComponents({ name: 'PostDetails' });

    expect(postDetails.length).toBe(posts.data.length);
  });
});
