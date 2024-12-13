<template>
    <div>
        <div v-if="processedMasks" class="masks-grid">
            <div v-for="(value, key) in processedMasks" :key="key" class="mask-container">
                <p class="mask-title">Mask {{ key }}</p>
                <div class="product-details">
                    <p>Name: {{ value.productDetails?.name }}</p>
                    <p>Description: {{ value.productDetails?.description }}</p>
                    <a :href="value.productDetails?.link" target="_blank">Product Link</a>
                </div>
                <div class="masks-container">
                    <template v-if="value.masks && value.masks.length > 0">
                        Choose correct mask
                        <div
                            v-for="(mask, index) in value.masks"
                            :key="index"
                            class="mask-item"
                            @click="selectMask(index, key)"
                        >
                            <p>{{ index }}</p>
                            <div style="display: flex">
                                <img class="svg-container" :src="mask['mask'].svg_data" />
                                <img class="svg-container" :src="mask['overlay'].svg_data" />
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <p>{{ index }}</p>
                        <div style="display: flex">
                            <img class="svg-container" />
                            <img class="svg-container" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div v-if="readyToSave">
            <button @click="sendSavedMasks">Save Images</button>
        </div>
    </div>
</template>

<script setup>
import { useSavedMasksStore } from '@/store/savedMasks.js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const savedMaskStore = useSavedMasksStore()
const { savedMasks } = storeToRefs(savedMaskStore)
let readyToSave = ref(false)

// This will automatically update when savedMasks changes
const processedMasks = computed(() => {
    readyToSave = savedMaskStore.isOneMaskPerItem()
    return savedMasks.value
})

function selectMask(index, key) {
    console.log({ index, key })
    savedMaskStore.selectCorrectMask(index, key)
    readyToSave = savedMaskStore.isOneMaskPerItem()
}

async function sendSavedMasks() {
    console.log('here', savedMasks)

    const response = await $fetch('/api/bubble-api/save-masks', {
        method: 'POST',
        body: savedMasks.value,
    })
    console.log({ response })
}
</script>

<style scoped>
.masks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 80vw));
    gap: 1rem;
    padding: 1rem;
}

.mask-container {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
}

.mask-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.product-details {
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #f5f5f5;
    border-radius: 4px;
}

.product-details p {
    margin: 0.25rem 0;
}

.product-details a {
    color: #0066cc;
    text-decoration: none;
}

.product-details a:hover {
    text-decoration: underline;
}

.masks-container {
    display: grid;
    gap: 1rem;
}

.mask-item {
    border: 3px solid #eee;
    padding: 0.5rem;
    border-radius: 4px;
}

.mask-item:hover {
    border: 3px solid green;
    cursor: pointer;
}

.svg-container {
    width: 50%;
    height: auto;
}

/* Make sure SVGs are responsive */
/* .svg-container :deep(svg) {
    width: 100%;
    height: auto;
} */
</style>
