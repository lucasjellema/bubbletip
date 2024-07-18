<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title @click="gotoIntro()">Bubble Tip</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn prepend-icon="mdi-star-plus-outline" text to="/newtip" v-if="appStore.ingechecktLid != null">Nieuwe Tip</v-btn>
      <!-- <v-btn prepend-icon="mdi-history" text to="/recent">Laatste Ontwikkelingen</v-btn> -->
      <v-btn prepend-icon="mdi-book-search-outline" text to="/browse">Zoek en Blader</v-btn>
      <!-- <v-btn icon="mdi-map-search" to="/map" title="Bekijk en zoek tips op kaart"></v-btn> -->
      <!-- <v-btn text to="/request" v-if="appStore.ingechecktLid != null">Vraag om Tip</v-btn> -->
      <v-btn  text to="/checkin" v-if="appStore.ingechecktLid == null">Checkin</v-btn>
      <v-btn  text @click="appStore.ingechecktLid=null" v-if="appStore.ingechecktLid != null">Checkout</v-btn>
      <v-btn prepend-icon="mdi-account" text @click="gotoProfile()" title="Bewerk je profiel" v-if="appStore.ingechecktLid != null">{{ appStore.ingechecktLid?.gebruikersnaam }}</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>

import router from './router'
import { useAppStore } from "@/stores/app";
const appStore = useAppStore()

const initializeStore = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('par')) {
    // http://<host:port/apppath>/?par=https://objectstorage.us-ashburn-1.oraclecloud.com/p/3ZvD2n18VN6y/n/idtwlqf2hanz/b/website/o/
    const bucketPAR = urlParams.get('par')
    appStore.setPAR(bucketPAR)
  }
}

const gotoProfile = () => {
    router.push({ name: 'profile', params: { gebruikersnaam: appStore.ingechecktLid?.gebruikersnaam } });
}

onMounted(() => {
  console.log('***** App Mounted!!')
  initializeStore()
})
//

const gotoIntro = () => {
  router.push('/')
}

</script>
