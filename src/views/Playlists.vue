<template>
  <x-container>
    <playlist-list/>
  </x-container>
</template>

<script>
import PlaylistList from '@/containers/PlaylistList.vue';

export default {
  name: 'Playlists',

  components: {
    PlaylistList,
  },
};
</script>
