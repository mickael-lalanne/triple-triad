<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue';
</script>

<template>
    <main class="login-container">
        <div class="login-title">
            {{ $vuetify.locale.t('$vuetify.login.title') }}
            <div class="login-subtitle">{{ $vuetify.locale.t('$vuetify.login.subtitle') }}</div>
        </div>
        <LoginForm />
        <v-spacer></v-spacer>
        <!-- Waves Container -->
        <div class="waves-container">
            <svg
                class="waves"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shape-rendering="auto"
            >
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(var(--v-theme-primary), 0.7)" />
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(var(--v-theme-primary), 0.5)" />
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(var(--v-theme-primary), 0.3)" />
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="rgb(var(--v-theme-primary)" />
                </g>
            </svg>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.login-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.login-title {
    margin: 7vh 0;
    font-family: 'ProximaNova', sans-serif;
    font-size: 9vh;
    color: rgb(var(--v-theme-primary));
    user-select: none;
}
.login-subtitle {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    color: rgb(var(--v-theme-secondary));
    text-align: right;
    margin-top: -17px;
}
.waves-container {
    position: fixed;
    width: 100%;
    bottom: 0;
}
.waves {
    position:relative;
    width: 100%;
    height:20vh;
    margin-bottom:-7px; /*Fix for safari gap*/
    min-height:100px;
    max-height:250px;
}

// Animation
.parallax > use {
    animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
}
.parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
}
.parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
}
.parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
}
@keyframes move-forever {
    0% {
        transform: translate3d(-90px,0,0);
    }
    100% { 
        transform: translate3d(85px,0,0);
    }
}

// Shrinking for mobile
@media (max-width: 768px) {
    .waves {
        height:40px;
        min-height:40px;
    }
    .content {
        height:30vh;
    }
    h1 {
        font-size:24px;
    }
}
</style>
