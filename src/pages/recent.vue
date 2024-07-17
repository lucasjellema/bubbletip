<template>
  <h1>Recente Tips en Nieuwe Leden</h1>

  <v-data-table :headers="recentHeaders" :items="recentItems" item-key="gebruikersnaam" class="elevation-1">

    <template v-slot:item.type="{ item, index }">
      <v-btn @click="gotoItem(item)" text>Details</v-btn>
      <v-icon>{{ item.type === 'tip' ? 'mdi-star-plus-outline' : 'mdi-account' }}</v-icon>
      <v-icon v-if="item.type === 'tip'">
        {{ item.tipType === 'verblijf' ? 'mdi-bed' :(item.tipType === 'restaurant' ? 'mdi-silverware-fork-knife' :'mdi-walk') }}
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
const recentItems = ref([])
onMounted (() => {
  
  recentItems.value= appStore.getRecent()
  recentItems.value = recentItems.value.sort((a, b) => new Date(b.datum) - new Date(a.datum))
})

const recentHeaders = ref([
  { title: 'Type', key: 'type' },
  { title: 'Datum', key: 'datum' },
  { title: 'Label', key: 'label' },
  { title: 'Details', key: 'details' },
  //{ title: 'Actions', value: 'actions' },
])

import { useDateLibrary } from '@/composables/useDateLibrary';
const { formatDate } = useDateLibrary();

const gotoItem = (item) => {
  if (item.type === 'tip')
    router.push({ name: 'tip', params: { tipId: item.id } });
  else if (item.type === 'lid')
    router.push({ name: 'profile', params: { gebruikersnaam: item.id } });
}
//
</script>
