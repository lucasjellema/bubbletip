<template>
    <div>
        <p  v-if="!readOnly">Klik op de kaart om de locatie aan te geven van jouw tip. Je kunt de marker verplaatsen of een nieuwe
            plaatsen.</p>
        <div id="map" style="height: 500px;"></div>
        <p v-if="!readOnly">Je kunt de adresgegevens voor de tip opvragen als je de marker hebt geplaatst.</p>
    </div>
</template>
<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const model = defineModel();
const emit = defineEmits(['update:coordinates']);
const props = defineProps({
    initialCoordinates: {
        type: Object,
        default: {
            lat: 51.505,
            lng: -0.09
        }
    },
    label: {
        type: String,
        default: 'Klik op de kaart om de locatie te bepalen'
    },
    readOnly: {
        type: Boolean,
        default: false
    }
})
onMounted(() => {
    initMap();
})
let map, marker

watch(() => props.label
    , (newValue, oldValue) =>
        marker.setPopupContent(newValue)
)

const initMap = () => {
    // Initialize the map
    map = L.map('map').setView([props.initialCoordinates.lat, props.initialCoordinates.lng], 13);

    // Set up the OSM layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add initial marker if coordinates are provided
    marker = L.marker([props.initialCoordinates.lat, props.initialCoordinates.lng], {
        draggable: !props.readOnly
    }).addTo(map).bindPopup(props.label).openPopup();

    if (!props.readOnly) {


        // Event listener for marker drag
        marker.on('dragend', onMarkerDrag);

        // Event listener for map click
        map.on('click', onMapClick);
    }
}
const onMarkerDrag = (event) => {
    const position = event.target.getLatLng();
    emit('update:coordinates', { lat: position.lat, lng: position.lng });
}

const onMapClick = (event) => {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker([event.latlng.lat, event.latlng.lng], {
        draggable: true
    }).addTo(map).bindPopup(props.label).openPopup();

    // Event listener for marker drag
    marker.on('dragend', onMarkerDrag);

    emit('update:coordinates', { lat: event.latlng.lat, lng: event.latlng.lng });
}
</script>


<style scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>
