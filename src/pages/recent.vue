<template>
  <h1>Recente Tips, IkOokjes, Leden en Tip Verzoeken</h1>

  <v-data-table :headers="recentHeaders" :items="appStore.getRecent()" item-key="gebruikersnaam" class="elevation-1">

    <template v-slot:item.type="{ item, index }">
      <v-btn @click="gotoItem(item)" text>Details</v-btn>
      <v-icon>{{ item.type === 'tip' ? 'mdi-star-plus-outline' : 'mdi-account' }}
      </v-icon>
    </template>
    <template v-slot:item.datum="{ item, index }">
      {{ formatDate(item.datum) }}
    </template>
  </v-data-table>

</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { useRouter } from 'vue-router'

const router = useRouter()

const appStore = useAppStore()
const bubble = appStore.getBubble()

const recentHeaders = ref([
  { title: 'Type', key: 'type' },
  { title: 'Datum', key: 'datum' },
  { title: 'Label', key: 'label' },
  { title: 'Details', key: 'details' },
  //{ title: 'Actions', value: 'actions' },
])

const formatDate = (date) => {
  if (date == null) return
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('nl-NL', options);
}

const gotoItem = (item) => {
  if (item.type === 'tip')
    router.push({ name: 'tip', params: { tipId: item.id } });
  else if (item.type === 'lid')
    router.push({ name: 'profile', params: { gebruikersnaam: item.id } });
}
//
</script>
