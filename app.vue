<template>
    <div>
        <WebCam />
        <Loader v-if="showLoader.state" />
    </div>
</template>

<script setup>
import { useLoaderStore } from '@/store/loader.js'
const showLoader = useLoaderStore()
console.log({showLoader})
</script>
