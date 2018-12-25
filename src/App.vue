<template>
  <x-app>
    <router-view/>
  </x-app>
</template>

<script>
import Layout from '@/components/Layout.vue';
// import Player from '@/containers/Player.vue';

export default {
  components: {
    Layout,
  },

  props: {
    source: String,
  },
};
</script>
