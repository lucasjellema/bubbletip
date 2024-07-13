<template>
  <h1>Meld een Incident - een probleem of een verbetervoorstel</h1>
  <v-container class="mb-0 mt-1" fluid>
    <v-row>
      <v-col class="py-2" cols="12">
        <p>Type Incident</p>
        <v-btn-toggle v-model="incidentType" mandatory color="deep-purple-accent-3">
          <v-btn value="problem" title="Een probleem">
            <v-icon start>
              mdi-thumb-down-outline
            </v-icon>
            <span class="hidden-sm-and-down">Probleem</span>
          </v-btn>

          <v-btn value="suggestion" title="Een verbetervoorstel">
            <v-icon start>
              mdi-thumb-up-outline
            </v-icon>
            <span class="hidden-sm-and-down">Verbetervoorstel</span>
          </v-btn>

          <v-btn value="anders">
            <v-icon start>
              mdi-walk
            </v-icon>
            <span class="hidden-sm-and-down">Activiteit</span>
          </v-btn>

        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-2" cols="8">
         <v-textarea label="Beschrijving" v-model="beschrijving" hint="beschrijving van het probleem of van de verbetersuggestie"></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-btn title="Sla Incident op" class="mb-2" @click="saveIncident()">Sla Incident Op</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAppStore } from "@/stores/app";

const appStore = useAppStore()
const bubble = appStore.getBubble()

const incidentType = ref('verblijf')
const beschrijving = ref('') 

const saveIncident = () => {
  const incident = {
    incidentType: incidentType.value, tipGever: appStore.ingechecktLid?.gebruikersnaam, aanmaakdatum: new Date(), beschrijving: beschrijving.value
  }
  appStore.saveIncident(incident)
}
</script>
