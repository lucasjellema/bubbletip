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
    console.log(`#### bubble has changed says watch!!`)
    bubbleHasChanged.value = true
  },
    { deep: true }
  )

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
    bubbleJSON.value = await getJSONFile('bubbled.json')
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

  const saveLid = (gebruikersnaam, voornaam, achternaam, geboortedatum, introductie) => {
    let lid = bubbleJSON.value.leden.find(lid => lid.gebruikersnaam === gebruikersnaam)
    if (lid) {
      lid.voornaam = voornaam
      lid.achternaam = achternaam
      lid.geboortedatum = geboortedatum
      lid.introductie = introductie
    } else {
      const lidSequence = bubbleJSON.value.leden.push({ aanmaakdatum: new Date(), gebruikersnaam: gebruikersnaam, voornaam: voornaam, achternaam: achternaam, geboortedatum: geboortedatum, introductie: introductie })
      lid = bubbleJSON.value.leden[lidSequence - 1]
    }
    bubbleChanged()
    return lid
  }
  const saveTip = (tip) => {
    // any image that does not have an id should be processed
    // loop over tip.images
    for (const image of tip.images) {
      if (!image.id) {
        image.id = new Date().getTime()
      }
      if (image.imageFile) {
        saveFile(image.imageFile, 'images/' + image.id + '.jpg')
        image.imageURL = preAuthenticatedRequestURL.value + 'images/' + image.id + '.jpg'
        image.imageFile = null
        image.imageBase64 = null
      }

    }

    if (tip.id) {
      const index = bubbleJSON.value.tips.findIndex(t => t.id === tip.id)
      if (index > -1) {
        bubbleJSON.value.tips[index] = tip
      } else {
        // weird: id is set but tip is not found. TODO error
      }
    } else {
      tip.id = new Date().getTime()
      bubbleJSON.value.tips.push(tip)
    }

    bubbleChanged()
  }

  const getRecent = () => {
    const recent = []
    // create entries for members
    for (const lid of bubbleJSON.value.leden) {
      recent.push({ type: 'lid', label: lid.gebruikersnaam, datum: lid.aanmaakdatum, details: lid.voornaam + ' ' + lid.achternaam, id: lid.gebruikersnaam })
    }
    // create entries for tips
    for (const tip of bubbleJSON.value.tips) {
      recent.push({ type: 'tip', label: tip.naam, datum: tip.aanmaakdatum, details: tip.tipType + ' ' + tip.adresgegevens, id: tip.id })
    }
    // TODO gevraagde tips, ikookjes

    return recent.sort((a, b) => a.datum - b.datum)
  }


  const saveIncident = (incident) => {
    if (bubbleJSON.value.incidenten == null) {
      bubbleJSON.value.incidenten = []
    }
    bubbleJSON.value.incidenten.push(incident)
    bubbleChanged()
  }

  return {
    setPAR, getBubble, ingechecktLid, saveLid, saveTip, getRecent, saveIncident
  }
})
