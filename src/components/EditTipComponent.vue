<template>
    <v-container class="mb-0 mt-1" fluid>
        <v-row>
            <v-col class="py-2" cols="12">
                <v-btn-toggle v-model="model.tipType" mandatory color="deep-purple-accent-3">
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
                <v-text-field label="Naam" v-model="model.naam"
                    hint="Naam van hotel, camping, restaurant, museum, attractie"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-2" cols="11">
                <v-text-field label="Website" v-model="model.website"
                    hint="website (url) van hotel, restaurant, museum, attractie"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-2" cols="11">
                <p>Beschrijving (van hotel, restaurant, museum, attractie: wat is het? waarom is het leuk? hoe kom je
                    er?
                    wat kost het?)</p>
                <v-sheet class="flex-1-1-100  ma-0 pa-0 mb-3">
                    <v-textarea v-model="model.beschrijving" variant="outlined" rows="4"></v-textarea>
                    <!-- <QuillEditor theme="snow" toolbar="essential" v-model:content="model.beschrijving" contentType="delta" /> -->
                    <!-- @update:model-value="handleSelectionUpdate" :custom-filter="customFilter"
                     -->
                </v-sheet>
                
                <v-autocomplete clearable chips closable-chips v-model="selectedTags" :items="filteredTags" multiple
                    item-title="name" item-value="name" auto-select-first hide-no-data hide-selected small-chips
                    label="Voeg tags toe" append-icon="mdi-tag-plus" @blur="handleBlurOnTags"
                    :custom-filter="customFilter" @update:model-value="handleSelectionUpdate" clear-on-select
                    ref="autocompleteRef" class="ma-0 mt-5">
                    <!-- selected items -->
                    <template v-slot:chip="{ props, item }">
                        <v-chip v-bind="props" :text="item.raw.name"></v-chip>
                    </template> <!-- to select -->
                    <template v-slot:item="{ props, item }">
                        <v-chip v-bind="props" :text="item.raw.name" class="chippie"></v-chip>
                    </template>

                </v-autocomplete>

                Wanneer was je er?
                <v-container class="mb-0 mt-1" fluid>
                    <v-row>
                        <v-col cols="7">
                            <v-select :items="months" item-title="name" item-value="id" label="Welke Maand?" outlined
                                v-model="model.maand"></v-select>
                        </v-col>
                        <v-col cols="5">

                            <v-text-field label="In Welk Jaar" type="number" v-model="model.jaar" />
                        </v-col>
                    </v-row>
                </v-container>

            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-2" cols="11">
                <v-expansion-panels :multiple="true">
                    <v-expansion-panel title="Plek" collapse-icon="mdi-map-marker" expand-icon="mdi-map-marker"
                        @click="handlePanelChange">
                        <v-expansion-panel-text>
                            <v-container class="mb-0 mt-1" fluid>
                                <v-row>
                                    <v-col class="py-2" cols="6">

                                        <p>Klik op de kaart om de locatie aan te geven van jouw tip. Je kunt de marker
                                            verplaatsen of
                                            een nieuwe
                                            plaatsen.</p>
                                        <MapComponent :initialCoordinates="model.geocoordinates" :label="model.naam"
                                            v-model="model.geocoordinates" @update:coordinates="updateCoordinates"
                                            :coordinates="model.geocoordinates" :adjust="adjust" />
                                        <!-- adjust is used only to alert the map component to the fact that the panel was expanded or collapsed (and therefore should invalidate the mapsize) -->

                                        <v-btn @click="refreshLocationDetailsThroughGeocoder()"
                                            title="Gebruik geodecoding om adresgegevens op te halen op basis van geocoordinaten"
                                            v-if="model.geocoordinates != null && model.geocoordinates.lat && model.geocoordinates.lng">
                                            <v-icon start>
                                                mdi-map-marker-down
                                            </v-icon>
                                            <span class="hidden-sm-and-down">Haal adresgegevens op op basis van
                                                geocoordinaten</span>
                                        </v-btn>


                                    </v-col><v-col cols="6">

                                        <v-container class="mb-0 mt-1" fluid @paste.prevent="handleLocationPaste">
                                            <v-row>
                                                <v-col class="py-2" cols="11">
                                                    <v-text-field label="Adres" v-model="model.adresgegevens"
                                                        hint="Straat, huisnummer, postcode, stad, land"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="5">
                                                    <v-text-field label="Straat" v-model="model.straat"></v-text-field>
                                                </v-col>
                                                <v-col cols="2">
                                                    <v-text-field label="Nummer"
                                                        v-model="model.huisnummer"></v-text-field>
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-text-field label="Wijk" v-model="model.wijk"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="2">
                                                    <v-text-field label="Postcode"
                                                        v-model="model.postcode"></v-text-field>
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-text-field label="Stad" v-model="model.stad"></v-text-field>
                                                </v-col>
                                                <v-col cols="5">
                                                    <v-text-field label="Land" v-model="model.land"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="py-2" cols="6">
                <h3>Foto's </h3>
                <v-data-table :headers="imageHeaders" :items="model.images" :items-per-page="5"
                    class="elevation-1 mb-4">
                    <template v-slot:item.imageURL="{ item, index }">
                        <v-text-field label="Beschrijving" v-model="item.imageLabel" class="mt-2" </v-text-field>
                            <p v-if="item.exifData?.dateTimeOriginal">gemaakt op {{ formatDate(new
                                Date(item.exifData.dateTimeOriginal)) }}</p>
                            <v-img :src="item.imageURL" aspect-ratio="1.7" height="200" v-if="item.imageURL"></v-img>
                            <v-img :src="item.imageBase64" aspect-ratio="1.7" height="200"
                                v-if="item.imageBase64"></v-img>
                            <v-btn prepend-icon="mdi-map-marker-radius"
                                title="Gebruik de GPS info in de foto om de geocoordinaten voor de kaart te bepalen "
                                @click="defineTipCoordinatesFromEXIFGPS(item)"
                                v-if="item.exifData?.gpsInfo?.latitude">Zet
                                marker op de
                                kaart</v-btn>
                            <v-btn title="Verwijder deze foto" @click="removeImage(item, index)"
                                prepend-icon="mdi-delete" class="mb-2">Verwijder foto</v-btn>
                            <br />
                    </template>
                </v-data-table>
                <h3>Voeg foto toe</h3>
                <div @paste.prevent="handleImagePaste">
                    <v-text-field label="URL van plaatje op internet" class="mb-2" v-model="imageURL"></v-text-field>
                    <v-file-input v-model="uploadedImageFile" label="Upload een Foto" accept="image/*"
                        @change="previewImage"></v-file-input>
                    <v-text-field label="Beschrijving" class="mb-2" v-model="imageLabel"></v-text-field>
                </div>
                <v-btn title="Voeg image toe" @click="addImage()">Voeg foto toe</v-btn>
            </v-col>
            <v-col class="py-2" cols="4">
                <v-img :src="imageURL" aspect-ratio="1.7" ref="newImage"></v-img>
                <v-img :src="uploadedImage" aspect-ratio="1.7" ref="newUploadedImage"></v-img>
            </v-col>
        </v-row>



    </v-container>
