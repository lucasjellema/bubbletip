// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const preAuthenticatedRequestURL = ref(null)
  const setPAR = (par) => {
    preAuthenticatedRequestURL.value = par
    initializeBubble()
  }

  const getFile = (filename) => {
    return new Promise((resolve, reject) => {
      const targetURL = preAuthenticatedRequestURL.value + filename
      fetch(targetURL, { method: 'GET' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.blob;
        })
        .then(blob => {
          resolve(JSON.parse(blob));
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
  const initializeBubble = async () => {
    // read bubble.json from par
    bubbleJSON.value = await getFile('bubble.json')
    console.log(bubbleJSON.value)
    // if not found, create it
    if (bubbleJSON.value == 1) {
      bubbleJSON.value = {
        tips: [], leden: [], gevraagdeTips: []
      }
      // save it
      saveFile(JSON.stringify(bubbleJSON.value), 'bubble.json')

    }
    return bubbleJSON
  }

  const getBubble = () => {
    return bubbleJSON
  }

  return {
    setPAR, getBubble
  }
})
