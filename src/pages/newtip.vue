<template>
  <h1>Nieuwe Tip</h1>
  <v-container class="mb-0 mt-1" fluid>
    <v-row>
      <v-col class="py-2" cols="6">

        <v-container class="mb-0 mt-1" fluid>
          <v-row>
            <v-col class="py-2" cols="12">
              <p>Type Tip</p>
              <v-btn-toggle v-model="tipType" mandatory color="deep-purple-accent-3">
                <v-btn value="verblijf" title="Overnachtingsplek - hotel, camping, appartement, ...">
                  <v-icon start>
                    mdi-bed
                  </v-icon>
                  <span class="hidden-sm-and-down">Overnachtingsplek</span>
                </v-btn>

                <v-btn value="restaurant" title="Plek om te eten - restaurant, cafe, pizzeria, bakkerij, ...">
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
            <v-col class="py-2" cols="11">
              <v-text-field label="Naam" v-model="naam"
                hint="Naam van hotel, camping, restaurant, museum, attractie"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-2" cols="11">
              <v-expansion-panels :multiple="true">
                <v-expansion-panel title="Plek" collapse-icon="mdi-map-marker" expand-icon="mdi-map-marker">
                  <v-expansion-panel-text>
                    <v-container class="mb-0 mt-1" fluid>
                      <v-row>
                        <v-col class="py-2" cols="10">
                          <v-text-field label="Adres" v-model="adresgegevens"
                            hint="Straat, huisnummer, postcode, stad, land"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4">
                          <v-text-field label="Straat" v-model="straat"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                          <v-text-field label="Nummer" v-model="huisnummer"></v-text-field>
                        </v-col>
                        <v-col cols="3">
                          <v-text-field label="Wijk" v-model="wijk"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="2">
                          <v-text-field label="Postcode" v-model="postcode"></v-text-field>
                        </v-col>
                        <v-col cols="3">
                          <v-text-field label="Stad" v-model="stad"></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field label="Land" v-model="land"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-2" cols="11">
              <v-text-field label="Website" v-model="website"
                hint="website (url) van hotel, restaurant, museum, attractie"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-2" cols="11">
              <p>Beschrijving (van hotel, restaurant, museum, attractie: wat is het? waarom is het leuk? hoe kom je er?
                wat kost het?)</p>
              <v-sheet class="flex-1-1-100  ma-0 pa-0 mb-3">
                <QuillEditor theme="snow" toolbar="essential" v-model:content="beschrijving" contentType="delta" />
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col class="py-2" cols="6">

        <MapComponent :initialCoordinates="{ lat: 51.505, lng: 5.09 }" :label="naam" v-model="geocoordinates"
          @update:coordinates="updateCoordinates" />

        <v-btn @click="refreshLocationDetailsThroughGeocoder()"
          title="Gebruik geodecoding om adresgegevens op te halen op basis van geocoordinaten"
          v-if="geocoordinates != null && geocoordinates.lat && geocoordinates.lng">
          <v-icon start>
            mdi-map-marker-down
          </v-icon>
          <span class="hidden-sm-and-down">Haal adresgegevens op op basis van geocoordinaten</span>
        </v-btn>

      </v-col>
    </v-row>
  </v-container>
  <v-btn title="Sla tip op" class="mb-2" @click="saveTip()">Sla Tip Op</v-btn>
</template>

<script setup>
import { useGeoLibrary } from '@/composables/useGeoLibrary';
const { reverseGeocode } = useGeoLibrary();

import { useAppStore } from "@/stores/app";
import { onBeforeMount, onMounted } from "vue";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import MapComponent from '@/components/MapComponent.vue';

const appStore = useAppStore()
const bubble = appStore.getBubble()

const tipType = ref('verblijf')
const naam = ref('')
const adresgegevens = ref('')
const website = ref('')
const beschrijving = ref('') // rich text
const geocoordinates = ref([])
const stad = ref('')
const land = ref('')
const straat = ref('')
const postcode = ref('')
const wijk = ref('')
const huisnummer = ref('')

const tags = ref([])
// oorspronkelijk ikookje
const wanneer = ref(null)
const methoeveel = ref(1)
const metwie = ref('')
const beoordeling = ref(1) // 0 = ok/goed, 1= heel/erg goed, 2 = super/topperdetop
// fotos

//

const updateCoordinates = (newCoordinates) => {
  geocoordinates.value = newCoordinates;
}

const refreshLocationDetailsThroughGeocoder = async () => {
  const coordinates = geocoordinates.value
  if (coordinates != null && coordinates.lat && coordinates.lng) {
    const locationDetails = await reverseGeocode(coordinates.lng, coordinates.lat)
    adresgegevens.value = locationDetails.address
    naam.value = locationDetails.label
    land.value = locationDetails.country
    straat.value = locationDetails.street
    stad.value = locationDetails.city
    postcode.value = locationDetails.postcode
    wijk.value = locationDetails.quarter
    huisnummer.value = locationDetails.house_number
  }
}

const saveTip = () => {
  const tip = {
    tipType: tipType.value, tipGever: appStore.ingechecktLid.gebruikersnaam, aanmaakdatum: new Date(), naam: naam.value
    , adresgegevens: adresgegevens.value, straat: straat.value, postcode: postcode.value, wijk: wijk.value, huisnummer: huisnummer.value, land: land.value, stad: stad.value, 
    website: website.value, beschrijving: beschrijving.value, geocoordinates: geocoordinates.value, tags: tags.value, wanneer: wanneer.value
    , methoeveel: methoeveel.value, metwie: metwie.value, beoordeling: beoordeling.value
  }
  appStore.saveTip(tip)
}
</script>
