<template>
  <layout>
    <x-layout id="app">
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
      </x-container>
    </x-layout>
  </layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layout from '@/components/Layout.vue';

export default {
  name: 'Playlists',

  data() {
    return {
      bottomVisible: false,
      busy: false,
      content: null,
    };
  },

  components: {
    Layout,
  },

  methods: {
    ...mapActions('playlists', ['fetchList', 'fetchNext']),

    addScrollWatcher() {
      this.content.addEventListener('scroll', () => this.getBottomVisible());
    },

    getBottomVisible() {
      const { content } = this;
      if (content) this.bottomVisible = content.scrollTop >= (content.scrollTopMax - 200);
    },

    async handlePageBottom() {
      if (this.bottomVisible && !this.busy) {
        this.busy = true;
        const next = await this.fetchNext();
        if (next) this.getBottomVisible();
        window.setTimeout(() => {
          this.busy = false;
        }, 1000);
      }
    },

    async init() {
      await this.fetchList();
      window.setTimeout(() => {
        this.addScrollWatcher();
        this.getBottomVisible();
      }, 1000);
    },
  },

  computed: {
    ...mapGetters('playlists', ['items']),
  },

  mounted() {
    this.content = document.getElementById('content');
  },

  watch: {
    $route: {
      handler: 'init',
      immediate: true,
    },

    bottomVisible: {
      handler: 'handlePageBottom',
    },

    busy: {
      handler: 'handlePageBottom',
    },
  },
};
</script>
