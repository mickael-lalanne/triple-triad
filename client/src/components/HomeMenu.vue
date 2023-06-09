<template>
    <div class="home-container">
        <div class="home-header">
            <a class="logout" @click="logout()">
                {{ $vuetify.locale.t('$vuetify.home.menu.logout') }}
            </a>
        </div>
        <div class="d-flex align-center justify-center" style="width: 100%;">
            <!-- PLAY BUTTON-->
            <div
                class="card-container card-board"
                @click="onPlayButtonClicked"
                :class="{
                    'card-board-selected': showSelectorMode,
                    'card-board-in-animation': closingDeckViewer,
                    'card-container-hidden': showDeckViewer
                }"
            >
                <div class="card-bg-container">
                    <div class="card-bg"></div>
                </div>
                <div class="card-header"></div>
                <div class="card-icon-container">
                    <div class="card-icon">
                        <v-icon
                            :size="60"
                            icon="mdi-gamepad-square-outline"
                            color="rgb(var(--v-theme-black))"
                        ></v-icon>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-title">{{ $vuetify.locale.t('$vuetify.home.menu.play') }}</div>
                </div>
                <!-- GAME MODE SELECTOR -->
                <GameModeSelector
                    class="game-mode-selector"
                    :class="{ 'game-mode-selector-hidden': !showSelectorMode }"
                    :show="showSelectorMode"
                    @[ETripleTriadEvent.CloseModeSelector]="closeGameModeSelector"
                    @[ETripleTriadEvent.PlayLocalMode]="$emit(ETripleTriadEvent.PlayLocalMode, $event)"
                />
            </div>

            <!-- DECK BUTTON -->
            <div
                class="card-container card-deck"
                to="/decks"
                :class="{
                    'card-container-hidden': showSelectorMode,
                    'card-deck-in-animation': closingSelectorMode,
                    'card-deck-selected': showDeckViewer,
                }"
                @click="onDeckButtonClicked"
            >
                <div class="card-bg-container">
                    <div class="card-bg"></div>
                </div>
                <div class="card-header"></div>
                <div class="card-icon-container">
                    <div class="card-icon">
                        <v-icon
                            :size="60"
                            icon="mdi-cards-outline"
                            color="rgb(var(--v-theme-black))"
                        ></v-icon>
                    </div>
                </div>

                <div class="card-content">
                    <div class="card-title">{{ $vuetify.locale.t('$vuetify.home.menu.deckManagement') }}</div>
                </div>
                <!-- DECK SECTION -->
                <!-- Without this wrapper, we would see the deck section 
                    in the card background during the animation -->
                <div class="deck-section-wrapper" :class="{ 'deck-section-wrapper-hidden': !showDeckViewer }">
                    <DeckSection
                        class="deck-section"
                        :class="{ 'deck-section-hidden': !showDeckViewer }"
                        :show="showDeckViewer"
                        @[ETripleTriadEvent.CloseDeckSection]="closeDeckSection"
                    />
                </div>
            </div>
        </div>
    </div>

</template><script lang="ts">
import { Auth } from '@aws-amplify/auth';
import GameModeSelector from '@/components/GameModeSelector.vue';
import DeckSection from '@/components/DeckSection.vue';
import { ETripleTriadEvent } from '@/models/Event';
import router from '@/router';
import { DeckService } from '@/services/deckService';

export default {
    components: { GameModeSelector, DeckSection },
    data() {
        return {
            ETripleTriadEvent: ETripleTriadEvent,
            showSelectorMode: false as boolean,
            closingSelectorMode: false as boolean,
            closingDeckViewer: false as boolean,
            showDeckViewer: false as boolean
        };
    },
    methods: {
        async logout(): Promise<void> {
            // Remove cards from store
            DeckService.deckStore.reset();
            await Auth.signOut();
            router.push({ name: 'login'});
        },
        onPlayButtonClicked(clickEvent: MouseEvent): void {
            // Check that click is not emited from game mode header
            // Otherwise, mode selector panel won't close
            const gameModeHeader: Element = document.getElementsByClassName('mode-selector-header')[0];
            this.showSelectorMode = gameModeHeader && !gameModeHeader.contains(clickEvent.target as Node);
        },
        onDeckButtonClicked(clickEvent: MouseEvent): void {
            // Check that click is not emited from deck viewer header, add deck button or delete card button
            // Otherwise, mode selector panel won't close
            const deckViewerHeader: Element = document.getElementsByClassName('viewer-header')[0];
            const deckBuilder: Element = document.getElementsByClassName('builder-container')[0];

            this.showDeckViewer = (deckViewerHeader && !deckViewerHeader.contains(clickEvent.target as Node)) ||
                (clickEvent.target as HTMLElement).classList.contains('add-deck-button') ||
                (clickEvent.target as HTMLElement).classList.contains('remove-background') ||
                (deckBuilder && deckBuilder.contains(clickEvent.target as Node));
        },
        closeGameModeSelector(): void {
            this.showSelectorMode = false;
            // Set closingSelectorMode data, it adds a class to the deck button just the time of the closing animation
            this.closingSelectorMode = true;
            setTimeout(() => {
                this.closingSelectorMode = false;
            }, 2000);
        },
        closeDeckSection(): void {
            this.showDeckViewer = false;
            // Set closingDeckViewer data, it adds a class to the play button just the time of the closing animation
            this.closingDeckViewer = true;
            setTimeout(() => {
                this.closingDeckViewer = false;
            }, 2000);
        },
    }
}
</script>

