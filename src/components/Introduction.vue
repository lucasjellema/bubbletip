<template>
    <v-responsive>
        <v-container fluid tag="section" aria-labelledby="title">
            <v-main>
                <v-row>
                    <v-col cols="6" offset="1">
                        <v-btn prepend-icon="mdi-book-search-outline" text to="/browse" title="Sla tip op"
                            class="mb-2">Toon Tips</v-btn>


                        <!-- <v-autocomplete clearable chips closable-chips label="Autocomplete" v-model="friends"
                            @update:model-value="handleSelectionUpdate" :custom-filter="customFilter"
                            :items="filteredPeople" multiple item-title="name" item-value="name" auto-select-first
                            hide-no-data hide-selected small-chips @blur="handleBlurOnFriends" clear-on-select
                            ref="autocompleteRef">

                            <template v-slot:item="{ props, item }">
                                <v-chip v-bind="props" :text="item.raw.name" class="chippie"></v-chip>
                            </template>
<template v-slot:chip="{ props, item }">
                                <v-chip v-bind="props" :text="item.raw.name"></v-chip>
                            </template>
</v-autocomplete>
-->
                        <!--                        <v-autocomplete clearable chips closable-chips v-model="selectedTags" :items="filteredTags"
                            multiple item-title="name" item-value="name" auto-select-first hide-no-data hide-selected
                            small-chips label="Voeg tags toe" append-icon="mdi-tag-plus" @blur="handleBlurOnTags"
                            :custom-filter="customFilter"  @update:model-value="handleSelectionUpdate"
                            clear-on-select ref="autocompleteRef" class="ma-0 mt-5">
                            <template v-slot:chip="{ props, item }">
                                <v-chip v-bind="props" :text="item.raw.name"></v-chip>
                            </template> 
                            <template v-slot:item="{ props, item }">
                                <v-chip v-bind="props" :text="item.raw.name" class="chippie"></v-chip>
                            </template>

                        </v-autocomplete> -->
                        <h1>Anne Was Hier!!</h1>
                        <v-container fluid>
                            <v-row>
                                <v-col cols="6">
                                    <p>Deze applicatie is voor het verzamelen en beschikbaar stellen van tips. Tips voor
                                        plaatsen om te verblijven, restaurants om te eten en activiteiten om te doen.
                                        Tips gebaseerd op eigen, positieve ervaringen. Met adresgegevens, website,
                                        beschrijving van de eigen ervaring.
                                        <br />
                                        <br />
                                        Als je zelf ook een ervaring hebt met een getipte plaats, dan kan je een
                                        "IkOokje" toevoegen waarin je jouw ervaring kan delen.
                                        <br />
                                        <br />
                                        De tips in deze applicatie zijn alleen beschikbaar voor de persoonlijk
                                        uitgenodigde leden van de tip-bubbel.
                                        <br />
                                        <br />
                                    <p class="text-caption" style="color: red">Deze applicatie is nog in ontwikkeling.
                                        Je kunt tegen fouten
                                        aanlopen. Ook is het mogelijk dat tips, ikookjes en foto's die je hebt
                                        toegevoegd kwijtraken. Uiteraard
                                        probeer ik dat zoveel mogelijk te beperken.

                                        Als je tegen problemen aanloopt, zou je die willen melden? Ook als je
                                        verbetersuggesties hebt voor de
                                        applicatie hoor ik dat heel graag. Je kunt dat doen via
                                        <v-btn prepend-icon="mdi-account-box-edit-outline" text to="/incident">Meld
                                            Incident</v-btn>
                                        .
                                    </p>
                                    </p>
                                </v-col>
                                <v-col cols="6">
                                    <v-img :src="logo"></v-img>
                                    <v-expansion-panels :multiple="false" class="mt-6">
                                        <v-expansion-panel title="QR Code om de app te delen" collapse-icon="mdi-qrcode"
                                            expand-icon="mdi-qrcode" @click="generateQrCode">
                                            <v-expansion-panel-text>
                                                <div>
                                                    <h2>QR Code om de applicatie en alle tips te delen</h2>
                                                    <canvas id="canvas"></canvas>
                                                    <h4 class="text-caption">NB: Iemand met deze QR Code can alle data
                                                        zien en wijzigen</h4>
                                                </div>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>

                                    </v-expansion-panels>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>

                    <v-col cols="2" offset="0">
                        <v-card class="mx-auto" max-width="344" variant="outlined">
                            <v-card-item>
                                <div>
                                    <div class="text-h6 mb-1">
                                        Routekaart
                                    </div>
                                    <div class="text-caption">
                                        <v-btn prepend-icon="mdi-star-plus-outline" title="Voeg een tip toe"
                                            class="mb-2" to="/newtip" v-if="appStore.ingechecktLid != null">Nieuwe
                                            Tip</v-btn>
                                        <!-- <v-btn prepend-icon="mdi-map-search" title="Bekijk tips op de kaart"
                                            class="mb-2" to="/map">Bekijk Kaart</v-btn> -->
                                        <v-btn prepend-icon="mdi-book-search-outline" title="Zoek en Blader door tips"
                                            to="/browse" class="mb-2">Zoek en Blader</v-btn>
                                        <v-btn prepend-icon="mdi-clock-fast"
                                            title="Bekijk de meest recente wijzigingen in tips, nieuwe IkOokjes en tipverzoeken"
                                            class="mb-2" to="/recent">Recente Wijzigingen</v-btn>
                                        <!-- <v-btn prepend-icon="mdi-frequently-asked-questions" title="Vraag om een tip"
                                            class="mb-2" to="/request" v-if="appStore.ingechecktLid != null">Vraag om
                                            Tip</v-btn> -->
                                        <v-btn prepend-icon="mdi-human-male-female" title="Leden van de Tip Bubbel"
                                            class="mb-2" to="/members">Tippers</v-btn>
                                    </div>
                                </div>
                            </v-card-item>
                        </v-card>

                        <h3 v-if="bubble && bubble.leden != null && bubble?.leden.length > 0">Selecteer je lidprofiel
                        </h3>
                        <v-select label="Wie ben je?" :items="bubble.leden" item-title="gebruikersnaam"
                            item-value="gebruikersnaam" v-model="appStore.ingechecktLid" return-object
                            v-if="bubble && bubble.leden != null && bubble.leden.length > 0"></v-select>

                    </v-col>
                </v-row>
            </v-main>
        </v-container>
    </v-responsive>
