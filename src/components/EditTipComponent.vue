<template>

    {{ model }}
    <v-container class="mb-0 mt-1" fluid>
        <v-row>
            <v-col class="py-2" cols="12">
                <p>Type Tip</p>
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
                </v-sheet>
                <v-combobox v-model="model.tags" :items="Array.from(tipTags)" chips clearable deletable-chips multiple
                    label="Voeg tags toe" append-icon="mdi-tag-plus" @change="handleTagChange"
                    :menu-props="{ maxHeight: 'auto' }" class="ma-0 mt-5" </v-combobox>
                    Wanneer was je er?
                    <v-container class="mb-0 mt-1" fluid>
                        <v-row>
                            <v-col cols="7">
                                <v-select :items="months" item-title="name" item-value="id" label="Welke Maand?"
                                    outlined v-model="model.maand"></v-select>
                            </v-col>
                            <v-col cols="5">

                                <v-text-field label="In Welk Jaar" type="number" v-model="model.jaar" />
                            </v-col>
                        </v-row>
                    </v-container>

            </v-col>
        </v-row>

        <v-row>
            <v-col class="py-2" cols="6">
                <h3>Foto's </h3>
                <v-data-table :headers="imageHeaders" :items="model.images" :items-per-page="5" class="elevation-1">
                    <template v-slot:item.imageURL="{ item }">
                        {{ item.imageLabel }} <p v-if="item.exifData?.dateTimeOriginal">gemaakt op {{ formatDate(new
                            Date(item.exifData.dateTimeOriginal)) }}</p>
                        <v-img :src="item.imageURL" aspect-ratio="1.7" height="200" v-if="item.imageURL"></v-img>
                        <v-img :src="item.imageBase64" aspect-ratio="1.7" height="200" v-if="item.imageBase64"></v-img>
                        <v-btn prepend-icon="mdi-map-marker-radius"
                            title="Gebruik de GPS info in de foto om de geocoordinaten voor de kaart te bepalen "
                            @click="defineTipCoordinatesFromEXIFGPS(item)" v-if="item.exifData?.gpsInfo?.latitude">Zet
                            marker op de
                            kaart</v-btn>

                    </template>
                </v-data-table>

                <div @paste.prevent="handlePaste">
                    <v-text-field label="URL van plaatje op internet" class="mb-2" v-model="imageURL"></v-text-field>
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
</template>

<script setup>
// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useDateLibrary } from '@/composables/useDateLibrary';
const { formatDate, months } = useDateLibrary();
import { useGeoLibrary } from '@/composables/useGeoLibrary';
const { reverseGeocode, extractEXIFData } = useGeoLibrary();

import { useAppStore } from "@/stores/app";

const appStore = useAppStore()
const bubble = appStore.getBubble()
const model = defineModel()
const tipTags = appStore.tipTags
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

</script>