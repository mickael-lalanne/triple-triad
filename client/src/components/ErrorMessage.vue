<template>
    <div class="error-container">
        <!-- BROWSER ERROR -->
        <div v-if="error === ETripleTriadError.Browser" class="browser-error-container">
            <v-spacer></v-spacer>
            <div class="error-title">{{ $vuetify.locale.t('$vuetify.error.browser.title') }}</div>
            <div class="error-subtitle">{{ $vuetify.locale.t('$vuetify.error.browser.subtitle') }}</div>
            <div class="browser-container">
                <img src="/images/browser/edge.png" class="not-supported" />
                <img src="/images/browser/chrome.png" />
                <img src="/images/browser/firefox.png" class="not-supported" />
                <img src="/images/browser/safari.png" class="not-supported" />
                <img src="/images/browser/opera.png" class="not-supported" />
            </div>
            <v-spacer></v-spacer>
            <div class="error-footer">
                {{ $vuetify.locale.t('$vuetify.error.browser.footer') }}
                 <a @click="redirectToRoadmap">{{ $vuetify.locale.t('$vuetify.error.roadmapButton') }}</a>.
            </div>
        </div>
        <!-- RESOLUTION ERROR -->
        <div v-else-if="error === ETripleTriadError.Resolution" class="resolution-error-container">
            <v-spacer></v-spacer>
            <div class="error-title">{{ $vuetify.locale.t('$vuetify.error.resolution.title') }}</div>
            <div class="error-subtitle">{{ $vuetify.locale.t('$vuetify.error.resolution.subtitle') }}</div>
            
            <v-spacer></v-spacer>
            <v-icon
                class="resolution-icon"
                icon="mdi-monitor-screenshot"
                color="white"
            ></v-icon>
            
            <v-spacer></v-spacer>
            <div class="error-footer">
                {{ $vuetify.locale.t('$vuetify.error.resolution.footer1') }} <br>
                {{ $vuetify.locale.t('$vuetify.error.resolution.footer2') }}
                <a @click="redirectToRoadmap">{{ $vuetify.locale.t('$vuetify.error.roadmapButton') }}</a>.
            </div>
            
        </div>
    </div>
</template>

<script lang="ts">
import { ETripleTriadError } from '@/models/Error';
import router from '@/router';
import type { PropType } from 'vue';

export default {
    name: 'ErrorMessage',
    props: {
        error: { type: String as PropType<ETripleTriadError>, required: true }
    },
    data() {
        return {
            ETripleTriadError: ETripleTriadError
        };
    },
    methods: {
        redirectToRoadmap(): void {
            router.push({ path: '/roadmap' });
        }
    }
}
</script>

<style lang="scss" scoped>
.error-container {
    text-align: center;
    padding: 10%;
    color: white;
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(var(--v-theme-black));
}
.browser-error-container,
.resolution-error-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}
.error-title {
    font-size: 45px;
    font-weight: 500;
    margin-bottom: 25px;
    color: rgb(var(--v-theme-primary));
}
.error-subtitle {
    font-size: 20px;
}
.error-footer {
    font-style: italic;
    a {
        cursor: pointer;
        color: rgb(var(--v-theme-primary));
        &:hover,
        &:active {
            color: rgb(var(--v-theme-secondary));
            text-decoration: underline;
        }
    }
}
.browser-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 10vh 0;
    img {
        margin: 0 15px;
        min-width: 0;
    }
    .not-supported {
        -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%);
    }
}
.resolution-icon {
    height: auto;
    &::before {
        font-size: 15vw;
    }
}

@media (max-width: 768px) {
    .error-title {
        font-size: 32px;
    }
    .error-subtitle {
        font-size: 17px;
    }
    .resolution-icon::before {
        font-size: 25vw;
    }
    .error-footer {
        font-size: 14px;
    }
}
</style>
