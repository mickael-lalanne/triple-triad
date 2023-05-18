<template>
    <div class="deck-viewer-container">
        <div class="viewer-title">My decks</div>
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
                <div v-if="/*deckHover === deck.id*/true" class="deck-action-buttons d-flex" :class="{ 'deck-action-buttons-visible': deckHover === deck.id }">
                    <div class="actions-layer"></div>
                    <!-- Edit action -->
                    <div class="action-icon" @click="$emit(ETripleTriadEvent.EditDeck, deck)">
                        <v-icon :size="30" icon="mdi-pencil-outline" color="white"></v-icon>
                    </div>
                    <!-- Delete deck -->
                    <div class="action-icon" @click="$emit(ETripleTriadEvent.DeleteDeck, deck)">
                        <v-icon :size="30" icon="mdi-delete-outline" color="white"></v-icon>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- ADD DECK BUTTON -->
        <div class="add-deck-container d-flex align-center justify-center" @click="$emit(ETripleTriadEvent.AddDeck)">
            <v-icon
                class="add-deck-icon"
                :size="50"
                icon="mdi-plus-circle-outline"
                color="white"
            ></v-icon>
        </div>
    </div>
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
$deck-radius: 25px;
$viewer-width: 85vw;
$add-button-height: 75px;

.deck-viewer-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    margin: auto;
    margin-top: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 50px;
}

.viewer-title {
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: white;
    font-size: 28px;
    text-transform: uppercase;
    margin-bottom: 30px;
}
.viewer-container {
    overflow: auto;
    width: fit-content;
    padding-right: 60px;
    margin-bottom: $add-button-height;
}
::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-track {
    background: white;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    background-color: rgb(var(--v-theme-secondary));
    border-radius: 10px;
}
.deck-container {
    background-color: rgb(var(--v-theme-primary));
    position: relative;
    margin: 25px;
    width: fit-content;
    height: 150px;
    padding: 0 10px;
    border-radius: $deck-radius;
}
.deck-cards-container {
    z-index: 1;
}
.deck-name {
    position: absolute;
    background-color: rgb(var(--v-theme-secondary));
    bottom: 0;
    left: 0;
    padding: 15px;
    border-bottom-left-radius: $deck-radius;
    border-top-right-radius: $deck-radius;
    max-width: 33%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    z-index: 2;
    color: white;
}
.deck-action-buttons {
    position: absolute;
    right: 0;
    flex-direction: column;
    height: 100%;
    padding: 0 7px;
    justify-content: space-evenly;
    opacity: 1;
    -webkit-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
}
.deck-action-buttons-visible {
    opacity: 1;
    transform: translateX(60px);
}
.actions-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(var(--v-theme-primary));
    border-top-right-radius: $deck-radius;
    border-bottom-right-radius: $deck-radius;
}
.action-icon {
    z-index: 0;
    cursor: pointer;
}

.action-icon{
    $icon-size	  : 50px;
    $border-radius: 0.5;//15% = 0.15, 50% = 0.50 etc.
    $background   : #2d2c3e;
    $background-b : #2d2c3e;
	cursor: pointer;
	position: relative;
	display: flex;
    align-items: center;
    justify-content: center;
	width: $icon-size;
	height: $icon-size;
	margin-left: calc($icon-size / 5);
	margin-right: calc($icon-size / 5);
	border-radius: calc($icon-size * $border-radius);
    $icon-hover-color: rgb(var(--v-theme-secondary));
	overflow: hidden;
	&::before,
    &::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		transition: all 0.25s ease;
		border-radius: $icon-size * $border-radius;
	}
	&::after {
		box-shadow: inset 0 0 0 2px $icon-hover-color;
	}
	&::before {
		background: $icon-hover-color;
		box-shadow: inset 0 0 0 $icon-size $background;
	}
	&:hover::before {
		box-shadow: inset 0 0 0 2px $background;
	}
}
.add-deck-container {
    box-shadow: inset 0px 10px 15px -3px rgba(0,0,0,0.3);
    cursor: pointer;
    background-color: rgb(var(--v-theme-tertiary));
    color: white;
    height: $add-button-height;
    width: 100%;
    transition: all .2s ease-in-out;
    position: absolute;
    bottom: 0;
    z-index: 2;
    .add-deck-icon {
        transition: all .2s ease-in-out;
    }
    &:hover {
       height: 125px;
        // Glow effect
        -webkit-box-shadow:0px 0px 50px 0px rgb(var(--v-theme-tertiary));
        -moz-box-shadow: 0px 0px 50px 0px rgb(var(--v-theme-tertiary));
        box-shadow: 0px 0px 50px 0px rgb(var(--v-theme-tertiary));
        .add-deck-icon {
            transform: scale(1.5);
        }
    }
}
</style>
