<template>
    <authenticator class="triple-triad-authenticator">
    </authenticator>
</template>

<script setup lang="ts">
import router from '@/router';
import { AuthenticatorService } from '@/services/authenticatorService';
import { DeckService } from '@/services/deckService';
import type { HubCapsule } from '@aws-amplify/core';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import { Hub } from 'aws-amplify';

Hub.listen('auth', async (data: HubCapsule) => {
    switch (data.payload.event) {
        // Listen for sign in event to redirect to the main menu
        case 'signIn':
            AuthenticatorService.USER_ID = data.payload.data.attributes.sub;
            await DeckService.getUserDecks();
            router.push({ path: '/' });
            break;
        default:
            break;
    }
});
</script>

<style lang="scss" >
.triple-triad-authenticator {
    z-index: 1;
}
// Redifine amplify variables
[data-amplify-authenticator] {
    --amplify-components-tabs-item-active-color: rgb(var(--v-theme-secondary));
    --amplify-components-tabs-item-active-border-color: rgb(var(--v-theme-secondary));
    --amplify-components-button-primary-background-color: rgb(var(--v-theme-secondary));
    --amplify-components-button-primary-hover-background-color: rgba(var(--v-theme-secondary), 0.8);
    --amplify-components-tabs-item-hover-color: rgba(var(--v-theme-secondary), 0.65);
    --amplify-components-fieldcontrol-focus-box-shadow: 0px 0px 0px 1px rgb(var(--v-theme-secondary));
    --amplify-components-tabs-item-color: rgb(var(--v-theme-black));
    --amplify-components-tabs-item-focus-color: rgb(var(--v-theme-secondary));
    --amplify-components-button-link-hover-color: rgb(var(--v-theme-secondary));
    --amplify-components-button-link-hover-background-color: rgba(var(--v-theme-secondary), 0.1);
}
.amplify-input:focus {
    border-color: rgb(var(--v-theme-secondary));
}
.amplify-field__show-password {
        color: rgb(var(--v-theme-black));
    &:hover {
        background-color: rgba(var(--v-theme-secondary), 0.1);
        border-color: rgb(var(--v-theme-secondary));
        color: rgb(var(--v-theme-black));
    }
}
</style>
