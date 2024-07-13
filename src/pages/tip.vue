<template>
  <h1>Tip</h1>
  {{ tipId }}
</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { useRoute } from 'vue-router';
import { onBeforeMount, onMounted } from "vue";
const appStore = useAppStore()
const bubble = appStore.getBubble()


const route = useRoute();
const tipId = route.params.tipId;

</script>
