<template>
  <x-container>Playlists</x-container>
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
