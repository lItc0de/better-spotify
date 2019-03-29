<template>
  <main class="layout">
    <page-header/>
    <slot/>
    <page-footer/>
  </main>
</template>

<script>
import PageHeader from './PageHeader.vue';
import PageFooter from './PageFooter.vue';

export default {
  components: {
    PageHeader,
    PageFooter,
  },
};
</script>

<style lang="stylus" scoped>
.layout
  padding 1rem
</style>
