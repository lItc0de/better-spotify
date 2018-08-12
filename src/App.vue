<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'Albums' }">Albums</router-link>
    </div>
    <router-view/>
    <player v-if="$route.name !== 'Login'"/>
  </div>
</template>

<script>
import Player from '@/containers/Player.vue';

export default {
  name: 'SpotifyPlayer',

  components: {
    Player,
  },
};
</script>


<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
