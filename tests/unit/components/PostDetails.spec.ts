import { mount, VueWrapper } from '@vue/test-utils';

import PostDetails from '@/components/PostDetails.vue';

describe('PostDetails.vue component', () => {
  let wrapper: VueWrapper;
  const propsData = {
    id: '1',
    canMoveUp: true,
    canMoveDown: true,
  };

  beforeEach(() => {
    wrapper = mount(PostDetails, {
      propsData,
    });
  });

  it('Displays a title correctly', () => {
    expect(wrapper.find('[data-test="title"]').text()).toMatch(`Post ${propsData.id}`);
  });

  it('Displays the action buttons', () => {
    const btnUp = wrapper.find('[data-test="button-moveUp"]');
    const btnDown = wrapper.find('[data-test="button-moveDown"]');

    expect(btnUp.exists()).toBe(true);
    expect(btnDown.exists()).toBe(true);
  });

  it('Displays only moveUp button', async () => {
    await wrapper.setProps({ canMoveDown: false });

    const btnUp = wrapper.find('[data-test="button-moveUp"]');
    const btnDown = wrapper.find('[data-test="button-moveDown"]');

    expect(btnUp.exists()).toBe(true);
    expect(btnDown.exists()).toBe(false);
  });

  it('Displays only moveDown button', async () => {
    await wrapper.setProps({ canMoveUp: false });

    const btnUp = wrapper.find('[data-test="button-moveUp"]');
    const btnDown = wrapper.find('[data-test="button-moveDown"]');

    expect(btnUp.exists()).toBe(false);
    expect(btnDown.exists()).toBe(true);
  });

  it('Calls the emits after pressing the buttons', async () => {
    const btnUp = wrapper.find('[data-test="button-moveUp"]');
    const btnDown = wrapper.find('[data-test="button-moveDown"]');

    await btnUp.trigger('click');
    await btnDown.trigger('click');

    expect(wrapper.emitted().moveUp).toBeTruthy();
    expect(wrapper.emitted().moveDown).toBeTruthy();
  });
});
