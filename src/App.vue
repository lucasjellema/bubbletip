<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title   @click="gotoIntro()">Bubble Tip</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn prepend-icon="mdi-star-plus-outline" text to="/newtip">Nieuwe Tip</v-btn>
      <v-btn prepend-icon="mdi-history"  text to="/recent">Laatste Ontwikkelingen</v-btn>
      <v-btn prepend-icon="mdi-book-search-outline" text to="/browse">Zoek en Blader</v-btn>
      <v-btn icon="mdi-map-search" to="/map" title="Bekijk en zoek tips op kaart"></v-btn>
      <v-btn text to="/request">Vraag om Tip</v-btn>
      <v-btn text to="/checkin">Checkin</v-btn>


    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import router from './router'
  //
  const gotoIntro = () => {
    router.push('/')
  }
</script>
