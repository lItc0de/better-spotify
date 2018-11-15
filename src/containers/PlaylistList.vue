<template>
  <div>
    <h1>Playlists</h1>
    <x-img-grid>
      <x-img
        v-for="playlist in myPlaylists"
        :key="playlist.id"
        :src="playlist.images[0].url"
        :to="{ name: 'Playlist', params: { id: playlist.id } }"
      >
        <x-text>{{ playlist.name }}</x-text>
      <x-text subtitle>{{ playlist.owner.display_name }}</x-text>
      </x-img>
    </x-img-grid>
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
