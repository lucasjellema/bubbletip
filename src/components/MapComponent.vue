<template>
    <div>
        <div id="map" style="height: 500px;"></div>
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
    }, coordinates: {
        type: Object

    },
    label: {
        type: String,
        default: 'Klik op de kaart om de locatie te bepalen'
    },
    readOnly: {
        type: Boolean,
        default: false
    },
    zoomLevel: {
        type: Number,
        default: 13
    },
    adjust: {
        type: Number,
        default: -1
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

watch(() => props.coordinates
    , (newValue, oldValue) =>
        replaceMarker(newValue.lat, newValue.lng)
)

watch(() => props.zoomLevel
    , (newValue, oldValue) =>
        map.setZoom(newValue)
)

watch(() => props.adjust
    , (newValue, oldValue) => {
        map.invalidateSize()
        if (props.initialCoordinates.lat && props.initialCoordinates.lng) {
            replaceMarker(props.initialCoordinates.lat, props.initialCoordinates.lng)
        }
    }
)

let layerControl
const initMap = () => {
    // Initialize the map
    map = L.map('map').setView([props.initialCoordinates.lat, props.initialCoordinates.lng], props.zoomLevel);

    // Set up the OSM layer
    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const EsriWorldImageryLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    // create control to switch between Open Street Map and Satellite
    layerControl = L.control.layers({ OpenStreetMap: osmLayer, Satellite: EsriWorldImageryLayer }).addTo(map);


    // when the map is clicked
    map.on('click', onMapClick);
    // Add initial marker if coordinates are provided
    if (props.initialCoordinates.lat && props.initialCoordinates.lng) {
        replaceMarker(props.initialCoordinates.lat, props.initialCoordinates.lng)
    }
}

const onMarkerDrag = (event) => {
    const position = event.target.getLatLng();
    emit('update:coordinates', { lat: position.lat, lng: position.lng });
}

const replaceMarker = (lat, lng) => {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker([lat, lng], {
        draggable: true
    }).addTo(map).bindPopup(props.label).openPopup();
    // Event listener for marker drag
    marker.on('dragend', onMarkerDrag);
}

const onMapClick = (event) => {
    replaceMarker(event.latlng.lat, event.latlng.lng);
    emit('update:coordinates', { lat: event.latlng.lat, lng: event.latlng.lng });
}
</script>


<style scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>
