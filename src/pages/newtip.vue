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
              <v-combobox v-model="tags" :items="Array.from(tipTags)" chips clearable deletable-chips multiple
                label="Voeg tags toe" append-icon="mdi-tag-plus" @change="handleTagChange"
                :menu-props="{ maxHeight: 'auto' }" class="ma-0 mt-5" </v-combobox>
                Wanneer was je er?
              <v-container class="mb-0 mt-1" fluid>
                <v-row>
                  <v-col cols="7">
                    <v-select :items="months" item-title="name" item-value="id" label="Welke Maand?" outlined
                      v-model="maand"></v-select>
                  </v-col>
                  <v-col cols="5">

                    <v-text-field label="In Welk Jaar" type="number" v-model="jaar" />
                  </v-col>
                </v-row>
              </v-container>

            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col class="py-2" cols="6">

        <MapComponent :initialCoordinates="{ lat: 51.505, lng: 5.09 }" :label="naam" v-model="geocoordinates"
          @update:coordinates="updateCoordinates" :coordinates="geocoordinates" />

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
    <v-row>
      <v-col class="py-2" cols="6">
        <h3>Foto's </h3>
        <v-data-table :headers="imageHeaders" :items="images" :items-per-page="5" class="elevation-1">
          <template v-slot:item.imageURL="{ item }">
            {{ item.imageLabel }} <p v-if="item.exifData?.dateTimeOriginal">gemaakt op {{ formatDate(new
              Date(item.exifData.dateTimeOriginal)) }}</p>
            <v-img :src="item.imageURL" aspect-ratio="1.7" height="200" v-if="item.imageURL"></v-img>
            <v-img :src="item.imageBase64" aspect-ratio="1.7" height="200" v-if="item.imageBase64"></v-img>
            <v-btn prepend-icon="mdi-map-marker-radius"
              title="Gebruik de GPS info in de foto om de geocoordinaten voor de kaart te bepalen "
              @click="defineTipCoordinatesFromEXIFGPS(item)" v-if="item.exifData?.gpsInfo?.latitude">Zet marker op de
              kaart</v-btn>

          </template>
        </v-data-table>

        <v-text-field label="URL van plaatje op internet" class="mb-2" v-model="imageURL"></v-text-field>
        <div @paste.prevent="handlePaste">
          <v-file-input v-model="uploadedImageFile" label="Upload een Foto" accept="image/*"
            @change="previewImage"></v-file-input>
          <v-text-field label="Beschrijving" class="mb-2" v-model="imageLabel"></v-text-field>
        </div>
        <v-btn title="Voeg image toe" @click="addImage()">Voeg image toe</v-btn>
      </v-col>
      <v-col class="py-2" cols="4">
        <v-img :src="imageURL" aspect-ratio="1.7" ref="newImage"></v-img>
        <v-img :src="uploadedImage" aspect-ratio="1.7" ref="newUploadedImage"></v-img>
      </v-col>
    </v-row>
  </v-container>
  <v-btn title="Sla tip op" class="mb-2" @click="saveTip()">Sla Tip Op</v-btn>
</template>

<script setup>
import { useGeoLibrary } from '@/composables/useGeoLibrary';
const { reverseGeocode, extractEXIFData } = useGeoLibrary();

import { useAppStore } from "@/stores/app";
import { onBeforeMount, onMounted } from "vue";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import MapComponent from '@/components/MapComponent.vue';
import { useDateLibrary } from '@/composables/useDateLibrary';
const { formatDate, months } = useDateLibrary();

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
const maand = ref('')
const jaar = ref('')

const tags = ref([])
const tipTags = appStore.tipTags
// oorspronkelijk ikookje
const wanneer = ref(null)
const methoeveel = ref(1)
const metwie = ref('')
const beoordeling = ref(1) // 0 = ok/goed, 1= heel/erg goed, 2 = super/topperdetop
const images = ref([])
// image = {imageURL, caption, aanmaakdatum, exifData}
const imageURL = ref('')
const imageLabel = ref('')
const newImage = ref(null)
const uploadedImage = ref(null)
const uploadedImageFile = ref(null)
const uploadedImageEXIFData = ref(null)

const addImage = () => {
  images.value.push({
    imageURL: imageURL.value, imageBase64: uploadedImage.value
    , imageFile: uploadedImageFile.value, imageLabel: imageLabel.value, aanmaakdatum: new Date(), exifData: uploadedImageEXIFData.value
  })
  imageURL.value = ''
  imageLabel.value = ''
  uploadedImageEXIFData.value = null
  uploadedImage.value = null
  uploadedImageFile.value = null
}
const imageHeaders = [
  {
    title: 'Image', key: 'imageURL', sortable: false
  },
]

const previewImage = async () => {
  if (uploadedImageFile.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.value = e.target.result;
    };
    reader.readAsDataURL(uploadedImageFile.value);
    const exifData = await extractEXIFData(uploadedImageFile.value);
    uploadedImageEXIFData.value = exifData

  }
}

const handlePaste = async (event) => {

  if (event.clipboardData?.items) {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      // Check if the item is an image
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        //    uploadedImage.value = file
        uploadedImageFile.value = file
        previewImage()
      }

      // if item is a string that is a valid URL - set the imageUrl property 
      // 
      if (items[i].type.indexOf("text") !== -1) {
        const text = (event.clipboardData || window.clipboardData).getData('text');
        if (isValidImageUrl(text)) { // Implement isValidImageUrl according to your needs
          imageUrl.value = text
        }
      }
    }
  }
}

const isValidImageUrl = (url) => {
  return url.match(/\.(jpeg|jpg|gif|png)$/i) != null;
}

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

const defineTipCoordinatesFromEXIFGPS = (item) => {
  if (item.exifData && item.exifData.gpsInfo.latitude && item.exifData.gpsInfo.longitude) {
    geocoordinates.value = {
      lat: item.exifData.gpsInfo.latitude,
      lng: item.exifData.gpsInfo.longitude
    }
  }
}

const saveTip = () => {
  const tip = {
    tipType: tipType.value, tipGever: appStore.ingechecktLid.gebruikersnaam, aanmaakdatum: new Date(), naam: naam.value
    , adresgegevens: adresgegevens.value, straat: straat.value, postcode: postcode.value, wijk: wijk.value, huisnummer: huisnummer.value, land: land.value, stad: stad.value,
    website: website.value, beschrijving: beschrijving.value, geocoordinates: geocoordinates.value, tags: tags.value, wanneer: wanneer.value
    , methoeveel: methoeveel.value, metwie: metwie.value, beoordeling: beoordeling.value, images: images.value
  }
  appStore.saveTip(tip)
}

const handleTagChange = (newValue) => {
  // Handle the change event
  // This is where you might want to add logic to update the list of tags
  // For example, you could add the newly entered tag to `availableTags`
  // if it doesn't already exist, assuming you want to save it for future suggestions.
  console.log('Tags updated:', newValue);
}
</script>
