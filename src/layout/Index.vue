<template>
  <main class="layout">
    <page-header/>
    <slot/>
  </main>
</template>

<script>
import PageHeader from './PageHeader.vue';

export default {
  components: {
    PageHeader,
  },
};
</script>

<style lang="stylus" scoped>
.layout
  padding 1rem
</style>
