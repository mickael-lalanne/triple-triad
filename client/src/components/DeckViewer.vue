<template>
    <main>
        <h1>My decks</h1>
        <div class="viewer-container">
            <div
                v-for="deck in userDecks"
                :key="deck.id"
                class="deck-container d-flex align-stretch"
                @mouseenter="deckHover = deck.id"
                @mouseleave="deckHover = null"
            >
                <!-- Deck name -->
                <div class="deck-name">{{ deck.name }}</div>
                <!-- Deck cards -->
                <div class="deck-cards-container d-flex align-center">
                    <img v-for="card in deck.cards" :key="card.id" :src="'/images/cards/' + card.source"/>
                </div>
                <!-- Action buttons -->
                <div v-if="deckHover === deck.id" class="deck-action-buttons d-flex">
                    <div class="actions-layer"></div>
                    <!-- Edit action -->
                    <v-icon
                        class="action-icon"
                        :size="50"
                        icon="mdi-pencil-box-outline"
                        color="white"
                        @click="$emit(ETripleTriadEvent.EditDeck, deck)"
                    ></v-icon>
                    <!-- Delete deck -->
                    <v-icon
                        class="action-icon"
                        :size="50"
                        icon="mdi-delete-outline"
                        color="white"
                        @click="$emit(ETripleTriadEvent.DeleteDeck, deck)"
                    ></v-icon>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import type { Deck } from '@/models/Deck';
import { ETripleTriadEvent } from '@/models/Event';
import type { PropType } from 'vue';

export default {
    props: {
        userDecks: { type: Array as PropType<Deck[]>, default: () => [] }
    },
    data() {
        return {
            ETripleTriadEvent: ETripleTriadEvent,
            deckHover: null as null | number
        };
    },
    methods: {
    }
};
</script>

<style scoped lang="scss">
.deck-container {
    background-color: red;
    position: relative;
    margin: 25px;
    width: fit-content;
    height: 150px;
    padding: 0 10px;
}
.deck-name {
    position: absolute;
    background-color: yellow;
    bottom: 0;
    left: 0;
    padding: 15px;
}
.deck-action-buttons {
    position: absolute;
    right: 0;
    flex-direction: column;
    height: 100%;
    padding: 0 7px;
    justify-content: space-evenly;
}
.actions-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
}
.action-icon {
    z-index: 1;
    cursor: pointer;
}
</style>
