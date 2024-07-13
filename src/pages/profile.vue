<template>
  <h1>Profiel van {{ gebruikersnaam }}</h1>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-text-field label="Voornaam" v-model="voornaam"></v-text-field>
        <v-text-field label="Achternaam" v-model="achternaam"></v-text-field>
        <v-text-field label="Geboortedatum" type="date" v-model="geboortedatum" </v-text-field>
          <v-textarea label="Introductie" prepend-icon="mdi-text-account" v-model="introductie"
            hint="introductie"></v-textarea>
          <v-btn title="Sla gegevens op" class="mb-2" @click="saveLid()" v-if="appStore.ingechecktLid?.gebruikersnaam==gebruikersnaam">Opslaan</v-btn>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { useRoute } from 'vue-router';

const route = useRoute();
const gebruikersnaam = route.params.gebruikersnaam;

const appStore = useAppStore()
const bubble = appStore.getBubble()
const lid = bubble.value.leden.find(lid => lid.gebruikersnaam === gebruikersnaam)

const voornaam = ref(lid.voornaam)
const achternaam = ref(lid.achternaam)
const geboortedatum = ref(lid.geboortedatum)
const introductie = ref(lid.introductie)

const saveLid = () => {
  appStore.saveLid(gebruikersnaam, voornaam.value, achternaam.value, geboortedatum.value, introductie.value)
}
</script>
