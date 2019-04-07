import { shallowMount } from '@vue/test-utils';

import ProgressBar from './ProgressBar.vue';

const progress = 60000;
const duration = 120000;

describe('Progress', () => {
  let wrapper;
  let progressEl;

  beforeEach(() => {
    wrapper = shallowMount(ProgressBar, {
      propsData: {
        progress,
        duration,
      },
    });

    progressEl = wrapper.find('[data-test="progress"]');
  });

  it('shows the current progress', () => {
    expect(progressEl.element.style.transform).toEqual('scaleX(0.5000)');
  });

  describe('seek', () => {
    it('triggers the seek event with the clicked progress_ms', () => {
      wrapper.vm.getWidth = jest.fn().mockReturnValue(100);

      expect(wrapper.emitted('seek')).toBe(undefined);

      wrapper.trigger('click', { clientX: 50 });

      expect(wrapper.emitted('seek')[0][0]).toBe(progress);
    });
  });
});
