import { mount, VueWrapper } from '@vue/test-utils';

import ActionHistory from '@/components/ActionHistory.vue';

describe('ActionHistory.vue component', () => {
  let wrapper: VueWrapper;
  const propsData = {
    actions: [
      {
        id: 1,
        from: 0,
        to: 1,
        moved: true,
      },
    ],
  };

  beforeEach(() => {
    wrapper = mount(ActionHistory, {
      propsData,
    });
  });

  it('Displays a message if actions list is empty', async () => {
    await wrapper.setProps({ actions: [] });

    expect(wrapper.find('[data-test="empty-list"]').exists()).toBe(true);
  });

  it('Displays the action title correctly', () => {
    const firstActiontData = propsData.actions[0];

    const actionTitle = wrapper.find('[data-test="action-title"]');

    expect(actionTitle.text()).toMatch(
      `Move Post ${firstActiontData.id} from index ${firstActiontData.from} to index ${firstActiontData.to}`
    );
  });

  it('Displays the time travel button', () => {
    const timeTravelButton = wrapper.find('[data-test="action-button"]');

    expect(timeTravelButton.exists()).toBe(true);
  });

  it('Calls the emit after pressing the time travel button', async () => {
    const timeTravelBtn = wrapper.find('[data-test="action-button"]');

    await timeTravelBtn.trigger('click');

    expect(wrapper.emitted().timeTravel).toBeTruthy();
  });
});
