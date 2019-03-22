<template>
  <section class="playlists">
    <playlist-link
      v-for="playlist in items"
      :key="playlist.id"
      :playlist='playlist'
      data-test="playlist"
    />
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PlaylistLink from './PlaylistLink.vue';

export default {
  components: {
    PlaylistLink,
  },

  computed: {
    ...mapState('playlists', ['items']),
  },

  methods: {
    ...mapActions('playlists', ['fetchPlaylists']),
  },

  watch: {
    $route: {
      handler: 'fetchPlaylists',
      immediate: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.playlists
  display grid
  grid-template-columns repeat(5, 1fr)
  grid-auto-rows auto
</style>
