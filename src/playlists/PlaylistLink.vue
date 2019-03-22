<template>
  <router-link
    :to="{ name: 'Playlist', props: { id: playlist.id } }"
  >
    {{ playlist.name }}
  </router-link>
</template>

<script>
export default {
  props: {
    playlist: {
      type: Object,
      required: true,
    },
  },
};
</script>
