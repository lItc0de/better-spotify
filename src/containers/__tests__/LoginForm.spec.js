import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import LoginForm from '@/containers/LoginForm.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('LoginForm component', () => {
  let wrapper;
  let store;
  let login;
  let setToken;
  let token;

  const router = new VueRouter({
    mode: 'history',
    routes: [{
      path: 'login',
      name: 'Login',
    }],
  });

  beforeEach(() => {
    login = jest.fn();
    setToken = jest.fn().mockImplementation((attr, accessToken) => { token = accessToken; });

    window.localStorage = { getItem: jest.fn() };

    const client = {
      namespaced: true,
      actions: {
        login,
        setToken,
      },
    };

    store = new Vuex.Store({
      modules: { client },
    });

    store.commit = jest.fn();

    wrapper = shallowMount(LoginForm, {
      localVue,
      store,
      router,
    });
  });

  it('has the correct name', () => {
    expect(wrapper.name()).toEqual('LoginForm');
  });

  it('calls the login action when click on the login button', () => {
    const button = wrapper.find('#login');

    button.trigger('click');

    expect(login).toHaveBeenCalled();
  });

  it('commits the access token when given in url', () => {
    const accessToken = 'access-token';
    const hash = `#access_token=${accessToken}`;

    router.push({ name: 'Login', hash });

    expect(setToken).toBeCalled();
    expect(token).toEqual(accessToken);
  });

  it('commits the access token when present in local storage', () => {
    const accessToken = 'other-access-token';
    window.localStorage = { getItem: jest.fn().mockReturnValue(accessToken) };

    router.push({ name: 'Login' });

    expect(setToken).toBeCalled();
    expect(token).toEqual(accessToken);
  });
});
