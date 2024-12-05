<template>
    <div>
        <div class="blur-overlay"></div>
        <div class="loader-overlay">
            <h4 style="text-align: center; font-size: 30px; color: white">Saving</h4>
            <div style="margin: auto; margin-top: 15%" class="loader"></div>
        </div>
    </div>
</template>

<script setup></script>

<style>
.loader-overlay {
    position: fixed;
    opacity: 1;
    z-index: 10;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background: silver;
    padding: 20px;
    border-radius: 25px;
    min-width: 30%;
    min-height: 30%;
    border: 3px solid white;
}

/* HTML: <div class="loader"></div> */
.loader,
.loader:before,
.loader:after {
    opacity: 1;
    width: 35px;
    aspect-ratio: 1;
    box-shadow: 0 0 0 3px inset #fff;
    position: relative;
    animation: 1.5s infinite 0.5s;
    animation-name: l7-1, l7-2;
}
.loader:before,
.loader:after {
    content: '';
    position: absolute;
    left: calc(100% + 5px);
    animation-delay: 1s, 0s;
}
.loader:after {
    left: -40px;
    animation-delay: 0s, 1s;
}
@keyframes l7-1 {
    0%,
    55%,
    100% {
        border-top-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    20%,
    30% {
        border-top-left-radius: 50%;
        border-bottom-right-radius: 50%;
    }
}
@keyframes l7-2 {
    0%,
    55%,
    100% {
        border-bottom-left-radius: 0;
        border-top-right-radius: 0;
    }
    20%,
    30% {
        border-bottom-left-radius: 50%;
        border-top-right-radius: 50%;
    }
}

.blur-overlay {
    width: 100vw;
    height: 100vw;
    background-color: silver;
    opacity: 0.7;
    position: fixed;
    top: 0px;
    backdrop-filter: blur(10px);
}
</style>
