<template>
  <x-container class="controls" row>
    <progress-bar
      :progress="trackProgress"
      :duration="duration"
      data-test="progress-bar"
      @seek="seek"
    />
    <x-icon-btn
      data-test="shuffle"
      :icon="shuffleState.icon"
      :title="shuffleState.title"
      @click="putShuffle"
    />
    <x-icon-btn
      data-test="previous"
      icon="skip-previous"
      title="previous"
      @click="previous"
    />
    <x-icon-btn
      data-test="play"
      :icon="playState.icon"
      :title="playState.title"
      @click="play"
    />
    <x-icon-btn
      data-test="next"
      icon="skip-next"
      title="next"
      @click="next"
    />
    <x-icon-btn
      data-test="repeat"
      :icon="repeatState.icon"
      :title="repeatState.title"
      @click="putRepeat"
    />
    <p data-test="track-info">{{ trackInfo }}</p>
    <p data-test="track-progress">{{ trackProgress | msToTime }}</p>
    <p data-test="track-duration">{{ duration | msToTime }}</p>
  </x-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProgressBar from './ProgressBar.vue';

import('@/assets/svg-icons/pause');
import('@/assets/svg-icons/play');
import('@/assets/svg-icons/repeat-off');
import('@/assets/svg-icons/repeat-once');
import('@/assets/svg-icons/repeat');
import('@/assets/svg-icons/shuffle-disabled');
import('@/assets/svg-icons/shuffle-variant');
import('@/assets/svg-icons/skip-next');
import('@/assets/svg-icons/skip-previous');

export default {
  name: 'Controls',

  components: {
    ProgressBar,
  },

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

    shuffleState() {
      return this.shuffle
        ? { title: 'shuffle', icon: 'shuffle-variant' }
        : { title: 'no_shuffle', icon: 'shuffle-disabled' };
    },

    playState() {
      return this.playing
        ? { title: 'pause', icon: 'pause' }
        : { title: 'play', icon: 'play' };
    },

    repeatState() {
      let repeat;
      switch (this.repeat) {
        case 'track':
          repeat = 'repeat-once';
          break;

        case 'context':
          repeat = 'repeat';
          break;

        default:
          repeat = 'repeat-off';
          break;
      }
      return { title: repeat, icon: repeat };
    },
  },

  methods: {
    ...mapActions('player', ['play', 'putShuffle', 'putRepeat', 'previous', 'next', 'getPlayback',
      'seek']),

    updateProgress() {
      if (this.trackProgress + 100 >= this.duration) {
        this.trackProgress = this.duration;
        window.clearInterval(this.intervalId);
        this.getPlayback();
        return;
      }

      if (!this.playing) {
        window.clearInterval(this.intervalId);
        return;
      }

      this.trackProgress += 100;
    },

    setInterval() {
      if (this.intervalId) window.clearInterval(this.intervalId);
      if (!this.track) return;

      this.intervalId = window.setInterval(this.updateProgress, 100);
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

<style lang="stylus" scoped>
.controls
  position relative
</style>
