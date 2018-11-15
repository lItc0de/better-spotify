<template>
  <div v-if="playlist">
    <x-container>
      <playlist-header :playlist="playlist" @shuffle-play="handleShufflePlay"/>
    </x-container>
    <x-container>
      <x-track-list>
        <x-track header/>
        <x-track
          v-for="item in playlist.tracks.items"
          :key="item.track.id"
          :item="item"
          @play-track="handlePlayTrack"
        />
      </x-track-list>
    </x-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PlaylistHeader from '@/components/PlaylistHeader.vue';

export default {
  name: 'PlaylistShow',

  components: {
    PlaylistHeader,
  },

  watch: {
    $route: {
      handler: 'fetchData',
      immediate: true,
    },
  },

  methods: {
    ...mapActions('playlists', ['fetchPlaylist']),
    ...mapActions('player', ['putPlay', 'putShuffle']),

    fetchData() {
      this.fetchPlaylist(this.$route.params.id);
    },

    handleShufflePlay() {
      this.putShuffle(true);
      this.putPlay({ context_uri: this.playlist.uri });
    },

    handlePlayTrack(uri) {
      this.putPlay({ context_uri: this.playlist.uri, offset: { uri } });
    },
  },

  computed: {
    ...mapState('playlists', {
      playlist: state => state.current,
    }),
  },
};
</script>
