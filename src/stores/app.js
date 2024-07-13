// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const preAuthenticatedRequestURL = ref(null)
  const ingechecktLid = ref(null)
  const setPAR = (par) => {
    preAuthenticatedRequestURL.value = par
    initializeBubble()
  }


  const getJSONFile = (filename) => {
    return new Promise((resolve, reject) => {
      const targetURL = preAuthenticatedRequestURL.value + filename
      fetch(targetURL, { method: 'GET' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          resolve(response.json())          
        })        
        .catch(err =>
          resolve(1)
        );
    })
  }

  const saveFile = async (blob, filename) => {
    const fetchOptions = {
      method: 'PUT',
      body: blob,
    };

    const targetURL = preAuthenticatedRequestURL.value + filename
    fetch(targetURL, fetchOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.status;
      })
      .then(data => {
        return 0
      })
      .catch(error => {
        return 1
      });
  }

  const bubbleJSON = ref(null)
  const bubbleHasChanged = ref(false)
  watch(bubbleJSON, () => {
    console.log(`#### bubble has changed`)
    bubbleHasChanged.value = true
  })

  const bubbleChanged = () => {
    bubbleHasChanged.value = true
  }

  const periodicBubbleSaver = () => setInterval(() => {
    if (bubbleHasChanged.value) {
      saveFile(JSON.stringify(bubbleJSON.value), 'bubble.json')
      bubbleHasChanged.value = false
    }
  }, 5000)

  const initializeBubble = async () => {
    // read bubble.json from par
    bubbleJSON.value = await getJSONFile('bubble.json')
    console.log(bubbleJSON.value)
    // if not found, create it
    if (bubbleJSON.value == 1) {
      bubbleJSON.value = {
        tips: [], leden: [], gevraagdeTips: []
      }
      // save it
      saveFile(JSON.stringify(bubbleJSON.value), 'bubble.json')

    }
    periodicBubbleSaver()
    return bubbleJSON
  }

  const getBubble = () => {
    return bubbleJSON
  }

  const saveLid= (gebruikersnaam, voornaam, achternaam, geboortedatum, introductie) => {
    const lidSequence = bubbleJSON.value.leden.push({ gebruikersnaam: gebruikersnaam, voornaam: voornaam, achternaam: achternaam, geboortedatum: geboortedatum, introductie: introductie }) 
    bubbleChanged()
    return bubbleJSON.value.leden[lidSequence - 1]
  }

  return {
    setPAR, getBubble, ingechecktLid, saveLid
  }
})
