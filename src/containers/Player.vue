<template>
  <x-footer>
    <button @click="toggleShuffle">{{ shuffleIcon }}</button>
    <button @click="previousTrack">previous</button>
    <button @click="togglePlay">{{ playPauseIcon }}</button>
    <button @click="nextTrack">next</button>
    <button @click="toggleRepeatMode">{{ repeatModeIcon }}</button>
    <span>{{ positionTime }}</span>
  </x-footer>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
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
    ...mapActions('playback', ['intitializeSDK']),
    ...mapActions('combine', [
      'toggleRepeatMode', 'togglePlay', 'toggleShuffle',
      'seek', 'previousTrack', 'nextTrack',
    ]),

    addPlaybackScript() {
      const playbackScript = document.createElement('script');
      playbackScript.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js');
      document.head.appendChild(playbackScript);
    },
  },

  created() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const { accessToken } = this;

      if (accessToken) this.intitializeSDK(accessToken);
    };

    this.addPlaybackScript();
  },

  computed: {
    ...mapState('client', ['accessToken']),
    ...mapGetters('playback', ['WebPlaybackTrack', 'paused', 'position', 'repeatMode', 'shuffle']),

    playPauseIcon() {
      return this.paused ? 'play' : 'pause';
    },

    repeatModeIcon() {
      let icon;
      switch (this.repeatMode) {
        case 1:
          icon = 'onceRepeat';
          break;
        case 2:
          icon = 'fullRepeat';
          break;
        default:
          icon = 'noRepeat';
          break;
      }
      return icon;
    },

    shuffleIcon() {
      return this.shuffle ? 'shuffle' : 'noShuffle';
    },

    positionTime() {
      return this.position;
    },
  },
};
</script>
