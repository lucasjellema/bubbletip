// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const preAuthenticatedRequestURL = ref(null)
  const ingechecktLid = ref(null)
  const tipTags = ref(new Set(['museum', 'pizza', 'ijs', 'kasteel', 'camping', 'kleuters', 'wandelen']))

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

  const getListOfFiles = () => {
    return new Promise((resolve, reject) => {
      const targetURL = preAuthenticatedRequestURL.value
      fetch(targetURL, { method: 'GET' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          resolve(response.json()) // should be a list of all files that needs to be filtered by prefix directory+'/'
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

      const newTips = bubbleJSON.value.tips.map(tip => {
        if (!tip.tipGever) tip.tipGever = 'lucas'
      })

      // saveFile(JSON.stringify(bubbleJSON.value), 'MAIN_BUBBLE_FILE')
      console.log(`instead of saving MAIN_BUBBLE_FILE, we save the tips as delta files, so that we (and others) can load them in later`)
      // TODO periodic delta files loader?!
      bubbleHasChanged.value = false
    }
  }, 5000)


  const initializeTipTags = () => {
    // loop over all tips
    for (const tip of bubbleJSON.value.tips) {
      try {
        for (const tag of tip.tags) {
          tipTags.value.add(tag)
        }
      } catch (error) {
        console.log("caught tip.tags error", error)
      }
      // TODO look over ikookjes in tip
    }
  }

  const loadDeltaFiles = async () => {
    // get list of files in delta directory

    const files = await getListOfFiles()
    if (!files || !files.objects || files.objects.length == 0) return
    const deltaFiles = files.objects.filter(file => file.name.startsWith(DELTA_DIRECTORY + '/')).sort((a, b) => a.name.localeCompare(b.name))

    if (!deltaFiles || deltaFiles.length == 0) return
    const lastConsolidation = await getJSONFile(CONSOLIDATION_MARKER_FILE)
    let deltaToProcess = deltaFiles
    if (lastConsolidation != 1) {
      console.log('DEBUG last consolidation log read from file ', lastConsolidation)
      console.log('DEBUG remove from delta files any file less than or equal to ', DELTA_DIRECTORY + '/' + lastConsolidation.lastDeltaTimestamp + '.json')
      try {
        deltaToProcess = deltaFiles.filter(file => file.name > DELTA_DIRECTORY + '/' + lastConsolidation.lastDeltaTimestamp + '.json')
      } catch (error) {
        console.log('ERROR in filtering delta files to deltaToProcess', error)
      }


    }
    // for each file, load it and merge it into the story
    console.log('delta files to process', deltaToProcess)
    for (const file of deltaToProcess) {
      const delta = await getJSONFile(file.name)
      if (delta) {
        console.log('processing delta', delta.type, file.name)
        // if delta is tip, merge it with MAIN_BUBBLE_FILE
        if (delta.type == 'tip') {
          const index = bubbleJSON.value.tips.findIndex(t => t.id === delta[delta.type].id)
          if (index > -1) {
            bubbleJSON.value.tips[index] = delta[delta.type]
          } else {
            bubbleJSON.value.tips.push(delta[delta.type])
          }
        }

        // if delta is incident, merge it with MAIN_BUBBLE_FILE
        if (delta.type == 'incident') {
          const index = bubbleJSON.value.incidenten.findIndex(t => t.id === delta[delta.type].id)
          if (index > -1) {
            bubbleJSON.value.incidenten[index] = delta[delta.type]
          } else {
            bubbleJSON.value.incidenten.push(delta[delta.type])
          }
        }
        // if delta is member, merge it with MAIN_BUBBLE_FILE
        if (delta.type == 'member') {
          const theGebruiker = delta['lid']
          const theGebruikersnaam = theGebruiker.gebruikersnaam
          const index = bubbleJSON.value.leden.findIndex(t => t.gebruikersnaam === theGebruikersnaam)
          if (index > -1) {
            bubbleJSON.value.leden[index] = theGebruiker
          } else {
            bubbleJSON.value.leden.push(delta['lid'])
          }
        }
      }
    }
    return deltaFiles
  }

  const MAIN_BUBBLE_FILE = 'bubble.json'

  const initializeBubble = async () => {
    // read MAIN_BUBBLE_FILE from par
    bubbleJSON.value = await getJSONFile(MAIN_BUBBLE_FILE)
    console.log(bubbleJSON.value)
    // if not found, create it
    if (bubbleJSON.value == 1) {
      bubbleJSON.value = {
        tips: [], leden: [], gevraagdeTips: []
      }
      // save it
      saveFile(JSON.stringify(bubbleJSON.value), 'MAIN_BUBBLE_FILE')

    } else {

      await loadDeltaFiles()

      initializeTipTags()
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
    const filename = DELTA_DIRECTORY + '/' + new Date().getTime() + '.json'
    saveFile(JSON.stringify({ type: 'member', lid }), filename)
    bubbleChanged()
    return lid
  }

  const removeTip = (tipId) => {
    const index = bubbleJSON.value.tips.findIndex(t => t.id === tipId)
    if (index > -1) {
      bubbleJSON.value.tips.splice(index, 1)
      bubbleChanged()
    }
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
        image.uploaded = true
      }

    }

    if (tip.id) {
      const index = bubbleJSON.value.tips.findIndex(t => t.id === tip.id)
      if (index > -1) {
        // TODO any previously uploaded image for this tip that is no longer used should be removed from bucket (i.e. overwritten with empty file) 

        bubbleJSON.value.tips[index] = tip
      } else {
        // weird: id is set but tip is not found. TODO error
      }
    } else {
      tip.id = new Date().getTime()
      bubbleJSON.value.tips.push(tip)
    }
    try {
      for (const tag of tip.tags) {
        tipTags.value.add(tag)
      }
    } catch (error) {
      console.log(error)
    }

    bubbleChanged()
    const filename = DELTA_DIRECTORY + '/' + new Date().getTime() + '.json'
    saveFile(JSON.stringify({ type: 'tip', tip }), filename)

    return tip
  }

  const getRecent = () => {
    const recent = []
    // create entries for members
    for (const lid of bubbleJSON.value.leden) {
      recent.push({ type: 'lid', label: lid.gebruikersnaam, datum: lid.aanmaakdatum, details: lid.voornaam + ' ' + lid.achternaam, id: lid.gebruikersnaam })
    }
    // create entries for tips
    for (const tip of bubbleJSON.value.tips) {
      recent.push({ type: 'tip', tipType: tip.tipType, label: tip.naam, datum: (tip.bewerkdatum ?? tip.aanmaakdatum), details: tip.tipType + ' ' + tip.adresgegevens, id: tip.id })
    }
    // TODO gevraagde tips, ikookjes

    return recent.sort((a, b) => a.datum - b.datum)
  }


  const saveIncident = (incident) => {
    if (!incident.id) {
      incident.id = new Date().getTime()
    }
    if (bubbleJSON.value.incidenten == null) {
      bubbleJSON.value.incidenten = []
    }
    bubbleJSON.value.incidenten.push(incident)
    saveFile(JSON.stringify({ type: 'incident', incident }), filename)
    const filename = DELTA_DIRECTORY + '/' + new Date().getTime() + '.json'
    bubbleChanged()
  }


  const DELTA_DIRECTORY = 'delta'


  const CONSOLIDATION_MARKER_FILE = 'lastBubbleDeltaConsolidated.json'

  const consolideerDeltafiles = async () => {
    console.log('consolidating delta files in appstore')

    bubbleJSON.value = await getJSONFile(MAIN_BUBBLE_FILE)
    const deltaFiles = await loadDeltaFiles()

    // write lastDeltaConsolidated.json with fileid/timestamp of most recent delta that was processed
    const lastDeltaFileProcessed = deltaFiles[deltaFiles.length - 1]
    const timestamp = lastDeltaFileProcessed.name.substring(0, lastDeltaFileProcessed.name.length - 5).substring(DELTA_DIRECTORY.length+1) // strip .json at the end and strip delta/ at the beginning
    const lastConsolidation = { consolidationTimestamp: new Date().getTime(), lastDeltaTimestamp: timestamp }
    bubbleJSON.value.lastConsolidation = lastConsolidation
    const _ = await saveFile(JSON.stringify(bubbleJSON.value), MAIN_BUBBLE_FILE)

    saveFile(JSON.stringify(lastConsolidation), CONSOLIDATION_MARKER_FILE)
  }

  return {
    setPAR, getBubble, ingechecktLid, saveLid, saveTip, removeTip, getRecent, saveIncident, tipTags, consolideerDeltafiles
  }
})