</template>

<script setup>
// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { nextTick, onMounted } from 'vue'
import { useDateLibrary } from '@/composables/useDateLibrary';
const { formatDate, months } = useDateLibrary();
import { useGeoLibrary } from '@/composables/useGeoLibrary';
const { reverseGeocode, extractEXIFData, isValidCoordinateFormat } = useGeoLibrary();

import { useAppStore } from "@/stores/app";

const appStore = useAppStore()
const bubble = appStore.getBubble()
const model = defineModel()
const tipTags = ref([])

const selectedTags = ref([])
const filteredTags = computed(() => {
    const tagArray = Array.from(tipTags.value)
    const tags = tagArray.map((tag) => {
        return { name: tag }
    })
    return tags
})


const searchTagsField = ref('')
const searchField = ref('')
const autocompleteRef = ref(null)

const handleBlurOnTags = (event) => {
    console.log('blur, current search value on tags ', searchField.value)
    if (searchField.value !== '' && !elementAdded) {

        tipTags.value.find(element => element === searchField.value) === undefined ? tipTags.value.push(searchField.value) : console.log('value already exists in tipTags')
        const tag = tipTags.value.find(element => element.name === searchField.value)
        selectedTags.value.find(element => element === searchField.value) === undefined ? selectedTags.value.push( searchField.value ) : console.log('value already exists in model tags')
        updateModelTags()

        
        console.log('add tag ', searchField.value)
        searchTagsField.value = ''
        searchField.value = ''
        autocompleteRef.value.search = ''
    }
    elementAdded = false

}
const customFilter = (itemTitle, queryText, item) => {
    //  console.log('custom filter ', itemTitle, queryText, item)
    elementAdded = false
    const textOne = item.raw.name.toLowerCase()
    // const textTwo = item.raw.abbr.toLowerCase()
    const searchText = queryText.toLowerCase()
    searchField.value = queryText
    return queryText.length > -1 && textOne.indexOf(searchText) > -1
}

