<template>
  <v-app id="inspire">
    <x-sidebar :drawer="drawer" @drawerChange="drawer = !drawer"/>
    <x-header @drawerClick="drawer = !drawer"/>
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <player v-if="$route.name !== 'Login'"/>
    </v-footer>
  </v-app>
</template>

<script>
import XSidebar from '@/components/XSidebar.vue';
import XHeader from '@/components/XHeader.vue';
import Player from '@/containers/Player.vue';

export default {
  components: {
    XSidebar,
    XHeader,
    Player,
  },

  props: {
    source: String,
  },

  data: () => ({
    drawer: false,
  }),
};
</script>
