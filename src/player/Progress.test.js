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
});
