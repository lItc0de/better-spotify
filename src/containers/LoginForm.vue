<template>
  <div>
    <label>Login to spotify:</label><br>
    <button id="login" @click="handleClick">Login</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',

  watch: {
    $route: {
      handler: 'getToken',
      immediate: true,
    },
  },

  methods: {
    ...mapActions('client', ['login', 'setToken']),

    handleClick() {
      this.login();
    },

    getToken() {
      let accessToken = window.localStorage.getItem('access_token');
      if (accessToken) {
        this.setToken(accessToken);
        return;
      }

      if (!this.$route.hash) return;

      const hashParams = this.$route.hash.match(/^#(.*)$/)[1].split('&').reduce((acc, param) => {
        const keyValue = param.split('=');
        [, acc[keyValue[0]]] = keyValue;
        return acc;
      }, {});
      accessToken = hashParams.access_token;

      if (accessToken) this.setToken(accessToken);
    },
  },
};
</script>
