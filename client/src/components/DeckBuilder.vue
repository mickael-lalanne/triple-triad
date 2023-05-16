<template>
    <main>
        <div class="builder-container">
            <!-- ALL CARDS LIST (sorted by stars) -->
            <v-expansion-panels variant="accordion" multiple v-model="starPanels">
                <v-expansion-panel
                    v-for="(cards, i) in allCards"
                    :key="i"
                    :value="i"
                    :title="i === 0 ? $vuetify.locale.t('$vuetify.deck.oneStarCards') : $vuetify.locale.t('$vuetify.deck.starsCards', i + 1)"
                >
                    <v-expansion-panel-text>
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
            <div class="creating-deck-container-spacer"></div>
            <div class="creating-deck-container d-flex align-center justify-center">
                <!-- DECK NAME -->
                <input v-model="deckName" class="deck-name" placeholder="Deck name" title="input tiel">

                <div class="d-flex align-center justify-center">
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
                        <v-btn @click="createDeck" :disabled="selectedCards.length !== 5">
                            {{ editing
                                ? $vuetify.locale.t('$vuetify.deck.updateDeck')
                                : $vuetify.locale.t('$vuetify.deck.createDeck')
                            }}
                        </v-btn>
                        <v-btn @click="$emit(ETripleTriadEvent.CancelDeck)">
                            {{ $vuetify.locale.t('$vuetify.shared.cancel') }}
                        </v-btn>
                        <!-- <v-btn @click="resetDeck">Reset</v-btn> -->
                        <!-- <v-btn @click="resetDeck">Reset</v-btn> -->
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { FIVE_STAR_CARDS, FOUR_STAR_CARDS, ONE_STAR_CARDS, THREE_STAR_CARDS, TWO_STAR_CARDS, type Card } from '@/models/Card';
import type { Deck } from '@/models/Deck';
import { ETripleTriadEvent } from '@/models/Event';
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
            this.selectedCards = this.deckToEdit.cards;
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
        createDeck() {
            const deckToCreate: Partial<Deck> = {
                name: this.deckName === '' ? this.$vuetify.locale.t('$vuetify.deck.defaultDeckName', this.deckLength + 1) : this.deckName,
                cards: this.selectedCards,
                id: this.editing ? this.deckToEdit?.id : undefined
            };
            this.$emit(ETripleTriadEvent.CreateDeck, deckToCreate, this.editing)
        }
    }
};
</script>

<style scoped lang="scss">
$creating-deck-height: 200px;

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
    background-color: red;
    width:100%;
}
.creating-deck-container-spacer {
    height: $creating-deck-height;
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
    button {
        margin: 10px;
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
