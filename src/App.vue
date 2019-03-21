<template>
  <x-app>
    <layout>
      <router-view/>
    </layout>
  </x-app>
</template>

<script>
import Layout from '@/layout/Index.vue';

export default {
  components: {
    Layout,
  },
};
</script>
