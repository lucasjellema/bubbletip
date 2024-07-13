<template>
  <h1>Profiel van {{ appStore.ingechecktLid.gebruikersnaam }}</h1>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-text-field label="Voornaam" v-model="voornaam"></v-text-field>
        <v-text-field label="Achternaam" v-model="achternaam"></v-text-field>
        <v-text-field label="Geboortedatum" type="date" v-model="geboortedatum" </v-text-field>
          <v-textarea label="Introductie" prepend-icon="mdi-text-account" v-model="introductie"
            hint="introductie"></v-textarea>
          <v-btn title="Sla gegevens op" class="mb-2" @click="saveLid()">Opslaan</v-btn>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
import { useAppStore } from "@/stores/app";
const appStore = useAppStore()

const voornaam = ref(appStore.ingechecktLid.voornaam)
const achternaam = ref(appStore.ingechecktLid.achternaam)
const geboortedatum = ref(appStore.ingechecktLid.geboortedatum)
const introductie = ref(appStore.ingechecktLid.introductie)

const saveLid = () => {
  appStore.saveLid(appStore.ingechecktLid.gebruikersnaam, voornaam.value, achternaam.value, geboortedatum.value, introductie.value)
}
</script>
