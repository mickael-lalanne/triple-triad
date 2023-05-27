<template>
    <div class="viewer-container d-flex flex-column">
        <div class="viewer-header d-flex" @click="$emit(ETripleTriadEvent.CloseDeckSection)">
            <v-icon
                class="mode-selector-close-icon"
                :size="25"
                icon="mdi-chevron-right"
                color="white"
            ></v-icon>
            <v-spacer></v-spacer>
            <span>{{ $vuetify.locale.t('$vuetify.home.deckViewer.headerTitle') }}</span>
        </div>
        <div class="deck-list-container">
            <!-- No deck message -->
            <div v-if="getUserDecks.length === 0" class="no-deck-container">
                <v-divider class="mb-3" color="white"></v-divider>
                {{ $vuetify.locale.t('$vuetify.deck.noDeckMessageTop') }} <br>
                <div>
                    <v-icon :size="20" icon="mdi-arrow-down-thick" color="white"></v-icon>
                    {{ $vuetify.locale.t('$vuetify.deck.noDeckMessageBot') }}
                </div>
            </div>
            <div
                v-for="deck in getUserDecks"
                :key="deck.id"
                class="deck-container d-flex align-stretch"
                @mouseenter="deckHover = deck.id"
                @mouseleave="deckHover = undefined"
            >
                <!-- Deck cards -->
                <div class="deck-cards-container d-flex align-center">
                    <img v-for="card in getDeckCards(deck.cards)" :key="card.id" :src="'/images/cards/' + card.source"/>
                <!-- Action buttons -->
                <div
                    class="deck-action-buttons d-flex"
                    :class="{ 'deck-action-buttons-visible': deckHover === deck.id && !showDeleteConfirmation }"
                >
                    <div class="actions-layer"></div>
                    <div class="action-button" @click="$emit(ETripleTriadEvent.EditDeck, deck)">
                        {{ $vuetify.locale.t('$vuetify.shared.edit') }}
                    </div>
                    <div class="action-button" @click="showDeleteConfirmation = deck.id">
                        {{ $vuetify.locale.t('$vuetify.shared.delete') }}
                    </div>
                </div>
                </div>
                <!-- Deck name -->
                <div class="deck-name">{{ deck.name }}</div>
                <!-- Delete confirmation -->
                <div v-if="showDeleteConfirmation === deck.id" class="delete-confirmation">
                    <div class="d-flex">
                        {{ $vuetify.locale.t('$vuetify.home.deckViewer.deleteDeck') }}
                        <span class="delete-deck-name">"{{ deck.name }}""</span> ?
                    </div>
                    <div class="delete-confirm-buttons">
                        <div class="delete" @click="confirmDelete(deck.id!)">
                            {{ $vuetify.locale.t('$vuetify.shared.delete') }}
                        </div>
                        <div class="cancel" @click="showDeleteConfirmation = undefined">
                            {{ $vuetify.locale.t('$vuetify.shared.cancel') }}
                        </div>
                    </div>
                    <!-- Loading indicator -->
                    <v-progress-linear
                        v-if="deletionConfirmed"
                        class="delete-loading"
                        color="secondary"
                        indeterminate
                    ></v-progress-linear>
                </div>
            </div>
        </div>
        <v-spacer></v-spacer>
        <!-- ADD DECK BUTTON -->
        <div class="add-deck-button" @click="$emit(ETripleTriadEvent.AddDeck)">
            {{ $vuetify.locale.t('$vuetify.home.deckViewer.addDeck') }}
        </div>
    </div>
</template>

<script lang="ts">
import type { Card } from '@/models/Card';
import { ETripleTriadEvent } from '@/models/Event';
import { DeckService } from '@/services/deckService';
import { useDeckStore } from '@/stores/deck.store';
import { mapState } from 'pinia';

export default {
    name: 'DeckViewer',
    props: {
    },
    data() {
        return {
            ETripleTriadEvent: ETripleTriadEvent,
            showDeleteConfirmation: undefined as string | undefined,
            deletionConfirmed: false as boolean,
            deckHover: undefined as undefined | string,
        };
    },
    computed: {
        ...mapState(useDeckStore, ['getUserDecks'])
    },
    methods: {
        getDeckCards(cardsIds: number[]): Card[] {
            return DeckService.resolveDeckCards(cardsIds);
        },
        async confirmDelete(deckId: string): Promise<void> {
            this.deletionConfirmed = true; // Show loading indicator
            await DeckService.deleteDeck(deckId);
        },
        /**
         * Called when the delete icon of a deck has been clicked
         * Delete deck client side and server side
         * @param {Deck} deckId id of the deck to delete
         */
        async deleteDeck(deckId: string) {
            await DeckService.deleteDeck(deckId);
            this.showDeleteConfirmation = undefined;
            this.deletionConfirmed = false;
        },
    }
};
</script>

<style scoped lang="scss">
.viewer-container {
    height: inherit;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
}
.viewer-header {
    color: white;
    font-size: 19px;
    font-style: italic;
    cursor: pointer;
    margin-bottom: 10px;
    &:hover i::before {
        color: rgb(var(--v-theme-secondary));
    }
}
.deck-list-container {
    min-height: 0;
    overflow: auto;
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
    position: relative;
    margin-bottom: 25px;
    border: 1px solid white;
    text-align: center;
    flex-direction: column;
    overflow: hidden;
    &:last-child {
        margin-bottom: 0;
    }
}
.no-deck-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
    color: white;
    font-size: 16px;
    background-color: unset;
    border-radius: 0;
    padding: 0;
    margin-top: 20px;
}
.deck-cards-container {
    z-index: 1;
    min-width: 0;
    position: relative;
    img {
        min-width: 0;
    }
}
.deck-name {
    background-color: rgb(var(--v-theme-secondary));
    padding: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    z-index: 2;
    color: white;
    width: -webkit-fill-available;
    font-size: 14px;
    border-top: 1px solid white;
}
$actions-buttons-height: 30px;
.deck-action-buttons {
    position: absolute;
    bottom: calc(0px - #{$actions-buttons-height});
    align-items: center;
    height: $actions-buttons-height;
    justify-content: center;
    -webkit-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
    z-index: 1;
    left: 0;
    width: 100%;
}
.deck-action-buttons-visible {
    bottom: 0;
}
.actions-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--v-theme-black), 0.7);
}
.action-button {
    color: white;
    z-index: 1;
    flex: 1;
    border-top: 1px solid white;
    border-bottom: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-transform: uppercase;
    &:last-child {
        border-left: 1px solid white;
    }
    &:hover {
        background-color: rgba(var(--v-theme-secondary), 0.3);
    }
}
.add-deck-button {
    cursor: pointer;
    color: white;
    width: 100%;
    border: 1px solid white;
    text-align: center;
    padding: 30px;
    margin-top: 20px;
    font-size: 20px;
    text-transform: uppercase;
    &:hover {
        background-color: rgb(var(--v-theme-secondary));
    }
}
.delete-confirmation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(var(--v-theme-black));
    z-index: 2;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .delete-deck-name {
        font-style: italic;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 185px;
        white-space: pre;
    }
    .delete-confirm-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        div {
            padding: 7px 20px;
            margin: 10px 15px;
            border: 1px solid white;
            cursor: pointer;
        }
    }
    .delete:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    .cancel {
        background-color: rgba(var(--v-theme-secondary), 0.5);
        &:hover {
            background-color: rgb(var(--v-theme-secondary));
        }
    }
    .delete-loading {
        position: absolute;
        width: 100%;
        bottom: 0;
        top: unset !important;
    }
}

</style>
