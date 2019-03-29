<template>
  <x-container row>
    <button data-test="shuffle" icon="shuffle">shuffle</button>
    <button data-test="previous" icon="previous">previous</button>
    <button data-test="play" icon="play" @click="handlePlay">play</button>
    <button data-test="next" icon="next">next</button>
    <button data-test="repeat" icon="repeat">repeat</button>
  </x-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Controls',

  methods: {
    ...mapActions('player', ['play']),

    handlePlay() { this.play(); },
  },
};
</script>
