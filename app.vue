<template>
    <div>
        <WebCam />
        <Loader v-if="isLoading" />
    </div>
</template>

<script setup>
import { useLoaderStore } from '@/store/loader.js'
const loaderStore = useLoaderStore()

const { isLoading } = storeToRefs(loaderStore)
</script>
