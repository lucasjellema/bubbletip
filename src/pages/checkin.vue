<template>
  <v-responsive>
    <h1>Checkin</h1>
    <v-container fluid tag="section" aria-labelledby="title">
      <v-main>
        <v-row>
          <v-col cols="6" offset="1">
            <h2>Meld je aan </h2>
            <v-container fluid>
              <v-row>
                <v-col cols="6">
                  <h3 v-if="bubble && bubble.leden != null && bubble?.leden.length > 0">Selecteer je lidprofiel</h3>
                  <v-select label="Wie ben je?" :items="bubble.leden" item-title="gebruikersnaam" item-value="gebruikersnaam"
                     v-model="appStore.ingechecktLid" return-object
                    v-if="bubble && bubble.leden != null && bubble.leden.length > 0"></v-select>
                </v-col>
                <v-col cols="6">
                  <v-expansion-panels :multiple="false">
                    <v-expansion-panel title="Meld je aan als nieuw lid van de tip-bubbel"
                      collapse-icon="mdi-badge-account-outline" expand-icon="mdi-badge-account-outline">
                      <v-expansion-panel-text>
                        <v-text-field label="Gebruikersnaam" prepend-icon="mdi-badge-account-outline"
                          v-model="gebruikersnaam"></v-text-field>
                        <v-text-field label="Voornaam" v-model="voornaam"></v-text-field>
                        <v-text-field label="Achternaam" v-model="achternaam"></v-text-field>
                        <v-text-field label="Geboortedatum" type="date" v-model="geboortedatum" </v-text-field>
                          <v-textarea label="Introductie" prepend-icon="mdi-text-account" v-model="introductie"
                            hint="introductie"></v-textarea>
                          <v-btn title="Sla gegevens op" class="mb-2" @click="saveLid()">Opslaan</v-btn>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-main>
    </v-container>
  </v-responsive>
</template>



<script setup>
import { useAppStore } from "@/stores/app";
import {onMounted } from "vue";
const appStore = useAppStore()
const bubble = appStore.getBubble()
const gebruikersnaam = ref(null)
const voornaam = ref(null)
const achternaam = ref(null)
const geboortedatum = ref(null)

const introductie = ref(null)
const saveLid = () => {
  const nieuwLid = appStore.saveLid(gebruikersnaam.value, voornaam.value, achternaam.value, geboortedatum.value, introductie.value)
  if (appStore.ingechecktLid == null) {
    appStore.ingechecktLid = nieuwLid
  }
}

onMounted(() => {

})
//
</script>
