<template>
  <h1>Tip</h1>
  <TipComponent v-model="tip" v-if="tip"/>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { useRoute } from 'vue-router';
import { onBeforeMount, onMounted } from "vue";
import TipComponent from '@/components/TipComponent.vue';
const appStore = useAppStore()
const bubble = appStore.getBubble()


const route = useRoute();
const tipId = route.params.tipId;
const tip = ref(null)
onMounted(() => {
  tip.value = bubble.value.tips.find(t => `${t.id}` === tipId)
  console.log('tip was derived from '+tipId,tip.value)
  
})

</script>
