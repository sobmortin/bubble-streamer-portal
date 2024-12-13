import { defineStore } from 'pinia'

export const useSavedMasksStore = defineStore('savedMasksStore', {
    state: () => ({
        savedMasks: null,
    }),
    getters: {
        getState: (state) => state.savedMasks,
    },
    actions: {
        setSavedMasks(masks) {
            this.savedMasks = masks
        },
        selectCorrectMask(keepIndex, key) {
            const newList = this.savedMasks[key].masks.filter((_, index) => index === keepIndex)
            this.savedMasks[key].masks = newList
        },
        isOneMaskPerItem() {
            return Object.values(this.savedMasks).filter((value) => value.masks.length > 1).length == 0
        },
    },
})
