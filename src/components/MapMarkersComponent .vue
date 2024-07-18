<template>
    <div>
        <div id="mapWithMarkers" style="height: 500px;"></div>
    </div>
</template>
<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const emit = defineEmits(['boxed', 'tipSelected']);
const props = defineProps({
    tips: {
        type: Array
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

watch(() => props.tips
    , (newValue, oldValue) => {
        drawMarkers(newValue)
    }
)

watch(() => props.adjust
    , (newValue, oldValue) => {
        map.invalidateSize()
        // TODO refresh markers??
    }
)

let layerControl
let markers = []

const drawMarkers = (tips) => {
    // remove markers
    for (const marker of markers) {
        map.removeLayer(marker)
    }
    // empty markers
    markers = []
    for (const tip of tips) {
        marker = L.marker([tip.geocoordinates.lat, tip.geocoordinates.lng], {
            draggable: true
        }).addTo(map).bindPopup(tip.naam)
        markers.push(marker)
    }
    // zoom map such that all markers are visible
    if (markers.length > 0) {
        map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [30, 30] });
    }
}

const initMap = () => {
    // Initialize the map
    map = L.map('mapWithMarkers').setView([50, 6], 13);

    // Set up the OSM layer
    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const EsriWorldImageryLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    // create control to switch between Open Street Map and Satellite
    layerControl = L.control.layers({ OpenStreetMap: osmLayer, Satellite: EsriWorldImageryLayer }).addTo(map);

    map.on('boxzoomend', (e) => {
        // e.boxZoomBounds contains the LatLngBounds of the box zoom area
        const bounds = e.boxZoomBounds;
        emit('boxed', bounds);
    });

}


</script>


<style scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>
