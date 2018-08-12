<template>
  <x-footer>
    <button @click="handlePrevious">previous</button>
    <button @click="handlePlayPause">play/pause</button>
    <button @click="handleNext">next</button>
    <button @click="handlePlayHere">play here</button>
    <span v-if="playback && playback.device">Playing on: {{playback.device.name}}</span>
  </x-footer>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import XFooter from '@/components/XFooter.vue';

export default {
  name: 'Player',

  components: {
    XFooter,
  },

  data() {
    return {
      SpotifyWebPlaybackSDKReady: false,
    };
  },

  methods: {
    ...mapActions('player', ['putPause', 'postNext', 'postPrevious', 'putPlay',
      'createPlayer', 'togglePlay', 'putPlayback']),

    handlePrevious() { this.postPrevious(); },

    handlePlayPause() { this.togglePlay(); },

    handleNext() { this.postNext(); },

    handlePlayHere() {
      if (this.deviceId) this.putPlayback(this.deviceId);
    },

    addPlaybackScript() {
      const playbackScript = document.createElement('script');
      playbackScript.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js');
      document.head.appendChild(playbackScript);
    },
  },

  created() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const { accessToken } = this;

      if (accessToken) this.createPlayer(accessToken);
    };

    this.addPlaybackScript();
  },

  computed: {
    ...mapState('client', ['accessToken']),
    ...mapState('player', ['playback', 'deviceId']),
  },
};
</script>
