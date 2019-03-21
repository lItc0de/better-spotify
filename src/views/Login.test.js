import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import storeConfig from '@/store/config';
import Login from './Login.vue';
import loginPath from '@/auth/loginPath';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login view', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    const config = cloneDeep(storeConfig);
    store = new Vuex.Store(config);

    wrapper = shallowMount(Login, {
      localVue,
      store,
    });
  });

  it('renders the login div', () => {
    expect(wrapper.find('div.login').exists()).toBe(true);
  });

  describe('methods', () => {
    describe('handleLogin', () => {
      const { assign } = window.location;

      beforeEach(() => {
        window.location.assign = jest.fn();
      });

      afterAll(() => {
        window.location.assign = assign;
      });

      it('redirects to the login path', () => {
        expect(wrapper.find('.login-btn').exists());
        wrapper.find('.login-btn').trigger('click');
        expect(window.location.assign).toHaveBeenCalledWith(loginPath);
      });
    });
  });
});
