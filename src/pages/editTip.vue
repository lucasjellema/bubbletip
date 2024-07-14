<template>
    <h1>Tip Bewerken</h1>   
    <EditTipComponent v-model="tip" v-if="tip"/>
    <v-btn title="Sla tip op" class="mb-2" @click="saveTip()">Sla Tip Op</v-btn>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { useRoute } from 'vue-router';

const route = useRoute();
const tipId = route.params.tipId;

const appStore = useAppStore()
const bubble = appStore.getBubble()

const tip = ref(null)
onMounted(() => {
  const theTip = bubble.value.tips.find(t => `${t.id}` === tipId)
  tip.value = {...theTip}
  
  console.log('tip was derived from '+tipId,tip.value)
  
})

const saveTip = () => {
 tip.value.bewerkdatum = new Date()
  appStore.saveTip(tip.value)
}

</script>