<template>
 <h1>Profiel van {{ appStore.ingechecktLid.gebruikersnaam }}</h1>
</template>

<script setup>
  import { useAppStore } from "@/stores/app";
const appStore = useAppStore()

</script>
