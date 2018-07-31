<template>
  <div>
    Albums
    <ul>
      <li v-for="album in albums" :key="album.id">
        {{album.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Albums',

  watch: {
    $route: {
      handler: 'fetchData',
      immediate: true,
    },
  },

  methods: {
    ...mapActions('album', ['fetchAlbums']),

    fetchData() {
      this.fetchAlbums(['4znxzsJdCVRIdANotJMDwh']);
    },
  },

  computed: {
    ...mapState('album', ['albums']),
  },
};
</script>
