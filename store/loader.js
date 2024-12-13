import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loaderStore', {
    state: () => ({
        isLoading: false,
    }),
    getters: {
        getLoadingState: (state) => state.isLoading,
    },
    actions: {
        setShowLoaderTrue() {
            this.isLoading = true
        },
        setShowLoaderFalse() {
            this.isLoading = false
        },
    },
})
