<template>
  <div v-if="album">
    <x-container>
      <album-header :album="album" @shuffle-play="handleShufflePlay"/>
    </x-container>
    <x-container>
      <x-track-list>
        <x-album-track header/>
        <x-album-track
          v-for="track in album.tracks.items"
          :key="track.id"
          :item="{ track }"
          @play-track="handlePlayTrack"
        />
      </x-track-list>
    </x-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AlbumHeader from '@/components/AlbumHeader.vue';

export default {
  name: 'AlbumShow',

  components: {
    AlbumHeader,
  },

  watch: {
    $route: {
      handler: 'fetchData',
      immediate: true,
    },
  },

  methods: {
    ...mapActions('albums', ['fetchAlbum']),
    ...mapActions('player', ['putPlay', 'putShuffle']),

    fetchData() {
      this.fetchAlbum(this.$route.params.id);
    },

    handleShufflePlay() {
      this.putShuffle(true);
      this.putPlay({ context_uri: this.album.uri });
    },

    handlePlayTrack(uri) {
      this.putPlay({ context_uri: this.album.uri, offset: { uri } });
    },
  },

  computed: {
    ...mapState('albums', {
      album: state => state.current,
    }),
  },
};
</script>
