<template>
  <section>
    <h1 data-test="title">{{ name }}</h1>
    <div
      v-for="item in items"
      :key="item.track.id"
      data-test="track"
    >{{ item.track.name }}</div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('playlist', ['name', 'items']),
  },

  methods: {
    ...mapActions('playlist', ['fetchPlaylist']),
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
