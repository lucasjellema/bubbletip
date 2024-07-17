<template>
  <h1>Nieuwe Tip</h1>
  <EditTipComponent v-model="tip" v-if="tip"/>
  <v-btn title="Sla tip op" class="mb-2" @click="saveTip()">Sla Tip Op</v-btn>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
const appStore = useAppStore()
import { useRoute } from 'vue-router';
const router = useRouter()


const tip = ref({wanneer :{maand:null,jaar:null}, images : [], tag:[]})
onMounted(() => {
})

const saveTip = () => {
  const newTip = {
    tipType: tip.value.tipType, tipGever: appStore.ingechecktLid.gebruikersnaam, aanmaakdatum: new Date(), naam: tip.value.naam.value
    , adresgegevens: tip.value.adresgegevens, straat: tip.value.straat, postcode: tip.value.postcode, wijk: tip.value.wijk, huisnummer: tip.value.huisnummer, land: tip.value.land, stad: tip.value.stad,
    website: tip.value.website, beschrijving: tip.value.beschrijving, geocoordinates: tip.value.geocoordinates, tags: tip.value.tags, wanneer: tip.value.wanneer 
    , methoeveel: tip.value.methoeveel, metwie: tip.value.metwie, beoordeling: tip.value.beoordeling, images: tip.value.images
  }
  appStore.saveTip(newTip)
  router.push({ name: 'tip', params: { tipId: newTip.id } });

}

const handleTagChange = (newValue) => {
  // Handle the change event
  // This is where you might want to add logic to update the list of tags
  // For example, you could add the newly entered tag to `availableTags`
  // if it doesn't already exist, assuming you want to save it for future suggestions.
  console.log('Tags updated:', newValue);
}
</script>
