<template>
  <div class="x-footer">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'XFooter',
};
</script>


<style lang="stylus" scoped>
.x-footer
  background-color #eee
  position fixed
  bottom 0
  left 0
  height 50px
  width 100%
</style>
