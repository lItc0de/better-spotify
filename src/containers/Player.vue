<template>
  <v-flex>
    <button @click="toggleShuffle">{{ shuffleIcon }}</button>
    <button @click="previousTrack">previous</button>
    <button @click="togglePlay">{{ playPauseIcon }}</button>
    <button @click="nextTrack">next</button>
    <button @click="toggleRepeatMode">{{ repeatModeIcon }}</button>
    <button @click="putPlayback">play here</button>
    <span>{{ positionTime }}</span>
    <p v-if="WebPlaybackTrack.artists">
      {{ WebPlaybackTrack.name }} -
      {{ WebPlaybackTrack.artists.map((artist) => artist.name).join(', ') }}
    </p>
  </v-flex>
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
