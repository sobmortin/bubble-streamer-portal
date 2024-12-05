import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useLoaderStore = defineStore('loaderStore', () => {
    const state = ref(false)

    const setShowLoaderTrue = () => {
        state.value = true
    }

    const setShowLoaderFalse = () => {
        state.value = false
    }
    return { state, setShowLoaderTrue, setShowLoaderFalse }
})
