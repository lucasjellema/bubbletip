<template>
  <h1>Zoeken en Bladeren</h1>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="Zoeken..." v-model="search" hint="Zoek naar tips op basis van naam, tags, plaats, adres"></v-text-field>
        <MapMarkersComponent :tips="filteredTips" :adjust="adjust" @boxed="handleBoxed" @tipSelected="handleTipSelected"></MapMarkersComponent>
      </v-col>
      <v-col>
        <v-card-text>
          <h2 class="text-h6 mb-2">Type Tip</h2>
          <v-chip-group v-model="filterTipTypes" column multiple>
            <v-chip text="Overnachtingsplek" value="verblijf" variant="outlined" prepend-icon="mdi-bed" filter></v-chip>
            <v-chip text="Restaurant" key="restaurant" value="restaurant" variant="outlined"
              prepend-icon="mdi-silverware-fork-knife" filter></v-chip>
            <v-chip text="Activiteit" value="activiteit" variant="outlined" prepend-icon="mdi-walk" filter></v-chip>
          </v-chip-group>
        </v-card-text>
        <v-card-text>
          <h2 class="text-h6 mb-2">Land</h2>
          <v-chip-group v-model="filterCountries" column multiple>
            <v-chip v-for="country in countries" :key="country" :text="country" filter></v-chip>
          </v-chip-group>
        </v-card-text>
        <v-card-text>
          <h2 class="text-h6 mb-2">Tags</h2>
          <v-chip-group v-model="filterTags" column multiple>
            <v-chip v-for="tag in tipTags" :key="tag" :text="tag" filter></v-chip>
          </v-chip-group>
        </v-card-text>
      </v-col>

    </v-row>
    <v-row>
      <v-col>
        <h2>Tips</h2>
        <v-data-table :headers="tipHeaders" :items="filteredTips" class="elevation-1">

          <template v-slot:item.tipType="{ item, index }">
            <!-- <v-btn @click="gotoItem(item)" text>Details</v-btn> -->
            <v-btn @click="() => { tipId = item.id; tipDialog = true }" text>Details</v-btn>

            <v-icon>{{tipTypeIconMap[item.tipType]}}
            </v-icon>
          </template>
          <template v-slot:item.plek="{ item, index }">
            <span>{{ item.stad }}, {{ item.land }}</span>

          </template>

          <template v-slot:item.aanmaakdatum="{ item, index }">
            {{ formatDate(item.aanmaakdatum) }}
          </template>
        </v-data-table>

      </v-col>
    </v-row>

  </v-container>
  <v-dialog v-model="tipDialog">
    <v-card title="Tip Details">
      <v-toolbar>
        <v-btn icon="mdi-close" @click="tipDialog = false"></v-btn>
      </v-toolbar>
      <template v-slot:text>
        <TipComponent v-model="selectedTip" @close="tipDialog = false"></TipComponent>
      </template>
    </v-card>
  </v-dialog>

</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { onMounted, watch } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const appStore = useAppStore()
const bubble = appStore.getBubble()
const tipTags = appStore.tipTags
const filterTags = ref([])
const filterTipTypes = ref([])
const filterCountries = ref([])
import { useDateLibrary } from '@/composables/useDateLibrary';
const { formatDate } = useDateLibrary();

import { useIconsLibrary } from '@/composables/useIconsLibrary';
const { tipTypeIconMap } = useIconsLibrary();

import MapMarkersComponent from "@/components/MapMarkersComponent .vue";

const countries = ref([])

const tipDialog = ref(false)
const tipId = ref(0)

const selectedTip = computed(() =>
  tips.value.find(tip => tip.id === tipId.value)
)

const adjust = ref(0)

const handleTipSelected = (tip) => {
  console.log('tip selected', tip)
  tipId.value = tip.id
  tipDialog.value = true
}

const tipHeaders = ref([
  { title: 'Type', key: 'tipType' },
  { title: 'Naam', key: 'naam' },
  { title: 'Plek', key: 'plek' },
  { title: 'Tipper', key: 'tipGever' },
  { title: 'Datum', key: 'aanmaakdatum' },

])
const tips = ref([])
const filteredTips = ref([])
const search = ref('')
const geobounds = ref(null)

const filter = () => {
  filteredTips.value = tips.value
  if (search.value !== '') {
    filteredTips.value = filteredTips.value.filter((tip) => 
       tip.naam?.toLowerCase().includes(search.value.toLowerCase())
      ||tip.plaats?.toLowerCase().includes(search.value.toLowerCase())
      ||tip.adresgegevens?.toLowerCase().includes(search.value.toLowerCase())
      ||tip.tags.find(t => t.toLowerCase().includes(search.value.toLowerCase()))
      )
  }
  if (filterTags.value.length > 0) {
    const t = Array.from(filterTags.value)
    const tt = Array.from(tipTags)
    const tagsToFilterOn = t.map(tag => tt[tag])
    filteredTips.value = filteredTips.value.filter((tip) => tagsToFilterOn.every(element => tip.tags.includes(element))) //     filterTags.value.includes(tip.tipType))
  }
  if (filterTipTypes.value.length > 0) {
    filteredTips.value = filteredTips.value.filter((tip) => filterTipTypes.value.includes(tip.tipType))
  }
  if (filterCountries.value.length > 0) {
    const countriesToFilterOn = filterCountries.value.map(tag => countries.value[tag])
    filteredTips.value = filteredTips.value.filter((tip) => countriesToFilterOn.includes(tip.land))
  }
  if (geobounds.value !== null) {
    filteredTips.value = filteredTips.value.filter((tip) => {
      return geobounds.value.contains(tip.geocoordinates)
    })
  }
}

watch(search, () => {
  filter()
})

watch([filterTags, filterTipTypes, filterCountries], () => {
  filter()
})

const handleBoxed = (bounds) => {
  geobounds.value = bounds
  filter()
}


onMounted(() => {
  tips.value = bubble.value.tips
  countries.value = tips.value.map((tip) => tip.land).filter((value, index, self) => self.indexOf(value) === index)
  filter()
})
const gotoItem = (item) => {
  router.push({ name: 'tip', params: { tipId: item.id } });
}</script>
