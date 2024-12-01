<template>
    <div class="container">
        <div class="input-container">
            <input v-model="currentItem" type="text" placeholder="Enter item name" class="item-input" />
            <button @click="captureAndProcess" class="capture-button">Capture Screenshot</button>
        </div>

        <div ref="containerRef" class="video-container">
            <video ref="videoRef" autoplay playsinline />
            <canvas ref="canvasRef" class="canvas-overlay" />
            <div v-if="screenshotTaken" class="screenshot-overlay">
                <img :src="screenshotUrl" @click="handleImageClick" />
                <div
                    v-for="item in items"
                    :key="item.name + item.position.x"
                    class="marker"
                    :style="{
                        left: item.position.x + '%',
                        top: item.position.y + '%',
                    }"
                >
                    <div class="marker-dot"></div>
                    <div class="marker-label">{{ item.name }}</div>
                </div>
            </div>
        </div>

        <div class="items-list">
            <h3>Marked Items:</h3>
            <ul>
                <li v-for="(item, index) in items" :key="index" class="item-entry">
                    <span class="item-name">{{ item.name }}</span>
                    <div class="item-details">
                        <span class="coordinates">
                            X: {{ item.position.x.toFixed(5) }}%, Y: {{ item.position.y.toFixed(5) }}%
                        </span>
                        <button @click="deleteItem(index)" class="delete-button">Delete</button>
                    </div>
                </li>
            </ul>
        </div>

        <button v-if="screenshotTaken && items.length > 0" @click="saveToBackend" class="save-button">
            Save All Items
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentItem = ref('')
const items = ref([])
const videoRef = ref(null)
const canvasRef = ref(null)
const containerRef = ref(null)
const stream = ref(null)
const screenshotTaken = ref(false)
const screenshotUrl = ref('')
const screenshotBlob = ref(null)

onMounted(async () => {
    await startWebcam()

    if (canvasRef.value && containerRef.value) {
        const container = containerRef.value
        canvasRef.value.width = container.offsetWidth
        canvasRef.value.height = container.offsetHeight
    }
})

onBeforeUnmount(() => {
    stopWebcam()
    if (screenshotUrl.value) {
        URL.revokeObjectURL(screenshotUrl.value)
    }
})

async function startWebcam() {
    try {
        stream.value = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
            },
        })

        if (videoRef.value) {
            videoRef.value.srcObject = stream.value
        }
    } catch (err) {
        console.error('Error accessing webcam:', err)
    }
}

function stopWebcam() {
    if (stream.value) {
        stream.value.getTracks().forEach((track) => track.stop())
    }
}

async function captureAndProcess() {
    const video = videoRef.value
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert to JPG blob
    canvas.toBlob(
        async (blob) => {
            screenshotBlob.value = blob
            if (screenshotUrl.value) {
                URL.revokeObjectURL(screenshotUrl.value)
            }
            screenshotUrl.value = URL.createObjectURL(blob)
            screenshotTaken.value = true
            items.value = [] // Clear previous items
        },
        'image/jpeg',
        0.9
    )
}

function handleImageClick(e) {
    if (!currentItem.value) {
        alert('Please enter an item name first!')
        return
    }

    const rect = e.target.getBoundingClientRect()
    // Adjust for the transform translate(-50%, -50%) of the marker
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    items.value.push({
        name: currentItem.value,
        position: {
            x: x,
            y: y,
        },
    })

    currentItem.value = ''
}

async function saveToBackend() {
    try {
        const formData = new FormData()
        formData.append('image', screenshotBlob.value)
        formData.append(
            'data',
            JSON.stringify({
                items: items.value,
            })
        )

        console.log({formData})
        const response = await fetch('http://localhost:8000/save-image', {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        alert('Data saved successfully!')
    } catch (error) {
        console.error('Error sending data:', error)
        alert('Error saving data to server')
    }
}

function deleteItem(index) {
    items.value.splice(index, 1)
}
</script>

<style scoped>
.container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

.input-container {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
}

.item-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.capture-button {
    padding: 10px 20px;
    background-color: #44ff44;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.video-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    background: black;
    margin-bottom: 20px;
}

.screenshot-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}

.screenshot-overlay img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    cursor: crosshair;
}

.marker {
    position: absolute;
    /* Remove the transform since we're now calculating exact position */
    left: 0;
    top: 0;
    transform: translate(0, 0);
    pointer-events: none;
}

.marker-dot {
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
    border: 2px solid white;
    transform: translate(-50%, -50%); /* Center the dot only */
}

.marker-label {
    position: absolute;
    left: 5px; /* Offset label to the right of the dot */
    top: -10px; /* Offset label above the dot */
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 12px;
    white-space: nowrap;
}

video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.canvas-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.items-list {
    margin-top: 20px;
}

.items-list h3 {
    font-weight: bold;
    margin-bottom: 10px;
}

.items-list ul {
    list-style: none;
    padding: 0;
}

.item-entry {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-bottom: 10px;
}

.item-details {
    display: flex;
    gap: 20px;
    align-items: center;
}

.coordinates {
    font-size: 14px;
    color: #666;
}

.delete-button {
    color: #ff4444;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.delete-button:hover {
    color: #ff0000;
}

.save-button {
    display: block;
    width: 100%;
    padding: 15px;
    background-color: #4444ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
}

.save-button:hover {
    background-color: #3333cc;
}
</style>
