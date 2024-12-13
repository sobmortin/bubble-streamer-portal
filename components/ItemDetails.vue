<template>
    <div class="input-box">
        <div>
            <p>item name:</p>
            <input type="text" v-model="itemName" />

            <p>link to item:</p>
            <input type="url" v-model="itemUrl" />

            <p>description:</p>
            <input type="text" v-model="itemDescription" style="height: 200px" />
            <div style="text-align: center">
                <button @click="emitItemDetails">Save</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['emit-item-details'])

const itemName = ref('')
const itemUrl = ref('')
const itemDescription = ref('')

const emitItemDetails = () => {
    console.log({ itemName, itemUrl, itemDescription })
    emit('emit-item-details', {
        itemName,
        itemUrl,
        itemDescription,
    })
}
</script>
<style>
.input-box {
    position: fixed;
    justify-content: center;
    opacity: 1;
    z-index: 10;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background: white;
    padding: 20px;
    border-radius: 25px;
    min-width: 50%;
    min-height: 50%;
    border: 3px solid silver;
}
</style>
