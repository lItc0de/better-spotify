<template>
  <div class="artist-header">
    <x-img :src="artist.images[0].url" area="img"/>
    <x-text area="title" title>{{ artist.name }}</x-text>
    <x-text area="followers" subtitle>{{ artist.followers.total }} followers</x-text>
    <x-text area="artist" subtitle>{{ artist.name }}</x-text>
    <div class="actions">
      <x-btn area="btns" @click="$emit('shuffle-play')">Shuffle Play</x-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistHeader',

  props: {
    artist: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.artist-header
  display grid
  grid-template-columns 150px 1fr auto
  grid-gap 8px 24px
  grid-template-areas \
    "img title followers" \
    "img artist ." \
    "img btns btns"

  .actions
    grid-area btns
</style>
