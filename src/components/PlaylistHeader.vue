<template>
  <div class="playlist-header">
    <x-img :src="playlist.images[0].url" area="img"/>
    <x-text area="title" title>{{ playlist.name }}</x-text>
    <x-text area="tracks" subtitle>{{ playlist.tracks.total }} titles</x-text>
    <x-text area="owner" subtitle>{{ playlist.owner.display_name }}</x-text>
    <div class="actions">
      <x-btn area="btns" @click="$emit('shuffle-play')">Shuffle Play</x-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaylistHeader',

  props: {
    playlist: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.playlist-header
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
