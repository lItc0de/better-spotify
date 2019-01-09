<template>
  <layout>
    <x-layout id="app">
      <x-container>
        <x-grid-list>
          <x-link
            v-for="playlist in items"
            :key="playlist.id"
            :to="{ name: 'Playlist', params: { id: playlist.id } }"
          >
            <x-img v-if="playlist.images[0]" :src="playlist.images[0].url">
            </x-img>
            <x-text slim>{{ playlist.name }}</x-text>
            <x-text color="colorSecondary" slim>{{ playlist.owner.display_name }}</x-text>
          </x-link>
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
      if (content) this.bottomVisible = content.scrollTop === content.scrollTopMax;
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
