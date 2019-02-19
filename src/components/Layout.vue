<template>
  <div class="layout">
    <x-navigation-drawer left>
      <x-navigation-list>
        <x-navigation-li :to="{ name: 'Home' }">Home</x-navigation-li>
        <x-navigation-li :to="{ name: 'Playlists' }">Playlists</x-navigation-li>
      </x-navigation-list>
    </x-navigation-drawer>
    <slot/>
  </div>
</template>

<script>

export default {
  name: 'Layout',
};
</script>

<style lang="stylus" scoped>
.layout
  display grid
  grid-template-columns auto 1fr
  height 100%

  > *
    overflow auto
</style>
