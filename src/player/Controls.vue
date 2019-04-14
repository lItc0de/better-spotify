<template>
  <div class="controls">
    <progress-bar
      :progress="trackProgress"
      :duration="duration"
      data-test="progress-bar"
      @seek="seek"
    />
    <div class="controls-wrapper">
      <div class="info">
        <template v-if="track">
          <img :src="image" class="album-cover"/>
          <div>
            <p data-test="track-name" class="ma-0"><b>{{ track.name }}</b></p>
            <p data-test="track-artists" class="ma-0 muted">
              {{ track.artists.map(artist => artist.name).join(', ') }}
            </p>
          </div>
        </template>
      </div>
      <div class="player">
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
          color="white"
          scale="1.5rem"
          gradient
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
      </div>
      <p class="ma-0 time">
        <span data-test="track-progress">{{ trackProgress | msToTime }}</span>
        /
        <span data-test="track-duration">{{ duration | msToTime }}</span>
      </p>
    </div>
  </div>
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

    image() {
      return (this.track && this.track.album && this.track.album.images.length)
        ? this.track.album.images[0].url
        : '';
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

  .controls-wrapper
    display grid
    grid-template-columns 1fr auto 1fr
    align-items center

    .info
      display grid
      grid-template-columns 100px 1fr
      align-items center
      grid-gap 1rem

      .album-cover
        height 100px

    .player
      display grid
      grid-template-columns repeat(5, auto)
      grid-gap 1rem
      align-items center
      justify-content center

    .time
      text-align right
      padding-right 1rem
</style>
