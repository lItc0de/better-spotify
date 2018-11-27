<template>
  <x-app>
    <layout id="app">
      <router-view/>
      <!-- <div>
        <player v-if="$route.name !== 'Login'"/>
      </div> -->
    </layout>
  </x-app>
</template>

<script>
import Layout from '@/components/Layout.vue';
// import Player from '@/containers/Player.vue';

export default {
  components: {
    Layout,
  },

  props: {
    source: String,
  },
};
</script>
