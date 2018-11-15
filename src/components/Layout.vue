<template>
  <div class="layout">
    <x-navigation-drawer left>
      <x-navigation-list>
        <x-navigation-list-item :to="{ name: 'Home' }">Home</x-navigation-list-item>
        <x-navigation-list-item :to="{ name: 'Albums' }">Albums</x-navigation-list-item>
        <x-navigation-list-item :to="{ name: 'Playlists' }">Playlists</x-navigation-list-item>
      </x-navigation-list>
    </x-navigation-drawer>
    <div class="content"><slot/></div>
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

  .content
    overflow auto
</style>
