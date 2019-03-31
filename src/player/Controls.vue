<template>
  <x-container row>
    <button data-test="shuffle" icon="shuffle">{{ shuffle ? 'shuffle' : 'no_shuffle' }}</button>
    <button data-test="previous" icon="previous">previous</button>
    <button data-test="play" icon="play" @click="handlePlay">
      {{ playing ? 'pause' : 'play' }}
    </button>
    <button data-test="next" icon="next">next</button>
    <button data-test="repeat" icon="repeat">{{ repeat }}</button>
  </x-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Controls',

  computed: {
    ...mapState('player', ['playing', 'progress', 'shuffle', 'repeat', 'track']),
  },

  methods: {
    ...mapActions('player', ['play']),

    handlePlay() { this.play(); },
  },
};
</script>
