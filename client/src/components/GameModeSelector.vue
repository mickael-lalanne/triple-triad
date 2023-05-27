<template>
    <div
        class="mode-selector-container"
        :class="{
            'mode-selector-hidden': !show,
            'mode-selector-visible': show,
        }"
    >
        <div
            class="mode-selector-disable-animation"
            :class="{ 'mode-selector-disable': showDeckSelector }"
        >
            <!-- Game mode selector header -->
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
            <!-- Local button -->
            <div
                class="mode-button"
                :class="{ 'mode-button-active': gameMode === EGameMode.local }"
                @click="onGameModeSelected(EGameMode.local)"
            >
                {{ $vuetify.locale.t('$vuetify.home.modeSelector.local') }}
            </div>
            <!-- AI button -->
            <div class="mode-button mode-button-disabled">
                {{ $vuetify.locale.t('$vuetify.home.modeSelector.ai') }}
                <v-tooltip activator="parent" location="bottom" :disabled="!show">
                    {{ $vuetify.locale.t('$vuetify.shared.later') }}
                </v-tooltip>
            </div>
            <!-- Online button -->
            <div class="mode-button mode-button-disabled">
                {{ $vuetify.locale.t('$vuetify.home.modeSelector.online') }}
                <v-tooltip activator="parent" location="bottom" :disabled="!show">
                    {{ $vuetify.locale.t('$vuetify.shared.later') }}
                </v-tooltip>
            </div>
        </div>
        <!-- DECK SELECTOR -->
        <DeckSelector
            v-if="showDeckSelector"
            :game-mode="gameMode"
            @[ETripleTriadEvent.CloseDeckSelector]="closeDeckSelector"
            @[ETripleTriadEvent.PlayLocalMode]="$emit(ETripleTriadEvent.PlayLocalMode, $event)"
        />
    </div>
</template>

<script lang="ts">
import { ETripleTriadEvent } from '@/models/Event';
import { EGameMode } from '@/models/GameMode';
import DeckSelector from '@/components/deck/DeckSelector.vue';

export default {
    name: 'ModeSelector',
    components: { DeckSelector },
    props: {
        show: { type: Boolean, default: () => false }
    },
    data() {
        return {
            ETripleTriadEvent: ETripleTriadEvent,
            EGameMode: EGameMode,
            isMouseDown: false as boolean,
            showDeckSelector: false as boolean,
            gameMode: undefined as undefined | EGameMode
        };
    },
    methods: {
        onGameModeSelected(gameMode: EGameMode): void {
            this.gameMode = gameMode;
            this.showDeckSelector = true;
        },
        closeDeckSelector(): void {
            this.showDeckSelector = false;
            this.gameMode = undefined;
        }
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
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.mode-selector-hidden {
    opacity: 0;
}
.mode-selector-disable {
    opacity: 0.3 !important;
    pointer-events: none;
    user-select: none;
}
.mode-selector-visible {
    opacity: 1;
    transform: translateX(100%);
}
.mode-selector-header {
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 2;
    &:hover .mode-selector-close-icon {
        color: rgb(var(--v-theme-primary)) !important;
    }
}
.mode-selector-header-title {
    color: white;
    font-size: 19px;
    font-style: italic;
}
.mode-button {
    color: white;
    font-size: 22px;
    text-align: center;
    margin: 8px;
    border: 1px solid white;
    padding: 12px;
    user-select: none;
    z-index: 2;
    cursor: pointer;
    &:hover,
    &-active {
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
.mode-selector-disable-animation {
    transition-duration: 1.5s;
    // Fix blur when animation
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateZ(0) scale(1, 1);
    transform: translateZ(0) scale(1, 1);
}
</style>
