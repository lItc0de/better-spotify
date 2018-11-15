<template>
  <div>
    <x-player
      :state="state"
      @shuffle-click="toggleShuffle"
      @previous-click="previousTrack"
      @play-click="togglePlay"
      @next-click="nextTrack"
      @repeat-click="toggleRepeatMode"
    />
    <button @click="putPlayback">play here</button>
    <span>{{ positionTime }}</span>
    <p v-if="WebPlaybackTrack.artists">
      {{ WebPlaybackTrack.name }} -
      {{ WebPlaybackTrack.artists.map((artist) => artist.name).join(', ') }}
    </p>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'Player',

  data() {
    return {
      SpotifyWebPlaybackSDKReady: false,
    };
  },

  methods: {
    ...mapActions('playback', ['intitializeSDK']),
    ...mapActions('combine', [
      'toggleRepeatMode', 'togglePlay', 'toggleShuffle',
      'seek', 'previousTrack', 'nextTrack', 'putPlayback',
      'getCurrentState',
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
    this.getCurrentState();
    this.addPlaybackScript();
  },

  computed: {
    ...mapState('client', ['accessToken']),
    ...mapGetters('playback', ['paused', 'position', 'repeatMode', 'shuffle']),
    ...mapGetters('combine', ['WebPlaybackTrack']),

    state() {
      const {
        paused, repeatMode, shuffle, position,
      } = this;
      return {
        paused, repeatMode, shuffle, position,
      };
    },

    playPauseIcon() {
      return this.paused ? 'play' : 'pause';
    },

    repeatModeIcon() {
      return ['noRepeat', 'fullRepeat', 'onceRepeat'][this.repeatMode];
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
