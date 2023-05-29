<template>
    <div
        class="deck-selector-container"
        :class="{ 'deck-selector-container-hide': hideAnimation }"
    >
        <div class="deck-selector-header">
            <span>
                {{ $vuetify.locale.t('$vuetify.home.deckSelector.localTitle') }}
            </span>
            <span
                class="ml-2"
                :style="`
                color: ${
                    step === ELocalStep.SelectPlayer1Deck
                        ? 'rgb(var(--v-theme-primary))'
                        : 'rgb(var(--v-theme-secondary))'
                };
            `"
            >
                {{ headerWording }}
            </span>
        </div>
        <div class="deck-selector-content">
            <!-- No deck message -->
            <div v-if="userDecks.length === 0" class="no-deck-message ml-2">
                {{ $vuetify.locale.t('$vuetify.home.deckSelector.noDeckMessage') }} <br>
                {{ $vuetify.locale.t('$vuetify.home.deckSelector.playWithRandomDeckMessage') }} 
            </div>
            <!-- User decks -->
            <div
                v-for="deck in userDecks"
                :key="deck.id"
                class="deck-container"
                :class="{
                    'deck-container-p1-selected': isP1DeckSelected(deck.id!),
                    'deck-container-p2-selected': isP2DeckSelected(deck.id!)
                }"
                @click="selectDeck(deck)"
            >
                <img
                    v-for="card in getDeckCards(deck.cards)"
                    :key="card.id"
                    :src="BASE_PATH + '/images/cards/' + card.source"
                />
            </div>
            <!-- Random deck -->
            <div
                class="deck-container"
                :class="{
                    'deck-container-p1-selected': isP1DeckSelected(currentRandomDeck.id!),
                    'deck-container-p2-selected': isP2DeckSelected(currentRandomDeck.id!)
                }"
                @click="selectDeck(currentRandomDeck)"
            >
                <div v-for="i in 5" :key="i" class="random-card d-flex align-center justify-center">
                    <v-icon
                        :size="25"
                        icon="mdi-help"
                        color="white"
                    ></v-icon>
                </div>
            </div>
        </div>
        <v-spacer></v-spacer>
        <!-- Actions button -->
        <div class="actions-buttons-container">
            <!-- Previous -->
            <div
                class="deck-selector-action-button deck-selector-action-button-previous"
                @click="onPreviousButtonClick"
            >
                <v-icon
                    :size="20"
                    icon="mdi-arrow-left-bold"
                    color="white"
                ></v-icon>
            </div>
            <div
                class="deck-selector-action-button deck-selector-action-button-next"
                :class="{ 'deck-selector-action-button-next-disabled': !isActionButtonEnable() }"
                @click="onNextButtonClick"
            >
                {{ actionButtonWording }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { Card } from '@/models/Card';
import type { Deck } from '@/models/Deck';
import { ETripleTriadEvent } from '@/models/Event';
import { EGameMode } from '@/models/GameMode';
import { DeckService } from '@/services/deckService';
import { useDeckStore } from '@/stores/deck.store';
import type { PropType } from 'vue';
import { BASE_PATH } from '@/router';

enum ELocalStep {
    SelectPlayer1Deck = 'select-player-1-deck',
    SelectPlayer2Deck = 'select-player-2-deck'
}

export default {
    name: 'DeckSelector',
    props: {
        gameMode: { type: String as PropType<EGameMode>, default: () => EGameMode.local }
    },
    data() {
        return {
            ELocalStep: ELocalStep,
            BASE_PATH: BASE_PATH,
            userDecks: [] as Deck[],
            step: ELocalStep.SelectPlayer1Deck as ELocalStep,
            player1Deck: undefined as undefined | Deck,
            player2Deck: undefined as undefined | Deck,
            hideAnimation: false as boolean,
            p1RandomDeck: DeckService.generateRandomDeck() as Deck,
            p2RandomDeck: DeckService.generateRandomDeck() as Deck
        };
    },
    computed: {
        actionButtonWording(): string {
            return this.step === ELocalStep.SelectPlayer1Deck
                ? this.$vuetify.locale.t('$vuetify.shared.next')
                : this.$vuetify.locale.t('$vuetify.shared.play');
        },
        headerWording(): string {
            return this.step === ELocalStep.SelectPlayer1Deck
                ? this.$vuetify.locale.t('$vuetify.home.deckSelector.localTitleP1')
                : this.$vuetify.locale.t('$vuetify.home.deckSelector.localTitleP2');
        },
        currentRandomDeck(): Deck {
            return this.step === ELocalStep.SelectPlayer1Deck
                ? this.p1RandomDeck
                : this.p2RandomDeck;
        }
    },
    beforeMount() {
        this.userDecks = useDeckStore().getUserDecks;
    },
    methods: {
        getDeckCards(cardIds: number[]): Card[] {
            return DeckService.resolveDeckCards(cardIds);
        },
        /**
         * @returns {boolean} true if the deck is selected for the player 1
         */
        isP1DeckSelected(deckId: string): boolean {
            return this.step === ELocalStep.SelectPlayer1Deck && this.player1Deck?.id === deckId;
        },
        /**
         * @returns {boolean} true if the deck is selected for the player 2
         */
        isP2DeckSelected(deckId: string): boolean {
            return this.step === ELocalStep.SelectPlayer2Deck && this.player2Deck?.id === deckId;
        },
        selectDeck(deck: Deck): void {
            switch (this.step) {
                case ELocalStep.SelectPlayer1Deck:
                    this.player1Deck = deck;
                    break;

                case ELocalStep.SelectPlayer2Deck:
                    this.player2Deck = deck;
                    break;
            }
        },
        /**
         * Check if the action button is enable depending on the current step
         * @returns {boolean} true if the action button is enable
         */
        isActionButtonEnable(): boolean {
            switch (this.step) {
                case ELocalStep.SelectPlayer1Deck:
                    return !!this.player1Deck;

                case ELocalStep.SelectPlayer2Deck:
                    return !!this.player2Deck;
            }
        },
        /**
         * Called when the previous action button has been clicked
         * Go to the previous step, or emit event to close the deck selector
         */
        onPreviousButtonClick(): void {
            switch (this.step) {
                case ELocalStep.SelectPlayer1Deck:
                    this.hideAnimation = true;
                    // Once the hide animation has ended, close the deck selector
                    setTimeout(() => {
                        this.$emit(ETripleTriadEvent.CloseDeckSelector);
                    }, 1000);
                    break;

                case ELocalStep.SelectPlayer2Deck:
                    this.step = ELocalStep.SelectPlayer1Deck;
                    this.player2Deck = undefined;
                    break;
            }
        },
        /**
         * Called when the next action button has been clicked
         * Go to the next step, or emit event to play the game
         */
        onNextButtonClick(): void {
            switch (this.step) {
                case ELocalStep.SelectPlayer1Deck:
                    this.step = ELocalStep.SelectPlayer2Deck;
                    break;

                case ELocalStep.SelectPlayer2Deck:
                    this.$emit(ETripleTriadEvent.PlayLocalMode, [
                        this.player1Deck,
                        this.player2Deck
                    ]);
                    break;
            }
        }
    }
};
</script>

<style scoped lang="scss">

.deck-selector-container {
    min-height: 0;
    display: flex;
    flex-direction: column;
    flex: 1;
    animation-name: showDeckSelector;
    animation-duration: 1.5s;
    // Fix blur when animation
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateZ(0) scale(1, 1);
    transform: translateZ(0) scale(1, 1);
}
.deck-selector-container-hide {
    animation-name: hideDeckSelector;
}
.deck-selector-content {
    overflow: auto;
    padding-left: 5px;
    direction: rtl;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 3px;
    }
    &::-webkit-scrollbar-track {
        background: white;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgb(var(--v-theme-primary));
    }
}
.no-deck-message {
    color: white;
    direction: ltr;
    font-size: 12px;
    margin-bottom: 5px;
}
.deck-container {
    display: flex;
    direction: ltr;
    user-select: none;
    margin-bottom: 5px;
    padding: 3px;
    border-radius: 7px;
    cursor: pointer;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    &-p1-selected {
        background-color: rgb(var(--v-theme-primary)) !important;
    }
    &-p2-selected {
        background-color: rgb(var(--v-theme-secondary)) !important;
    }
    &:last-child {
        margin-bottom: 0;
    }
    img {
        min-width: 0;
    }
    .random-card {
        border: 1px solid white;
        flex: 1;
        margin: 0 5px;
        aspect-ratio: 50 / 63;
        border-radius: 15px;
        background-color: rgb(var(--v-theme-black));
    }
}
.deck-selector-header {
    color: white;
    font-size: 19px;
    font-style: italic;
    margin-bottom: 5px;
}
.actions-buttons-container {
    margin-top: 10px;
    display: flex;
    align-items: center;
}
.deck-selector-action-button {
    color: white;
    font-size: 18px;
    border: 1px solid white;
    text-align: center;
    cursor: pointer;
    &:hover {
        background-color: rgb(var(--v-theme-primary));
    }
}
.deck-selector-action-button-previous {
    padding: 0 10px;
}
.deck-selector-action-button-next {
    flex-grow: 1;
    margin-left: 10px;
    &-disabled {
        opacity: 0.5;
        pointer-events: none;
    }
}


// SHOW / HIDE ANIMATIONS
@-webkit-keyframes showDeckSelector /* Safari and Chrome */ {
    0% {
        opacity: 0;
        padding-bottom: 85%;
    }
    100% {
        opacity: 1;
        padding-bottom: 0%;
    }
}
@keyframes showDeckSelector {
    0% {
        opacity: 0;
        padding-bottom: 85%;
    }
    100% {
        opacity: 1;
        padding-bottom: 0%;
    }
}
@-webkit-keyframes hideDeckSelector /* Safari and Chrome */ {
    0% {
        opacity: 1;
        padding-bottom: 0%;
    }
    100% {
        opacity: 0;
        padding-bottom: 85%;
    }
}
@keyframes hideDeckSelector {
    0% {
        opacity: 1;
        padding-bottom: 0%;
    }
    100% {
        opacity: 0;
        padding-bottom: 85%;
    }
}
</style>
