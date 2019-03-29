<template>
  <section>
    <h1 data-test="title">{{ name }}</h1>
    <div
      v-for="(item, index) in items"
      :key="item.track.id"
      @dblclick="playTrack(index)"
      data-test="track"
    >{{ item.track.name }}</div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
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
