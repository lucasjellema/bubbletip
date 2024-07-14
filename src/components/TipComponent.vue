<template>

 
    <v-container fluid>
        <v-row>
            <v-col class="py-2" cols="12">
                <h2><v-icon start>{{ tipTypeIconMap[model.tipType] }}</v-icon>{{ model.naam }}</h2>
                <i>Getipt door {{ model.tipGever }} op {{ formatDate(model.aanmaakdatum) }} </i>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-2" cols="6">
                Adres: {{ model.adresgegevens }}
                <br/><br/>
                Beschrijving:
                <v-sheet class="flex-1-1-100  ma-0 pa-0 mb-3">
                    <QuillEditor theme="bubble" :toolbar="[]" v-model:content="model.beschrijving" contentType="delta"
                        :readOnly="true" />
                </v-sheet>
                <br/><br/>
                Tags:
                
            </v-col>
            <v-col class="py-2" cols="6">
                <MapComponent :initialCoordinates="model.geocoordinates" :label="model.naam"
                    v-model="model.geocoordinates" :readOnly="true" v-if="model.geocoordinates" />
            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-2" cols="12">Foto's

                
            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-2" cols="12">IkOokjes</v-col>
        </v-row>

    </v-container>
    {{ model }}
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { useDateLibrary } from '@/composables/useDateLibrary';
const { formatDate } = useDateLibrary();

const model = defineModel()

const tipTypeIconMap = {
    verblijf: 'mdi-bed',
    restaurant: 'mdi-silverware-fork-knife',
    activiteit: 'mdi-walk'
}

</script>