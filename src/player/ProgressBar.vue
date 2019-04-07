<template>
  <div
    class="progress-container"
    @click="seek"
  >
    <div class="progress-placeholder"/>
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

  methods: {
    getWidth() {
      return this.$el.offsetWidth;
    },

    seek(e) {
      const clickedX = e.clientX;
      const width = this.getWidth();

      const percentage = parseFloat(clickedX / width).toFixed(4);
      const newPosition = Math.round(this.duration * percentage);

      this.$emit('seek', newPosition);
    },
  },
};
</script>

<style lang="stylus" scoped>
.progress-container
  position absolute
  bottom calc(100% - .625rem)
  left 0
  width 100%
  padding .5rem 0
  cursor pointer

  .progress-placeholder
    top calc(50% - .125rem)
    position absolute
    background-color #eee
    height .25rem
    width 100%

  .progress
    top calc(50% - .125rem)
    position absolute
    background-color var(--gradientFrom)
    background linear-gradient(var(--gradientDeg), var(--gradientFrom), var(--gradientTo))
    transform-origin left
    height .25rem
    width 100%
</style>
