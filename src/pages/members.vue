<template>
  <h1>Leden van de Tip Bubbel</h1>
  <v-data-table :headers="lidHeaders" :items="bubble.leden" item-key="gebruikersnaam" class="elevation-1">

  </v-data-table>

</template>

<script setup>
import { useAppStore } from "@/stores/app";
const appStore = useAppStore()
const bubble = appStore.getBubble()

const lidHeaders = ref([
  { title: 'Gebruikersnaam', key: 'gebruikersnaam' },
  { title: 'Voornaam', key: 'voornaam' },
  { title: 'Achternaam', key: 'achternaam' },
  { title: 'Lid Sinds', key: 'aanmaakdatum' },
  { title: 'Geboortedatum', key: 'geboortedatum' },
  //{ title: 'Actions', value: 'actions' },
])


    // <!-- <template v-slot:item.actions="{ item, index }">
    //   <v-icon small @click="editLid(item, index)">
    //     mdi-pencil
    //   </v-icon>
    //   <v-icon small @click="verwijderLid(item, index)">
    //     mdi-delete
    //   </v-icon>
    // </template> -->

</script>
