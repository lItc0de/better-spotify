<template>
  <div v-if="artist">
    <x-container>
      <artist-header :artist="artist"/>
    </x-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ArtistHeader from '@/components/ArtistHeader.vue';

export default {
  name: 'ArtistShow',

  components: {
    ArtistHeader,
  },

  watch: {
    $route: {
      handler: 'fetchData',
      immediate: true,
    },
  },

  methods: {
    ...mapActions('artists', ['fetchArtist']),
    ...mapActions('player', ['putPlay', 'putShuffle']),

    fetchData() {
      this.fetchArtist(this.$route.params.id);
    },
  },

  computed: {
    ...mapState('artists', {
      artist: state => state.current,
    }),
  },
};
</script>
