<template>
  <div class="track" @dblclick="$emit('play')">
    <img data-test="track-artwork" :src="artwork"/>
    <span data-test="track-name">{{ track.name }}</span>
    <span data-test="track-artists">
      {{ artists }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Track',

  props: {
    track: {
      type: Object,
      required: true,
    },
  },

  computed: {
    artwork() {
      if (this.track && this.track.album && this.track.album.images.length) {
        const { images } = this.track.album;
        return images[images.length - 1].url;
      }
      return '';
    },

    artists() {
      return (this.track && this.track.artists)
        ? this.track.artists.map(artist => artist.name).join(', ')
        : '';
    },
  },
};
</script>
