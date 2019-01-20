<template>
  <layout>
    <x-layout id="app" ref="scrollArea">
      <x-container>
        <x-grid-list>
          <x-grid-img
            v-for="playlist in items"
            :key="playlist.id"
            :to="{ name: 'Playlist', params: { id: playlist.id } }"
            :img="playlist.images[0] ? playlist.images[0].url : ''"
            :title="playlist.name"
            :subtitle="playlist.owner.display_name"
          />
        </x-grid-list>
        <x-container
          v-if="isLoading"
          align-items="center"
        >
          <x-spinner/>
        </x-container>
      </x-container>
    </x-layout>
  </layout>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Layout from '@/components/Layout.vue';

export default {
  name: 'Playlists',

  components: {
    Layout,
  },

  methods: {
    ...mapActions('playlists', ['fetchList', 'initEndlessScrolling']),
  },

  computed: {
    ...mapGetters('playlists', ['items']),
    ...mapState('playlists', ['isLoading']),
  },

  mounted() { this.initEndlessScrolling(this.$refs.scrollArea); },

  watch: {
    $route: {
      handler: 'fetchList',
      immediate: true,
    },
  },
};
</script>
