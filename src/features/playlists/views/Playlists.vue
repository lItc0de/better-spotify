<template>
  <x-layout id="app">
    <x-container>Playlists</x-container>
  </x-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Playlists',

  methods: {
    ...mapActions('playlists', ['fetchList']),
  },

  watch: {
    $route: {
      handler: 'fetchList',
      immediate: true,
    },
  },
};
</script>
