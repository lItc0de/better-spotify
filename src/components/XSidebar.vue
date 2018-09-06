<template>
  <v-navigation-drawer
      :value="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile :to="{ name: 'Home' }">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{ name: 'Albums' }">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Albums</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'XSidebar',

  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    handleChange() {
      this.$emit('drawerChange');
    },
  },
};
</script>
