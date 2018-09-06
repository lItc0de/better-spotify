<template>
  <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click="handleDrawerClick"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
</template>

<script>
export default {
  name: 'XHeader',

  methods: {
    handleDrawerClick() {
      this.$emit('drawerClick');
    },
  },
};
</script>
