<template>
  <x-container>
    <h1>Artists</h1>
    <x-img-grid>
      <x-img
        v-for="item in myArtists"
        :key="item.album.id"
        :src="item.album.images[0].url"
        :to="{ name: 'Album', params: { id: item.album.id } }"
      >
        <x-text>{{ item.album.name }}</x-text>
        <x-text subtitle>{{ item.album.artists.map(artist => artist.name).join(', ') }}</x-text>
      </x-img>
    </x-img-grid>
  </x-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AlbumList',

  watch: {
    $route: {
      handler: 'fetchData',
      immediate: true,
    },
  },

  methods: {
    ...mapActions('albums', ['fetchMyArtists']),

    fetchData() {
      this.fetchMyArtists({ limit: 50, offset: 0 });
    },
  },

  computed: {
    ...mapState('albums', ['myArtists']),
  },
};
</script>
