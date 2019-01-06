<template>
  <layout>
    <x-layout id="app">
      <x-container>
        <x-grid-list>
          <div v-for="playlist in items" :key="playlist.id">
            <x-img :src="playlist.images[0].url">
            </x-img>
            <x-text slim>{{ playlist.name }}</x-text>
            <x-text color="colorSecondary" slim>{{ playlist.owner.display_name }}</x-text>
          </div>
        </x-grid-list>
      </x-container>
    </x-layout>
  </layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layout from '@/components/Layout.vue';

export default {
  name: 'Playlists',

  components: {
    Layout,
  },

  methods: {
    ...mapActions('playlists', ['fetchList']),
  },

  computed: {
    ...mapGetters('playlists', ['items']),
  },

  watch: {
    $route: {
      handler: 'fetchList',
      immediate: true,
    },
  },
};
</script>
