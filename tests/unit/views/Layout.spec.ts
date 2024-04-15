import { setActivePinia, createPinia } from 'pinia';
import { mount, flushPromises } from '@vue/test-utils';

import api from '@/api';

import Layout from '@/views/timeTravel/Layout.vue';

import { posts } from '../../variables';

describe('TimeTravel page Layout', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Before data has loaded', () => {
    it('Renders the TimeTravelSkeleton component', () => {
      const wrapper = mount(Layout);
      const timeTravelSkeleton = wrapper.findComponent({
        name: 'TimeTravelSkeleton',
      });

      expect(timeTravelSkeleton.exists()).toBe(true);
    });
  });

  describe('After data has loaded', () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
      spy = jest.spyOn(api, 'getList');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Renders the TimeTravel component', async () => {
      spy.mockResolvedValue(posts);

      const wrapper = mount(Layout);

      await flushPromises();

      expect(spy).toHaveBeenCalledTimes(1);

      const timeTravel = wrapper.findComponent({ name: 'TimeTravel' });

      expect(timeTravel.exists()).toBe(true);
    });

    it('Renders the error block if request is failed', async () => {
      spy.mockRejectedValue({});

      const wrapper = mount(Layout);

      await flushPromises();

      expect(spy).toHaveBeenCalledTimes(1);

      const errorMessage = wrapper.find('.error-message');

      expect(errorMessage.exists()).toBe(true);
      expect(errorMessage.text()).toBe(
        'Something went wrong, please refresh the page.'
      );
    });
  });
});
