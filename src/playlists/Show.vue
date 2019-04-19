<template>
  <section>
    <h1 data-test="title">{{ name }}</h1>
    <playlist-track
      v-for="(item, index) in items"
      :key="item.track.id"
      :track="item.track"
      data-test="track"
      @play="playTrack(index)"
    />
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PlaylistTrack from './Track.vue';

export default {
  name: 'ShowPlaylist',

  components: {
    PlaylistTrack,
  },

  computed: {
    ...mapState('playlist', ['name', 'items', 'uri']),
  },

  methods: {
    ...mapActions('playlist', ['fetchPlaylist']),
    ...mapActions('player', ['play']),

    playTrack(offset) {
      this.play({ options: { contextUri: this.uri, offset } });
    },
  },

  watch: {
    $route: {
      handler() {
        this.fetchPlaylist(this.$route.params.id);
      },
      immediate: true,
    },
  },
};
</script>
