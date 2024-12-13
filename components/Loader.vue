<template>
    <div>
        <div class="blur-overlay"></div>
        <div class="loader-overlay">
            <h4 style="text-align: center; font-size: 30px; color: silver">Saving</h4>
            <div>
                <svg viewBox="10 10 400 400" style="margin: 0px">
                    <defs>
                        <radialGradient id="bubbleGradient">
                            <stop offset="0%" stop-color="rgba(255, 255, 255, 0.95)" />
                            <stop offset="40%" stop-color="rgba(100, 149, 237, 0.9)" />
                            <stop offset="80%" stop-color="rgba(70, 130, 237, 0.85)" />
                            <stop offset="100%" stop-color="rgba(60, 120, 237, 0.8)" />
                        </radialGradient>

                        <filter id="sheenEffect">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
                            <feSpecularLighting
                                in="blur"
                                surfaceScale="5"
                                specularConstant="1.2"
                                specularExponent="20"
                                lighting-color="#ffffff"
                                result="specular"
                            >
                                <fePointLight x="-5000" y="-10000" z="20000" />
                            </feSpecularLighting>
                            <feComposite in="specular" in2="SourceAlpha" operator="in" result="specular2" />
                            <feComposite
                                in="SourceGraphic"
                                in2="specular2"
                                operator="arithmetic"
                                k1="0"
                                k2="1"
                                k3="1"
                                k4="0"
                            />
                        </filter>

                        <filter id="glossEffect">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur2" />
                            <feSpecularLighting
                                in="blur2"
                                surfaceScale="6"
                                specularConstant="0.8"
                                specularExponent="40"
                                lighting-color="#ffffff"
                                result="gloss"
                            >
                                <fePointLight x="5000" y="10000" z="20000" />
                            </feSpecularLighting>
                            <feComposite in="gloss" in2="SourceAlpha" operator="in" result="gloss2" />
                            <feComposite
                                in="SourceGraphic"
                                in2="gloss2"
                                operator="arithmetic"
                                k1="0"
                                k2="1"
                                k3="1"
                                k4="0"
                            />
                        </filter>
                    </defs>

                    <!-- Individual bubbles with popping animation -->
                    <g filter="url(#sheenEffect) url(#glossEffect)">
                        <circle cx="160" cy="160" r="20" fill="url(#bubbleGradient)">
                            <animate
                                attributeName="opacity"
                                dur="2.3s"
                                values="0;0.9;0.9;0"
                                keyTimes="0;0.4;0.95;1"
                                repeatCount="indefinite"
                                begin="0s"
                            />
                            <animate
                                attributeName="r"
                                dur="2.3s"
                                values="10;25;25;40"
                                keyTimes="0;0.4;0.95;1"
                                repeatCount="indefinite"
                                begin="0s"
                            />
                        </circle>
                    </g>

                    <g filter="url(#sheenEffect) url(#glossEffect)">
                        <circle cx="220" cy="180" r="20" fill="url(#bubbleGradient)">
                            <animate
                                attributeName="opacity"
                                dur="3.1s"
                                values="0;0.9;0.9;0"
                                keyTimes="0;0.4;0.95;1"
                                repeatCount="indefinite"
                                begin="0.5s"
                            />
                            <animate
                                attributeName="r"
                                dur="3.1s"
                                values="10;25;25;40"
                                keyTimes="0;0.4;0.95;1"
                                repeatCount="indefinite"
                                begin="0.5s"
                            />
                        </circle>
                    </g>

                    <g filter="url(#sheenEffect) url(#glossEffect)">
                        <circle cx="185" cy="220" r="20" fill="url(#bubbleGradient)">
                            <animate
                                attributeName="opacity"
                                dur="2.7s"
                                values="0;0.9;0.9;0"
                                keyTimes="0;0.4;0.95;1"
                                repeatCount="indefinite"
                                begin="1.2s"
                            />
                            <animate
                                attributeName="r"
                                dur="2.7s"
                                values="10;25;25;40"
                                keyTimes="0;0.4;0.95;1"
                                repeatCount="indefinite"
                                begin="1.2s"
                            />
                        </circle>
                    </g>

                    <g filter="url(#sheenEffect) url(#glossEffect)">
                        <circle cx="165" cy="195" r="20" fill="url(#bubbleGradient)">
                            <animate
                                attributeName="opacity"
                                dur="2.9s"
                                values="0;0.9;0.9;0"
                                keyTimes="0;0.4;0.95;1"
                                repeatCount="indefinite"
                                begin="0.8s"
                            />
                            <animate
                                attributeName="r"
                                dur="2.9s"
                                values="10;25;25;40"
                                keyTimes="0;0.4;0.95;1"
                                repeatCount="indefinite"
                                begin="0.8s"
                            />
                        </circle>
                    </g>

                    <g filter="url(#sheenEffect) url(#glossEffect)">
                        <circle cx="215" cy="160" r="20" fill="url(#bubbleGradient)">
                            <animate
                                attributeName="opacity"
                                dur="3.3s"
                                values="0;0.9;0.9;0"
                                keyTimes="0;0.4;0.95;1"
                                repeatCount="indefinite"
                                begin="1.5s"
                            />
                            <animate
                                attributeName="r"
                                dur="3.3s"
                                values="10;25;25;40"
                                keyTimes="0;0.4;0.95;1"
                                repeatCount="indefinite"
                                begin="1.5s"
                            />
                        </circle>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// Generate random number within a range
const random = (min, max) => Math.random() * (max - min) + min

// Create array of bubble objects with random properties
const bubbles = ref(
    Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: random(180, 220), // Clustered x position
        y: random(180, 220), // Clustered y position
        duration: random(2.3, 3.3), // Random duration
        delay: random(0, 2), // Random start delay
    }))
)
</script>

<style>
.loader-overlay {
    position: fixed;
    opacity: 1;
    z-index: 10;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background: white;
    padding: 20px;
    border-radius: 25px;
    min-width: 30%;
    min-height: 30%;
    border: 3px solid silver;
}

.loader {
    display: flex;
    justify-content: center;
    align-items: center;
}

.blur-overlay {
    width: 100vw;
    height: 100vw;
    background-color: white;
    opacity: 0.7;
    position: fixed;
    top: 0px;
    backdrop-filter: blur(10px);
}
</style>
