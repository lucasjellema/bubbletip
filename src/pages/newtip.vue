<template>
  <h1>Nieuwe Tip</h1>
  <v-container class="mb-0 mt-1" fluid>
    <v-row>
      <v-col class="py-2" cols="12">
        <p>Type Tip</p>
        <v-btn-toggle v-model="tipType" mandatory color="deep-purple-accent-3">
          <v-btn value="verblijf">
            <v-icon start>
              mdi-bed
            </v-icon>
            <span class="hidden-sm-and-down">Overnachtingsplek</span>
          </v-btn>

          <v-btn value="restaurant">
            <v-icon start>
              mdi-silverware-fork-knife
            </v-icon>
            <span class="hidden-sm-and-down">Restaurant</span>
          </v-btn>

          <v-btn value="activiteit">
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
        <v-text-field label="Naam" v-model="naam" hint="Naam van hotel, restaurant, museum, attractie"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-2" cols="8">
        <v-text-field label="Adres" v-model="adresgegevens" hint="Straat, huisnummer, postcode, stad, land"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-2" cols="8">
        <v-text-field label="Website" v-model="website" hint="website (url) van hotel, restaurant, museum, attractie"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-2" cols="8">
        <v-textarea label="Beschrijving" v-model="beschrijving" hint="beschrijving van hotel, restaurant, museum, attractie: wat is het? waarom is het leuk? hoe kom je er? wat kost het?"></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-btn title="Sla tip op" class="mb-2" @click="saveTip()">Sla Tip Op</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { onBeforeMount, onMounted } from "vue";
const appStore = useAppStore()
const bubble = appStore.getBubble()

const tipType = ref('verblijf')
const naam = ref('')
const adresgegevens = ref('')
const website = ref('')
const beschrijving = ref('') // rich text
const geocoordinates = ref([])
const tags = ref([])
// oorspronkelijk ikookje
const wanneer = ref(null)
const methoeveel = ref(1)
const metwie = ref('')
const beoordeling = ref(1) // 0 = ok/goed, 1= heel/erg goed, 2 = super/topperdetop
// fotos

//

const saveTip = () => {
  const tip = {
    tipType: tipType.value, tipGever: appStore.ingechecktLid.gebruikersnaam, aanmaakdatum: new Date(), naam: naam.value
    , adresgegevens: adresgegevens.value, website: website.value, beschrijving: beschrijving.value, geocoordinates: geocoordinates.value, tags: tags.value, wanneer: wanneer.value
    , methoeveel: methoeveel.value, metwie: metwie.value, beoordeling: beoordeling.value
  }
  appStore.saveTip(tip)
}
</script>
