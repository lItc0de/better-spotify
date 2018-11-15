<template>
  <div class="album-header">
    <x-img :src="album.images[0].url" area="img"/>
    <x-text area="title" title>{{ album.name }}</x-text>
    <x-text area="tracks" subtitle>{{ album.tracks.total }} titles</x-text>
    <x-text area="owner" subtitle>{{ album.artists.map(artist => artist.name).join(', ') }}</x-text>
    <div class="actions">
      <x-btn area="btns" @click="$emit('shuffle-play')">Shuffle Play</x-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumHeader',

  props: {
    album: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.album-header
  display grid
  grid-template-columns 150px 1fr auto
  grid-gap 8px 24px
  grid-template-areas \
    "img title tracks" \
    "img owner ." \
    "img btns btns"

  .actions
    grid-area btns
</style>
