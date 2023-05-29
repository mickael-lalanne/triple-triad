<template>
    <div class="builder-container d-flex flex-column">
        <!-- DECK NAME -->
        <v-text-field
            v-model="deckName"
            class="deck-name mb-4"
            color="secondary"
            label="Deck name"
            variant="solo"
            density="compact"
            hide-details
            :disabled="showLoading"
        ></v-text-field>
        <!-- ALL CARDS LIST (sorted by stars) -->
        <v-expansion-panels class="panels-container mb-4" variant="accordion" multiple v-model="starPanels" :disabled="showLoading">
            <v-expansion-panel v-for="(cards, i) in allCards" :key="i" :value="i">
                <v-expansion-panel-title class="builder-panel-title">
                    <v-icon
                        v-for="star in i + 1"
                        :key="star"
                        :size="25"
                        icon="mdi-star-circle"
                        color="cardStar"
                    ></v-icon>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="panel-content">
                    <div class="d-flex star-category">
                        <div
                            v-for="card in cards"
                            :key="card.id"
                            class="card-container"
                            :class="{ 'card-container-disabled': isCardChoosen(i + 1) }"
                        >
                            <img @click="onCardSelected(card)" :src="BASE_PATH + '/images/cards/' + card.source"/>
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-spacer></v-spacer>
        <!-- CREATING DECK -->
        <div class="creating-deck-container d-flex align-center justify-center">

            <div class="d-flex align-center justify-center" style="position: relative; width: 100%;">
                <!-- DECK CARDS -->
                <div
                    v-for="i in 5" :key="i" class="card-slot d-flex"
                    @mouseenter="deckCardHover=i"
                    @mouseleave="deckCardHover = null"
                    :class="{ 'card-slot-empty': !isCardChoosen(i) }"
                >
                    <img
                        v-if="isCardChoosen(i)"
                        :src="BASE_PATH + '/images/cards/' + getCardSource(i)"
                    />
                    <!-- Card remover -->
                    <div
                        v-if="isCardChoosen(i) && deckCardHover === i && !showLoading"
                        class="card-remover d-flex align-center justify-center"
                        @click="removeCardFromDeck(i)"
                    >
                        <v-icon class="remove-icon" :size="40" icon="mdi-selection-remove" color="white"
                        ></v-icon>
                        <div class="remove-background"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ACTIONS BUTTON -->
        <div class="deck-actions">
            <!-- Save button -->
            <div
                class="deck-action-button"
                :class="{ 'deck-action-button-disabled': selectedCards.length !== 5 }"
                @click="createDeck"
            >
                <span v-if="showLoading" class="loading-spacer"></span>
                {{ saveButtonWording }}
                <!-- Loading indicator -->
                <v-progress-circular
                    v-if="showLoading"
                    :width="2"
                    class="loading-indicator"
                    color="secondary"
                    indeterminate
                ></v-progress-circular>
            </div>
            <!-- Cancel button -->
            <div
                class="deck-action-button"
                :class="{ 'deck-action-button-disabled': showLoading }"
                @click="$emit(ETripleTriadEvent.CancelDeck)"
            >
                {{ $vuetify.locale.t('$vuetify.shared.cancel') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { FIVE_STAR_CARDS, FOUR_STAR_CARDS, ONE_STAR_CARDS, THREE_STAR_CARDS, TWO_STAR_CARDS, type Card } from '@/models/Card';
import type { Deck } from '@/models/Deck';
import { ETripleTriadEvent } from '@/models/Event';
import { DeckService } from '@/services/deckService';
import type { PropType } from 'vue';
import { useDeckStore } from '@/stores/deck.store';
import { mapState } from 'pinia';
import { BASE_PATH } from '@/router';

export default {
    props: {
        deckToEdit: { type: Object as PropType<Deck>, required: false }
    },
    computed: {
        ...mapState(useDeckStore, ['getUserDecks']),
        editing(): boolean {
            return !!this.deckToEdit;
        },
        saveButtonWording(): string {
            return this.editing
                ? this.$vuetify.locale.t('$vuetify.shared.edit')
                : this.$vuetify.locale.t('$vuetify.shared.create');
        }
    },
    data() {
        return {
            ETripleTriadEvent: ETripleTriadEvent,
            BASE_PATH: BASE_PATH,
            starPanels: [0, 1, 2, 3, 4, 5] as number[],
            deckCardHover: null as null | number,
            selectedCards: [] as Card[],
            deckName: '' as string,
            allCards: [ONE_STAR_CARDS, TWO_STAR_CARDS, THREE_STAR_CARDS, FOUR_STAR_CARDS, FIVE_STAR_CARDS] as Card[][],
            showLoading: false as boolean
        };
    },
    beforeMount() {
        // Check if we have to edit a deck
        if (this.deckToEdit) {
            this.selectedCards = DeckService.resolveDeckCards(this.deckToEdit.cards);
            this.deckName = this.deckToEdit.name;
        }
    },
    methods: {
        onCardSelected(card: Card) {
            this.starPanels = this.starPanels.filter(i => i !== card.stars - 1);
            this.selectedCards.push(card);
        },
        isCardChoosen(cardStars: number): boolean {
            return !!this.selectedCards.find(card => card.stars === cardStars);
        },
        getCardSource(cardStars: number): string | undefined {
            return this.selectedCards.find(card => card.stars === cardStars)?.source;
        },
        removeCardFromDeck(cardStars: number) {
            this.selectedCards = this.selectedCards.filter(card => card.stars !== cardStars);
        },
        resetDeck() {
            this.selectedCards = [];
            this.starPanels = [0, 1, 2, 3, 4, 5];
        },
        /**
         * Called when create button has been clicked
         * Emit an event to the parent to create the deck
         */
        async createDeck() {
            if(this.showLoading) { return; }

            const deckToCreate: Deck = {
                name: this.deckName === '' ? this.$vuetify.locale.t('$vuetify.deck.defaultDeckName', this.getUserDecks.length + 1) : this.deckName,
                cards: this.selectedCards.map(card => card.id),
                id: this.editing ? this.deckToEdit?.id : undefined
            } as Deck;

            this.showLoading = true;

            if (this.editing) {
                await DeckService.updateDeck(deckToCreate);
            }
            else {
                await DeckService.createDeck(deckToCreate);
            }
            this.$emit(ETripleTriadEvent.DeckCreated, deckToCreate, this.editing);
        }
    }
};
</script>

<style scoped lang="scss">
.builder-container {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 15px;
}
.panels-container {
    overflow: auto;
    direction: rtl;
    &::-webkit-scrollbar {
        width: 2px;
    }
    &::-webkit-scrollbar-track {
        background: white;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgb(var(--v-theme-secondary));
        border-radius: 10px;
    }
}
.builder-panel-title {
    min-height: 30px !important;
    height: 30px;
    border-bottom: 1px solid white;
    color: white;
}

.star-category {
    flex-wrap: wrap;
    justify-content: center;
}
.card-container {
    margin: 5px;   
    width: 70px;
    img {
        transition: all .2s ease-in-out;
        cursor: pointer;
        width: 100%;
        &:hover {
            transform: scale(1.3);
        }
    }
}
.card-container-disabled {
    user-select: none;
    img {
        -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%);
    cursor: not-allowed;
        &:hover {
            transform: unset;
        }
    }
}

.creating-deck-container {
    flex-direction: column;
    background-color: rgb(var(--v-theme-secondary));
    width:100%;
    padding: 7px;
}
.card-slot {
    position: relative;
    aspect-ratio: 50 / 63;
    margin: 0 2px;
    flex: 1 1 0;
    height: 100%;
    border: 1px solid transparent;
    border-radius: 10px;
}
.card-slot-empty {
    border: 1px solid rgb(var(--v-theme-black));
}
.deck-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .deck-action-button {
        cursor: pointer;
        color: white;
        font-size: 16px;
        margin-top: 10px;
        padding: 5px 0;
        border: 1px solid white;
        flex: 1;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:first-child {
            margin-right: 10px;
        }
        &:last-child {
            margin-left: 10px;
        }
        &:hover{
            background-color: rgb(var(--v-theme-secondary));
        }
    }
    .deck-action-button-disabled {
        pointer-events: none;
        user-select: none;
        -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%);
        opacity: 0.5;
    }
}
.loading-indicator,
.loading-spacer {
    width: 20px;
    margin: 0 10px;
}
.card-remover {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    cursor: pointer;
    .remove-icon {
        z-index: 1;
        pointer-events: none;
    }
    .remove-background {
        background-color: black;
        opacity: 0.5;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }
}
.deck-name {
    flex: 0;
}
</style>

<style lang="scss">
.builder-container {
    .v-expansion-panel__shadow {
        box-shadow: none;
        border: 1px solid white;
        border-left: none;
        border-radius: 0;
    }
    .v-expansion-panel-title__overlay {
        opacity: 0 !important;
        &:hover {
            opacity: 0.1 !important;
        }
    }
    .v-expansion-panel-text__wrapper {
        padding: 5px;
    }
    .v-expansion-panel {
        background: none;
        direction: ltr;
    }
}
.deck-actions .deck-action-button:hover .v-icon {
    color: rgb(var(--v-theme-black)) !important;
}
</style>