</template>


<script setup>
import logo from '@/assets/anne-was-hier.png'
import { useAppStore } from "@/stores/app";
import { nextTick } from 'vue';

const appStore = useAppStore()
const bubble = appStore.getBubble()

import QRCode from 'qrcode'

const renderQRCode = (myurl) => {
    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        scale: 5,
        color: {
            dark: "#010599FF",
            light: "#FFFFFF"
        }
    }
    var canvas = document.getElementById('canvas')

    QRCode.toCanvas(canvas, myurl, opts, function (error) {
        if (error) console.error(error)
    })
}

const generateQrCode = () => {
    console.log("generateQrCode")
    renderQRCode(window.location.href)
}



const createIncident = () => {
    console.log('create incident')
    //todo navigation to incident creation page
}


const srcs = {
    1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
}

const friends = ref([])

const people = ref([
    // TODO: https://github.com/vuetifyjs/vuetify/issues/15721
    // { header: 'Group 1' },
    { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
    { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
    { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
    { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
    // { divider: true },
    // { header: 'Group 2' },
    { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
    { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
    { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
    { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
    { name: 'Erik Smith ', group: 'Group 2', avatar: srcs[5] },
    { name: 'Susan Smith', group: 'Group 2', avatar: srcs[1] },
    { name: 'mila Williams', group: 'Group 2', avatar: srcs[3] },
    { name: 'Henk ', group: 'Group 2', avatar: srcs[5] },
    { name: 'HGovet', group: 'Group 2', avatar: srcs[1] },
    { name: 'Jan', group: 'Group 2', avatar: srcs[3] },
])

const filteredPeople = computed(() => {
    return people.value
    // if (!searchField.value) return people.value
    // return people.value.filter((item) => {
    //     return item.name.toLowerCase().includes(searchField.value.toLowerCase())
    // })
})


onMounted(() => {
    friends.value.push(people.value[0])
    model.value.tags = ['museum', 'wandelen']
    tipTags.value = [...appStore.tipTags]
    selectedTags.value = model.value.tags.map((tag) => {
        return { name: tag }
    })

})


const searchFriendsField = ref('')
const searchField = ref('')
const autocompleteRef = ref(null)
const model = ref({})

const tipTags = ref([])

const selectedTags = ref([])
const filteredTags = computed(() => {
    console.log(`filtered tags recompute`)
    const tagArray = Array.from(tipTags.value)
    const tags = tagArray.map((tag) => {
        return { name: tag }
    })
    return tags
})


const searchTagsField = ref('')
// const searchField = ref('')
// const autocompleteRef = ref(null)

const handleBlurOnTags = (event) => {
    console.log('blur, current search value on tags ', searchField.value)
    if (searchField.value !== '' && !elementAdded) {

        tipTags.value.find(element => element === searchField.value) === undefined ? tipTags.value.push(searchField.value) : console.log('value already exists in tipTags')
        const tag = tipTags.value.find(element => element.name === searchField.value)
        selectedTags.value.find(element => element.name === searchField.value) === undefined ? selectedTags.value.push({ name: searchField.value }) : console.log('value already exists in model tags')
        console.log('add tag ', searchField.value)
        searchTagsField.value = ''
        searchField.value = ''
        autocompleteRef.value.search = ''
    }
    elementAdded = false

}

const handleBlurOnFriends = (event) => {
    console.log('blur, current search value on friends ', searchField.value)
    if (searchField.value !== '' && !elementAdded) {

        people.value.find(element => element.name === searchField.value) === undefined ? people.value.push({ name: searchField.value, group: 'Group 1', avatar: srcs[1] }) : console.log('value already exists in people')
        const person = people.value.find(element => element.name === searchField.value)
        friends.value.find(element => element.name === searchField.value) === undefined ? friends.value.push(person) : console.log('value already exists in friends')
        console.log('add tag ', searchField.value)
        searchFriendsField.value = ''
        searchField.value = ''
        autocompleteRef.value.search = ''
    }
    elementAdded = false

}


const customFilter = (itemTitle, queryText, item) => {
    console.log('custom filter ', itemTitle, queryText, item)
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

</script>
<style scoped>
.chippie {
    flex: 1 0 auto;
    margin: 4px;
    background-color: yellow
}
</style>