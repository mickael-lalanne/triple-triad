<template>
    <div
        class="mode-selector-container"
        :class="{
            'mode-selector-hidden': !show,
            'mode-selector-visible': show
        }"
    >
        <div class="mode-selector-header" @click="$emit(ETripleTriadEvent.CloseModeSelector)">
            <div class="mode-selector-header-title">
                {{ $vuetify.locale.t('$vuetify.home.modeSelector.title') }}
            </div>
            <v-spacer></v-spacer>
            <div class="mode-selector-header-close-icon">
                <v-icon
                    class="mode-selector-close-icon"
                    :size="25"
                    icon="mdi-chevron-left"
                    color="white"
                ></v-icon>
            </div>
        </div>
        <div class="mode-button" @click="$emit(ETripleTriadEvent.SelectLocalMode, EGameMode.local)">
            {{ $vuetify.locale.t('$vuetify.home.modeSelector.local') }}
        </div>
        
        <div class="mode-button mode-button-disabled">
            {{ $vuetify.locale.t('$vuetify.home.modeSelector.ai') }}
            <v-tooltip activator="parent" location="bottom">
                {{ $vuetify.locale.t('$vuetify.shared.later') }}
            </v-tooltip>
        </div>
        <div class="mode-button mode-button-disabled">
            {{ $vuetify.locale.t('$vuetify.home.modeSelector.online') }}
            <v-tooltip activator="parent" location="bottom">
                {{ $vuetify.locale.t('$vuetify.shared.later') }}
            </v-tooltip>
        </div>
        <!-- TODO: DECK SELECTOR -->
    </div>
</template>

<script lang="ts">
import { ETripleTriadEvent } from '@/models/Event';
import { EGameMode } from '@/models/GameMode';

export default {
    name: 'ModeSelector',
    props: {
        show: { type: Boolean, default: () => false }
    },
    data() {
        return {
            ETripleTriadEvent: ETripleTriadEvent,
            EGameMode: EGameMode,
            isMouseDown: false as boolean,
        };
    },
    methods: {
    }
}
</script>

<style scoped lang="scss">
.mode-selector-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    border-right: 3px solid rgb(var(--v-theme-primary));
    padding: 20px;
    border-radius: 20px;
    cursor: default;
}
.mode-selector-hidden {
    opacity: 0;
}
.mode-selector-visible {
    opacity: 1;
    transform: translateX(100%);
}
.mode-selector-header {
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover .mode-selector-close-icon {
        color: rgb(var(--v-theme-primary)) !important;
    }
}
.mode-selector-header-title {
    color: white;
    font-size: 22px;
    font-style: italic;
}
.mode-button {
    color: white;
    font-size: 22px;
    text-align: center;
    margin: 20px;
    border: 1px solid white;
    padding: 12px;
    user-select: none;
    cursor: pointer;
    &:hover {
        background-color: rgb(var(--v-theme-primary));
    }
}
.mode-button-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
        background-color: unset;
    }
}
</style>
