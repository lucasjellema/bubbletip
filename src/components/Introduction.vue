<template>
    <v-responsive>
        <v-container fluid tag="section" aria-labelledby="title">
            <v-main>
                <v-row>
                    <v-col cols="6" offset="1">
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
                                        <p class="text-caption" style="color: red">Deze applicatie is nog in ontwikkeling. Je kunt tegen fouten aanlopen. Ook is het mogelijk dat tips, ikookjes en foto's die je hebt toegevoegd kwijtraken. Uiteraard probeer ik dat zoveel mogelijk te beperken. 
                                            
                                            Als je tegen problemen aanloopt, zou je die willen melden? Ook als je verbetersuggesties hebt voor de applicatie hoor ik dat heel graag. Je kunt dat doen via 
                                            <v-btn  prepend-icon="mdi-account-box-edit-outline" text to="/incident" >Meld Incident</v-btn>
            .
                                        </p>
                                    </p>
                                </v-col>
                                <v-col cols="6">
                                    <v-img :src="logo"></v-img>
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
                                        <v-btn prepend-icon="mdi-map-search" title="Bekijk tips op de kaart"
                                            class="mb-2" to="/map">Bekijk Kaart</v-btn>
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
                        </v-card> </v-col>
                </v-row>
            </v-main>
        </v-container>
    </v-responsive>
</template>


<script setup>
import logo from '@/assets/anne-was-hier.png'
import { useAppStore } from "@/stores/app";
const appStore = useAppStore()

const createIncident = () => {
 console.log('create incident')
 //todo navigation to incident creation page
}
</script>