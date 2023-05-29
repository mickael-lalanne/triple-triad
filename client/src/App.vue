<template>
    <ErrorMessage v-if="error && currentRouteName !== 'roadmap'" :error="error"/>
    <RouterView />
</template>

<script lang="ts">
import { RouterView } from 'vue-router';
import { AuthenticatorService } from '@/services/authenticatorService';
import { DeckService } from '@/services/deckService';
import { useDeckStore } from '@/stores/deck.store';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { ETripleTriadError } from './models/Error';
import { isBrowserSupported, isResolutionSupported } from './services/utils';
import router from './router';

export default {
    components: { RouterView, ErrorMessage },
    data() {
        return {
            error: undefined as ETripleTriadError | undefined
        };
    },
    computed: {
        currentRouteName(): string {
            return router.currentRoute.value && router.currentRoute.value
                ? router.currentRoute.value.name as string
                : '';
        }
    },
    async beforeMount() {
        // Check browser and resolution
        if (!isBrowserSupported()) {
            this.error = ETripleTriadError.Browser;
        } else if (!isResolutionSupported()) {
            this.error = ETripleTriadError.Resolution;
        }
        addEventListener('resize', this.onWindowResize);

        await AuthenticatorService.init();
        DeckService.deckStore = useDeckStore() as any;
        DeckService.getUserDecks();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    },
    methods: {
        /**
         * Called when the window is resized
         * Check if the resolution is still supported, display an error message if necessary
         */
        onWindowResize(): void {
            if (this.error !== ETripleTriadError.Browser) {
                this.error = isResolutionSupported() ? undefined : ETripleTriadError.Resolution;
            }
        }
    }
}
</script>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}


nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>

<style>
html {
    overflow: auto !important;
}
</style>