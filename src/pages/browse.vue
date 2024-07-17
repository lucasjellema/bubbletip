<template>
  <h1>Zoeken en Bladeren</h1>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="Zoeken..." v-model="search"></v-text-field>
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
            <v-btn @click="gotoItem(item)" text>Details</v-btn>

            <v-icon >
              {{ item.tipType === 'verblijf' ? 'mdi-bed' : (item.tipType === 'restaurant' ? 'mdi-silverware-fork-knife'
                : 'mdi-walk') }}
            </v-icon>

          </template>

          <template v-slot:item.aanmaakdatum="{ item, index }">
            {{ formatDate(item.aanmaakdatum) }}
          </template>
        </v-data-table>

      </v-col>
    </v-row>

  </v-container>
  <v-dialog v-model="tipDialog">
    <TipComponent :tipId="tipId" @close="tipDialog=false"></TipComponent>
    </v-dialog>

  {{ tips }}
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
const countries = ref([])

const tipDialog = ref(false)
const tipId = ref(0)


const tipHeaders = ref([
  { title: 'Type', key: 'tipType' },
  { title: 'Datum', key: 'aanmaakdatum' },
  { title: 'Label', key: 'naam' },
  { title: 'Tipper', key: 'tipGever' },

])
const tips = ref([])
const filteredTips = ref([])
const search = ref('')

const filter = () => {
  filteredTips.value = tips.value
  if (search.value !== '') {
    filteredTips.value = filteredTips.value.filter((tip) => tip.naam.toLowerCase().includes(search.value.toLowerCase()))
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

}

watch(search, () => {
  filter()
})

watch([filterTags,filterTipTypes, filterCountries], () => {
  filter()
})


onMounted(() => {
  tips.value = bubble.value.tips
  countries.value = tips.value.map((tip) => tip.land).filter((value, index, self) => self.indexOf(value) === index)
  filter()
})
const gotoItem = (item) => {
    router.push({ name: 'tip', params: { tipId: item.id } });
}</script>
