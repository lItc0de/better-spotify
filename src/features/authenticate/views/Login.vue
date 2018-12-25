<template>
  <div
    class="login"
  >
    <div class="login-card">
      <x-text class="login-text" size="6rem" bold>Login with Spotify</x-text>
      <x-spacer/>
      <x-btn class="login-btn" size="4rem" @click="handleLogin">Login</x-btn>
    </div>
  </div>
</template>

<script>
import loginPath from '@/features/authenticate/services/loginPath';

export default {
  name: 'Login',

  methods: {
    handleLogin() {
      console.log(loginPath);

      window.location.assign(loginPath);
    },
  },
};
</script>

<style lang="stylus" scoped>
.login
  display flex
  flex-flow row
  box-sizing border-box
  height 100%
  align-items center
  justify-content center
  padding 2rem
  animation fadein 1s ease-in-out

  .login-card
    flex 0 1 400px
    text-align center

  .login-text
    animation slidedown .8s cubic-bezier(.62, .01, .14, 1)

  .login-btn
    width 100%
    background: linear-gradient(45deg, rgb(198, 88, 149), rgb(118, 82, 231));
    animation slideup .8s cubic-bezier(.62, .01, .14, 1)

@keyframes fadein
  from
    opacity 0
  30%
    opacity 0
  to
    opacity 1

@keyframes slidedown
  from
    transform translateY(-100px)
  95%
    transform translateY(-3px)
  to
    transform translateY(0)

@keyframes slideup
  from
    transform translateY(100px)
  95%
    transform translateY(3px)
  to
    transform translateY(0)
</style>
