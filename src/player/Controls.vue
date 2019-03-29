<template>
  <x-container row>
    <x-icon-btn data-test="shuffle" icon="shuffle"/>
    <x-icon-btn data-test="previous" icon="previous"/>
    <x-icon-btn data-test="play" icon="play" @click="play"/>
    <x-icon-btn data-test="next" icon="next"/>
    <x-icon-btn data-test="repeat" icon="repeat"/>
  </x-container>
</template>

<script>
import api from '@/api';

export default {
  name: 'Controls',

  methods: {
    play() { api.play(); },
  },
};
</script>