<style scoped lang="scss">
$card-border-radius: 20px;
$card-transition-delay: .5s;
$card-transition: all .8s ease-in-out;
.home-container {
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
}
.home-header {
    color: white;
    top: 25px;
    right: 25px;
    position: absolute;
    .logout {
        cursor: pointer;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        margin-right: 25px;
        &:hover {
            color: rgb(var(--v-theme-tertiary));
        }
    }
}
.card-container {
    width: 400px;
    height: 650px;
    margin: 5%;
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: $card-border-radius;
    transition: all .3s ease-in-out;
    overflow: visible;
    padding: 0 50px;
    cursor: pointer;
    &.card-board-selected,
    &.card-deck-selected,
    &:hover {
        transition-delay: 0s;
        transform: scale(1.1);

        .card-header img {
            transform: scale(0.8);
            transform-origin: center center;
        }
        .card-bg {
            -webkit-transform: scale(10.5);
            -ms-transform: scale(10.5);
            transform: scale(10.5);
        }
        .card-icon {
            -webkit-animation: rotating 8s linear infinite;
            -moz-animation: rotating 8s linear infinite;
            -ms-animation: rotating 8s linear infinite;
            -o-animation: rotating 8s linear infinite;
            animation: rotating 8s linear infinite;
        }
    }
    .card-header {
        width: 100%;
        height: 150px;
        border-top-right-radius: $card-border-radius;
        border-top-left-radius: $card-border-radius;
        overflow: hidden;
        position: relative;
        img {
            position: absolute;
            transition: all 3s ease-out;
        }
    }
    .deck-header img {
        top: -167px;
        right: -100px;
    }
    .card-icon-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .card-icon {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        position: absolute;
        background-color: white;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .card-content {
        flex: 1;
        height: 100%;
        width: 100%;
        border-bottom-right-radius: $card-border-radius;
        border-bottom-left-radius: $card-border-radius;
        display: flex;
        justify-content: center;
        z-index: 1;
        padding-top: 90px;
    }
    .card-button {
        position: absolute;
        bottom: -20px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .card-bg-container {
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        border-radius: $card-border-radius;
    }
    .card-bg {
        height: 128px;
        width: 128px;
        z-index: 1;
        position: absolute;
        border-radius: 50%;
        -webkit-transition: all .5s ease;
        -o-transition: all .5s ease;
        transition: all .5s ease;
        top: -105px;
        right: -105px;
        border-radius: 75%;
    }
    .card-title {
        font-family: 'ProximaNova', sans-serif;
        color: white;
        font-size: 50px;
        font-weight: 400;
        text-align: center;
        text-transform: uppercase;
        height: 170px;
        display: flex;
        align-items: center;
        backface-visibility: hidden;
        transform: translateZ(0);
        -webkit-font-smoothing: subpixel-antialiased;
    }
}
.card-board .card-bg {
    background-color: rgb(var(--v-theme-primary));
}
.card-deck .card-bg {
    background-color: rgb(var(--v-theme-secondary));
}

.card-board {
    // Gradient generated with https://mycolor.space/
    background-image: linear-gradient(to right top, #222831, #324d60, #377690, #32a3bc, #2cd3e1);
    &.card-board-selected,
    &:hover {
        // Glow effect
        -webkit-box-shadow:0px 0px 91px 0px rgb(var(--v-theme-primary));
        -moz-box-shadow: 0px 0px 91px 0px rgb(var(--v-theme-primary));
        box-shadow: 0px 0px 91px 0px rgb(var(--v-theme-primary));
    }
}
.card-deck {
    transition-delay: 0s;
    // Gradient generated with https://mycolor.space/
    background-image: linear-gradient(to right top, #222831, #3b3f5f, #6b5287, #ac5ea2, #f266ab);
    &.card-deck-selected,
    &:hover {
        // Glow effect
        -webkit-box-shadow:0px 0px 91px 0px rgb(var(--v-theme-secondary));
        -moz-box-shadow: 0px 0px 91px 0px rgb(var(--v-theme-secondary));
        box-shadow: 0px 0px 91px 0px rgb(var(--v-theme-secondary));
    }
}
.card-deck-in-animation,
.card-board-in-animation {
    pointer-events: none;
    user-select: none;
    transition: $card-transition;
    transition-delay: $card-transition-delay !important;
}
.card-container-hidden {
    transition: $card-transition;
    opacity: 0;
    transform: scale(0);
}

.game-mode-selector,
.deck-section {
    transition: $card-transition;
    transition-delay: $card-transition-delay;
}
.deck-section-wrapper {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    &-hidden {
        visibility: hidden;
    }
}
.game-mode-selector-hidden,
.deck-section-hidden {
    transition-delay: 0s;
}
.builder-title {
    text-align: center;
    margin: 0;
    text-transform: uppercase;
    font-size: 28px;
    font-family: 'Roboto', sans-serif;
    color: white;
    font-weight: 500;
}
// ROTATE ANIMATION
@-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes rotating {
    from {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
