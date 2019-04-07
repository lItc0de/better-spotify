<template>
  <section class="footer">
    <controls/>
  </section>
</template>

<script>
import Controls from '@/player/Controls.vue';

export default {
  name: 'Footer',

  components: {
    Controls,
  },
};
</script>

<style lang="stylus" scoped>
.footer
  position fixed
  bottom 0
  left 0
  width 100%
  background-color #fff
</style>
