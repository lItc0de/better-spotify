<template>
  <main>
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
