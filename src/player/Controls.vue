<template>
  <x-container row>
    <button data-test="shuffle" icon="shuffle" @click="putShuffle">
      {{ shuffle ? 'shuffle' : 'no_shuffle' }}
    </button>
    <button data-test="previous" icon="previous" @click="previous">previous</button>
    <button data-test="play" icon="play" @click="play">
      {{ playing ? 'pause' : 'play' }}
    </button>
    <button data-test="next" icon="next" @click="next">next</button>
    <button data-test="repeat" icon="repeat" @click="putRepeat">{{ repeat }}</button>
    <p data-test="track-info">{{ trackInfo }}</p>
  </x-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Controls',

  computed: {
    ...mapState('player', ['playing', 'progress', 'shuffle', 'repeat', 'track']),

    trackInfo() {
      if (!this.track) return '';
      const { name, artists } = this.track;
      return `${name} - ${artists.map(artist => artist.name).join(', ')}`;
    },
  },

  methods: {
    ...mapActions('player', ['play', 'putShuffle', 'putRepeat', 'previous', 'next', 'getPlayback']),
  },

  created() {
    this.getPlayback();
  },
};
</script>
