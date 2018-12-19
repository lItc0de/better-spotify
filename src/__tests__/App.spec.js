import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import App from '@/App.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

let wrapper;

describe('App', () => {
  beforeEach(() => {
    wrapper = shallowMount(App, {
      localVue,
      router,
      stubs: {
        'x-app': true,
      },
    });
  });

  it('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
