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
    <p data-test="track-progress">{{ trackProgress | msToTime }}</p>
    <p data-test="track-duration">{{ duration | msToTime }}</p>
  </x-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Controls',

  data() {
    return {
      intervalId: null,
      trackProgress: 0,
    };
  },

  computed: {
    ...mapState('player', ['playing', 'progress', 'shuffle', 'repeat', 'track', 'duration']),

    trackInfo() {
      if (!this.track) return '';
      const { name, artists } = this.track;
      return `${name} - ${artists.map(artist => artist.name).join(', ')}`;
    },
  },

  methods: {
    ...mapActions('player', ['play', 'putShuffle', 'putRepeat', 'previous', 'next', 'getPlayback']),

    updateProgress() {
      if (this.trackProgress + 500 >= this.duration) {
        this.trackProgress = this.duration;
        window.clearInterval(this.intervalId);
        return;
      }

      if (!this.playing) {
        window.clearInterval(this.intervalId);
        return;
      }

      this.trackProgress += 500;
    },

    setInterval() {
      if (this.intervalId) window.clearInterval(this.intervalId);
      if (!this.track) return;

      this.intervalId = window.setInterval(this.updateProgress, 500);
    },

    setProgress() {
      this.trackProgress = Number(this.progress || 0);

      this.setInterval();
    },
  },

  created() {
    this.getPlayback();
  },

  watch: {
    progress: {
      handler: 'setProgress',
    },

    playing: {
      handler: 'setProgress',
    },
  },
};
</script>
