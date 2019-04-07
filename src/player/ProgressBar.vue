<template>
  <div class="progress-container">
    <div :style="style" class="progress" data-test="progress"/>
  </div>
</template>

<script>
export default {
  name: 'Progress',

  props: {
    progress: {
      type: Number,
      default: 0,
    },

    duration: {
      type: Number,
      default: 100,
    },
  },

  computed: {
    scale() {
      const { progress, duration } = this;

      if (!progress || !duration) return 0;
      return parseFloat(progress / duration).toFixed(4);
    },

    style() {
      return {
        transform: `scaleX(${this.scale})`,
      };
    },
  },
};
</script>

<style lang="stylus" scoped>
.progress-container
  position absolute
  top 0
  left 0
  background-color #eee
  height .25rem
  width 100%

  .progress
    background-color var(--gradientFrom)
    background linear-gradient(var(--gradientDeg), var(--gradientFrom), var(--gradientTo))
    transform-origin left
    height .25rem
    width 100%
</style>
