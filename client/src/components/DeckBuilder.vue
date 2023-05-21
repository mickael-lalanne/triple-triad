<template>
    <div class="builder-container">
        <!-- ALL CARDS LIST (sorted by stars) -->
        <v-expansion-panels class="panels-container" variant="accordion" multiple v-model="starPanels">
            <v-expansion-panel v-for="(cards, i) in allCards" :key="i" :value="i">
                <v-expansion-panel-title class="builder-panel-title">
                    <v-icon
                        v-for="star in i + 1"
                        :key="star"
                        :size="25"
                        icon="mdi-star-circle"
                        color="#DE970B"
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
                            <img @click="onCardSelected(card)" :src="'/images/cards/' + card.source"/>
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <!-- CREATING DECK -->
        <div class="creating-deck-container d-flex align-center justify-center">
            <!-- DECK NAME -->
            <input v-model="deckName" class="deck-name" placeholder="Deck name" title="input tiel">

            <div class="d-flex align-center justify-center" style="position: relative">
                <!-- DECK CARDS -->
                <div
                    v-for="i in 5" :key="i" class="card-slot"
                    @mouseenter="deckCardHover=i"
                    @mouseleave="deckCardHover = null"
                    :class="{ 'card-slot-empty': !isCardChoosen(i) }"
                >
                    <img
                        v-if="isCardChoosen(i)"
                        :src="'/images/cards/' + getCardSource(i)"
                    />
                    <!-- Card remover -->
                    <div v-if="isCardChoosen(i) && deckCardHover === i" class="card-remover d-flex align-center justify-center">
                        <v-icon
                            class="remove-icon"
                            :size="70"
                            icon="mdi-selection-ellipse-remove"
                            color="white"
                            @click="removeCardFromDeck(i)"
                        ></v-icon>
                        <div class="remove-background"></div>
                    </div>
                </div>
                <!-- ACTIONS BUTTON -->
                <div class="deck-actions">
                    <!-- Save button -->
                    <div
                        class="deck-action-button"
                        @click="createDeck"
                        :class="{ 'deck-action-button-disabled' : selectedCards.length !== 5}"
                    >
                        <div class="button-icon d-flex justify-center">
                            <v-icon
                                :size="25"
                                icon="mdi-content-save"
                                color="white"
                            ></v-icon>
                        </div>
                    </div>
                    <!-- Cancel button -->
                    <div class="deck-action-button" @click="$emit(ETripleTriadEvent.CancelDeck)">
                        <div class="button-icon d-flex justify-center">
                            <v-icon
                                :size="25"
                                icon="mdi-cancel"
                                color="white"
                            ></v-icon>
                        </div>
                    </div>
                </div>
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

export default {
    props: {
        deckLength: { type: Number, required: true },
        deckToEdit: { type: Object as PropType<Deck>, required: false }
    },
    computed: {
        editing(): boolean {
            return !!this.deckToEdit;
        }
    },
    data() {
        return {
            ETripleTriadEvent: ETripleTriadEvent,
            starPanels: [0, 1, 2, 3, 4, 5] as number[],
            deckCardHover: null as null | number,
            selectedCards: [] as Card[],
            deckName: '' as string,
            allCards: [ONE_STAR_CARDS, TWO_STAR_CARDS, THREE_STAR_CARDS, FOUR_STAR_CARDS, FIVE_STAR_CARDS] as Card[][]
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
            const deckToCreate: Partial<Deck> = {
                name: this.deckName === '' ? this.$vuetify.locale.t('$vuetify.deck.defaultDeckName', this.deckLength + 1) : this.deckName,
                cards: this.selectedCards.map(card => card.id),
                id: this.editing ? this.deckToEdit?.id : undefined
            };
            this.$emit(ETripleTriadEvent.CreateDeck, deckToCreate, this.editing)
        }
    }
};
</script>

<style scoped lang="scss">
$header-height: 64px;
$creating-deck-height: 256px;
$card-container-height: calc(#{$header-height} + #{$creating-deck-height});
$deck-actions-width: 125px;

.builder-container {
    overflow: auto;
    height: calc(100% - $card-container-height);
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background: white;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgb(var(--v-theme-tertiary));
        border-radius: 10px;
    }
}
.panels-container {
    padding: 50px 20%;
}
.panels-container,
.panel-content {

    background-color: rgb(var(--v-theme-black));
}
.builder-panel-title {
    min-height: 30px !important;
    height: 30px;
}

.star-category {
    flex-wrap: wrap;
}
.card-container {
    margin: 5px;
    img {
        transition: all .2s ease-in-out;
        cursor: pointer;
        &:hover {
            transform: scale(1.2);
        }
    }
}
.card-container-disabled {
    // pointer-events: none;
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
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    min-height: $creating-deck-height;
    background-color: rgb(var(--v-theme-tertiary));
    
    box-shadow: inset 0px 10px 15px -3px rgba(0,0,0,0.3);
    width:100%;
    padding: 35px 0;
}
.card-slot {
    position: relative;
    width: 100px;
    height: 126px;
    margin: 0 10px;
}
.card-slot-empty {
    border: 2px dotted black;
}
.deck-actions {
    display: flex;
    flex-direction: column;
    width:$deck-actions-width;
    align-items: center;
    position: absolute;
    right: -140px;
    .deck-action-button {
        cursor: pointer;
        border: 2px solid white;
        border-radius: 100px;
        width: 55px;
        height: 55px;
        padding: 5px;
        transition: .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        margin: 5px 0;
        .button-icon{
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            text-align:center;
        }
        &:hover{
            width:$deck-actions-width;
            background-color: white;
            box-shadow: 0px 5px 5px rgba(0,0,0,0.2);
            transition:.3s;
        }
        &:active{
            box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
            transition: .05s
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
.card-remover {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    .remove-icon {
        z-index: 1;
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
    width: 300px;
    height: 40px;
    background-color: white;
    margin-bottom: 20px;
    padding-left: 15px;
    &:focus {
        outline: 3px solid rgb(var(--v-theme-primary));
    }
}
</style>

<style lang="scss">
.builder-container {
    .v-expansion-panel__shadow {
        box-shadow: none;
        outline: 1px solid white;
    }
    .v-expansion-panel-title__overlay {
        opacity: 0 !important;
        &:hover {
            opacity: 0.1 !important;
        }
    }
}
.deck-actions .deck-action-button:hover .v-icon {
    color: rgb(var(--v-theme-black)) !important;
}
</style>