let elementAdded = false
const handleSelectionUpdate = (event) => {
    elementAdded = true
}


onMounted(() => {
    const m = model.value
    if (!model.value.maand) { model.value.maand = model.value.wanneer?.maand }
    if (!model.value.jaar) { model.value.jaar = model.value.wanneer?.jaar }
    if (!model.value.wanneer?.maand) { model.value.maand = model.value.maand }
    if (!model.value.wanneer?.jaar) { model.value.jaar = model.value.jaar }
    tipTags.value = [...appStore.tipTags]
    selectedTags.value = model.value.tags.map((tag) => {
        return tag
    })

})

const updateModelTags = () => {
    const tags = selectedTags.value.map((tag) => {
        console.log('tag in new Value', tag)
        return tag
    })
    model.value.tags = tags
    console.log('model tags updated', model.value.tags)

}

watch(selectedTags, async (newTags, oldTags) => {
updateModelTags()
})


const handleTagChange = (newValue) => {
    // Handle the change event
    // This is where you might want to add logic to update the list of tags
    // For example, you could add the newly entered tag to `availableTags`
    // if it doesn't already exist, assuming you want to save it for future suggestions.
    console.log('Tags updated:', newValue);
}


const imageURL = ref('')
const imageLabel = ref('')
const newImage = ref(null)
const uploadedImage = ref(null)
const uploadedImageFile = ref(null)
const uploadedImageEXIFData = ref(null)

const addImage = () => {
    console.log('adding image to model', model.value)
    model.value.images.push({
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

const updateCoordinates = (newCoordinates) => {
    nextTick(() => {
        model.value.geocoordinates = newCoordinates;

    })
}

const handleLocationPaste = async (event) => {

    if (event.clipboardData?.items) {
        const items = event.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("text") !== -1) {
                const text = (event.clipboardData || window.clipboardData).getData('text');
                if (isValidCoordinateFormat(text)) {
                    console.log(`looks like coordinates`)
                    const coordinates = text.split(',');
                    const longitude = parseFloat(coordinates[1]);
                    const latitude = parseFloat(coordinates[0]);
                    updateCoordinates({ lat: latitude, lng: longitude })
                    nextTick(() => {
                        refreshLocationDetailsThroughGeocoder()
                    })
                } else {
                    event.target.value = text;
                }
            }
        }
    }
}



const handleImagePaste = async (event) => {

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
                    imageURL.value = text
                }
            }
        }
    }
}

const isValidImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/i) != null;
}

const removeImage = (item, index) => {
    model.value.images.splice(index, 1)
}

const adjust = ref(0)
const handlePanelChange = (isOpen) => {
    if (isOpen) {
        nextTick(() => {
            adjust.value++
        })
    }
}

const refreshLocationDetailsThroughGeocoder = async () => {
    const coordinates = model.value.geocoordinates
    if (coordinates != null && coordinates.lat && coordinates.lng) {
        const locationDetails = await reverseGeocode(coordinates.lng, coordinates.lat)
        model.value.adresgegevens = locationDetails.address
        model.value.naam = locationDetails.label
        model.value.land = locationDetails.country
        model.value.straat = locationDetails.street
        model.value.stad = locationDetails.city
        model.value.postcode = locationDetails.postcode
        model.value.wijk = locationDetails.quarter
        model.value.huisnummer = locationDetails.house_number
    }
}

const defineTipCoordinatesFromEXIFGPS = (item) => {
    if (item.exifData && item.exifData.gpsInfo.latitude && item.exifData.gpsInfo.longitude) {
        model.value.geocoordinates = {
            lat: item.exifData.gpsInfo.latitude,
            lng: item.exifData.gpsInfo.longitude
        }
    }
}


</script>
<style scoped>
.chippie {
    flex: 1 0 auto;
    margin: 4px;
    background-color: yellow
}
</style>