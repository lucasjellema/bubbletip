<template>

    <v-autocomplete clearable chips closable-chips v-model="selectedTags" :items="filteredTags" multiple
        item-title="name" item-value="name" auto-select-first hide-no-data hide-selected small-chips
        label="Voeg tags toe" append-icon="mdi-tag-plus" @blur="handleBlurOnTags" :custom-filter="customFilter"
        @update:model-value="handleSelectionUpdate" clear-on-select ref="autocompleteRef" class="ma-0 mt-5">
        <!-- selected items -->
        <template v-slot:chip="{ props, item }">
            <v-chip v-bind="props" :text="item.raw.name"></v-chip>
        </template> <!-- to select -->
        <template v-slot:item="{ props, item }">
            <v-chip v-bind="props" :text="item.raw.name" class="chippie"></v-chip>
        </template>

    </v-autocomplete>
</template>

<script setup>
import { watch } from 'vue';





const props = defineProps({
    tags: {
        type: Array
    },
    theTags: {
        type: Array
    }

})
const tipTags = ref([])
const emit = defineEmits(['tagSelectionChanged'])

const selectedTags = ref([])

watch(() => props.theTags, (newValue, oldValue) => {
    console.log(`theTags changed `, newValue)
    if (newValue !=selectedTags.value) {
        selectedTags.value = props.theTags
        
    }
})

const tagsAdded = ref([])
const filteredTags = computed(() => {
    const tagArray = Array.from(props.tags).concat(tagsAdded.value)
    const tags = tagArray.map((tag) => {
        return { name: tag }
    })
    return tags
})


const searchTagsField = ref('')
const searchField = ref('')
const autocompleteRef = ref(null)

const handleBlurOnTags = (event) => {
    console.log('blur, current search value on tags ', searchField.value)
    if (searchField.value !== '' && !elementAdded) {

        filteredTags.value.find(element => element === searchField.value) === undefined ? tagsAdded.value.push(searchField.value) : console.log('value already exists in filtered Tags')
        const tag = tipTags.value.find(element => element.name === searchField.value)
        // if (model.value && model.value.length > 0) {
        //     const selectedTag = model.value.find(element => element === searchField.value)
        //     if (selectedTag === undefined) { 
        //         model.value.push(searchField.value)
        //         emit('tagSelectionChanged', model.value)
        //     }
            if (selectedTags.value && selectedTags.value.length > 0) {
            const selectedTag = selectedTags.value.find(element => element === searchField.value)
            if (selectedTag === undefined) { 
                selectedTags.value.push(searchField.value)
                emit('tagSelectionChanged', selectedTags.value)
            }
            // : console.log('value already exists in model tags')
           // updateModelTags()
        }

        console.log('add tag ', searchField.value)
        searchTagsField.value = ''
        searchField.value = ''
        autocompleteRef.value.search = ''
    }
    elementAdded = false

}
const customFilter = (itemTitle, queryText, item) => {
    //  console.log('custom filter ', itemTitle, queryText, item)
    elementAdded = false
    const textOne = item.raw.name.toLowerCase()
    // const textTwo = item.raw.abbr.toLowerCase()
    const searchText = queryText.toLowerCase()
    searchField.value = queryText
    return queryText.length > -1 && textOne.indexOf(searchText) > -1
}

let elementAdded = false
const handleSelectionUpdate = (event) => {
    emit('tagSelectionChanged', selectedTags.value)
    elementAdded = true
}

// watch(() => model.tags
// , async (newTags, oldTags) => {
// console.log('model tags changed', newTags, oldTags)
// selectedTags.value = newTags.map((tag) => {
//             return tag
//         })
// })
onMounted(() => {
   selectedTags.value = props.theTags
})




</script>
<style scoped>
.chippie {
    flex: 1 0 auto;
    margin: 4px;
    background-color: yellow
}
</style>