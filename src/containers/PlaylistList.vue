<template>
  <div>
    <h1>Playlists</h1>
    <x-grid-list>
      <x-link
        v-for="playlist in myPlaylists"
        :key="playlist.id"
        :to="{ name: 'Playlist', params: { id: playlist.id } }"
        color="color"
        no-underline
      >
        <x-img :src="playlist.images[0].url"/>
        <x-text slim>{{ playlist.name }}</x-text>
        <x-text color="colorSecondary" slim>{{ playlist.owner.display_name }}</x-text>
      </x-link>
    </x-grid-list>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'PlaylistList',

  watch: {
    $route: {
      handler: 'fetchData',
      immediate: true,
    },
  },

  methods: {
    ...mapActions('playlists', ['fetchMyPlaylists']),

    fetchData() {
      this.fetchMyPlaylists({ limit: 50, offset: 0 });
    },
  },

  computed: {
    ...mapState('playlists', ['myPlaylists']),
  },
};
</script>
